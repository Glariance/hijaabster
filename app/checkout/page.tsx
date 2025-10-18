import Link from "next/link"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type SummaryItem = {
  title: string
  subtitle?: string
  price: number
  quantity: number
}

type ShippingOption = {
  id: string
  title: string
  description: string
  eta: string
  price: number
}

type PaymentHighlight = {
  label: string
  detail: string
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const summaryItems: SummaryItem[] = [
  {
    title: "Lunar Sheen Silk Square",
    subtitle: "Midnight Slate | 100% mulberry silk",
    price: 148,
    quantity: 1,
  },
  {
    title: "Dusklight Modal Wrap",
    subtitle: "Marigold Ember | Modal blend",
    price: 98,
    quantity: 2,
  },
  {
    title: "Heritage Cashmere Shawl",
    subtitle: "Plum Reverie | Cashmere silk",
    price: 220,
    quantity: 1,
  },
]

const shippingOptions: ShippingOption[] = [
  {
    id: "express",
    title: "Complimentary express",
    description: "Priority handling with carbon-neutral courier partners.",
    eta: "Arrives in 2-3 business days",
    price: 0,
  },
  {
    id: "white-glove",
    title: "White glove delivery",
    description: "Scheduled delivery with on-site fit guidance in select cities.",
    eta: "We will reach out within 24 hours to coordinate",
    price: 45,
  },
]

const paymentHighlights: PaymentHighlight[] = [
  {
    label: "Secure checkout",
    detail: "Payments are encrypted and processed via PCI Level 1 providers.",
  },
  {
    label: "Flexible payments",
    detail: "Use credit, debit, or split payments with our financing partners.",
  },
  {
    label: "Loyalty perks",
    detail: "Members earn double points on silk silhouettes through August.",
  },
]

const subtotal = summaryItems.reduce((total, item) => total + item.price * item.quantity, 0)
const shipping = 0
const taxEstimate = subtotal * 0.0825
const loyaltyCredit = -25
const orderTotal = subtotal + shipping + taxEstimate + loyaltyCredit

export default function CheckoutPage() {
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/82 via-background/60 to-background/70" />
          <div className="relative z-10">
            <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24 lg:py-28">
              <ScrollReveal className="mx-auto max-w-3xl space-y-6 text-center" direction="up">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">Final touches</p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Checkout</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Confirm delivery details, choose your preferred shipping experience, and review the scarves joining your
                  collection.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg" className="px-8 hover:bg-[#BE446C] hover:text-white">
                    <Link href="#checkout-details">Continue below</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="/cart">Back to cart</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="checkout-details" className="py-16 md:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <ScrollReveal direction="up" className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-primary">Contact information</h2>
                    <p className="text-sm text-muted-foreground md:text-base/relaxed">
                      We share order updates by email and optional SMS.
                    </p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" name="first-name" placeholder="Amina" autoComplete="given-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" name="last-name" placeholder="Farouq" autoComplete="family-name" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        autoComplete="email"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={80} className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-primary">Shipping address</h2>
                    <p className="text-sm text-muted-foreground md:text-base/relaxed">
                      We ship worldwide. Enter a full address to calculate duties where required.
                    </p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address-line-1">Street address</Label>
                      <Input
                        id="address-line-1"
                        name="address-line-1"
                        placeholder="145 Mercer Street, Suite 4C"
                        autoComplete="address-line1"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address-line-2">Apartment, suite, etc. (optional)</Label>
                      <Input
                        id="address-line-2"
                        name="address-line-2"
                        placeholder="Floor, buzzer, or other notes"
                        autoComplete="address-line2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" placeholder="New York" autoComplete="address-level2" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State / Province</Label>
                      <Input id="state" name="state" placeholder="NY" autoComplete="address-level1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">Postal code</Label>
                      <Input id="postal-code" name="postal-code" placeholder="10012" autoComplete="postal-code" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country / Region</Label>
                      <Input id="country" name="country" placeholder="United States" autoComplete="country-name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery-notes">Delivery notes (optional)</Label>
                    <Textarea
                      id="delivery-notes"
                      name="delivery-notes"
                      placeholder="Gate code, concierge details, fabric preferences, or gift wrap instructions."
                      rows={4}
                    />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal
                direction="up"
                delay={160}
                className="space-y-4 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm"
              >
                <div>
                  <h2 className="text-xl font-semibold text-primary">Shipping method</h2>
                  <p className="text-sm text-muted-foreground md:text-base/relaxed">
                    Express shipping is complimentary on this order.
                  </p>
                </div>
                <div className="space-y-4">
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-border/60 bg-background/80 px-4 py-4 transition-colors hover:border-primary"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-primary">{option.title}</p>
                          <p className="text-xs uppercase tracking-[0.25em] text-primary/70">{option.eta}</p>
                        </div>
                        <input
                          type="radio"
                          name="shipping-option"
                          value={option.id}
                          defaultChecked={option.id === "express"}
                          className="h-4 w-4"
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground md:text-base/relaxed">
                        <p>{option.description}</p>
                        <p className="font-semibold text-primary">
                          {option.price === 0 ? "Included" : currency.format(option.price)}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal
                direction="up"
                delay={220}
                className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm"
              >
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-primary">Payment details</h2>
                    <p className="text-sm text-muted-foreground md:text-base/relaxed">
                      Complete your purchase securely. We will only charge when pieces leave our studio.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Name on card</Label>
                    <Input id="card-name" name="card-name" placeholder="Amina Farouq" autoComplete="cc-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card number</Label>
                    <Input id="card-number" name="card-number" placeholder="4242 4242 4242 4242" autoComplete="cc-number" />
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="exp-month">Exp. month</Label>
                      <Input id="exp-month" name="exp-month" placeholder="08" autoComplete="cc-exp-month" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exp-year">Exp. year</Label>
                      <Input id="exp-year" name="exp-year" placeholder="27" autoComplete="cc-exp-year" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" name="cvv" placeholder="123" autoComplete="cc-csc" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-notes">Gift or billing notes (optional)</Label>
                    <Textarea
                      id="billing-notes"
                      name="billing-notes"
                      placeholder="Share gifting sentiments, monogram details, or invoice requests."
                      rows={3}
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="space-y-6">
              <ScrollReveal direction="up" className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-primary">Order summary</h2>
                <div className="mt-4 space-y-4">
                  {summaryItems.map((item) => (
                    <div key={item.title} className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
                      <div>
                        <p className="text-sm font-semibold text-primary">{item.title}</p>
                        {item.subtitle && <p className="text-xs text-muted-foreground">{item.subtitle}</p>}
                        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-primary/70">
                          Quantity {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-primary">
                        {currency.format(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
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
                <Button className="mt-6 w-full px-6 py-5 text-base font-semibold hover:bg-[#BE446C] hover:text-white">
                  Place order
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">
                  By placing this order you agree to our{" "}
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
                className="space-y-4 rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 p-6 text-sm text-muted-foreground md:text-base/relaxed"
              >
                <h3 className="text-lg font-semibold text-primary">Why checkout with Hijaabster?</h3>
                <div className="space-y-3">
                  {paymentHighlights.map((highlight) => (
                    <div key={highlight.label} className="rounded-2xl bg-background/75 px-4 py-3">
                      <p className="text-sm font-semibold text-primary md:text-base">{highlight.label}</p>
                      <p className="text-xs text-muted-foreground md:text-sm">{highlight.detail}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-muted/10 py-16 md:py-24">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
            <ScrollReveal className="mx-auto max-w-3xl space-y-4 text-center" direction="up">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Need a stylist?</h2>
              <p className="text-muted-foreground md:text-lg">
                Our concierge team can recommend complementary pieces, confirm sizing, or schedule a gift delivery on your
                behalf. Leave a note above or reach out directly.
              </p>
            </ScrollReveal>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild className="px-8 hover:bg-[#BE446C] hover:text-white">
                <Link href="/contact">Message concierge</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-8 border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
              >
                <Link href="tel:+12125551045">Call +1 (212) 555-1045</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
