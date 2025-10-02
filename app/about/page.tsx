import Image from "next/image"

import { ScrollReveal } from "@/components/scroll-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const highlights = [
  {
    title: "Our Story",
    image: "/scarf-making-process.jpg",
    summary: "Hand-loomed beginnings, modern silhouettes.",
    description: [
      "Scarf began at a single artisan table where we explored how color, texture, and heritage patterns could meet contemporary wardrobes.",
      "Today, we collaborate with designers and craftspeople across the globe, blending tradition with innovation so every scarf feels personal and purposeful.",
    ],
  },
  {
    title: "Our Mission",
    image: "/woman-with-elegant-scarf-looking-thoughtfully.jpg",
    summary: "Fashion that uplifts, sourced with care.",
    description: [
      "We empower women to express themselves with pieces that feel luxurious, last for years, and honor the people who craft them.",
      "That means mindful sourcing, small-batch production, and transparent partnerships that keep creativity and ethics equally in focus.",
    ],
  },
  {
    title: "Our Vision",
    image: "/diverse-group-of-women-wearing-scarves-smiling.jpg",
    summary: "Building a global community of scarf lovers.",
    description: [
      "We imagine a future where every wrap tells a story and celebrates the cultures that inspire it.",
      "From digital styling sessions to limited-edition artist collaborations, we are creating spaces where confidence and craft meet.",
    ],
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-24 lg:py-28">
        <div className="container px-4 md:px-6">
          <ScrollReveal className="mx-auto max-w-3xl space-y-4 text-center" direction="up">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">Wrapped in meaning</p>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Us</h1>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Every scarf we design starts with a story: of the women who will wear it, the artisans who will craft it, and
                the moments it will elevate. We blend timeless craft with modern design so your daily rituals feel a little
                more considered, a little more you.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {highlights.map((highlight, index) => (
              <ScrollReveal key={highlight.title} delay={index * 120} className="h-full" direction="up">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={highlight.image}
                      alt={highlight.title}
                      fill
                      sizes="(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index === 0}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col space-y-4 p-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold tracking-tight text-primary">{highlight.title}</h2>
                      <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground/70">{highlight.summary}</p>
                    </div>
                    <div className="space-y-3 text-left">
                      {highlight.description.map((paragraph) => (
                        <p key={paragraph} className="text-sm text-muted-foreground md:text-base/relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
