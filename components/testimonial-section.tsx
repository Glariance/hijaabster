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

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah L.",
      title: "Fashion Enthusiast",
      quote:
        "Absolutely love the scarves from Scarf e-commerce app! The quality is superb, and the designs are so elegant and unique. I always get compliments when I wear them.",
      avatar: "/diverse-woman-smiling.png",
    },
    {
      name: "Jessica R.",
      title: "Style Blogger",
      quote:
        "These scarves are a game-changer for my wardrobe. They add a touch of sophistication to any outfit. The fabric is incredibly soft and luxurious.",
      avatar: "/woman-with-scarf.jpg",
    },
    {
      name: "Emily C.",
      title: "Happy Customer",
      quote:
        "I'm so impressed with the variety and beauty of these scarves. The colors are vibrant, and they're perfect for any occasion. Highly recommend!",
      avatar: "/young-woman-smiling.png",
    },
    {
      name: "Maya H.",
      title: "Creative Director",
      quote:
        "The craftsmanship is unmatched. Each scarf feels like a wearable piece of art and elevates our photo shoots instantly.",
      avatar: "/creative-director-scarf.jpg",
    },
    {
      name: "Priya S.",
      title: "Boutique Owner",
      quote:
        "Our customers adore these scarves. They fly off the shelves thanks to the luxurious feel and timeless patterns.",
      avatar: "/boutique-owner-scarf.jpg",
    },
    {
      name: "Nadia K.",
      title: "Frequent Traveler",
      quote:
        "Lightweight, cozy, and stylish - these scarves are my travel must-have. They fold easily and dress up any airport outfit.",
      avatar: "/traveler-with-scarf.jpg",
    },
  ]

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

  return (
    <section className="w-full bg-background py-10 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-6">
        <ScrollReveal className="space-y-4" direction="up">
          <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">What Our Customers Say</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl/relaxed">
            Hear from our happy customers about their experience with our beautiful scarves.
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
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.name}
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
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden -left-16 sm:flex h-12 w-12" />
            <CarouselNext className="hidden -right-16 sm:flex h-12 w-12" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
