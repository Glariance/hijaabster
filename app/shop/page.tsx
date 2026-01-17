"use client"

import { Suspense } from "react"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getGradientFromPalette } from "@/lib/gradient-palette"
import { apiService } from "@/lib/api-client"
import { getShopBannerSection, getShopCollectionSection, getRefineResultsSection } from "@/lib/services/cms-service"
import type { CmsSection } from "@/lib/types/cms"

type CheckedState = boolean | "indeterminate"

type Product = {
  id: number
  name: string
  slug: string
  description: string
  price: number
  category_name: string
  image_url: string | null
  second_image_url: string | null
  coupon?: {
    id: number
    name: string
    code: string
    discount_type: 'percentage' | 'fixed'
    discount_value: number
    discount_text: string
  } | null
}

type Category = {
  id: number
  name: string
  slug: string
}

const currency = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const PRODUCTS_PER_PAGE = 12

function ShopPageContent() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")
  
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [currentPage, setCurrentPage] = useState(1)
  const [bannerSection, setBannerSection] = useState<CmsSection | null>(null)
  const [collectionSection, setCollectionSection] = useState<CmsSection | null>(null)
  const [refineResultsSection, setRefineResultsSection] = useState<CmsSection | null>(null)

  // Fetch banner data from CMS
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const section = await getShopBannerSection('shop')
        setBannerSection(section)
      } catch (error) {
        console.error("Error loading shop banner data:", error)
      }
    }
    fetchBannerData()
  }, [])

  // Fetch collection section data from CMS
  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const section = await getShopCollectionSection('shop')
        setCollectionSection(section)
      } catch (error) {
        console.error("Error loading shop collection section data:", error)
      }
    }
    fetchCollectionData()
  }, [])

  // Fetch refine results section data from CMS
  useEffect(() => {
    const fetchRefineResultsData = async () => {
      try {
        const section = await getRefineResultsSection('shop')
        setRefineResultsSection(section)
      } catch (error) {
        console.error("Error loading refine results section data:", error)
      }
    }
    fetchRefineResultsData()
  }, [])

  // Fetch categories and products
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [categoriesRes, productsRes] = await Promise.all([
          apiService.getCategories(),
          apiService.getProducts(),
        ])
        
        const categoriesData = categoriesRes?.data || (Array.isArray(categoriesRes) ? categoriesRes : [])
        const productsData = productsRes?.data || (Array.isArray(productsRes) ? productsRes : [])
        
        setCategories(categoriesData)
        setProducts(productsData)
        
        // Set price range from products
        if (productsData.length > 0) {
          const prices = productsData.map((p: Product) => p.price)
          const min = Math.min(...prices)
          const max = Math.max(...prices)
          setMinPrice(min)
          setMaxPrice(max)
          setPriceRange([min, max])
        }
      } catch (error) {
        console.error("Error fetching shop data:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Pre-select category from URL
  useEffect(() => {
    if (categoryFromUrl && categories.length > 0) {
      const category = categories.find((cat) => cat.slug === categoryFromUrl)
      if (category && !selectedCategories.includes(category.name)) {
        setSelectedCategories([category.name])
      }
    }
  }, [categoryFromUrl, categories])

  const handleSelection = (
    checked: CheckedState,
    value: string,
    list: string[],
    setter: (next: string[]) => void,
  ) => {
    if (checked === true) {
      setter(list.includes(value) ? list : [...list, value])
    } else {
      setter(list.filter((item) => item !== value))
    }
  }

  // Get unique materials and colors from products (if needed in future)
  const materialFilters: string[] = []
  const colorFilters: string[] = []

  const filteredProducts = useMemo<Product[]>(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category_name)
      // Material and color filters can be added later if needed
      const matchesMaterial = selectedMaterials.length === 0 || true
      const matchesColor = selectedColors.length === 0 || true
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesCategory && matchesMaterial && matchesColor && matchesPrice
    })
  }, [products, selectedCategories, selectedMaterials, selectedColors, priceRange])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE))
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)
  const showingFrom = filteredProducts.length === 0 ? 0 : startIndex + 1
  const showingTo = Math.min(startIndex + visibleProducts.length, filteredProducts.length)

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories, selectedMaterials, selectedColors, priceRange])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedMaterials([])
    setSelectedColors([])
    if (products.length > 0) {
      const prices = products.map((p) => p.price)
      const min = Math.min(...prices)
      const max = Math.max(...prices)
      setMinPrice(min)
      setMaxPrice(max)
      setPriceRange([min, max])
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        {(() => {
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
          const defaultTitle = "Shop the Edit"
          const defaultHeading = "Shop"
          const defaultDescription = "Discover refined silhouettes, artisanal finishes, and everyday staples curated for the modern wardrobe."
          const defaultImage = "/woman-wearing-scarf-banner.jpg"
          const defaultButton1 = "Explore All Scarves"
          const defaultButton2 = "Browse Hijaabs"

          const title = bannerSection?.fields?.["Title"]?.value || defaultTitle
          const heading = bannerSection?.fields?.["Heading"]?.value || defaultHeading
          const descriptionHtml = bannerSection?.fields?.["Description"]?.value || defaultDescription
          const description = processDescription(descriptionHtml)
          const imageUrl = bannerSection?.fields?.["Image"]?.url || bannerSection?.fields?.["Image"]?.value || defaultImage
          const button1Text = bannerSection?.fields?.["Button 1"]?.value || defaultButton1
          const button2Text = bannerSection?.fields?.["Button 2"]?.value || defaultButton2

          return (
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
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
                    {title}
                  </p>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{heading}</h1>
                  <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-xl/relaxed">
                    {description}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/shop">{button1Text}</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-border/70 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    >
                      <Link href="/shop">{button2Text}</Link>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )
        })()}

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
            <aside className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-6 shadow-lg backdrop-blur-sm min-h-[680px] md:min-h-[720px] lg:min-h-[820px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_70%)] opacity-70" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  {(() => {
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

                    // Extract refine results section data from CMS
                    const defaultTitle = "Refine Results"
                    const defaultDescription = "Tailor the collection to match your style, fabric, and color preferences."

                    const title = refineResultsSection?.fields?.["Title"]?.value || defaultTitle
                    const descriptionHtml = refineResultsSection?.fields?.["Description"]?.value || defaultDescription
                    const description = processDescription(descriptionHtml)

                    return (
                      <div>
                        <h2 className="text-xl font-semibold text-primary">{title}</h2>
                        <p className="text-sm text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    )
                  })()}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-muted-foreground hover:text-primary"
                  >
                    Reset
                  </Button>
                </div>
                <ScrollArea className="mt-6 max-h-[84vh] pr-2 pb-10">
                  <Accordion
                    type="multiple"
                    defaultValue={["category", "price"]}
                    className="space-y-2"
                  >
                    <AccordionItem value="category">
                      <AccordionTrigger className="text-primary">Categories</AccordionTrigger>
                      <AccordionContent>
                        {loading ? (
                          <div className="py-4 text-center text-sm text-muted-foreground">Loading categories...</div>
                        ) : (
                          <div className="space-y-2">
                            {categories.map((category) => {
                              const id = `category-${category.slug}`
                              return (
                                <div key={category.id} className="flex items-center gap-3">
                                  <Checkbox
                                    id={id}
                                    checked={selectedCategories.includes(category.name)}
                                    onCheckedChange={(checked) =>
                                      handleSelection(checked, category.name, selectedCategories, setSelectedCategories)
                                    }
                                  />
                                  <Label htmlFor={id} className="text-sm text-muted-foreground cursor-pointer">
                                    {category.name}
                                  </Label>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="material">
                      <AccordionTrigger className="text-primary">Materials</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {materialFilters.map((material) => {
                            const id = `material-${material.toLowerCase()}`
                            return (
                              <div key={material} className="flex items-center gap-3">
                                <Checkbox
                                  id={id}
                                  checked={selectedMaterials.includes(material)}
                                  onCheckedChange={(checked) =>
                                    handleSelection(checked, material, selectedMaterials, setSelectedMaterials)
                                  }
                                />
                                <Label htmlFor={id} className="text-sm text-muted-foreground">
                                  {material}
                                </Label>
                              </div>
                            )
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="color">
                      <AccordionTrigger className="text-primary">Color Story</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {colorFilters.map((color) => {
                            const id = `color-${color.toLowerCase()}`
                            return (
                              <div key={color} className="flex items-center gap-3">
                                <Checkbox
                                  id={id}
                                  checked={selectedColors.includes(color)}
                                  onCheckedChange={(checked) =>
                                    handleSelection(checked, color, selectedColors, setSelectedColors)
                                  }
                                />
                                <Label htmlFor={id} className="text-sm text-muted-foreground">
                                  {color}
                                </Label>
                              </div>
                            )
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="price">
                      <AccordionTrigger className="text-primary">Price Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <Slider
                            value={priceRange}
                            min={minPrice}
                            max={maxPrice}
                            step={Math.max(1, Math.floor((maxPrice - minPrice) / 100))}
                            onValueChange={(values) => {
                              const newMin = values[0] ?? priceRange[0]
                              const newMax = values[1] ?? priceRange[1]
                              setPriceRange([newMin, newMax])
                            }}
                            className="w-full"
                          />
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{currency.format(priceRange[0])}</span>
                            <span>{currency.format(priceRange[1])}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </ScrollArea>
              </div>
            </aside>

            <div className="space-y-8">
              {(() => {
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

                // Extract collection section data from CMS
                const defaultTitle = "Shop Our Collection"
                const defaultDescription = "Explore curated edits that pair luxurious fabrics with modern silhouettes. Select filters to discover the scarves that speak to your signature style."

                const title = collectionSection?.fields?.["Title"]?.value || defaultTitle
                const descriptionHtml = collectionSection?.fields?.["Description"]?.value || defaultDescription
                const description = processDescription(descriptionHtml)

                return (
                  <ScrollReveal className="space-y-3 text-center lg:text-left" direction="up">
                    <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">
                      {title}
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg lg:mx-0">
                      {description}
                    </p>
                  </ScrollReveal>
                )
              })()}

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/40 bg-card/40 px-4 py-3 text-sm text-muted-foreground">
                <span>
                  Showing{" "}
                  <span className="font-semibold text-primary">
                    {filteredProducts.length === 0 ? 0 : `${showingFrom}-${showingTo}`}
                  </span>{" "}
                  of {filteredProducts.length} filtered pieces (from {products.length} total)
                </span>
                <span>
                  Price: {currency.format(priceRange[0])} - {currency.format(priceRange[1])}
                </span>
              </div>

              {loading ? (
                <div className="rounded-3xl border border-dashed border-border/60 bg-card/40 px-8 py-16 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-border/60 bg-card/40 px-8 py-16 text-center">
                  <h3 className="text-xl font-semibold text-primary">No products match your filters.</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your selection or resetting the filters to browse the full collection.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleProducts.map((product, index) => {
                      const listIndex = startIndex + index
                      const gradient = getGradientFromPalette(listIndex)
                      return (
                        <ScrollReveal key={product.id} delay={listIndex * 80} className="h-full">
                          <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/50 bg-background/90 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                            <Link
                              href={`/shop/${product.slug}`}
                              className="relative aspect-[4/5] w-full overflow-hidden block"
                            >
                              {product.image_url ? (
                                <>
                                  <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
                                  />
                                  {product.second_image_url && (
                                    <img
                                      src={product.second_image_url}
                                      alt={`${product.name} alternate view`}
                                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />
                                  )}
                                </>
                              ) : (
                                <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
                                  <span className="text-muted-foreground text-sm">No Image</span>
                                </div>
                              )}
                              <div
                                className={`pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t ${gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-100`}
                              />
                            </Link>
                            <div className="flex flex-1 flex-col gap-4 px-6 py-6 text-left">
                              <div>
                                <h3 className="text-xl font-semibold text-primary">
                                  <Link
                                    href={`/shop/${product.slug}`}
                                    className="transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
                                  >
                                    {product.name}
                                  </Link>
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {product.description ? product.description.replace(/<[^>]*>/g, "").trim() : ""}
                                </p>
                              </div>
                              <div className="mt-auto space-y-4">
                                <div className="flex items-baseline gap-3 flex-wrap">
                                  {product.coupon ? (() => {
                                    // Calculate discounted price
                                    const originalPrice = product.price
                                    let discountedPrice = originalPrice
                                    if (product.coupon.discount_type === 'percentage') {
                                      discountedPrice = originalPrice - (originalPrice * product.coupon.discount_value / 100)
                                    } else if (product.coupon.discount_type === 'fixed') {
                                      discountedPrice = Math.max(0, originalPrice - product.coupon.discount_value)
                                    }
                                    const discountPercent = product.coupon.discount_type === 'percentage' 
                                      ? product.coupon.discount_value 
                                      : Math.round((product.coupon.discount_value / originalPrice) * 100)
                                    return (
                                      <>
                                        <div className="flex flex-col gap-2 w-full">
                                          <div className="flex items-center gap-3 flex-wrap">
                                            <div className="flex items-baseline gap-2">
                                              <span className="text-3xl font-bold text-primary">
                                                {currency.format(discountedPrice)}
                                              </span>
                                              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">PKR</span>
                                            </div>
                                            <span className="px-2 py-1 text-xs font-bold uppercase tracking-wide bg-red-500 text-white rounded">
                                              {discountPercent}% OFF
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className="text-lg font-medium line-through text-muted-foreground/70">
                                              {currency.format(originalPrice)}
                                            </span>
                                            <span className="text-xs text-red-500 font-semibold">
                                              Save {currency.format(originalPrice - discountedPrice)}
                                            </span>
                                          </div>
                                        </div>
                                      </>
                                    )
                                  })() : (
                                    <>
                                      <span className="text-2xl font-semibold text-primary">
                                        {currency.format(product.price)}
                                      </span>
                                      <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">PKR</span>
                                    </>
                                  )}
                                </div>
                                <Button
                                  asChild
                                  size="lg"
                                  variant="outline"
                                  className="w-full border-primary/60 py-3 text-primary hover:bg-primary hover:text-primary-foreground"
                                >
                                  <Link href={`/shop/${product.slug}`}>
                                    View Details
                                  </Link>
                                </Button>
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
                    {Array.from({ length: totalPages }, (_, pageIndex) => {
                      const pageNumber = pageIndex + 1
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
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <ShopPageContent />
    </Suspense>
  )
}














