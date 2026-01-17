"use client"

import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"
import type { CmsSection } from "@/lib/types/cms"

interface MissionSectionProps {
  sectionData?: CmsSection | null
}

export function MissionSection({ sectionData }: MissionSectionProps) {
  // Extract data from CMS
  const defaultTitle = "Our Mission"
  const defaultDescription = "Our mission is to empower women to express their unique style and confidence through our exquisite collection of scarves. We are dedicated to providing high-quality, ethically sourced, and beautifully designed scarves that inspire elegance and individuality.\n\nWe strive to create a positive impact by supporting sustainable practices and fostering a community where fashion meets purpose."
  const defaultImage = "/woman-with-elegant-scarf-looking-thoughtfully.jpg"

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
          <ScrollReveal direction="left" className="order-2 space-y-4 lg:order-2 lg:pl-4">
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
          <ScrollReveal direction="right" className="order-1 lg:order-1" delay={120}>
            <div className="group mx-auto aspect-video overflow-hidden rounded-xl">
              <img
                src={imageUrl}
                alt={title || "Our Mission"}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
