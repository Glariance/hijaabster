"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getGradientFromPalette } from "@/lib/gradient-palette"
import type { CmsSection } from "@/lib/types/cms"
import { apiService } from "@/lib/api-client"

interface CategorySectionProps {
  sectionData?: CmsSection | null
}

interface CategorySectionProps {
  sectionData?: CmsSection | null
}

type Category = {
  id: number
  name: string
  slug: string
  description: string
  image_url: string | null
  second_image_url: string | null
}

export function CategorySection({ sectionData }: CategorySectionProps) {
  const AUTOPLAY_DELAY = 4500
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch categories from API
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        const response = await apiService.getCategories()
        // Laravel ResourceCollection returns { data: [...] }
        const categoriesData = response?.data || (Array.isArray(response) ? response : [])
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

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
  const defaultTitle = "Shop by Category"
  const defaultDescription = "Explore curated collections that make it easy to find the perfect scarf for every season and occasion."

  const title = sectionData?.fields?.["Title"]?.value || defaultTitle
  const descriptionHtml = sectionData?.fields?.["Description"]?.value || defaultDescription
  const description = descriptionHtml.replace(/<[^>]*>/g, "").trim()

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
                  <div className="flex h-full items-center justify-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading categories...</p>
                    </div>
                  </div>
                </CarouselItem>
              ) : categories.length === 0 ? (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="flex h-full items-center justify-center py-8">
                    <p className="text-muted-foreground">No categories available.</p>
                  </div>
                </CarouselItem>
              ) : (
                categories.map((category, index) => {
                  const gradient = getGradientFromPalette(index)
                  return (
                    <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/3">
                      <ScrollReveal delay={index * 80} className="h-full">
                        <Link
                          href={`/shop?category=${category.slug}`}
                          className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
                          onFocusCapture={handlePause}
                          onBlurCapture={handleResume}
                        >
                          <Card className="h-full overflow-hidden border border-border/50 bg-background/90 pb-8 shadow-lg drop-shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:drop-shadow-2xl">
                            <div className="relative aspect-[4/5] w-full overflow-hidden">
                              {/* Featured Image (default) */}
                              {category.image_url ? (
                                <img
                                  src={category.image_url}
                                  alt={category.name}
                                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
                                />
                              ) : (
                                <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
                                  <span className="text-muted-foreground text-sm">No Image</span>
                                </div>
                              )}
                              {/* Second Image (on hover) */}
                              {category.second_image_url && (
                                <img
                                  src={category.second_image_url}
                                  alt={`${category.name} alternate view`}
                                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                />
                              )}
                              <div
                                className={`pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t ${gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-100`}
                              />
                            </div>
                            <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
                              <h3 className="text-2xl font-semibold text-primary">{category.name}</h3>
                              <p className="text-sm text-muted-foreground md:text-base">
                                {category.description ? category.description.replace(/<[^>]*>/g, "").trim() : ""}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      </ScrollReveal>
                    </CarouselItem>
                  )
                })
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
