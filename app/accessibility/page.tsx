import Link from "next/link"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"

type AccessibilitySection = {
  id: string
  title: string
  description: string[]
  list?: string[]
}

const accessibilitySections: AccessibilitySection[] = [
  {
    id: "digital-standards",
    title: "Digital Standards We Follow",
    description: [
      "Our e-commerce experience is built with semantic HTML, keyboard-friendly navigation, and ARIA best practices so screen reader users can browse without barriers.",
      "We routinely audit new releases against WCAG 2.2 AA success criteria and update components when guidelines evolve.",
    ],
    list: [
      "Contrast ratios meet or exceed 4.5:1 for text and interactive elements",
      "Forms include labels, error messaging, and descriptive help text",
      "Images use descriptive alt text and avoid decorative content where possible",
      "Motion, autoplay, and animations can be paused when they appear on the page",
    ],
  },
  {
    id: "accessible-services",
    title: "Accessible Styling Services",
    description: [
      "Fashion should feel inclusive. Our concierge programs adapt to your preferred communication style and any assistive technology you use.",
    ],
    list: [
      "Virtual styling sessions available with captions or live ASL interpreters",
      "Product descriptions include fabric weight, drape, and closure details for tactile contexts",
      "Braille product cards and large-print care guides available upon request",
      "In-studio appointments accommodate mobility devices and sensory considerations",
    ],
  },
  {
    id: "continuous-improvement",
    title: "Continuous Improvement",
    description: [
      "Accessibility is an ongoing partnership. We train our team, invite community feedback, and invest in inclusive tooling to keep improving.",
    ],
    list: [
      "Quarterly audits by third-party accessibility specialists",
      "Design system tokens tuned for contrast, spacing, and focus visibility",
      "Internal education so every launch team understands inclusive best practices",
      "Bug triage that prioritizes access-related fixes with dedicated SLAs",
    ],
  },
]

export default function AccessibilityPage() {
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
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">Accessibility statement</p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Inclusive by design</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hijaabster is built for every body and every way of navigating the world. We design, test, and iterate so you
                  can explore scarves, book styling sessions, and manage your account without friction.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg" className="px-8 hover:bg-[#BE446C] hover:text-white">
                    <Link href="#accessibility-overview">Review our commitments</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="/contact">Request accommodations</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="accessibility-overview" className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.65fr]">
              <ScrollReveal direction="up" className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  Designing a shopping experience without barriers
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Accessibility is part of our design system, not an afterthought. The sections below highlight the pillars that
                  shape every release, from coded components to concierge support.
                </p>
                <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
                  <h3 className="text-base font-semibold uppercase tracking-[0.3em] text-primary/70">Need this statement in another format?</h3>
                  <p className="mt-3 text-sm text-muted-foreground md:text-base/relaxed">
                    Email{" "}
                    <a className="text-primary underline underline-offset-4" href="mailto:access@hijaabster.co">
                      access@hijaabster.co
                    </a>{" "}
                    for large-print, Braille, or translated copies. We fulfill requests within five business days.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal
                direction="up"
                delay={120}
                className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold uppercase tracking-[0.3em] text-primary/70">Quick navigation</h3>
                <nav className="mt-5 space-y-3 text-sm text-muted-foreground">
                  {accessibilitySections.map((section) => (
                    <div key={section.id}>
                      <Link href={`#${section.id}`} className="transition-colors hover:text-primary">
                        {section.title}
                      </Link>
                    </div>
                  ))}
                </nav>
              </ScrollReveal>
            </div>

            <div className="mt-16 space-y-10">
              {accessibilitySections.map((section, index) => (
                <ScrollReveal
                  key={section.id}
                  id={section.id}
                  direction="up"
                  delay={index * 100}
                  className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <h3 className="text-2xl font-semibold text-primary">{section.title}</h3>
                  <div className="mt-4 space-y-3 text-sm text-muted-foreground md:text-base/relaxed">
                    {section.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.list && (
                    <ul className="mt-5 space-y-2 text-sm text-muted-foreground md:text-base/relaxed">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-primary/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-muted/10 py-16 md:py-24">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
            <ScrollReveal className="mx-auto max-w-3xl space-y-4 text-center" direction="up">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Share your feedback</h2>
              <p className="text-muted-foreground md:text-lg">
                If you encounter an access barrier, we want to hear about it. Your insight helps us prioritize updates that make
                the experience better for everyone.
              </p>
            </ScrollReveal>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild className="px-8 hover:bg-[#BE446C] hover:text-white">
                <Link href="/contact">Submit a feedback form</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-8 border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
              >
                <Link href="tel:+12125551045">Call +1 (212) 555-1045</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-8 border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
              >
                <Link href="mailto:access@hijaabster.co">Email access@hijaabster.co</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

