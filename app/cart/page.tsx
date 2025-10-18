import Image from "next/image"
import Link from "next/link"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"

type CartItem = {
  id: string
  name: string
  description: string
  color: string
  material: string
  price: number
  quantity: number
  image: string
  availability: "In stock" | "Pre-order" | "Backorder"
  note?: string
}

type Perk = {
  title: string
  detail: string
  icon: string
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const cartItems: CartItem[] = [
  {
    id: "silk-lunar",
    name: "Lunar Sheen Silk Square",
    description: "Hand-rolled edges with a luminescent midnight gradient.",
    color: "Midnight Slate",
    material: "100% mulberry silk",
    price: 148,
    quantity: 1,
    image: "/silk-scarves-category.jpg",
    availability: "In stock",
  },
  {
    id: "modal-dusk",
    name: "Dusklight Modal Wrap",
    description: "Breathable modal blend with light fringing for all-day drape.",
    color: "Marigold Ember",
    material: "Modal and cotton blend",
    price: 98,
    quantity: 2,
    image: "/cotton-scarves-category.jpg",
    availability: "In stock",
    note: "Eligible for complimentary monogramming.",
  },
  {
    id: "cashmere-plum",
    name: "Heritage Cashmere Shawl",
    description: "Limited atelier weave finished with tonal hand embroidery.",
    color: "Plum Reverie",
    material: "Cashmere and silk",
    price: 220,
    quantity: 1,
    image: "/wool-scarves-category.jpg",
    availability: "Pre-order",
    note: "Ships within two weeks. We will confirm delivery dates after purchase.",
  },
]

const perks: Perk[] = [
  {
    title: "Loyalty double points",
    detail: "Earn 2x points on silk silhouettes through August.",
    icon: "[**]",
  },
  {
    title: "Complimentary express shipping",
    detail: "Automatically applied for orders over $350 (your cart qualifies).",
    icon: "[EXP]",
  },
  {
    title: "Concierge tailoring",
    detail: "Notes added at checkout are reviewed by our stylists for final finishing.",
    icon: "[CARE]",
  },
]

const recommended = [
  {
    title: "Silvered Horizon Clip Set",
    description: "Weighted scarf clips that keep every pleat in place.",
    price: 32,
    image: "/woman-wearing-elegant-scarf.jpg",
  },
  {
    title: "Luxe Care Duo",
    description: "Silk-safe cleanser and cedar sachets to preserve each piece.",
    price: 28,
    image: "/scarf-making-process.jpg",
  },
  {
    title: "Capsule Styling Session",
    description: "Virtual appointment tailored to upcoming events and travel.",
    price: 0,
    image: "/diverse-group-of-women-wearing-scarves-smiling.jpg",
  },
]

const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
const shipping = subtotal >= 350 ? 0 : 18
const taxEstimate = subtotal * 0.0825
const loyaltyCredit = -25
const orderTotal = subtotal + shipping + taxEstimate + loyaltyCredit

export default function CartPage() {
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
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">Curate before checkout</p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Your Cart</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Review your selections, tailor quantities, and confirm delivery details. Everything stays reserved for the
                  next 30 minutes.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg" className="px-8 hover:bg-[#BE446C] hover:text-white">
                    <Link href="#cart-details">Review items</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="/shop">Continue shopping</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="cart-details" className="py-16 md:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <ScrollReveal
                  key={item.id}
                  direction="up"
                  delay={index * 120}
                  className="grid gap-6 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:grid-cols-[auto_1fr]"
                >
                  <div className="relative aspect-square h-32 w-32 overflow-hidden rounded-2xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="128px" />
                    <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                      {item.color}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold text-primary">{item.name}</h2>
                      <p className="text-sm text-muted-foreground md:text-base/relaxed">{item.description}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
                        {item.material} | {item.availability}
                      </p>
                    </div>
                    {item.note && (
                      <div className="rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-xs text-primary md:text-sm">
                        {item.note}
                      </div>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-2 text-sm">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="h-7 w-7 rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          className="h-7 w-7 rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button type="button" className="transition-colors hover:text-primary">
                          Save for later
                        </button>
                        <span aria-hidden="true">|</span>
                        <button type="button" className="transition-colors hover:text-primary">
                          Remove
                        </button>
                      </div>
                      <p className="ml-auto text-base font-semibold text-primary md:text-lg">
                        {currency.format(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}

              <ScrollReveal direction="up" className="rounded-3xl border border-dashed border-border/60 bg-card/60 p-6 text-center">
                <p className="text-sm text-muted-foreground md:text-base">
                  Have a promotion code or loyalty credit to apply? You can add it during checkout or after signing in.
                </p>
                <Button asChild variant="outline" className="mt-4 px-6 text-sm">
                  <Link href="/account/profile">Sign in to apply rewards</Link>
                </Button>
              </ScrollReveal>
            </div>

            <div className="space-y-6">
              <ScrollReveal direction="up" className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-primary">Order summary</h2>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground md:text-base/relaxed">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{currency.format(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Complimentary" : currency.format(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated tax</span>
                    <span>{currency.format(taxEstimate)}</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Loyalty credit</span>
                    <span>{currency.format(loyaltyCredit)}</span>
                  </div>
                  <div className="flex justify-between border-t border-border/60 pt-4 text-base font-semibold text-primary">
                    <span>Total</span>
                    <span>{currency.format(orderTotal)}</span>
                  </div>
                </div>
                <Button
                  asChild
                  className="mt-6 w-full px-6 py-5 text-base font-semibold hover:bg-[#BE446C] hover:text-white"
                >
                  <Link href="/checkout">Proceed to checkout</Link>
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">
                  By continuing, you agree to our{" "}
                  <Link href="/terms-and-conditions" className="underline decoration-primary/60 underline-offset-4">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="underline decoration-primary/60 underline-offset-4">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </ScrollReveal>

              <ScrollReveal
                direction="up"
                delay={120}
                className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 p-6 text-sm text-muted-foreground md:text-base/relaxed"
              >
                <h3 className="text-lg font-semibold text-primary">Perks applied to this order</h3>
                <div className="mt-4 space-y-3">
                  {perks.map((perk) => (
                    <div key={perk.title} className="flex items-start gap-3 rounded-2xl bg-background/70 p-4">
                      <span className="text-lg">{perk.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-primary md:text-base">{perk.title}</p>
                        <p className="text-xs text-muted-foreground md:text-sm">{perk.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-muted/10 py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="mx-auto max-w-3xl space-y-4 text-center" direction="up">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">You may also like</p>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Complete your ritual</h2>
              <p className="text-muted-foreground md:text-lg">
                Finish your capsule with thoughtful add-ons curated to complement the pieces in your cart.
              </p>
            </ScrollReveal>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {recommended.map((item, index) => (
                <ScrollReveal
                  key={item.title}
                  direction="up"
                  delay={index * 120}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_45%)]" />
                    <div
                      className={`pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t ${
                        index === 0
                          ? "from-rose-600/85 via-amber-400/45 to-transparent"
                          : index === 1
                          ? "from-violet-600/85 via-indigo-400/45 to-transparent"
                          : "from-emerald-500/80 via-teal-400/45 to-transparent"
                      } opacity-90 transition-opacity duration-500 group-hover:opacity-100`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-4 p-6 text-center">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                      <p className="text-sm text-muted-foreground md:text-base/relaxed">{item.description}</p>
                    </div>
                    <div className="mt-auto space-y-3">
                      <p className="text-base font-semibold text-primary">{currency.format(item.price)}</p>
                      <Button asChild className="w-full hover:bg-[#BE446C] hover:text-white">
                        <Link href="/shop">Add to cart</Link>
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
