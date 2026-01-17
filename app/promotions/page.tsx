import Image from "next/image";
import Link from "next/link";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { getPromotionsBannerSection, getBundleSection, getFeaturedPromotionsSection, getUpcomingDropsSection, getRedeemingSection, getRedemptionStepsSection, getPromotionFaqsSection, getFaqsRepeaterSection, getSignatureLayerSection } from "@/lib/services/cms-service";
import type { CmsSection } from "@/lib/types/cms";
import { apiService } from "@/lib/api-client";

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

// Bundle type interface
interface BundleData {
  id: number;
  name: string;
  slug: string;
  description: string;
  discount_type: string;
  discount_value: number;
  total_price: number;
  bundle_price: number;
  savings: number;
  savings_text: string;
  status: boolean;
  inclusions: string[];
  products_count: number;
  created_at: string;
}

export default async function PromotionsPage() {
  // Fetch banner data from CMS
  let bannerSection: CmsSection | null = null
  let bundleSection: CmsSection | null = null
  let featuredPromotionsSection: CmsSection | null = null
  let upcomingDropsSection: CmsSection | null = null
  let redeemingSection: CmsSection | null = null
  let redemptionStepsData: Array<{ title: string; detail: string }> = []
  let promotionFaqsSection: CmsSection | null = null
  let faqsData: Array<{ question: string; answer: string }> = []
  let signatureLayerSection: CmsSection | null = null
  let bundles: BundleData[] = []
  let productsWithCoupons: any[] = []
  
  try {
    bannerSection = await getPromotionsBannerSection('promotions')
    bundleSection = await getBundleSection('promotions')
    featuredPromotionsSection = await getFeaturedPromotionsSection('promotions')
    upcomingDropsSection = await getUpcomingDropsSection('promotions')
    redeemingSection = await getRedeemingSection('promotions')
    redemptionStepsData = await getRedemptionStepsSection('promotions')
    promotionFaqsSection = await getPromotionFaqsSection('promotions')
    faqsData = await getFaqsRepeaterSection('promotions')
    signatureLayerSection = await getSignatureLayerSection('promotions')
    
    // Fetch bundles from API
    const bundlesResponse = await apiService.getBundles()
    bundles = bundlesResponse.data || []
    
    // Fetch products with coupons from API
    const productsResponse = await apiService.getProducts({ has_coupon: true })
    productsWithCoupons = productsResponse.data || []
  } catch (error) {
    console.error("Error loading promotions page data:", error)
  }

  // Extract banner data from CMS
  const defaultTitle = "Current Offers & Exclusives"
  const defaultHeading = "Promotions Crafted Around You"
  const defaultDescription = "Discover seasonal savings, loyalty moments, and limited drops designed to elevate every wrap in your wardrobe."
  const defaultImage = "/promotional-banner-for-scarves.jpg"
  const defaultButton1 = "Shop the edit"
  const defaultButton2 = "Join loyalty"

  const title = bannerSection?.fields?.["Title"]?.value || defaultTitle
  const heading = bannerSection?.fields?.["Heading"]?.value || defaultHeading
  const descriptionHtml = bannerSection?.fields?.["Description"]?.value || defaultDescription
  const imageUrl = bannerSection?.fields?.["Image"]?.url || bannerSection?.fields?.["Image"]?.value || defaultImage
  const button1Text = bannerSection?.fields?.["Button 1"]?.value || defaultButton1
  const button2Text = bannerSection?.fields?.["Button 2"]?.value || defaultButton2

  // Process description: strip HTML tags and decode entities
  const processDescription = (html: string): string => {
    return html
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
      .replace(/&amp;/g, "&") // Replace &amp; with &
      .replace(/&lt;/g, "<") // Replace &lt; with <
      .replace(/&gt;/g, ">") // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'") // Replace &#39; with '
      .trim()
  }

  const description = processDescription(descriptionHtml)

  // Extract bundle section data from CMS
  const defaultBundleTitle = "Bundle Savings & Gift Sets"
  const defaultBundleDescription = "Mix and match textures, tones, and lengths—each bundle includes exclusive savings and curated extras."

  const bundleTitle = bundleSection?.fields?.["Title"]?.value || defaultBundleTitle
  const bundleDescriptionHtml = bundleSection?.fields?.["Description"]?.value || defaultBundleDescription
  const bundleDescription = processDescription(bundleDescriptionHtml)

  // Extract featured promotions section data from CMS
  const defaultFeaturedPromotionsTitle = "Featured Promotions"
  const defaultFeaturedPromotionsDescription = "Each offer is curated to pair with the season's textures and your styling rituals. Quantities are limited, so reserve early."

  const featuredPromotionsTitle = featuredPromotionsSection?.fields?.["Title"]?.value || defaultFeaturedPromotionsTitle
  const featuredPromotionsDescriptionHtml = featuredPromotionsSection?.fields?.["Description"]?.value || defaultFeaturedPromotionsDescription
  const featuredPromotionsDescription = processDescription(featuredPromotionsDescriptionHtml)

  // Extract upcoming drops section data from CMS
  const defaultUpcomingDropsTitle = "On the Horizon"
  const defaultUpcomingDropsHeading = "Upcoming Drops & Experiences"
  const defaultUpcomingDropsDescription = "Secure insider access to the collaborations and styling services arriving next. Loyalty members receive first invitations."
  const defaultUpcomingDropsButtonText = "Reserve your spot"
  const defaultUpcomingDropsImage = "/silk-scarves-category.jpg"

  const upcomingDropsTitle = upcomingDropsSection?.fields?.["Title"]?.value || defaultUpcomingDropsTitle
  const upcomingDropsHeading = upcomingDropsSection?.fields?.["Heading"]?.value || defaultUpcomingDropsHeading
  const upcomingDropsDescriptionHtml = upcomingDropsSection?.fields?.["Description"]?.value || defaultUpcomingDropsDescription
  const upcomingDropsDescription = processDescription(upcomingDropsDescriptionHtml)
  const upcomingDropsButtonText = upcomingDropsSection?.fields?.["Button Text"]?.value || defaultUpcomingDropsButtonText
  const upcomingDropsImageUrl = upcomingDropsSection?.fields?.["Image"]?.url || upcomingDropsSection?.fields?.["Image"]?.value || defaultUpcomingDropsImage

  // Extract redeeming section data from CMS
  const defaultRedeemingTitle = "Redeeming Your Promotion"
  const defaultRedeemingDescription = "Every offer is designed to feel intuitive. Follow these quick steps to secure your incentive and enjoy concierge-level support along the way."

  const redeemingTitle = redeemingSection?.fields?.["Title"]?.value || defaultRedeemingTitle
  const redeemingDescriptionHtml = redeemingSection?.fields?.["Description"]?.value || defaultRedeemingDescription
  const redeemingDescription = processDescription(redeemingDescriptionHtml)

  // Use CMS data for redemption steps if available, otherwise fallback to hardcoded
  const redemptionSteps = redemptionStepsData.length > 0 ? redemptionStepsData : [
    {
      title: "Select your pieces",
      detail: "Explore curated edits or filter by material to find the silhouettes that suit your season.",
    },
    {
      title: "Apply the incentive",
      detail: "Add the promotion code at checkout or rely on eligible perks that apply automatically.",
    },
    {
      title: "Enjoy the extras",
      detail: "Receive tracking, care tips, and priority stylist support with every promotional order.",
    },
  ]

  // Extract promotion FAQs section data from CMS
  const defaultPromotionFaqsTitle = "Promotion FAQs"
  const defaultPromotionFaqsDescription = "Need quick clarity? We compiled the essentials so you can shop your offers with confidence."

  const promotionFaqsTitle = promotionFaqsSection?.fields?.["Title"]?.value || defaultPromotionFaqsTitle
  const promotionFaqsDescriptionHtml = promotionFaqsSection?.fields?.["Description"]?.value || defaultPromotionFaqsDescription
  const promotionFaqsDescription = processDescription(promotionFaqsDescriptionHtml)

  // Use CMS data for FAQs if available, otherwise fallback to hardcoded
  const promoFaqs = faqsData.length > 0 ? faqsData : [
    {
      question: "Can I combine multiple promotion codes on one order?",
      answer: "Most promotions are single-use per checkout. Loyalty perks like free express shipping will still apply automatically where eligible.",
    },
    {
      question: "How do I know when a promotion expires?",
      answer: "Each offer lists its end date in the details above. We also send reminder emails 48 hours before a promotion closes.",
    },
    {
      question: "Do promotional purchases qualify for returns or exchanges?",
      answer: "Absolutely. All scarves purchased with promotions follow our standard 30-day return and exchange policy as long as tags remain attached.",
    },
  ]

  // Extract signature layer section data from CMS
  const defaultSignatureLayerTitle = "Ready for Your Next Signature Layer?"
  const defaultSignatureLayerDescription = "Build your scarf wardrobe with thoughtful perks, seasonal previews, and guidance from our stylists. Your next wrap is already waiting."
  const defaultSignatureLayerButtonText = "Explore promotions in store"

  const signatureLayerTitle = signatureLayerSection?.fields?.["Title"]?.value || defaultSignatureLayerTitle
  const signatureLayerDescriptionHtml = signatureLayerSection?.fields?.["Description"]?.value || defaultSignatureLayerDescription
  const signatureLayerDescription = processDescription(signatureLayerDescriptionHtml)
  const signatureLayerButtonText = signatureLayerSection?.fields?.["Button Text"]?.value || defaultSignatureLayerButtonText

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1 bg-background">
        <section className="relative overflow-hidden border-b border-border/40 bg-background">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url(${imageUrl})`,
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
                  {title}
                </p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                  {heading}
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {description}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="px-8 hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="/shop">{button1Text}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="/account/profile">{button2Text}</Link>
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
                  {bundleTitle}
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  {bundleDescription}
                </p>
              </ScrollReveal>
              <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {bundles.length > 0 ? (
                  bundles.map((bundle, index) => (
                    <ScrollReveal
                      key={bundle.id}
                      direction="up"
                      delay={index * 100}
                      className="h-full"
                    >
                      <article className="flex h-full flex-col rounded-3xl border border-border/60 bg-card/80 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-primary">
                            {bundle.name}
                          </h3>
                          <span className="rounded-full bg-primary/20 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary whitespace-nowrap">
                            {bundle.savings_text}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground md:text-base/relaxed">
                          {bundle.description}
                        </p>
                        {bundle.inclusions && bundle.inclusions.length > 0 && (
                          <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                            {bundle.inclusions.map((inclusion, idx) => (
                              <li
                                key={idx}
                                className="rounded-full border border-border/50 bg-background/70 px-3 py-1"
                              >
                                {inclusion}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="mt-auto pt-6">
                          <Button
                            asChild
                            className="w-full hover:bg-[#BE446C] hover:text-white"
                          >
                            <Link href={`/bundles/${bundle.slug}`}>Add bundle to cart</Link>
                          </Button>
                        </div>
                      </article>
                    </ScrollReveal>
                  ))
                ) : (
                  <div className="col-span-full text-center text-muted-foreground py-8">
                    No bundles available at the moment.
                  </div>
                )}
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
                {featuredPromotionsTitle}
              </h2>
              <p className="text-muted-foreground md:text-lg lg:text-base/relaxed">
                {featuredPromotionsDescription}
              </p>
            </ScrollReveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {productsWithCoupons.length > 0 ? (
                productsWithCoupons.map((product, index) => (
                  <ScrollReveal
                    key={product.id}
                    direction="up"
                    delay={index * 120}
                    className="h-full"
                  >
                    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground">No Image</span>
                          </div>
                        )}
                        {product.coupon && (
                          <div className="absolute top-5 left-5 inline-flex items-center rounded-full bg-red-600 px-5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap">
                            {product.coupon.discount_text} - {product.coupon.name}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col space-y-4 p-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-primary">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground md:text-base/relaxed line-clamp-2">
                            {product.description ? product.description.replace(/<[^>]*>/g, "").substring(0, 100) + "..." : ""}
                          </p>
                        </div>
                        <div className="mt-auto space-y-2 text-sm">
                          {product.coupon && (
                            <div className="flex items-center justify-between rounded-md border border-border/70 bg-background/70 px-3 py-2 font-medium tracking-[0.35em] text-xs uppercase text-muted-foreground">
                              <span>Code</span>
                              <span>{product.coupon.code}</span>
                            </div>
                          )}
                          <p className="text-lg font-semibold text-primary">
                            PKR {product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="pt-2">
                          <Button
                            asChild
                            variant="outline"
                            className="w-full justify-center border-border/70 text-sm font-semibold text-primary transition-colors hover:border-transparent hover:bg-[#BE446C] hover:text-white"
                          >
                            <Link href={`/shop/${product.slug}`}>View details &rarr;</Link>
                          </Button>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground py-8">
                  No products with coupons available at the moment.
                </div>
              )}
            </div>
          </div>
        </section>
<section className="relative overflow-hidden border-y border-border/40 bg-background pt-10 pb-3 md:pt-14 md:pb-4">
  {/* Background */}
  <div
    className="pointer-events-none absolute inset-0 bg-cover bg-center bg-fixed"
    style={{ backgroundImage: `url('${upcomingDropsImageUrl}')` }}
    role="presentation"
    aria-hidden="true"
  />
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70" />

  <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6">
    {/* Header */}
    <ScrollReveal className="text-center mb-8 max-w-3xl mx-auto" direction="up">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
        {upcomingDropsTitle}
      </p>
      <h2 className="text-4xl font-bold mt-3 mb-4 sm:text-5xl">
        {upcomingDropsHeading}
      </h2>
      <p className="text-muted-foreground text-base md:text-lg mb-6">
        {upcomingDropsDescription}
      </p>
      <Button
        asChild
        size="lg"
        className="px-8 hover:bg-[#BE446C] hover:text-white"
      >
        <Link href="/account/profile">{upcomingDropsButtonText}</Link>
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
                  {redeemingTitle}
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  {redeemingDescription}
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
                {promotionFaqsTitle}
              </h2>
              <p className="text-muted-foreground md:text-lg">
                {promotionFaqsDescription}
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
                  {signatureLayerTitle}
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  {signatureLayerDescription}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="px-8 hover:bg-[#BE446C] hover:text-white"
                >
                  <Link href="/shop">{signatureLayerButtonText}</Link>
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
