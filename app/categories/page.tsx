"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getGradientFromPalette } from "@/lib/gradient-palette"

const heroBackground = "/diverse-group-of-women-wearing-scarves-smiling.jpg"
const ITEMS_PER_PAGE = 6

const categoryShowcase = [
  {
    slug: "silk",
    name: "Silk Statements",
    description: "Weightless drape and luminous finishes for elevated occasions.",
    image: "/silk-scarves-category.jpg",
    hoverImage: "/muslim-woman-wearing-a-silk-scarf--elegant--modest.jpg",
  },
  {
    slug: "cotton",
    name: "Cotton Essentials",
    description: "Soft, breathable weaves designed for effortless all-day wear.",
    image: "/cotton-scarves-category.jpg",
    hoverImage: "/muslim-woman-wearing-a-pastel-scarf--serene--moder.jpg",
  },
  {
    slug: "winter",
    name: "Winter Warmth",
    description: "Plush wool and cashmere blends crafted to cocoon you in comfort.",
    image: "/wool-scarves-category.jpg",
    hoverImage: "/muslim-woman-wearing-a-warm-winter-scarf--cozy--st.jpg",
  },
  {
    slug: "prints",
    name: "Artisan Prints",
    description: "Limited-edition motifs inspired by global artistry and heritage.",
    image: "/promotional-banner-for-scarves.jpg",
    hoverImage: "/muslim-woman-wearing-a-stylish-scarf--vibrant--mod.jpg",
  },
  {
    slug: "pastel",
    name: "Pastel Palette",
    description: "Dreamy hues that add a whisper of color to every ensemble.",
    image: "/lavender-dream-scarf.jpg",
    hoverImage: "/muslim-woman-wearing-a-pastel-scarf-full-face-visible-not-cut-off-covering-head-serene-modern.jpg",
  },
  {
    slug: "earthy",
    name: "Earthy Textures",
    description: "Hand-loomed finishes that celebrate natural fibers and craft.",
    image: "/scarf-making-process.jpg",
    hoverImage: "/muslim-woman-wearing-an-elegant-scarf-full-face-visible-not-cut-off-covering-head-sophisticated.jpg",
  },
  {
    slug: "blush",
    name: "Blush Bloom",
    description: "Petal-inspired tones that soften tailoring and romantic silhouettes.",
    image: "/blush-pink-scarf.jpg",
    hoverImage: "/muslim-woman-wearing-a-handcrafted-scarf--unique--.jpg",
  },
  {
    slug: "lavender",
    name: "Lavender Luxe",
    description: "Violet gradients with subtle sheen for twilight-ready styling.",
    image: "/lavender-dream-scarf.jpg",
    hoverImage: "/muslim-woman-wearing-an-elegant-scarf--sophisticat.jpg",
  },
  {
    slug: "mint",
    name: "Mint Moments",
    description: "Cooling mint tones finished with artisanal fringe details.",
    image: "/mint-green-scarf.jpg",
    hoverImage: "/muslim-woman-wearing-a-handcrafted-scarf-full-face-visible-not-cut-off-covering-head-unique-artisan.jpg",
  },
  {
    slug: "sunset",
    name: "Sunset Stories",
    description: "Golden hour chroma captured on airy modal canvases.",
    image: "/silky-rose-scarf.jpg",
    hoverImage: "/woman-with-scarf.jpg",
  },
]

const editSpotlights = [
  {
    title: "Occasion Edit",
    description: "Silk jacquards and hand-finished tassels for celebrations that deserve a luminous entrance.",
    image: "/woman-wearing-elegant-scarf.jpg",
  },
  {
    title: "Travel Light",
    description: "Packable cotton scarves and wrinkle-resistant blends for curated carry-ons.",
    image: "/mint-green-scarf.jpg",
  },
  {
    title: "Studio Stories",
    description: "Behind-the-loom snapshots spotlighting artisan techniques and limited drops.",
    image: "/woman-with-elegant-scarf-looking-thoughtfully.jpg",
  },
  {
    title: "Elevated Neutrals",
    description: "Layer versatile neutrals with tonal textures for gallery-ready polish.",
    image: "/woman-wearing-scarf.jpg",
  },
  {
    title: "Colorblock Capsule",
    description: "Bold contrasts and graphic stripes for standout city commutes.",
    image: "/young-woman-smiling.png",
  },
  {
    title: "Artisan Looms",
    description: "Follow every hand-loomed detail from raw thread to finished edge.",
    image: "/scarf-making-process.jpg",
  },
  {
    title: "Weekend Escape",
    description: "Lightweight cotton-modal blends that roll neatly into weekender bags.",
    image: "/diverse-woman-smiling.png",
  },
]

export default function CategoriesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(categoryShowcase.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleCategories = categoryShowcase.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const SPOTLIGHT_AUTOPLAY_DELAY = 5000
  const [spotlightApi, setSpotlightApi] = useState<CarouselApi | null>(null)
  const [spotlightPaused, setSpotlightPaused] = useState(false)

  useEffect(() => {
    if (!spotlightApi || spotlightPaused) return

    const id = window.setInterval(() => {
      spotlightApi.scrollNext()
    }, SPOTLIGHT_AUTOPLAY_DELAY)

    return () => window.clearInterval(id)
  }, [spotlightApi, spotlightPaused])

  const pauseSpotlight = () => setSpotlightPaused(true)
  const resumeSpotlight = () => setSpotlightPaused(false)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-slate-950">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${heroBackground})` }}
            role="presentation"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-background/85 via-background/65 to-background/75" />
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center md:px-6 md:py-32 lg:py-40">
            <ScrollReveal className="space-y-4 text-foreground" direction="up">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">Shop by Category</p>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Curate Your Signature Edit</h1>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-xl/relaxed">
                Discover silhouettes crafted for every mood—luxurious silks, breathable cottons, cold-weather layers, and
                limited-run artisan prints.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/shop">Explore All Scarves</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border/70 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                >
                  <Link href="#categories">Browse Categories</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-10">
          <div className="space-y-12">
            <ScrollReveal className="space-y-3 text-center lg:text-left" direction="up">
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">Categories at a Glance</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg lg:mx-0">
                From heirloom-worthy silks to everyday essentials, explore the categories curated by our design studio.
                Each edit is photographed in-house to highlight drape, texture, and styling versatility.
              </p>
            </ScrollReveal>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {visibleCategories.map((category, index) => {
                const gradient = getGradientFromPalette(startIndex + index)
                return (
                  <ScrollReveal
                    key={category.slug}
                    delay={(startIndex + index) * 80}
                    className="h-full"
                    direction="up"
                  >
                    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/60 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                      <div className="relative aspect-[4/5] w-full overflow-hidden">
                        <Image
                          src={category.image}
                          alt={`${category.name} scarves`}
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                          className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                        />
                        <Image
                          src={category.hoverImage ?? category.image}
                          alt={`${category.name} alternate view`}
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                        <div
                          className={`pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t ${gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-100`}
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-4 px-6 py-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-primary">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                        <div className="mt-auto">
                          <Link
                            href={`/shop?category=${category.slug}`}
                            className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                          >
                            Explore this category &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="border-border/60 text-muted-foreground hover:text-primary"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1
                const isActive = pageNumber === currentPage
                return (
                  <Button
                    key={pageNumber}
                    size="sm"
                    variant={isActive ? "default" : "ghost"}
                    className={
                      isActive
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "text-muted-foreground hover:text-primary"
                    }
                    onClick={() => setCurrentPage(pageNumber)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {pageNumber}
                  </Button>
                )
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="border-border/60 text-muted-foreground hover:text-primary"
              >
                Next
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-10">
            <ScrollReveal className="space-y-3 text-center lg:text-left" direction="up">
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">Curated Spotlights</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg lg:mx-0">
                Dive deeper into seasonal edits, styling guides, and the artisan stories shaping each collection.
              </p>
            </ScrollReveal>
            <Carousel
              opts={{ align: "start", loop: true }}
              className="relative mt-10"
              setApi={setSpotlightApi}
              onMouseEnter={pauseSpotlight}
              onMouseLeave={resumeSpotlight}
              onFocusCapture={pauseSpotlight}
              onBlurCapture={resumeSpotlight}
              onTouchStart={pauseSpotlight}
              onTouchEnd={resumeSpotlight}
            >
              <CarouselContent className="-ml-4 md:-ml-6">
                {editSpotlights.map((edit, index) => (
                  <CarouselItem
                    key={edit.title}
                    className="pl-4 md:basis-1/2 md:pl-6 xl:basis-1/3"
                  >
                    <ScrollReveal delay={index * 120} direction="up" className="h-full">
                      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/40 bg-background/80 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                        <div className="relative h-56 w-full overflow-hidden">
                          <Image
                            src={edit.image}
                            alt={edit.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                            className="object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-3 px-6 py-6">
                          <h3 className="text-lg font-semibold text-primary">{edit.title}</h3>
                          <p className="text-sm text-muted-foreground">{edit.description}</p>
                          <Link
                            href="/stories"
                            className="mt-auto inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                            onFocusCapture={pauseSpotlight}
                            onBlurCapture={resumeSpotlight}
                          >
                            Read the story &rarr;
                          </Link>
                        </div>
                      </div>
                    </ScrollReveal>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden -left-16 sm:flex h-12 w-12" />
              <CarouselNext className="hidden -right-16 sm:flex h-12 w-12" />
            </Carousel>
          </div>
        </section>
      </main>
    </div>
  )
}
