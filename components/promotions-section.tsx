"use client"

import Link from "next/link"

import { ScrollReveal } from "./scroll-reveal"
import { Button } from "./ui/button"
import type { CmsSection } from "@/lib/types/cms"

interface PromotionsSectionProps {
  sectionData?: CmsSection | null
}

export function PromotionsSection({ sectionData }: PromotionsSectionProps) {
  // Extract data from CMS
  const defaultTitle = "Seasonal Promotion"
  const defaultHeading = "Limited Time Offer!"
  const defaultDescription = "Get 20% off all new arrivals. Discover luxurious textures crafted for effortless elegance."
  const defaultImage = "/promotional-banner-for-scarves.jpg"

  const title = sectionData?.fields?.["Title"]?.value || defaultTitle
  const heading = sectionData?.fields?.["Heading"]?.value || defaultHeading
  const descriptionHtml = sectionData?.fields?.["Description"]?.value || defaultDescription
  // Strip HTML tags and decode HTML entities
  const description = descriptionHtml
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
    .replace(/&amp;/g, "&") // Replace &amp; with &
    .replace(/&lt;/g, "<") // Replace &lt; with <
    .replace(/&gt;/g, ">") // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .trim()
  const imageUrl = sectionData?.fields?.["Image"]?.url || sectionData?.fields?.["Image"]?.value || defaultImage

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        role="presentation"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black/35 via-black/40 to-black/35" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4">
        <ScrollReveal
          className="w-full rounded-3xl bg-black/70 p-8 text-center shadow-2xl backdrop-blur-md md:p-12"
          direction="up"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
            {title}
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl">{heading}</h2>
          <p className="mt-4 text-lg text-white md:text-2xl lg:text-3xl">
            {description.split(/(\d+%)/).map((part, index) => 
              part.match(/\d+%/) ? (
                <span key={index} className="glow-bounce">{part}</span>
              ) : (
                <span key={index}>{part}</span>
              )
            )}
          </p>
          <Button asChild size="lg" className="mt-6 bg-primary px-10 py-6 text-lg hover:bg-primary/90">
            <Link href="/shop">Shop Promotions</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
