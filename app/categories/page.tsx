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
import { getCategoryBannerSection, getCategoriesGlanceSection, getCuratedSpotlightsSection } from "@/lib/services/cms-service"
import type { CmsSection } from "@/lib/types/cms"
import { apiService } from "@/lib/api-client"

const defaultHeroBackground = "/diverse-group-of-women-wearing-scarves-smiling.jpg"
const ITEMS_PER_PAGE = 6

type Category = {
  id: number
  name: string
  slug: string
  description: string
  image_url: string | null
  second_image_url: string | null
}

type NewProduct = {
  id: number
  name: string
  slug: string
  description: string
  image_url: string | null
  price: number
}

export default function CategoriesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [bannerSection, setBannerSection] = useState<CmsSection | null>(null)
  const [categoriesGlanceSection, setCategoriesGlanceSection] = useState<CmsSection | null>(null)
  const [curatedSpotlightsSection, setCuratedSpotlightsSection] = useState<CmsSection | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [newProducts, setNewProducts] = useState<NewProduct[]>([])
  const [loadingNewProducts, setLoadingNewProducts] = useState(true)
  
  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true)
        const response = await apiService.getCategories()
        // Laravel ResourceCollection returns { data: [...] }
        const categoriesData = response.data || response || []
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error loading categories:", error)
        setCategories([])
      } finally {
        setLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [])

  // Fetch new products from API
  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        setLoadingNewProducts(true)
        const response = await apiService.getProducts({ new: true })
        // Laravel ResourceCollection returns { data: [...] }
        const productsData = response.data || response || []
        setNewProducts(productsData)
      } catch (error) {
        console.error("Error loading new products:", error)
        setNewProducts([])
      } finally {
        setLoadingNewProducts(false)
      }
    }
    fetchNewProducts()
  }, [])

  const totalPages = Math.max(1, Math.ceil(categories.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleCategories = categories.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Fetch banner data from CMS
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const section = await getCategoryBannerSection('category')
        setBannerSection(section)
      } catch (error) {
        console.error("Error loading category banner data:", error)
      }
    }
    fetchBannerData()
  }, [])

  // Fetch categories glance section data from CMS
  useEffect(() => {
    const fetchCategoriesGlanceData = async () => {
      try {
        const section = await getCategoriesGlanceSection('category')
        setCategoriesGlanceSection(section)
      } catch (error) {
        console.error("Error loading categories glance data:", error)
      }
    }
    fetchCategoriesGlanceData()
  }, [])

  // Fetch curated spotlights section data from CMS
  useEffect(() => {
    const fetchCuratedSpotlightsData = async () => {
      try {
        const section = await getCuratedSpotlightsSection('category')
        setCuratedSpotlightsSection(section)
      } catch (error) {
        console.error("Error loading curated spotlights data:", error)
      }
    }
    fetchCuratedSpotlightsData()
  }, [])

  useEffect(() => {
    if (categories.length > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages, categories.length])

  // Process description: strip HTML tags and decode entities
  const processDescription = (html: string): string => {
    return html
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
      .replace(/&amp;/g, "&") // Replace &amp; with &
      .replace(/&lt;/g, "<") // Replace &lt; with <
      .replace(/&gt;/g, ">") // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'") // Replace &#39; with '
      .replace(/&mdash;/g, "—") // Replace &mdash; with em dash
      .trim()
  }

  // Extract banner data from CMS
  const defaultTitle = "Shop by Category"
  const defaultHeading = "Curate Your Signature Edit"
  const defaultDescription = "Discover silhouettes crafted for every mood—luxurious silks, breathable cottons, cold-weather layers, and limited-run artisan prints."
  const defaultImage = defaultHeroBackground
  const defaultButton1 = "Explore All Scarves"
  const defaultButton2 = "Browse Categories"

  const title = bannerSection?.fields?.["Title"]?.value || defaultTitle
  const heading = bannerSection?.fields?.["Heading"]?.value || defaultHeading
  const descriptionHtml = bannerSection?.fields?.["Description"]?.value || defaultDescription
  const description = processDescription(descriptionHtml)
  const imageUrl = bannerSection?.fields?.["Image"]?.url || bannerSection?.fields?.["Image"]?.value || defaultImage
  const button1Text = bannerSection?.fields?.["Button 1"]?.value || defaultButton1
  const button2Text = bannerSection?.fields?.["Button 2"]?.value || defaultButton2

  // Extract categories glance section data from CMS
  const defaultCategoriesGlanceTitle = "Categories at a Glance"
  const defaultCategoriesGlanceDescription = "From heirloom-worthy silks to everyday essentials, explore the categories curated by our design studio. Each edit is photographed in-house to highlight drape, texture, and styling versatility."

  const categoriesGlanceTitle = categoriesGlanceSection?.fields?.["Title"]?.value || defaultCategoriesGlanceTitle
  const categoriesGlanceDescriptionHtml = categoriesGlanceSection?.fields?.["Description"]?.value || defaultCategoriesGlanceDescription
  const categoriesGlanceDescription = processDescription(categoriesGlanceDescriptionHtml)

  // Extract curated spotlights section data from CMS
  const defaultCuratedSpotlightsTitle = "Curated Spotlights"
  const defaultCuratedSpotlightsDescription = "Dive deeper into seasonal edits, styling guides, and the artisan stories shaping each collection."

  const curatedSpotlightsTitle = curatedSpotlightsSection?.fields?.["Title"]?.value || defaultCuratedSpotlightsTitle
  const curatedSpotlightsDescriptionHtml = curatedSpotlightsSection?.fields?.["Description"]?.value || defaultCuratedSpotlightsDescription
  const curatedSpotlightsDescription = processDescription(curatedSpotlightsDescriptionHtml)

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
            style={{ backgroundImage: `url(${imageUrl})` }}
            role="presentation"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-background/85 via-background/65 to-background/75" />
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center md:px-6 md:py-32 lg:py-40">
            <ScrollReveal className="space-y-4 text-foreground" direction="up">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">{title}</p>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{heading}</h1>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-xl/relaxed">
                {description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/shop">{button1Text}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border/70 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                >
                  <Link href="#categories">{button2Text}</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-10">
          <div className="space-y-12">
            <ScrollReveal className="space-y-3 text-center lg:text-left" direction="up">
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">{categoriesGlanceTitle}</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg lg:mx-0">
                {categoriesGlanceDescription}
              </p>
            </ScrollReveal>

            {loadingCategories ? (
              <div className="text-center py-12 text-muted-foreground">Loading categories...</div>
            ) : categories.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No categories available.</div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {visibleCategories.map((category, index) => {
                  const gradient = getGradientFromPalette(startIndex + index)
                  const description = category.description ? category.description.replace(/<[^>]*>/g, "").trim() : ""
                  return (
                    <ScrollReveal
                      key={category.id}
                      delay={(startIndex + index) * 80}
                      className="h-full"
                      direction="up"
                    >
                      <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/60 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="relative aspect-[4/5] w-full overflow-hidden">
                          {category.image_url ? (
                            <>
                              <img
                                src={category.image_url}
                                alt={`${category.name} scarves`}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                              />
                              {category.second_image_url && (
                                <img
                                  src={category.second_image_url}
                                  alt={`${category.name} alternate view`}
                                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                />
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <span className="text-muted-foreground">No Image</span>
                            </div>
                          )}
                          <div
                            className={`pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t ${gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-100`}
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-4 px-6 py-6">
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-primary">{category.name}</h3>
                            {description && (
                              <p className="text-sm text-muted-foreground">{description}</p>
                            )}
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
            )}
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
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">{curatedSpotlightsTitle}</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg lg:mx-0">
                {curatedSpotlightsDescription}
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
                {loadingNewProducts ? (
                  <CarouselItem className="pl-4 md:pl-6">
                    <div className="text-center py-12 text-muted-foreground">Loading products...</div>
                  </CarouselItem>
                ) : newProducts.length === 0 ? (
                  <CarouselItem className="pl-4 md:pl-6">
                    <div className="text-center py-12 text-muted-foreground">No new products available.</div>
                  </CarouselItem>
                ) : (
                  newProducts.map((product, index) => {
                    const description = product.description ? product.description.replace(/<[^>]*>/g, "").substring(0, 100) + "..." : ""
                    return (
                      <CarouselItem
                        key={product.id}
                        className="pl-4 md:basis-1/2 md:pl-6 xl:basis-1/3"
                      >
                        <ScrollReveal delay={index * 120} direction="up" className="h-full">
                          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/40 bg-background/80 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                            <div className="relative h-56 w-full overflow-hidden">
                              {product.image_url ? (
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                              ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                  <span className="text-muted-foreground">No Image</span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-1 flex-col gap-3 px-6 py-6">
                              <h3 className="text-lg font-semibold text-primary">{product.name}</h3>
                              {description && (
                                <p className="text-sm text-muted-foreground">{description}</p>
                              )}
                              <div className="mt-auto flex items-center justify-between">
                                <p className="text-base font-semibold text-primary">PKR {product.price.toFixed(2)}</p>
                                <Link
                                  href={`/shop/${product.slug}`}
                                  className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                                  onFocusCapture={pauseSpotlight}
                                  onBlurCapture={resumeSpotlight}
                                >
                                  View product &rarr;
                                </Link>
                              </div>
                            </div>
                          </div>
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
        </section>
      </main>
    </div>
  )
}
