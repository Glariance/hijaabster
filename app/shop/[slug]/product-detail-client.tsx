"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { getGradientFromPalette } from "@/lib/gradient-palette"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Truck, Shield, RefreshCw, Package, Share2 } from "lucide-react"
import type { BannerItemData } from "@/lib/types/cms"

const currency = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

type ApiProduct = {
  id: number
  name: string
  slug: string
  description: string
  price: number
  category_name: string | null
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

interface ProductDetailClientProps {
  product: ApiProduct
  relatedProducts: ApiProduct[]
  testimonialsData?: BannerItemData[]
}

export function ProductDetailClient({ product, relatedProducts, testimonialsData = [] }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (product && product.image_url) {
      setSelectedImage(product.image_url)
    }
  }, [product])

  // Calculate discount from coupon if available
  const originalPrice = product.price
  let discountedPrice = originalPrice
  let discountPercentage = 0
  
  if (product.coupon) {
    if (product.coupon.discount_type === 'percentage') {
      discountPercentage = product.coupon.discount_value
      discountedPrice = originalPrice - (originalPrice * discountPercentage / 100)
    } else if (product.coupon.discount_type === 'fixed') {
      discountedPrice = Math.max(0, originalPrice - product.coupon.discount_value)
      discountPercentage = Math.round((product.coupon.discount_value / originalPrice) * 100)
    }
  }

  // Process description: strip HTML tags and decode entities
  const processDescription = (html: string): string => {
    if (!html) return ""
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

  const description = processDescription(product.description)
  const productImages = [product.image_url, product.second_image_url].filter(Boolean) as string[]

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log("Add to cart:", product.id, quantity)
  }

  // Transform testimonials data
  const testimonials = testimonialsData.map((item) => {
    const name = item["Name"]?.value || ""
    const designation = item["Designation"]?.value || ""
    const descriptionHtml = item["Description"]?.value || ""
    const description = descriptionHtml
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&mdash;/g, "—")
      .trim()
    const avatar = item["Image"]?.url || item["Image"]?.value || "/placeholder.svg"
    
    return {
      name,
      title: designation,
      quote: description,
      avatar,
    }
  })

  // Limit testimonials to 3 for display
  const displayedTestimonials = testimonials.slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-border/40 bg-card/40">
          <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-primary transition-colors">
                Shop
              </Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Details Section */}
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-10 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border/50 bg-card/40 shadow-lg">
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                </div>
              </ScrollReveal>

              {/* Thumbnail Gallery */}
              {productImages.length > 1 && (
                <ScrollReveal direction="up" delay={100}>
                  <div className="grid grid-cols-4 gap-4">
                    {productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                          selectedImage === image
                            ? "border-primary shadow-lg scale-105"
                            : "border-border/40 hover:border-primary/60"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col space-y-6">
              <ScrollReveal direction="up">
                <div className="space-y-4">
                  {product.category_name && (
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {product.category_name}
                      </Badge>
                    </div>
                  )}
                  <h1 className="text-4xl font-bold tracking-tighter text-primary md:text-5xl">
                    {product.name}
                  </h1>
                  <p className="text-lg text-muted-foreground md:text-xl">
                    {description}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <div className="space-y-4">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    {product.coupon ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-primary">
                            {currency.format(discountedPrice)}
                          </span>
                          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                            PKR
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-semibold text-muted-foreground line-through">
                            {currency.format(originalPrice)}
                          </span>
                          <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
                            {discountPercentage}% OFF
                          </Badge>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary">
                          {currency.format(originalPrice)}
                        </span>
                        <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                          PKR
                        </span>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <p className="text-base leading-relaxed text-foreground">
                    {description}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label htmlFor="quantity" className="text-sm font-medium text-foreground">
                      Quantity:
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        −
                      </Button>
                      <span className="w-12 text-center font-semibold">{quantity}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="lg"
                    onClick={handleAddToCart}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold"
                  >
                    Add to Cart
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Free shipping on orders over PKR 5,000 | Standard delivery: 3-5 business days
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <div className="space-y-4">
                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-4 rounded-xl border border-border/50 bg-card/40 p-4">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Truck className="h-6 w-6 text-primary" />
                      <span className="text-xs font-medium text-foreground">Free Shipping</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Shield className="h-6 w-6 text-primary" />
                      <span className="text-xs font-medium text-foreground">Secure Payment</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center">
                      <RefreshCw className="h-6 w-6 text-primary" />
                      <span className="text-xs font-medium text-foreground">Easy Returns</span>
                    </div>
                  </div>

                  {/* Social Sharing */}
                  <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/40 p-4">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Share:</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            window.open(
                              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                              "_blank"
                            )
                          }
                        }}
                      >
                        <span className="text-xs font-bold">f</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            window.open(
                              `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product.name)}`,
                              "_blank"
                            )
                          }
                        }}
                      >
                        <span className="text-xs font-bold">𝕏</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            navigator.clipboard.writeText(window.location.href)
                            alert("Link copied to clipboard!")
                          }
                        }}
                      >
                        <span className="text-xs">🔗</span>
                      </Button>
                    </div>
                  </div>

                  {/* Accordion */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="shipping">
                      <AccordionTrigger className="text-primary">Shipping & Returns</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 text-muted-foreground">
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Shipping Information</h4>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <Package className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Free shipping on orders over PKR 5,000</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Package className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Standard delivery: 3-5 business days</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Package className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Express delivery available (1-2 business days)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Package className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>We ship to all major cities in Pakistan</span>
                              </li>
                            </ul>
                          </div>
                          <Separator />
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Returns & Exchanges</h4>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <RefreshCw className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>30-day return policy for unused items</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <RefreshCw className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Items must be in original packaging with tags attached</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <RefreshCw className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Free return shipping for defective items</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <RefreshCw className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Refunds processed within 5-7 business days</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        {displayedTestimonials.length > 0 && (
          <section className="border-t border-border/40 bg-card/20 py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
              <ScrollReveal className="mb-12 text-center" direction="up">
                <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">
                  Customer Reviews
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
                  See what our customers are saying about this product.
                </p>
              </ScrollReveal>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedTestimonials.map((review, index) => (
                  <ScrollReveal key={index} delay={index * 100} direction="up">
                    <Card className="h-full border-border/50 bg-background/90 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/30">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                            <AvatarFallback>
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-foreground">{review.name}</h4>
                              {review.title && (
                                <span className="text-xs text-muted-foreground">{review.title}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{review.quote}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-border/40 bg-gradient-to-b from-background via-card/20 to-background py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
              <ScrollReveal className="mb-12 text-center" direction="up">
                <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">
                  You May Also Like
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
                  Discover more pieces from our collection that complement this style.
                </p>
              </ScrollReveal>

              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {relatedProducts.map((relatedProduct, index) => {
                      const gradient = getGradientFromPalette(index)
                      const relatedOriginalPrice = relatedProduct.price
                      let relatedDiscountedPrice = relatedOriginalPrice
                      
                      if (relatedProduct.coupon) {
                        if (relatedProduct.coupon.discount_type === 'percentage') {
                          relatedDiscountedPrice = relatedOriginalPrice - (relatedOriginalPrice * relatedProduct.coupon.discount_value / 100)
                        } else if (relatedProduct.coupon.discount_type === 'fixed') {
                          relatedDiscountedPrice = Math.max(0, relatedOriginalPrice - relatedProduct.coupon.discount_value)
                        }
                      }
                      
                      const relatedDescription = processDescription(relatedProduct.description || "")
                      const relatedProductImages = [relatedProduct.image_url, relatedProduct.second_image_url].filter(Boolean) as string[]
                      
                      return (
                        <CarouselItem key={relatedProduct.id} className="md:basis-1/2 lg:basis-1/4">
                          <Link
                            href={`/shop/${relatedProduct.slug}`}
                            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/50 bg-background/90 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                          >
                            <div className="relative aspect-[4/5] w-full overflow-hidden">
                              {relatedProductImages[0] && (
                                <img
                                  src={relatedProductImages[0]}
                                  alt={relatedProduct.name}
                                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
                                />
                              )}
                              {relatedProductImages[1] && (
                                <img
                                  src={relatedProductImages[1]}
                                  alt={`${relatedProduct.name} alternate view`}
                                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                />
                              )}
                              <div
                                className={`pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t ${gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-100`}
                              />
                            </div>
                            <div className="flex flex-1 flex-col gap-4 px-6 py-6 text-left">
                              <div>
                                <h3 className="text-xl font-semibold text-primary transition-colors group-hover:text-primary/80">
                                  {relatedProduct.name}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {relatedDescription}
                                </p>
                              </div>
                              <div className="mt-auto space-y-2">
                                <div className="flex items-baseline gap-2 flex-wrap">
                                  {relatedProduct.coupon ? (
                                    <>
                                      <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-semibold text-primary">
                                          {currency.format(relatedDiscountedPrice)}
                                        </span>
                                        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                          PKR
                                        </span>
                                      </div>
                                      <span className="text-lg font-medium text-muted-foreground line-through">
                                        {currency.format(relatedOriginalPrice)}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-2xl font-semibold text-primary">
                                        {currency.format(relatedOriginalPrice)}
                                      </span>
                                      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                        PKR
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
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
        )}
      </main>
    </div>
  )
}
