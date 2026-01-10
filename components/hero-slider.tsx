"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { useState, useEffect, useMemo } from "react"
import type { BannerItemData } from "@/lib/types/cms"

interface HeroSliderProps {
  bannerItems?: BannerItemData[]
}

export function HeroSlider({ bannerItems = [] }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Transform CMS data into slider format
  const slides = useMemo(() => {
    if (!bannerItems || bannerItems.length === 0) {
      // Return empty array to show loading state
      return []
    }

    return bannerItems.map((item, index) => {
      // Strip HTML tags from description if it's HTML
      const description = item["Description"]?.value || ""
      const plainDescription = description.replace(/<[^>]*>/g, "").trim()

      // Get image URL - prefer full URL, fallback to value
      const imageUrl = item["Banner Image"]?.url || item["Banner Image"]?.value || "/placeholder.svg"
      
      // Get button link - prefer Button Link field, fallback to shop page
      const buttonLink = item["Button Link"]?.value || "/shop"
      
      return {
        id: index + 1,
        image: imageUrl,
        position: "center 30%", // Default position, can be made dynamic if needed
        title: item["Title"]?.value || "",
        description: plainDescription,
        link: buttonLink,
        buttonText: item["Button Text"]?.value || "Shop Now",
      }
    })
  }, [bannerItems])

  useEffect(() => {
    if (slides.length === 0) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
  }

  // Show loading state if no banner items
  if (!bannerItems || bannerItems.length === 0) {
    return (
      <section
        className="relative w-full overflow-hidden bg-white flex items-center justify-center"
        style={{ height: 'clamp(520px, 80vh, 1000px)' }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      style={{ height: 'clamp(520px, 80vh, 1000px)' }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Banner image */}
          <img
            src={slide.image || "/placeholder.svg"}
            alt={slide.title || "Banner image"}
            style={{
              objectFit: "cover",
              objectPosition: slide.position || "center",
              width: "100%",
              height: "100%",
            }}
            className="z-0 kenburns absolute inset-0"
            loading={index === 0 ? "eager" : "lazy"}
          />

          {/* Content overlay */}
          <div className="absolute inset-0 bg-black/28 z-10 flex items-center justify-start pl-4 md:pl-8">
            <div className="text-left text-white p-4 max-w-md lg:max-w-lg">
              {slide.title && (
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 text-balance">{slide.title}</h2>
              )}
              {slide.description && (
                <p className="text-base md:text-lg lg:text-xl mb-4 text-pretty">{slide.description}</p>
              )}
              {(slide.buttonText || slide.link !== "#") && (
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href={slide.link || "#"}>{slide.buttonText || "Shop Now"}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-6" : "bg-white/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
