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

type Category = {
  id: number
  name: string
  image: string
  hoverImage?: string
  link: string
  description: string
}

const categories: Category[] = [
  {
    id: 1,
    name: "Silk Scarves",
    image: "/silk-scarves-category.jpg",
    hoverImage: "/muslim-woman-wearing-a-silk-scarf--elegant--modest.jpg",
    link: "#",
    description: "Luxurious silk pieces that drape effortlessly for elevated occasions.",
  },
  {
    id: 2,
    name: "Cotton Scarves",
    image: "/cotton-scarves-category.jpg",
    hoverImage: "/muslim-woman-wearing-a-pastel-scarf--serene--moder.jpg",
    link: "#",
    description: "Breathable everyday staples woven in soft, skin-friendly textures.",
  },
  {
    id: 3,
    name: "Wool Scarves",
    image: "/wool-scarves-category.jpg",
    hoverImage: "/muslim-woman-wearing-a-warm-winter-scarf--cozy--st.jpg",
    link: "#",
    description: "Cozy layers spun to keep you warm without compromising on style.",
  },
  {
    id: 4,
    name: "Blush Pink",
    image: "/blush-pink-scarf.jpg",
    hoverImage: "/muslim-woman-wearing-a-stylish-scarf--vibrant--mod.jpg",
    link: "/categories/blush-pink",
    description: "Romantic hues that add a gentle pop of color to any outfit.",
  },
  {
    id: 5,
    name: "Lavender Dream",
    image: "/lavender-dream-scarf.jpg",
    hoverImage: "/muslim-woman-wearing-an-elegant-scarf--sophisticat.jpg",
    link: "/categories/lavender-dream",
    description: "Dreamy pastels with a satin sheen for serene statement looks.",
  },
  {
    id: 6,
    name: "Mint Green",
    image: "/mint-green-scarf.jpg",
    hoverImage: "/muslim-woman-wearing-a-handcrafted-scarf--unique--.jpg",
    link: "/categories/mint-green",
    description: "Refreshing tones that brighten ensembles with artisan detailing.",
  },
]

export function CategorySection() {
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
          <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">Shop by Category</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl/relaxed">
            Explore curated collections that make it easy to find the perfect scarf for every season and occasion.
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
              {categories.map((category, index) => {
                const gradient = getGradientFromPalette(index)
                return (
                  <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/3">
                    <ScrollReveal delay={index * 80} className="h-full">
                      <Link
                        href={category.link}
                        className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
                        onFocusCapture={handlePause}
                        onBlurCapture={handleResume}
                      >
                        <Card className="h-full overflow-hidden border border-border/50 bg-background/90 pb-8 shadow-lg drop-shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:drop-shadow-2xl">
                          <div className="relative aspect-[4/5] w-full overflow-hidden">
                            <Image
                              src={category.image || "/placeholder.svg"}
                              alt={category.name}
                              fill
                              className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
                              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 33vw"
                              priority={index < 2}
                            />
                            <Image
                              src={category.hoverImage || category.image || "/placeholder.svg"}
                              alt={`${category.name} alternate view`}
                              fill
                              className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 33vw"
                            />
                            <div
                              className={`pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t ${gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-100`}
                            />
                          </div>
                          <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
                            <h3 className="text-2xl font-semibold text-primary">{category.name}</h3>
                            <p className="text-sm text-muted-foreground md:text-base">{category.description}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </ScrollReveal>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden -left-16 sm:flex h-12 w-12" />
            <CarouselNext className="hidden -right-16 sm:flex h-12 w-12" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
