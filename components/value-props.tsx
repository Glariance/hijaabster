"use client"

import { ShieldCheck, Sparkles, Truck, PhoneCall, Package, CheckCircle2, Sparkles as SparklesIcon, Headphones } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import type { CmsSection } from "@/lib/types/cms"

interface ValuePropsProps {
  sectionData?: CmsSection | null
}

// Icon mapping based on title keywords
const getIconForTitle = (title: string) => {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes('shipping') || lowerTitle.includes('delivery')) return Truck
  if (lowerTitle.includes('craftsmanship') || lowerTitle.includes('premium') || lowerTitle.includes('quality')) return Sparkles
  if (lowerTitle.includes('concierge') || lowerTitle.includes('styling') || lowerTitle.includes('support')) return PhoneCall
  if (lowerTitle.includes('secure') || lowerTitle.includes('hassle') || lowerTitle.includes('return') || lowerTitle.includes('free')) return ShieldCheck
  if (lowerTitle.includes('package') || lowerTitle.includes('order')) return Package
  if (lowerTitle.includes('check') || lowerTitle.includes('verified')) return CheckCircle2
  if (lowerTitle.includes('sparkle') || lowerTitle.includes('luxury')) return SparklesIcon
  if (lowerTitle.includes('call') || lowerTitle.includes('contact')) return Headphones
  return Sparkles // Default icon
}

export function ValueProps({ sectionData }: ValuePropsProps) {
  // Fallback data if no CMS data
  const defaultData = {
    "Title": { value: "Why Shop With Us" },
    "Heading": { value: "An elevated hijab experience tailored for modern women." },
    "Description": { value: "<p>We obsess over the details so you can focus on feeling confident, polished, and ready for every moment.</p>" },
    "Box1 - Title": { value: "Free Worldwide Shipping" },
    "Box1 - Description": { value: "<p>Complimentary delivery on every order with express options at checkout.</p>" },
    "Box2 - Title": { value: "Premium Craftsmanship" },
    "Box2 - Description": { value: "<p>Ethically sourced fabrics finished by skilled artisans for a luxe drape.</p>" },
    "Box3 - Title": { value: "Style Concierge" },
    "Box3 - Description": { value: "<p>Personalised styling support to help you pair colours, fabrics, and looks.</p>" },
    "Box4 - Title": { value: "Secure & Hassle-Free" },
    "Box4 - Description": { value: "<p>30-day returns and protected checkout keep every purchase worry free.</p>" },
  }

  const fields = sectionData?.fields || defaultData

  // Extract data
  const title = fields["Title"]?.value || "Why Shop With Us"
  const heading = fields["Heading"]?.value || "An elevated hijab experience tailored for modern women."
  const description = fields["Description"]?.value || "<p>We obsess over the details so you can focus on feeling confident, polished, and ready for every moment.</p>"
  
  // Strip HTML from description
  const plainDescription = description.replace(/<[^>]*>/g, "").trim()

  // Build highlights array from Box1-4
  const highlights = [1, 2, 3, 4].map((num) => {
    const boxTitle = fields[`Box${num} - Title`]?.value || ""
    const boxDesc = fields[`Box${num} - Description`]?.value || ""
    const plainBoxDesc = boxDesc.replace(/<[^>]*>/g, "").trim()
    
    return {
      title: boxTitle,
      description: plainBoxDesc,
      icon: getIconForTitle(boxTitle),
    }
  }).filter(item => item.title && item.description) // Only include boxes with data

  // Show loading state if no data and no defaults
  if (!sectionData && highlights.length === 0) {
    return (
      <section className="w-full bg-white py-10 md:py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 px-4 md:px-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-white py-10 md:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <ScrollReveal className="md:max-w-sm" direction="left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">{title}</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            {plainDescription}
          </p>
        </ScrollReveal>
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <ScrollReveal
                key={item.title || index}
                delay={index * 80}
                className="group flex flex-col rounded-2xl border border-border/60 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">{item.description}</p>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

