"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"
import { getGradientFromPalette } from "@/lib/gradient-palette"
import type { CmsSection } from "@/lib/types/cms"
import { apiService } from "@/lib/api-client"

interface FeaturedProductsProps {
  sectionData?: CmsSection | null
}

interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  image_url: string | null
  second_image_url: string | null
}

export function FeaturedProducts({ sectionData }: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch featured products
  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        setLoading(true)
        const response = await apiService.getFeaturedProducts(6)
        // Laravel ResourceCollection returns { data: [...] }
        const productsData = response?.data || (Array.isArray(response) ? response : [])
        setProducts(productsData)
      } catch (error) {
        console.error("Error fetching featured products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  // Extract title and description from CMS data
  const defaultTitle = "Featured Products"
  const defaultDescription = "Explore our curated selection of best-selling scarves and seasonal picks. Each piece is hand-selected for quality, comfort, and timeless style—perfect for everyday wear and special occasions."

  const title = sectionData?.fields?.["Title"]?.value || defaultTitle
  const descriptionHtml = sectionData?.fields?.["Description"]?.value || defaultDescription
  const description = descriptionHtml.replace(/<[^>]*>/g, "").trim()

  // Show loading state if no section data
  if (!sectionData) {
    return (
      <section className="w-full mt-6 md:mt-8 lg:mt-10">
        <div className="w-full px-4 py-4 md:py-6 bg-background flex flex-col items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full mt-6 md:mt-8 lg:mt-10">
      {/* Heading centered in a container (match Shop by Category spacing) */}
      <ScrollReveal className="w-full px-4 py-4 md:py-6 bg-background flex flex-col items-center" direction="up">
        {title && (
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tighter text-primary md:text-4xl text-balance">
            {title}
          </h2>
        )}
        {description && (
          <p className="mx-auto mb-4 max-w-2xl text-center text-muted-foreground md:text-xl/relaxed">
            {description}
          </p>
        )}
      </ScrollReveal>

      {/* Full-bleed grid (no container) - 3 columns per row so we get 2 rows of 3 images */}
      {loading ? (
        <div className="w-full px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="w-full px-4 py-8 flex items-center justify-center">
          <p className="text-muted-foreground">No featured products available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 max-w-full">
          {products.map((product, idx) => {
            const gradient = getGradientFromPalette(idx)
            return (
              <ScrollReveal key={product.id} className="block" delay={idx * 80}>
                <Link
                  href={`/shop/${product.slug}`}
                  className="relative w-full h-[640px] md:h-[760px] lg:h-[880px] overflow-hidden group cursor-pointer block"
                >
                  {/* Featured Image (default) */}
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">No Image</span>
                    </div>
                  )}
                  
                  {/* Second Image (on hover) */}
                  {product.second_image_url && (
                    <img
                      src={product.second_image_url}
                      alt={`${product.name} alternate view`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                      onError={(e) => {
                        // Hide if second image fails to load
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t ${gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  
                  {/* Product Name */}
                  <div className="absolute bottom-6 left-6 text-white z-10">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight drop-shadow-lg">
                      {product.name}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      )}
    </section>
  )
}












