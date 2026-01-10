"use client"

import { MessageSquare, Phone, MapPin, Clock, Instagram, Send } from "lucide-react"
import Link from "next/link"
import { useState, FormEvent } from "react"
import Swal from "sweetalert2"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const contactChannels = [
  {
    title: "Styling Concierge",
    description: "Book a one-on-one consult with our stylists for color palettes, pairing advice, and capsule planning.",
    actionLabel: "Email the stylists",
    actionHref: "mailto:styling@scarf.co",
    icon: Send,
    responseTime: "Replies within 12 hours",
  },
  {
    title: "Client Care",
    description: "Questions about orders, returns, or loyalty perks? Our client care team is here every day of the week.",
    actionLabel: "Start a live chat",
    actionHref: "/account/profile",
    icon: MessageSquare,
    responseTime: "Chat available 9am - 7pm ET",
  },
  {
    title: "Boutique Line",
    description: "Call the flagship studio directly for bespoke gifting, corporate orders, or event styling support.",
    actionLabel: "Call +1 (212) 555-1045",
    actionHref: "tel:+12125551045",
    icon: Phone,
    responseTime: "Phone support 10am - 6pm ET",
  },
]

const studioDetails = [
  {
    label: "Flagship Atelier",
    value: "145 Mercer Street, Suite 4C, New York, NY 10012",
    icon: MapPin,
  },
  {
    label: "Salon Hours",
    value: "Monday - Saturday | 10am to 7pm ET",
    icon: Clock,
  },
  {
    label: "Social",
    value: "@scarf.collective",
    icon: Instagram,
  },
]

const faqs = [
  {
    question: "How quickly will someone respond?",
    answer:
      "We aim to reply to concierge and client care messages within one business day. During launch periods, allow up to 48 hours; we'll prioritize urgent order changes.",
  },
  {
    question: "Can I schedule a virtual fitting?",
    answer:
      'Yes. Select "Styling Concierge" in the form and add preferred dates. We will confirm a virtual fitting with a stylist who specializes in your palette and silhouette preferences.',
  },
  {
    question: "Do you offer corporate gifting support?",
    answer:
      "Absolutely. Share quantities, timelines, and any personalization notes in the message field. Our gifting team will craft a tailored proposal with pricing within 24 hours.",
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  })

  const validateForm = () => {
    if (!formData.name.trim()) {
      Swal.fire({
        icon: "error",
        iconColor: "#BE446C",
        title: "Validation Error",
        text: "Please enter your full name",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#1a1a1a",
        color: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar") as HTMLElement
          if (progressBar) {
            progressBar.style.backgroundColor = "#BE446C"
          }
        },
      })
      return false
    }

    if (!formData.email.trim()) {
      Swal.fire({
        icon: "error",
        iconColor: "#BE446C",
        title: "Validation Error",
        text: "Please enter your email address",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#1a1a1a",
        color: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar") as HTMLElement
          if (progressBar) {
            progressBar.style.backgroundColor = "#BE446C"
          }
        },
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        icon: "error",
        iconColor: "#BE446C",
        title: "Validation Error",
        text: "Please enter a valid email address",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#1a1a1a",
        color: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar") as HTMLElement
          if (progressBar) {
            progressBar.style.backgroundColor = "#BE446C"
          }
        },
      })
      return false
    }

    if (!formData.message.trim()) {
      Swal.fire({
        icon: "error",
        iconColor: "#BE446C",
        title: "Validation Error",
        text: "Please enter your message",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#1a1a1a",
        color: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar") as HTMLElement
          if (progressBar) {
            progressBar.style.backgroundColor = "#BE446C"
          }
        },
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const { apiService } = await import("@/lib/api-client")

      const data = await apiService.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        topic: formData.topic || null,
        subject: formData.topic || "Website Inquiry",
        message: formData.message,
      })

      if (data.success) {
        Swal.fire({
          icon: "success",
          iconColor: "#10b981",
          title: "Message Sent!",
          text: data.message || "Thank you for reaching out. Our team will get back to you shortly.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          background: "#1a1a1a",
          color: "#ffffff",
          didOpen: (toast) => {
            const progressBar = toast.querySelector(".swal2-timer-progress-bar") as HTMLElement
            if (progressBar) {
              progressBar.style.backgroundColor = "#BE446C"
            }
          },
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          topic: "",
          message: "",
        })
      } else {
        throw new Error(data.message || "Failed to send message")
      }
    } catch (error: any) {
      // Handle axios errors
      const errorMessage = error?.response?.data?.message 
        || error?.message 
        || "Something went wrong. Please try again later."
      
      Swal.fire({
        icon: "error",
        iconColor: "#BE446C",
        title: "Error",
        text: errorMessage,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        background: "#1a1a1a",
        color: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar") as HTMLElement
          if (progressBar) {
            progressBar.style.backgroundColor = "#BE446C"
          }
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border/40 bg-background">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url(/woman-wearing-scarf-banner.jpg)" }}
            role="presentation"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70" />
          <div className="relative z-10">
            <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24 lg:py-28">
              <ScrollReveal className="mx-auto max-w-3xl space-y-6 text-center" direction="up">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
                  We're here for every layer
                </p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Contact Our Team</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From bespoke styling sessions to shipping updates, our concierge team is ready to help your scarf wardrobe
                  feel effortless. Reach out and we'll tailor the support to you.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="px-8 hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="#contact-form">Send a message</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="tel:+12125551045">Call the atelier</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="bg-muted/10 py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="mx-auto max-w-2xl space-y-4 text-center" direction="up">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">Choose your channel</p>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Connect with our team</h2>
              <p className="text-muted-foreground md:text-lg">
                Whether you need styling advice, order support, or bespoke gifting, reach out through the path that feels
                right and we will make sure the experience stays effortless.
              </p>
            </ScrollReveal>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {contactChannels.map((channel, index) => {
                const Icon = channel.icon
                return (
                  <ScrollReveal
                    key={channel.title}
                    delay={index * 120}
                    direction="up"
                    className="h-full rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-3 text-primary">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <strong className="text-base font-semibold uppercase tracking-[0.2em] text-primary/80">
                        {channel.title}
                      </strong>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground md:text-base/relaxed">{channel.description}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
                      {channel.responseTime}
                    </p>
                    <Button asChild className="mt-6 w-full hover:bg-[#BE446C] hover:text-white">
                      <Link href={channel.actionHref}>{channel.actionLabel}</Link>
                    </Button>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <ScrollReveal direction="up" className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-lg">
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                      Tell us how we can help
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">Send a message</h2>
                    <p className="text-sm text-muted-foreground md:text-base/relaxed">
                      Fill out the form below and we'll reach out with next steps. Include order numbers or deadlines so we
                      can prioritize accordingly.
                    </p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="placeholder:opacity-40 text-[rgb(184,50,93)]"
                        style={{ color: 'rgb(184, 50, 93)' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="placeholder:opacity-40 text-[rgb(184,50,93)]"
                        style={{ color: 'rgb(184, 50, 93)' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="placeholder:opacity-40 text-[rgb(184,50,93)]"
                        style={{ color: 'rgb(184, 50, 93)' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic</Label>
                      <Input
                        id="topic"
                        name="topic"
                        placeholder="Styling consult, order status, gifting inspiration"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="placeholder:opacity-40 text-[rgb(184,50,93)]"
                        style={{ color: 'rgb(184, 50, 93)' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Share details about your request, timelines, or the pieces you have your eye on."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="placeholder:opacity-40 text-[rgb(184,50,93)]"
                      style={{ color: 'rgb(184, 50, 93)' }}
                    />
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-foreground/80">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy-policy" className="underline decoration-primary/60 underline-offset-4">
                        privacy policy
                      </Link>
                      .
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 hover:bg-[#BE446C] hover:text-white disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send message"}
                    </Button>
                  </div>
                </form>
              </ScrollReveal>
              <div className="space-y-8">
                <ScrollReveal
                  direction="up"
                  delay={120}
                  className="rounded-3xl border border-border/60 bg-card/70 p-8 shadow-sm backdrop-blur"
                >
                  <h3 className="text-xl font-semibold text-primary">Visit the atelier</h3>
                  <p className="mt-3 text-sm text-muted-foreground md:text-base/relaxed">
                    We welcome private appointments to explore heritage weaves, preview upcoming collections, and tailor
                    gifting sets. Drop us a note before you arrive so we can prepare your selection.
                  </p>
                  <div className="mt-6 space-y-4">
                    {studioDetails.map((detail) => {
                      const Icon = detail.icon
                      return (
                        <div key={detail.label} className="flex items-start gap-3">
                          <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">{detail.label}</p>
                            <p className="mt-1 text-sm text-muted-foreground md:text-base/relaxed">{detail.value}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollReveal>
                <ScrollReveal
                  direction="up"
                  delay={220}
                  className="rounded-3xl border border-border/60 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 text-center shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-primary">Need immediate help?</h3>
                  <p className="mt-3 text-sm text-muted-foreground md:text-base/relaxed">
                    Call us at{" "}
                    <a href="tel:+12125551045" className="text-primary underline underline-offset-4">
                      +1 (212) 555-1045
                    </a>{" "}
                    or reach out via live chat for time-sensitive order changes.
                  </p>
                  <Button asChild variant="outline" className="mt-6 px-8 text-primary hover:bg-[#BE446C] hover:text-white">
                    <Link href="/account/profile">Open live chat</Link>
                  </Button>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-muted/10 py-16 md:py-24">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
            <ScrollReveal className="mx-auto max-w-2xl space-y-4 text-center" direction="up">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Quick Answers</h2>
              <p className="text-muted-foreground md:text-lg">
                These are the questions we hear most. If you do not see yours, send a note - we love a thoughtful inquiry.
              </p>
            </ScrollReveal>
            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => (
                <ScrollReveal
                  key={faq.question}
                  direction="up"
                  delay={index * 100}
                  className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <h3 className="text-lg font-semibold text-primary">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base/relaxed">{faq.answer}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
