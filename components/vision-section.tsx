"use client"

import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"

export function VisionSection() {
  return (
    <section className="w-full bg-white py-10 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal direction="left" className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">Our Vision</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We envision a world where every woman feels empowered and beautiful, with a scarf that reflects her
                personality and enhances her natural grace. We strive to be the leading destination for premium girls'
                scarves, known for our exceptional designs, quality, and customer experience.
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our vision extends to building a global community that celebrates diversity, creativity, and the art of
                scarf styling.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={120}>
            <div className="group mx-auto aspect-video overflow-hidden rounded-xl">
              <Image
                src="/diverse-group-of-women-wearing-scarves-smiling.jpg"
                alt="Our Vision"
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
