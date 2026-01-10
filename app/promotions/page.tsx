import Image from "next/image";
import Link from "next/link";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";

const featuredPromotions = [
  {
    title: "Solstice Styling Event",
    highlight: "20% off",
    description:
      "Breathe new life into breathable cotton-silk blends curated for long summer evenings. Complimentary gift wrap on every order.",
    code: "SOLSTICE20",
    validThrough: "Ends July 2",
    image: "/woman-with-elegant-scarf-looking-thoughtfully.jpg",
    href: "/shop?collection=summer-edit",
  },
  {
    title: "First-Time Collective",
    highlight: "15% welcome",
    description:
      "Join our scarf society and receive stylist-led onboarding plus an exclusive 15% saving on your first capsule build.",
    code: "WELCOME15",
    validThrough: "Ongoing for new members",
    image: "/young-woman-smiling.png",
    href: "/account/profile",
  },
  {
    title: "Weekend Shipping Upgrade",
    highlight: "Complimentary express",
    description:
      "Upgrade every cart over $120 to express delivery on us. Perfect for last-minute gifting and getaway packing.",
    code: "AUTO-APPLIED",
    validThrough: "Fridays through Sundays",
    image: "/mint-green-scarf.jpg",
    href: "/cart",
  },
];

const upcomingDrops = [
  {
    title: "Artist Edition: Woven Horizons",
    launchDate: "Releasing July 12",
    description:
      "A limited, hand-numbered series co-created with Moroccan loom collective Atelier Amal. Members receive 24-hour early access.",
  },
  {
    title: "Colorist Capsule Consults",
    launchDate: "Opening July 22",
    description:
      "Book a complimentary virtual appointment with our in-house stylists and unlock bespoke color pairings with bonus swatch kits.",
  },
  {
    title: "Autumn Preview Trunk Show",
    launchDate: "Streaming August 3",
    description:
      "Preview the fall palette live, reserve statement pieces before they ship, and collect loyalty double-points during the event.",
  },
];

const redemptionSteps = [
  {
    title: "Select your pieces",
    detail:
      "Explore curated edits or filter by material to find the silhouettes that suit your season.",
  },
  {
    title: "Apply the incentive",
    detail:
      "Add the promotion code at checkout or rely on eligible perks that apply automatically.",
  },
  {
    title: "Enjoy the extras",
    detail:
      "Receive tracking, care tips, and priority stylist support with every promotional order.",
  },
];

const loyaltyPerks = [
  {
    title: "Insider Early Access",
    summary: "Preview limited releases 24 hours before the public launch.",
    description:
      "Members unlock RSVP links before campaigns go live, ensuring signature collaborations never sell out before you decide.",
  },
  {
    title: "Styling Credits",
    summary: "$25 credits every quarter toward seasonal refreshes.",
    description:
      "Redeem credits with our stylists on curated bundles, virtual fittings, or in-store appointments to expand your rotation.",
  },
  {
    title: "Complimentary Finishing",
    summary:
      "Free monogramming and premium gift wrapping on every promotional order.",
    description:
      "Pair each scarf with bespoke finishing touches so gifts and personal pieces feel instantly elevated.",
  },
];

const bundleOffers = [
  {
    title: "Summer Capsule Trio",
    savings: "Save 18%",
    inclusions: [
      "1 silk square",
      "1 breathable modal wrap",
      "1 printed headscarf",
    ],
    description:
      "Curated for sun-filled days and sunset dinners, complete with care instructions and travel pouch.",
  },
  {
    title: "Weekend Escape Duo",
    savings: "Save 15%",
    inclusions: ["1 cozy cashmere blend", "1 compact styling scarf"],
    description:
      "Pack-and-go textures designed for effortless layering from airport lounges to gallery strolls.",
  },
  {
    title: "Gifting Five-Pack",
    savings: "Save 22%",
    inclusions: ["5 artisan-inspired scarves", "5 handwritten note cards"],
    description:
      "Share the collection with your circle—each scarf arrives boxed and ready to delight.",
  },
];

const promoFaqs = [
  {
    question: "Can I combine multiple promotion codes on one order?",
    answer:
      "Most promotions are single-use per checkout. Loyalty perks like free express shipping will still apply automatically where eligible.",
  },
  {
    question: "How do I know when a promotion expires?",
    answer:
      "Each offer lists its end date in the details above. We also send reminder emails 48 hours before a promotion closes.",
  },
  {
    question: "Do promotional purchases qualify for returns or exchanges?",
    answer:
      "Absolutely. All scarves purchased with promotions follow our standard 30-day return and exchange policy as long as tags remain attached.",
  },
];

export default function PromotionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1 bg-background">
        <section className="relative overflow-hidden border-b border-border/40 bg-background">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url(/promotional-banner-for-scarves.jpg)",
            }}
            role="presentation"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70" />
          <div className="relative z-10">
            <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24 lg:py-28">
              <ScrollReveal
                className="mx-auto max-w-3xl space-y-6 text-center"
                direction="up"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
                  Current Offers & Exclusives
                </p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                  Promotions Crafted Around You
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover seasonal savings, loyalty moments, and limited drops
                  designed to elevate every wrap in your wardrobe.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="px-8 hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="/shop">Shop the edit</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="/account/profile">Join loyalty</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* <section className="border-y border-border/40 bg-muted/20 py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal
              className="mx-auto max-w-2xl space-y-4 text-center"
              direction="up"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Loyalty-Only Perks
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Elevate your promotional experience with advantages reserved for
                members of our scarf society.
              </p>
            </ScrollReveal>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {loyaltyPerks.map((perk, index) => (
                <ScrollReveal
                  key={perk.title}
                  direction="up"
                  delay={index * 120}
                  className="h-full"
                >
                  <article className="flex h-full flex-col justify-between rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-primary">
                        {perk.title}
                      </h3>
                      <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground/70">
                        {perk.summary}
                      </p>
                      <p className="text-sm text-muted-foreground md:text-base/relaxed">
                        {perk.description}
                      </p>
                    </div>
                    <div className="mt-6">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-center border-border/70 text-sm font-semibold text-primary hover:border-transparent hover:bg-[#BE446C] hover:text-white"
                      >
                        <Link href="/account/profile">Unlock perk &rarr;</Link>
                      </Button>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section> */}

        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15" />
          </div>
          <div className="relative z-10">
            <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
              <ScrollReveal
                className="mx-auto max-w-2xl space-y-4 text-center"
                direction="up"
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Bundle Savings & Gift Sets
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Mix and match textures, tones, and lengths—each bundle
                  includes exclusive savings and curated extras.
                </p>
              </ScrollReveal>
              <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {bundleOffers.map((bundle, index) => (
                  <ScrollReveal
                    key={bundle.title}
                    direction="up"
                    delay={index * 100}
                    className="h-full"
                  >
                    <article className="flex h-full flex-col rounded-3xl border border-border/60 bg-card/80 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-primary">
                          {bundle.title}
                        </h3>
                        <span className="rounded-full bg-primary/20 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary whitespace-nowrap">
                          {bundle.savings}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground md:text-base/relaxed">
                        {bundle.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                        {bundle.inclusions.map((inclusion) => (
                          <li
                            key={inclusion}
                            className="rounded-full border border-border/50 bg-background/70 px-3 py-1"
                          >
                            {inclusion}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-6">
                        <Button
                          asChild
                          className="w-full hover:bg-[#BE446C] hover:text-white"
                        >
                          <Link href="/cart">Add bundle to cart</Link>
                        </Button>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal
              className="mx-auto max-w-2xl space-y-4 text-center"
              direction="up"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Featured Promotions
              </h2>
              <p className="text-muted-foreground md:text-lg lg:text-base/relaxed">
                Each offer is curated to pair with the season's textures and
                your styling rituals. Quantities are limited, so reserve early.
              </p>
            </ScrollReveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {featuredPromotions.map((promotion, index) => (
                <ScrollReveal
                  key={promotion.title}
                  direction="up"
                  delay={index * 120}
                  className="h-full"
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={promotion.image}
                        alt={promotion.title}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-5 left-5 inline-flex items-center rounded-full bg-primary/90 px-5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-primary-foreground whitespace-nowrap">
                        {promotion.highlight}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col space-y-4 p-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-primary">
                          {promotion.title}
                        </h3>
                        <p className="text-sm text-muted-foreground md:text-base/relaxed">
                          {promotion.description}
                        </p>
                      </div>
                      <div className="mt-auto space-y-2 text-sm">
                        <div className="flex items-center justify-between rounded-md border border-border/70 bg-background/70 px-3 py-2 font-medium tracking-[0.35em] text-xs uppercase text-muted-foreground">
                          <span>Code</span>
                          <span>{promotion.code}</span>
                        </div>
                        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
                          {promotion.validThrough}
                        </p>
                      </div>
                      <div className="pt-2">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full justify-center border-border/70 text-sm font-semibold text-primary transition-colors hover:border-transparent hover:bg-[#BE446C] hover:text-white"
                        >
                          <Link href={promotion.href}>View details &rarr;</Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
<section className="relative overflow-hidden border-y border-border/40 bg-background pt-10 pb-3 md:pt-14 md:pb-4">
  {/* Background */}
  <div
    className="pointer-events-none absolute inset-0 bg-[url('/silk-scarves-category.jpg')] bg-cover bg-center bg-fixed"
    role="presentation"
    aria-hidden="true"
  />
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70" />

  <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6">
    {/* Header */}
    <ScrollReveal className="text-center mb-8 max-w-3xl mx-auto" direction="up">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
        On the Horizon
      </p>
      <h2 className="text-4xl font-bold mt-3 mb-4 sm:text-5xl">
        Upcoming Drops & Experiences
      </h2>
      <p className="text-muted-foreground text-base md:text-lg mb-6">
        Secure insider access to the collaborations and styling services arriving next. 
        Loyalty members receive first invitations.
      </p>
      <Button
        asChild
        size="lg"
        className="px-8 hover:bg-[#BE446C] hover:text-white"
      >
        <Link href="/account/profile">Reserve your spot</Link>
      </Button>
    </ScrollReveal>

    {/* Layout */}
    <div className="relative grid gap-8 lg:grid-cols-3 items-end">
      {/* Left Column */}
      <div className="flex flex-col items-center gap-5 order-2 lg:order-1">
        {/* Left Card (appears after woman animates in) */}
        <ScrollReveal
          direction="up"
          delay={400}
          className="w-full max-w-[360px] rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            {upcomingDrops[0].launchDate}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-primary">{upcomingDrops[0].title}</h3>
          <p className="mt-2 text-sm text-muted-foreground md:text-base/relaxed">
            {upcomingDrops[0].description}
          </p>
        </ScrollReveal>

        {/* Left Woman (appears first, below card visually) */}
        <ScrollReveal direction="left" delay={100} className="flex justify-center items-end">
          <Image
            src="/scarfWomenStanding1.png"
            alt="Woman wearing a scarf from the upcoming collection"
            width={780}
            height={1150}
            className="max-h-[1100px] w-auto object-contain object-bottom translate-y-[50px]"
          />
        </ScrollReveal>
      </div>

      {/* Center Card (appears last, from below) */}
      <div className="flex flex-col items-center justify-end order-1 lg:order-2 -mt-36 lg:-mt-72">
        <ScrollReveal
          direction="up"
          delay={1200}
          className="relative z-10 w-full max-w-[400px] rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            {upcomingDrops[2].launchDate}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-primary">{upcomingDrops[2].title}</h3>
          <p className="mt-2 text-sm text-muted-foreground md:text-base/relaxed">
            {upcomingDrops[2].description}
          </p>
        </ScrollReveal>
      </div>

      {/* Right Column */}
      <div className="flex flex-col items-center gap-5 order-3 lg:order-3">
        {/* Right Card (after right woman animates in) */}
        <ScrollReveal
          direction="up"
          delay={950}
          className="w-full max-w-[360px] rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            {upcomingDrops[1].launchDate}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-primary">{upcomingDrops[1].title}</h3>
          <p className="mt-2 text-sm text-muted-foreground md:text-base/relaxed">
            {upcomingDrops[1].description}
          </p>
        </ScrollReveal>

        {/* Right Woman (comes before right card visually) */}
        <ScrollReveal direction="right" delay={700} className="flex justify-center items-end">
          <Image
            src="/scarfWomenStanding2.png"
            alt="Woman showcasing upcoming collection"
            width={780}
            height={1150}
            className="max-h-[1100px] w-auto object-contain object-bottom translate-y-[50px]"
          />
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>
      

        <section className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <ScrollReveal direction="up" className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Redeeming Your Promotion
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Every offer is designed to feel intuitive. Follow these quick
                  steps to secure your incentive and enjoy concierge-level
                  support along the way.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={120} className="h-full">
                <ol className="space-y-4">
                  {redemptionSteps.map((step, index) => (
                    <li
                      key={step.title}
                      className="flex gap-4 rounded-3xl border border-border/60 bg-card/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-primary">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground md:text-base/relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-muted/20 py-16 md:py-24">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
            <ScrollReveal
              className="mx-auto max-w-2xl space-y-4 text-center"
              direction="up"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Promotion FAQs
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Need quick clarity? We compiled the essentials so you can shop
                your offers with confidence.
              </p>
            </ScrollReveal>
            <div className="mt-10 space-y-4">
              {promoFaqs.map((faq, index) => (
                <ScrollReveal
                  key={faq.question}
                  direction="up"
                  delay={index * 80}
                  className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <h3 className="text-lg font-semibold text-primary">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base/relaxed">
                    {faq.answer}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-border/40 py-16 md:py-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
          </div>
          <div className="relative z-10">
            <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
              <ScrollReveal
                className="mx-auto max-w-2xl space-y-6 text-center"
                direction="up"
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready for Your Next Signature Layer?
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Build your scarf wardrobe with thoughtful perks, seasonal
                  previews, and guidance from our stylists. Your next wrap is
                  already waiting.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="px-8 hover:bg-[#BE446C] hover:text-white"
                >
                  <Link href="/shop">Explore promotions in store</Link>
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
