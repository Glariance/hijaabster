"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ScrollReveal } from "./scroll-reveal"

export function PromotionsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-28">
      <div className="absolute inset-0 z-0">
        <Image
          src="/promotional-banner-for-scarves.jpg"
          alt="Promotional Banner"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="h-full w-full opacity-40"
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4">
        <ScrollReveal
          className="w-full rounded-3xl bg-black/70 p-8 text-center shadow-2xl backdrop-blur-md md:p-12"
          direction="up"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
            Seasonal Promotion
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl">Limited Time Offer!</h2>
          <p className="mt-4 text-lg text-white md:text-2xl lg:text-3xl">
            Get <span className="glow-bounce">20%</span> off all new arrivals. Discover luxurious textures crafted for
            effortless elegance.
          </p>
          <Button asChild size="lg" className="mt-6 bg-primary px-10 py-6 text-lg hover:bg-primary/90">
            <Link href="#">Shop Promotions</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
