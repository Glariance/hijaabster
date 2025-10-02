"use client"

import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"

export function AboutUsSection() {
  return (
    <section className="w-full bg-white py-10 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal className="order-2 space-y-4 lg:order-1" direction="left">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">Our Story</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At Scarf e-commerce app, we believe in the power of a beautiful scarf to transform an outfit and express
                individuality. Our journey began with a passion for exquisite fabrics and unique designs, aiming to bring
                elegance and style to every woman's wardrobe.
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We meticulously curate our collections, focusing on quality, comfort, and timeless appeal. Each scarf is
                a testament to our commitment to craftsmanship and our dedication to helping you find the perfect
                accessory for every occasion.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="order-1 lg:order-2" direction="right" delay={120}>
            <div className="group mx-auto aspect-video overflow-hidden rounded-xl">
              <Image
                src="/scarf-making-process.jpg"
                alt="Artisans crafting scarves"
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
