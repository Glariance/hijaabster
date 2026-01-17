"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollReveal } from "./scroll-reveal"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { CmsSection, BannerItemData } from "@/lib/types/cms"
import { getTestimonialsData } from "@/lib/services/cms-service"

interface TestimonialSectionProps {
  sectionData?: CmsSection | null
}

type Testimonial = {
  name: string
  title: string
  quote: string
  avatar: string
}

export function TestimonialSection({ sectionData }: TestimonialSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch testimonials from CMS
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true)
        const testimonialsData = await getTestimonialsData('home')
        
        const transformedTestimonials: Testimonial[] = testimonialsData.map((item) => {
          const name = item["Name"]?.value || ""
          const designation = item["Designation"]?.value || ""
          const descriptionHtml = item["Description"]?.value || ""
          const description = descriptionHtml
            .replace(/<[^>]*>/g, "") // Remove HTML tags
            .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
            .replace(/&amp;/g, "&") // Replace &amp; with &
            .replace(/&lt;/g, "<") // Replace &lt; with <
            .replace(/&gt;/g, ">") // Replace &gt; with >
            .replace(/&quot;/g, '"') // Replace &quot; with "
            .replace(/&#39;/g, "'") // Replace &#39; with '
            .trim()
          const imageUrl = item["Image"]?.url || item["Image"]?.value || "/placeholder.svg"
          
          return {
            name,
            title: designation,
            quote: description,
            avatar: imageUrl,
          }
        })
        
        setTestimonials(transformedTestimonials)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        setTestimonials([])
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const AUTOPLAY_DELAY = 4500
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!carouselApi || isPaused) return

    const id = window.setInterval(() => {
      carouselApi.scrollNext()
    }, AUTOPLAY_DELAY)

    return () => window.clearInterval(id)
  }, [carouselApi, isPaused])

  const handlePause = () => setIsPaused(true)
  const handleResume = () => setIsPaused(false)

  // Extract title and description from CMS data
  const defaultTitle = "What Our Customers Say"
  const defaultDescription = "Hear from our happy customers about their experience with our beautiful scarves."

  const title = sectionData?.fields?.["Title"]?.value || defaultTitle
  const descriptionHtml = sectionData?.fields?.["Description"]?.value || defaultDescription
  const description = descriptionHtml
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
    .replace(/&amp;/g, "&") // Replace &amp; with &
    .replace(/&lt;/g, "<") // Replace &lt; with <
    .replace(/&gt;/g, ">") // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .trim()

  return (
    <section className="w-full bg-background py-10 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-6">
        <ScrollReveal className="space-y-4" direction="up">
          <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl/relaxed">
            {description}
          </p>
        </ScrollReveal>

        <div className="relative mt-10 w-full">
          <Carousel
            className="w-full"
            opts={{ align: "start", loop: true }}
            setApi={setCarouselApi}
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
            onFocusCapture={handlePause}
            onBlurCapture={handleResume}
            onTouchStart={handlePause}
            onTouchEnd={handleResume}
          >
            <CarouselContent>
              {loading ? (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="flex h-full min-h-[320px] items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading testimonials...</p>
                    </div>
                  </div>
                </CarouselItem>
              ) : testimonials.length === 0 ? (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="flex h-full min-h-[320px] items-center justify-center">
                    <p className="text-muted-foreground">No testimonials available.</p>
                  </div>
                </CarouselItem>
              ) : (
                testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={`${testimonial.name}-${index}`}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <ScrollReveal delay={index * 80} className="h-full">
                      <Card className="flex h-full min-h-[320px] flex-col items-center justify-between rounded-xl border border-border/50 bg-background/90 p-6 text-center shadow-lg backdrop-blur-sm">
                        <CardContent className="flex flex-1 flex-col items-center space-y-6 p-0">
                          <Avatar className="h-16 w-16 border-2 border-primary/30 shadow-md">
                            <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                            <AvatarFallback>
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <blockquote className="text-lg font-semibold leading-relaxed text-muted-foreground">
                            &ldquo;{testimonial.quote}&rdquo;
                          </blockquote>
                          <div>
                            <div className="font-semibold text-primary">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            <CarouselPrevious className="hidden -left-16 sm:flex h-12 w-12" />
            <CarouselNext className="hidden -right-16 sm:flex h-12 w-12" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
