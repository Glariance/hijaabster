import Image from "next/image"
import Link from "next/link"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { getGradientFromPalette } from "@/lib/gradient-palette"

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

const craftsmanshipSteps = [
  {
    phase: "Concept Studio",
    highlight: "Colorwork & storyboarding sessions",
    description:
      "We begin every collection sketching palettes pulled from travel journals, archival textiles, and community mood boards. Each motif is reviewed alongside wear-testing feedback to ensure modern versatility.",
  },
  {
    phase: "Artisan Collaboration",
    highlight: "48 partner ateliers across Morocco, Turkey, and India",
    description:
      "Our artisan partners translate concepts into woven samples. We iterate on drape, hand-feel, and finishing details until the piece represents both the maker's signature and our brand standards.",
  },
  {
    phase: "Responsible Production",
    highlight: "Small batches, traceable materials",
    description:
      "We produce in limited runs using certified silks, organic cottons, and recycled blends. Batch sizes stay small to reduce waste while allowing for bespoke dye baths and hand-rolled edges.",
  },
  {
    phase: "Stylist Rituals",
    highlight: "Guides, fittings, and concierge care",
    description:
      "Once a scarf arrives, our stylist team develops wear guides, pairing suggestions, and care notes so you feel supported from unboxing to everyday styling.",
  },
]

const milestones = [
  {
    year: "2016",
    title: "First Capsule Launch",
    description: "Released a six-piece silk collection woven with our founding atelier in Marrakech.",
  },
  {
    year: "2018",
    title: "Global Collective",
    description: "Partnered with women-led studios in Istanbul and Jaipur to introduce artisan block prints.",
  },
  {
    year: "2021",
    title: "Digital Styling Studio",
    description: "Opened virtual fittings with certified colorists, expanding personal styling to every region.",
  },
  {
    year: "2024",
    title: "Circular Care Program",
    description: "Launched repair and refresh services so beloved scarves stay in rotation for years.",
  },
]

const brandPromises = [
  {
    value: "82%",
    label: "natural fibers",
    description: "Across our annual collections are woven in silk, cotton, and wool certified for ethical sourcing.",
  },
  {
    value: "48",
    label: "artisan partners",
    description: "Independent ateliers receive fair pay, mentorship, and shared design credit on every release.",
  },
  {
    value: "12k+",
    label: "styling sessions",
    description: "One-on-one appointments completed globally, guiding clients through color, drape, and care.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border/40 bg-background">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url(/diverse-group-of-women-wearing-scarves-smiling.jpg)" }}
            role="presentation"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70" />
          <div className="relative z-10">
            <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24 lg:py-28">
              <ScrollReveal className="mx-auto max-w-3xl space-y-6 text-center" direction="up">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">Wrapped in meaning</p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">About Us</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Every scarf we design starts with a story: of the women who will wear it, the artisans who will craft it, and
                  the moments it will elevate. We blend timeless craft with modern design so your daily rituals feel a little
                  more considered, a little more you.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="px-8 hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="#our-pillars">Explore our story</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="/contact">Meet the team</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="our-pillars" className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="mx-auto max-w-3xl text-center" direction="up">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">Crafted with intention</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                The heart behind every layer
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                From loom to wardrobe, our collective of artisans and stylists collaborate so your scarves feel as meaningful
                as they look. Explore the pillars that guide our work.
              </p>
            </ScrollReveal>
            <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
              {highlights.map((highlight, index) => {
                const gradient = getGradientFromPalette(index)
                return (
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
                        <div
                          className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                        />
                        <div
                          className={`pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t ${gradient} opacity-95 transition-opacity duration-500 group-hover:opacity-100`}
                        />
                      </div>
                      <div className="flex flex-1 flex-col space-y-4 p-6 text-center">
                        <div className="space-y-2">
                          <h2 className="text-2xl font-semibold tracking-tight text-primary">{highlight.title}</h2>
                          <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground/70">
                            {highlight.summary}
                          </p>
                        </div>
                        <div className="space-y-3 text-sm text-muted-foreground md:text-base/relaxed">
                          {highlight.description.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </article>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-muted/10 py-16 md:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <ScrollReveal className="space-y-5 text-center lg:text-left" direction="up">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">How a scarf comes to life</p>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                From inspiration boards to your wardrobe
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Our atelier process nurtures every layer of craftsmanship. Each phase keeps artistry, responsible sourcing,
                and wearer experience in equilibrium so your scarf feels intentional from the first drape.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={120} className="h-full">
              <ol className="space-y-6">
                {craftsmanshipSteps.map((step, index) => (
                  <li
                    key={step.phase}
                    className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                      <div className="space-y-2 text-left">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">{step.phase}</p>
                          <p className="text-sm font-medium text-primary/80">{step.highlight}</p>
                        </div>
                        <p className="text-sm text-muted-foreground md:text-base/relaxed">{step.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </section>

        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/8 to-primary/15" />
          </div>
          <div className="relative z-10">
            <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
              <ScrollReveal className="mx-auto max-w-3xl space-y-4 text-center" direction="up">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">Milestones we cherish</p>
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">A timeline of shared growth</h2>
                <p className="text-muted-foreground md:text-lg">
                  Our journey is a collective story written alongside makers, stylists, and the community of wearers who bring
                  each scarf to life.
                </p>
              </ScrollReveal>
              <div className="mt-12 space-y-8 border-l border-border/60 pl-6 md:pl-10">
                {milestones.map((milestone, index) => (
                  <ScrollReveal
                    key={`${milestone.year}-${milestone.title}`}
                    direction="up"
                    delay={index * 120}
                    className="relative rounded-3xl border border-border/50 bg-card/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="absolute -left-3 top-6 h-5 w-5 rounded-full border-2 border-background bg-primary shadow-sm" />
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">{milestone.year}</p>
                    <h3 className="mt-2 text-xl font-semibold text-primary">{milestone.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground md:text-base/relaxed">{milestone.description}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-muted/5 py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="mx-auto max-w-3xl space-y-4 text-center" direction="up">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">Commitments beyond the loom</p>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Promises we stand behind</h2>
              <p className="text-muted-foreground md:text-lg">
                Numbers only matter when they reflect real care. These metrics guide every decision, ensuring the scarves you
                choose honor people, planet, and personal expression.
              </p>
            </ScrollReveal>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {brandPromises.map((promise, index) => (
                <ScrollReveal
                  key={promise.label}
                  direction="up"
                  delay={index * 120}
                  className="rounded-3xl border border-border/60 bg-card/80 p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <p className="text-4xl font-bold text-primary">{promise.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">{promise.label}</p>
                  <p className="mt-4 text-sm text-muted-foreground md:text-base/relaxed">{promise.description}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
