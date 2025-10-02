"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"

export function FeaturedProducts() {
  const slides = [
    {
      id: "abayas",
      href: "/categories/abayas",
      image: "/woman-wearing-scarf-banner.jpg",
      hoverImage: "/woman-with-scarf.jpg",
      label: "SHOP ABAYAS",
      pos: "center 20%",
    },
    {
      id: "hijabs",
      href: "/categories/hijabs",
      image: "/diverse-group-of-women-wearing-scarves-smiling.jpg",
      hoverImage: "/diverse-woman-smiling.png",
      label: "SHOP HIJABS",
      pos: "center 40%",
    },
    {
      id: "dresses",
      href: "/categories/dresses",
      image: "/woman-wearing-scarf.jpg",
      hoverImage: "/woman-with-scarf.jpg",
      label: "SHOP DRESSES",
      pos: "center 35%",
    },
    {
      id: "elegant",
      href: "/categories/elegant",
      image: "/woman-with-elegant-scarf-looking-thoughtfully.jpg",
      label: "SHOP ELEGANT",
      pos: "center 30%",
    },
    {
      id: "silk",
      href: "/categories/silk",
      image: "/muslim-woman-wearing-a-silk-scarf-full-face-visible-not-cut-off-covering-head-elegant-modest.jpg",
      hoverImage: "/muslim-woman-wearing-a-silk-scarf--elegant--modest.jpg",
      label: "SHOP SILK",
      pos: "center 20%",
    },
    {
      id: "handcrafted",
      href: "/categories/handcrafted",
      image: "/muslim-woman-wearing-a-handcrafted-scarf-full-face-visible-not-cut-off-covering-head-unique-artisan.jpg",
      hoverImage: "/muslim-woman-wearing-a-handcrafted-scarf--unique--.jpg",
      label: "SHOP HANDCRAFTED",
      pos: "center 30%",
    },
  ]

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageVisible, setImageVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const animTimeout = React.useRef<number | null>(null)
  const animEndTimeout = React.useRef<number | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!lightboxOpen) return
      if (isAnimating) return
      if (e.key === "Escape") setLightboxOpen(false)
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % slides.length)
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + slides.length) % slides.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxOpen, slides.length, isAnimating])

  useEffect(() => {
    return () => {
      if (animTimeout.current) window.clearTimeout(animTimeout.current)
      if (animEndTimeout.current) window.clearTimeout(animEndTimeout.current)
    }
  }, [])

  function openLightbox(idx: number) {
    setCurrentIndex(idx)
    setLightboxOpen(true)
  }

  function closeLightbox() {
    setLightboxOpen(false)
    setIsAnimating(false)
    setImageVisible(true)
    if (animTimeout.current) {
      window.clearTimeout(animTimeout.current)
      animTimeout.current = null
    }
    if (animEndTimeout.current) {
      window.clearTimeout(animEndTimeout.current)
      animEndTimeout.current = null
    }
  }

  const TRANS_MS = 300

  function animateToIndex(newIndex: number) {
    if (isAnimating) return
    setIsAnimating(true)
    // start fade out
    setImageVisible(false)
    // after fade-out, change image and fade in
    animTimeout.current = window.setTimeout(() => {
      setCurrentIndex(newIndex)
      setImageVisible(true)
      // after fade-in completes, end animating
      animEndTimeout.current = window.setTimeout(() => {
        setIsAnimating(false)
      }, TRANS_MS)
    }, TRANS_MS)
  }

  function next() {
    animateToIndex((currentIndex + 1) % slides.length)
  }

  function prev() {
    animateToIndex((currentIndex - 1 + slides.length) % slides.length)
  }

  return (
    <section className="w-full mt-6 md:mt-8 lg:mt-10">
      {/* Heading centered in a container (match Shop by Category spacing) */}
      <ScrollReveal className="w-full px-4 py-4 md:py-6 bg-background flex flex-col items-center" direction="up">
        <h2 className="mb-2 text-center text-3xl font-bold tracking-tighter text-primary md:text-4xl text-balance">
          Featured Products
        </h2>
                <p className="mx-auto mb-4 max-w-2xl text-center text-muted-foreground md:text-xl/relaxed">
          Explore our curated selection of best-selling scarves and seasonal picks. Each piece is hand-selected for
          quality, comfort, and timeless style{"\u2014"}perfect for everyday wear and special occasions.
        </p>
      </ScrollReveal>

      {/* Full-bleed grid (no container) - 3 columns per row so we get 2 rows of 3 images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 max-w-full">
        {slides.map((s, idx) => (
          <ScrollReveal key={s.id} className="block" delay={idx * 80}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => openLightbox(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter") openLightbox(idx)
              }}
              className="relative w-full h-[640px] md:h-[760px] lg:h-[880px] overflow-hidden group cursor-pointer"
            >
              {/* Primary image (default) */}
              <Image
                src={s.image}
                alt={s.label}
                fill
                style={{ objectFit: "cover", objectPosition: s.pos }}
                className="transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
              />
              {/* Alternate image (on hover) */}
              <Image
                src={s.hoverImage || s.image}
                alt={s.label}
                fill
                style={{ objectFit: "cover", objectPosition: s.pos }}
                className="transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <Link
                  href={s.href}
                  onClick={(e) => e.stopPropagation()}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight drop-shadow-lg"
                >
                  {s.label}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 pt-0 md:pt-2 pb-20 md:pb-24" onClick={closeLightbox}>
          <div
            className="relative max-w-[95vw] max-h-[95vh] w-full mx-4 transform -translate-y-8 md:-translate-y-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              onClick={closeLightbox}
              className="absolute top-12 md:top-16 right-3 z-50 bg-white/90 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-2xl shadow-sm hover:bg-white"
            >
              ×
            </button>

            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation()
                if (!isAnimating) prev()
              }}
              className={
                "absolute left-3 top-1/2 -translate-y-1/2 z-50 bg-white/80 rounded-full p-2 " +
                (isAnimating ? "pointer-events-none opacity-50" : "")
              }
            >
              ‹
            </button>

            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation()
                if (!isAnimating) next()
              }}
              className={
                "absolute right-3 top-1/2 -translate-y-1/2 z-50 bg-white/80 rounded-full p-2 " +
                (isAnimating ? "pointer-events-none opacity-50" : "")
              }
            >
              ›
            </button>

            <div className="w-full h-full flex items-center justify-center">
              <div
                className="relative w-full transition-opacity duration-300"
                style={{ aspectRatio: "4/3", opacity: imageVisible ? 1 : 0 }}
              >
                <Image
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].label}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white">
                <Link
                  href={slides[currentIndex].href}
                  className="inline-block bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-sm"
                  onClick={(e) => {
                    // let link navigate; close lightbox after a short delay
                    // don't stopPropagation here
                  }}
                >
                  {slides[currentIndex].label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}












