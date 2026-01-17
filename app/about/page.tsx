import Image from "next/image"
import Link from "next/link"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { getGradientFromPalette } from "@/lib/gradient-palette"
import { getAboutBannerSection, getCraftedSection, getAboutUsRepeaterSection, getFromInspirationSection, getCraftsmanshipStepsSection, getMilestonesSection, getTimelineSection, getCommitmentsSection } from "@/lib/services/cms-service"
import type { CmsSection } from "@/lib/types/cms"
import type { BannerItemData } from "@/lib/types/cms"




export default async function AboutPage() {
  // Fetch banner data from CMS
  let bannerSection: CmsSection | null = null
  let craftedSection: CmsSection | null = null
  let aboutUsRepeaterItems: BannerItemData[] = []
  let fromInspirationSection: CmsSection | null = null
  let craftsmanshipStepsItems: BannerItemData[] = []
  let milestonesSection: CmsSection | null = null
  let timelineItems: BannerItemData[] = []
  let commitmentsSection: CmsSection | null = null
  
  try {
    bannerSection = await getAboutBannerSection('about-us')
    craftedSection = await getCraftedSection('about-us')
    aboutUsRepeaterItems = await getAboutUsRepeaterSection('about-us')
    fromInspirationSection = await getFromInspirationSection('about-us')
    craftsmanshipStepsItems = await getCraftsmanshipStepsSection('about-us')
    milestonesSection = await getMilestonesSection('about-us')
    timelineItems = await getTimelineSection('about-us')
    commitmentsSection = await getCommitmentsSection('about-us')
  } catch (error) {
    console.error("Error loading about page data:", error)
  }

  // Extract banner data from CMS
  const defaultTitle = "Wrapped in meaning"
  const defaultHeading = "About Us"
  const defaultDescription = "Every scarf we design starts with a story: of the women who will wear it, the artisans who will craft it, and the moments it will elevate. We blend timeless craft with modern design so your daily rituals feel a little more considered, a little more you."
  const defaultImage = "/diverse-group-of-women-wearing-scarves-smiling.jpg"
  const defaultButton1 = "Explore our story"
  const defaultButton2 = "Meet the team"

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

  // Extract crafted section data from CMS
  const defaultCraftedTitle = "Crafted with intention"
  const defaultCraftedHeading = "The heart behind every layer"
  const defaultCraftedDescription = "From loom to wardrobe, our collective of artisans and stylists collaborate so your scarves feel as meaningful as they look. Explore the pillars that guide our work."

  const craftedTitle = craftedSection?.fields?.["Title"]?.value || defaultCraftedTitle
  const craftedHeading = craftedSection?.fields?.["Heading"]?.value || defaultCraftedHeading
  const craftedDescriptionHtml = craftedSection?.fields?.["Description"]?.value || defaultCraftedDescription
  const craftedDescription = processDescription(craftedDescriptionHtml)

  // Transform CMS repeater items to highlights format
  const transformRepeaterToHighlights = (items: BannerItemData[]) => {
    return items.map((item) => {
      const title = item["Title"]?.value || ""
      const heading = item["Heading"]?.value || ""
      const descriptionHtml = item["Description"]?.value || ""
      const imageUrl = item["Image"]?.url || item["Image"]?.value || "/placeholder.svg"
      
      // Process description: split into paragraphs
      const descriptionText = processDescription(descriptionHtml)
      const descriptionParagraphs = descriptionText
        .split(/\n\s*\n/) // Split by double newlines
        .filter(p => p.trim().length > 0) // Remove empty paragraphs
      
      return {
        title,
        summary: heading,
        description: descriptionParagraphs.length > 0 ? descriptionParagraphs : [descriptionText],
        image: imageUrl,
      }
    })
  }

  // Use CMS data if available, otherwise use defaults
  const highlights = aboutUsRepeaterItems.length > 0 
    ? transformRepeaterToHighlights(aboutUsRepeaterItems)
    : [
        {
          title: "Our Story",
          image: "/scarf-making-process.jpg",
          summary: "Hand-loomed beginnings, modern silhouettes.",
          description: [
            "Scarf began at a single artisan table where we explored how color, texture, and heritage patterns could meet contemporary wardrobes.",
            "Today, we collaborate with designers and craftspeople across the globe, blending tradition with innovation so every scarf feels personal and purposeful.",
          ],
        },
        {
          title: "Our Mission",
          image: "/woman-with-elegant-scarf-looking-thoughtfully.jpg",
          summary: "Fashion that uplifts, sourced with care.",
          description: [
            "We empower women to express themselves with pieces that feel luxurious, last for years, and honor the people who craft them.",
            "That means mindful sourcing, small-batch production, and transparent partnerships that keep creativity and ethics equally in focus.",
          ],
        },
        {
          title: "Our Vision",
          image: "/diverse-group-of-women-wearing-scarves-smiling.jpg",
          summary: "Building a global community of scarf lovers.",
          description: [
            "We imagine a future where every wrap tells a story and celebrates the cultures that inspire it.",
            "From digital styling sessions to limited-edition artist collaborations, we are creating spaces where confidence and craft meet.",
          ],
        },
      ]

  // Extract "From inspiration" section data from CMS
  const defaultFromInspirationTitle = "How a scarf comes to life"
  const defaultFromInspirationHeading = "From inspiration boards to your wardrobe"
  const defaultFromInspirationDescription = "Our atelier process nurtures every layer of craftsmanship. Each phase keeps artistry, responsible sourcing, and wearer experience in equilibrium so your scarf feels intentional from the first drape."

  const fromInspirationTitle = fromInspirationSection?.fields?.["Title"]?.value || defaultFromInspirationTitle
  const fromInspirationHeading = fromInspirationSection?.fields?.["Heading"]?.value || defaultFromInspirationHeading
  const fromInspirationDescriptionHtml = fromInspirationSection?.fields?.["Description"]?.value || defaultFromInspirationDescription
  const fromInspirationDescription = processDescription(fromInspirationDescriptionHtml)

  // Transform CMS repeater items to craftsmanship steps format
  const transformStepsToCraftsmanship = (items: BannerItemData[]) => {
    return items.map((item) => {
      const phase = item["Title"]?.value || ""
      const highlight = item["Heading"]?.value || ""
      const descriptionHtml = item["Description"]?.value || ""
      const description = processDescription(descriptionHtml)
      
      return {
        phase,
        highlight,
        description,
      }
    })
  }

  // Use CMS data if available, otherwise use defaults
  const craftsmanshipSteps = craftsmanshipStepsItems.length > 0
    ? transformStepsToCraftsmanship(craftsmanshipStepsItems)
    : [
        {
          phase: "Concept Studio",
          highlight: "Colorwork & storyboarding sessions",
          description:
            "We begin every collection sketching palettes pulled from travel journals, archival textiles, and community mood boards. Each motif is reviewed alongside wear-testing feedback to ensure modern versatility.",
        },
        {
          phase: "Artisan Collaboration",
          highlight: "48 partner ateliers across Morocco, Turkey, and India",
          description:
            "Our artisan partners translate concepts into woven samples. We iterate on drape, hand-feel, and finishing details until the piece represents both the maker's signature and our brand standards.",
        },
        {
          phase: "Responsible Production",
          highlight: "Small batches, traceable materials",
          description:
            "We produce in limited runs using certified silks, organic cottons, and recycled blends. Batch sizes stay small to reduce waste while allowing for bespoke dye baths and hand-rolled edges.",
        },
        {
          phase: "Stylist Rituals",
          highlight: "Guides, fittings, and concierge care",
          description:
            "Once a scarf arrives, our stylist team develops wear guides, pairing suggestions, and care notes so you feel supported from unboxing to everyday styling.",
        },
      ]

  // Extract "Milestones we cherish" section data from CMS
  const defaultMilestonesTitle = "Milestones we cherish"
  const defaultMilestonesHeading = "A timeline of shared growth"
  const defaultMilestonesDescription = "Our journey is a collective story written alongside makers, stylists, and the community of wearers who bring each scarf to life."

  const milestonesTitle = milestonesSection?.fields?.["Title"]?.value || defaultMilestonesTitle
  const milestonesHeading = milestonesSection?.fields?.["Heading"]?.value || defaultMilestonesHeading
  const milestonesDescriptionHtml = milestonesSection?.fields?.["Description"]?.value || defaultMilestonesDescription
  const milestonesDescription = processDescription(milestonesDescriptionHtml)

  // Transform CMS repeater items to milestones format
  const transformTimelineToMilestones = (items: BannerItemData[]) => {
    return items.map((item) => {
      const year = item["Year"]?.value || ""
      const title = item["Title"]?.value || ""
      const descriptionHtml = item["Description"]?.value || ""
      const description = processDescription(descriptionHtml)
      
      return {
        year,
        title,
        description,
      }
    })
  }

  // Use CMS data if available, otherwise use defaults
  const milestones = timelineItems.length > 0
    ? transformTimelineToMilestones(timelineItems)
    : [
        {
          year: "2016",
          title: "First Capsule Launch",
          description: "Released a six-piece silk collection woven with our founding atelier in Marrakech.",
        },
        {
          year: "2018",
          title: "Global Collective",
          description: "Partnered with women-led studios in Istanbul and Jaipur to introduce artisan block prints.",
        },
        {
          year: "2021",
          title: "Digital Styling Studio",
          description: "Opened virtual fittings with certified colorists, expanding personal styling to every region.",
        },
        {
          year: "2024",
          title: "Circular Care Program",
          description: "Launched repair and refresh services so beloved scarves stay in rotation for years.",
        },
      ]

  // Extract "Commitments beyond the loom" section data from CMS
  const defaultCommitmentsTitle = "Commitments beyond the loom"
  const defaultCommitmentsHeading = "Promises we stand behind"
  const defaultCommitmentsDescription = "Numbers only matter when they reflect real care. These metrics guide every decision, ensuring the scarves you choose honor people, planet, and personal expression."

  const commitmentsTitle = commitmentsSection?.fields?.["Title"]?.value || defaultCommitmentsTitle
  const commitmentsHeading = commitmentsSection?.fields?.["Heading"]?.value || defaultCommitmentsHeading
  const commitmentsDescriptionHtml = commitmentsSection?.fields?.["Description"]?.value || defaultCommitmentsDescription
  const commitmentsDescription = processDescription(commitmentsDescriptionHtml)

  // Transform CMS fields to brandPromises format
  const transformCommitmentsToPromises = (section: CmsSection | null) => {
    if (!section || !section.fields) {
      return [
        {
          value: "82%",
          label: "natural fibers",
          description: "Across our annual collections are woven in silk, cotton, and wool certified for ethical sourcing.",
        },
        {
          value: "48",
          label: "artisan partners",
          description: "Independent ateliers receive fair pay, mentorship, and shared design credit on every release.",
        },
        {
          value: "12k+",
          label: "styling sessions",
          description: "One-on-one appointments completed globally, guiding clients through color, drape, and care.",
        },
      ]
    }

    const promises = []
    
    // Extract Box1, Box2, Box3 data
    for (let i = 1; i <= 3; i++) {
      const boxNo = section.fields[`Box${i} No`]?.value || ""
      const boxTitle = section.fields[`Box${i} Title`]?.value || ""
      const boxDescriptionHtml = section.fields[`Box${i} Description`]?.value || ""
      const boxDescription = processDescription(boxDescriptionHtml)
      
      if (boxNo || boxTitle || boxDescription) {
        promises.push({
          value: boxNo,
          label: boxTitle,
          description: boxDescription,
        })
      }
    }

    // If no boxes found, return defaults
    return promises.length > 0 ? promises : [
      {
        value: "82%",
        label: "natural fibers",
        description: "Across our annual collections are woven in silk, cotton, and wool certified for ethical sourcing.",
      },
      {
        value: "48",
        label: "artisan partners",
        description: "Independent ateliers receive fair pay, mentorship, and shared design credit on every release.",
      },
      {
        value: "12k+",
        label: "styling sessions",
        description: "One-on-one appointments completed globally, guiding clients through color, drape, and care.",
      },
    ]
  }

  const brandPromises = transformCommitmentsToPromises(commitmentsSection)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border/40 bg-background">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${imageUrl})` }}
            role="presentation"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70" />
          <div className="relative z-10">
            <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24 lg:py-28">
              <ScrollReveal className="mx-auto max-w-3xl space-y-6 text-center" direction="up">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">{title}</p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{heading}</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {description}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="px-8 hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="#our-pillars">{button1Text}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-border/70 text-muted-foreground hover:border-transparent hover:bg-[#BE446C] hover:text-white"
                  >
                    <Link href="/contact">{button2Text}</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="our-pillars" className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="mx-auto max-w-3xl text-center" direction="up">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">{craftedTitle}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {craftedHeading}
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                {craftedDescription}
              </p>
            </ScrollReveal>
            <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
              {highlights.map((highlight, index) => {
                const gradient = getGradientFromPalette(index)
                return (
                  <ScrollReveal key={highlight.title} delay={index * 120} className="h-full" direction="up">
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={highlight.image}
                          alt={highlight.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div
                          className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                        />
                        <div
                          className={`pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t ${gradient} opacity-95 transition-opacity duration-500 group-hover:opacity-100`}
                        />
                      </div>
                      <div className="flex flex-1 flex-col space-y-4 p-6 text-center">
                        <div className="space-y-2">
                          <h2 className="text-2xl font-semibold tracking-tight text-primary">{highlight.title}</h2>
                          <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground/70">
                            {highlight.summary}
                          </p>
                        </div>
                        <div className="space-y-3 text-sm text-muted-foreground md:text-base/relaxed">
                          {highlight.description.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </article>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-muted/10 py-16 md:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <ScrollReveal className="space-y-5 text-center lg:text-left" direction="up">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">{fromInspirationTitle}</p>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {fromInspirationHeading}
              </h2>
              <p className="text-muted-foreground md:text-lg">
                {fromInspirationDescription}
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={120} className="h-full">
              <ol className="space-y-6">
                {craftsmanshipSteps.map((step, index) => (
                  <li
                    key={step.phase}
                    className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-1 flex h-10 w-30 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                      <div className="space-y-2 text-left">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">{step.phase}</p>
                          <p className="text-sm font-medium text-primary/80">{step.highlight}</p>
                        </div>
                        <p className="text-sm text-muted-foreground md:text-base/relaxed">{step.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </section>

        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/8 to-primary/15" />
          </div>
          <div className="relative z-10">
            <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
              <ScrollReveal className="mx-auto max-w-3xl space-y-4 text-center" direction="up">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">{milestonesTitle}</p>
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{milestonesHeading}</h2>
                <p className="text-muted-foreground md:text-lg">
                  {milestonesDescription}
                </p>
              </ScrollReveal>
              <div className="mt-12 space-y-8 border-l border-border/60 pl-6 md:pl-10">
                {milestones.map((milestone, index) => (
                  <ScrollReveal
                    key={`${milestone.year}-${milestone.title}`}
                    direction="up"
                    delay={index * 120}
                    className="relative rounded-3xl border border-border/50 bg-card/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="absolute -left-3 top-6 h-5 w-5 rounded-full border-2 border-background bg-primary shadow-sm" />
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">{milestone.year}</p>
                    <h3 className="mt-2 text-xl font-semibold text-primary">{milestone.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground md:text-base/relaxed">{milestone.description}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-muted/5 py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="mx-auto max-w-3xl space-y-4 text-center" direction="up">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">{commitmentsTitle}</p>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{commitmentsHeading}</h2>
              <p className="text-muted-foreground md:text-lg">
                {commitmentsDescription}
              </p>
            </ScrollReveal>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {brandPromises.map((promise, index) => (
                <ScrollReveal
                  key={promise.label}
                  direction="up"
                  delay={index * 120}
                  className="rounded-3xl border border-border/60 bg-card/80 p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <p className="text-4xl font-bold text-primary">{promise.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">{promise.label}</p>
                  <p className="mt-4 text-sm text-muted-foreground md:text-base/relaxed">{promise.description}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
