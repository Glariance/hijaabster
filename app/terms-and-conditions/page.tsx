import Link from "next/link"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"

type TermsSection = {
  id: string
  title: string
  description: string[]
  list?: string[]
}

const effectiveDate = "October 18, 2025"

const termsSections: TermsSection[] = [
  {
    id: "accounts",
    title: "Accounts and Membership",
    description: [
      "Creating an account gives you access to saved styling profiles, order tracking, and loyalty rewards. You agree to provide accurate information and to update it when changes occur so that shipments and communications reach you on time.",
      "You are responsible for safeguarding your login credentials. If you suspect unauthorized access, please reset your password immediately and contact client care so we can secure your profile.",
    ],
    list: [
      "Use a unique password and enable multifactor authentication when available",
      "Do not share account access with others; loyalty benefits are non-transferable",
      "We may suspend or close accounts that misuse promotions or violate community guidelines",
    ],
  },
  {
    id: "orders",
    title: "Orders, Shipping, and Returns",
    description: [
      "All orders are subject to availability. We strive to communicate stock status clearly and will notify you if an item becomes unavailable after checkout.",
      "Shipping timelines vary by destination and carrier. Once a parcel leaves our studio, tracking details are shared in real time.",
      "Returns follow the timeline and condition guidelines published on our Returns page. Items must be unworn with original tags to qualify.",
    ],
    list: [
      "Pre-order pieces ship on the release window noted at checkout",
      "Express courier options are available for eligible regions at an additional cost",
      "Refunds are processed to the original payment method within 7-10 business days after inspection",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    description: [
      "The Hijaabster name, brand marks, product photography, copy, and bespoke designs are protected by copyright, trademark, and other applicable intellectual property laws.",
      "You may not reproduce, redistribute, or create derivative works from our digital or physical assets without prior written consent.",
    ],
    list: [
      "User-generated content shared with #Hijaabster may be reshared with credit according to our community guidelines",
      "If you believe your intellectual property has been infringed, contact legal@hijaabster.co with supporting documentation",
    ],
  },
  {
    id: "liability",
    title: "Liability and Disclaimers",
    description: [
      "We work diligently to ensure accurate product descriptions, imagery, and sizing information. However, natural variations in hand-dyed textiles may cause slight differences between photographs and delivered items.",
      "To the fullest extent permitted by law, Hijaabster will not be liable for indirect, incidental, or consequential damages resulting from the use of the site or inability to access services.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    description: [
      "These Terms are governed by the laws of the State of New York, without regard to conflict of law principles. Any disputes will be resolved through binding arbitration in New York City unless both parties agree otherwise in writing.",
    ],
  },
]

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border/40 bg-background">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url(/woman-wearing-elegant-scarf.jpg)" }}
            role="presentation"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/82 via-background/60 to-background/72" />
          <div className="relative z-10">
            <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24 lg:py-28">
              <ScrollReveal className="mx-auto max-w-3xl space-y-6 text-center" direction="up">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">Clear standards for every order</p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Terms and Conditions</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  These terms explain how you can use the Hijaabster site, participate in loyalty perks, and collaborate with our
                  team. Please review them carefully.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg" className="px-8 hover:bg-[#BE446C] hover:text-white">
                    <Link href="#terms-outline">View the terms</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="/contact">Speak with client care</Link>
                  </Button>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Effective {effectiveDate}</p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="terms-outline" className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.65fr]">
              <ScrollReveal direction="up" className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  The essentials of partnering with Hijaabster
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  We drafted these terms to keep expectations clear and to celebrate respectful collaboration. As we evolve, we
                  may update this document. When we do, we will post the new date at the top and notify registered members.
                </p>
                <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
                  <h3 className="text-base font-semibold uppercase tracking-[0.3em] text-primary/70">How updates work</h3>
                  <p className="mt-3 text-sm text-muted-foreground md:text-base/relaxed">
                    If you continue using the site after an update, it means you accept the revised terms. For major changes, we
                    will reach out via email or in-app messaging in advance so you can review and ask questions.
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
                  {termsSections.map((section) => (
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
              {termsSections.map((section, index) => (
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
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Need clarification?</h2>
              <p className="text-muted-foreground md:text-lg">
                Our client care specialists are ready to walk through any clause, talk timelines, or tailor account settings for
                your team.
              </p>
            </ScrollReveal>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild className="px-8 hover:bg-[#BE446C] hover:text-white">
                <Link href="/contact">Start a conversation</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-8 border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
              >
                <Link href="mailto:legal@hijaabster.co">Email legal@hijaabster.co</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

