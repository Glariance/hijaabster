"use client"

import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"

export function MissionSection() {
  return (
    <section className="w-full bg-white py-10 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal direction="left" className="order-2 space-y-4 lg:order-2 lg:pl-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">Our Mission</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our mission is to empower women to express their unique style and confidence through our exquisite
                collection of scarves. We are dedicated to providing high-quality, ethically sourced, and beautifully
                designed scarves that inspire elegance and individuality.
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We strive to create a positive impact by supporting sustainable practices and fostering a community
                where fashion meets purpose.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" className="order-1 lg:order-1" delay={120}>
            <div className="group mx-auto aspect-video overflow-hidden rounded-xl">
              <Image
                src="/woman-with-elegant-scarf-looking-thoughtfully.jpg"
                alt="Our Mission"
                width={640}
                height={360}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
