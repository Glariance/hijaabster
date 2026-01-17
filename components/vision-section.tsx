"use client"

import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"
import type { CmsSection } from "@/lib/types/cms"

interface VisionSectionProps {
  sectionData?: CmsSection | null
}

export function VisionSection({ sectionData }: VisionSectionProps) {
  // Extract data from CMS
  const defaultTitle = "Our Vision"
  const defaultDescription = "We envision a world where every woman feels empowered and beautiful, with a scarf that reflects her personality and enhances her natural grace. We strive to be the leading destination for premium girls' scarves, known for our exceptional designs, quality, and customer experience.\n\nOur vision extends to building a global community that celebrates diversity, creativity, and the art of scarf styling."
  const defaultImage = "/diverse-group-of-women-wearing-scarves-smiling.jpg"

  const title = sectionData?.fields?.["Title"]?.value || defaultTitle
  const descriptionHtml = sectionData?.fields?.["Description"]?.value || defaultDescription
  const imageUrl = sectionData?.fields?.["Image"]?.url || sectionData?.fields?.["Image"]?.value || defaultImage

  // Process description: decode HTML entities and split into paragraphs
  const processDescription = (html: string): string[] => {
    return html
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
      .replace(/&amp;/g, "&") // Replace &amp; with &
      .replace(/&lt;/g, "<") // Replace &lt; with <
      .replace(/&gt;/g, ">") // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'") // Replace &#39; with '
      .trim()
      .split(/\n\s*\n/) // Split by double newlines (paragraphs)
      .filter(p => p.trim().length > 0) // Remove empty paragraphs
  }

  const descriptionParagraphs = processDescription(descriptionHtml)

  return (
    <section className="w-full bg-white py-10 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal direction="left" className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">{title}</h2>
              {descriptionParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120}>
            <div className="group mx-auto aspect-video overflow-hidden rounded-xl">
              <img
                src={imageUrl}
                alt={title || "Our Vision"}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
