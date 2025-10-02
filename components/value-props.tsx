"use client"

import { ShieldCheck, Sparkles, Truck, PhoneCall } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

const highlights = [
  {
    title: "Free Worldwide Shipping",
    description: "Complimentary delivery on every order with express options at checkout.",
    icon: Truck,
  },
  {
    title: "Premium Craftsmanship",
    description: "Ethically sourced fabrics finished by skilled artisans for a luxe drape.",
    icon: Sparkles,
  },
  {
    title: "Style Concierge",
    description: "Personalised styling support to help you pair colours, fabrics, and looks.",
    icon: PhoneCall,
  },
  {
    title: "Secure & Hassle-Free",
    description: "30-day returns and protected checkout keep every purchase worry free.",
    icon: ShieldCheck,
  },
]

export function ValueProps() {
  return (
    <section className="w-full bg-white py-10 md:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <ScrollReveal className="md:max-w-sm" direction="left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Why Shop With Us</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            An elevated hijab experience tailored for modern women.
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            We obsess over the details so you can focus on feeling confident, polished, and ready for every moment.
          </p>
        </ScrollReveal>
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <ScrollReveal
                key={item.title}
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

