"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { useState, useEffect } from "react"

export function HeroSlider() {
  const slides = [
    {
      id: 1,
      image: "/woman-wearing-scarf-banner.jpg",
      position: "center 30%",
      title: "New Collection: Silk Dreams",
      description: "Discover our luxurious silk scarves, perfect for any occasion.",
      link: "#",
    },
    {
      id: 2,
      image: "/diverse-group-of-women-wearing-scarves-smiling.jpg",
      position: "center",
      title: "Pastel Perfection",
      description: "Embrace soft hues and elegant designs with our pastel scarf range.",
      link: "#",
    },
    {
      id: 3,
      image: "/woman-with-elegant-scarf-looking-thoughtfully.jpg",
      position: "center 40%",
      title: "Winter Warmth",
      description: "Stay cozy and stylish with our new collection of warm scarves.",
      link: "#",
    },
    {
      id: 4,
      image: "/muslim-woman-wearing-a-silk-scarf-full-face-visible-not-cut-off-covering-head-elegant-modest.jpg",
      position: "center 20%",
      title: "Discover Your Perfect Scarf",
      description: "Explore our exquisite collection and find your unique style.",
      link: "#",
    },
    {
      id: 5,
      image: "/muslim-woman-wearing-a-pastel-scarf-full-face-visible-not-cut-off-covering-head-serene-modern.jpg",
      position: "center 20%",
      title: "Elegant Styles for Every Season",
      description: "Explore our diverse range of scarves, perfect for any look.",
      link: "#",
    },
    {
      id: 6,
      image: "/muslim-woman-wearing-a-handcrafted-scarf-full-face-visible-not-cut-off-covering-head-unique-artisan.jpg",
      position: "center 30%",
      title: "Handcrafted with Love",
      description: "Experience the unique touch of our artisan-made scarf collection.",
      link: "#",
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
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
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            style={{ objectFit: "cover", objectPosition: slide.position || "center" }}
            className="z-0 kenburns"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/28 z-10 flex items-center justify-start pl-4 md:pl-8">
            <div className="text-left text-white p-4 max-w-md lg:max-w-lg">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 text-balance">{slide.title}</h2>
              <p className="text-base md:text-lg lg:text-xl mb-4 text-pretty">{slide.description}</p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={slide.link}>Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
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
    </section>
  )
}
