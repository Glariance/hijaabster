/**
 * CMS Service - Standardized functions for fetching CMS data
 * All CMS data is stored in:
 * - cms_pages (page metadata)
 * - cms_page_sections (sections within a page)
 * - cms_page_section_fields (fields/content within sections)
 */

import { apiService } from '../api-client'
import type { CmsPageResponse, CmsSection, BannerItemData, HeroSliderSlide } from '../types/cms'

/**
 * Get complete page data by slug
 * @param slug - Page slug (default: 'home')
 * @returns Complete CMS page data including all sections
 */
export async function getCmsPageData(slug: string = 'home'): Promise<CmsPageResponse | null> {
  try {
    let data
    if (slug === 'promotions') {
      data = await apiService.getPromotionsPage(slug)
    } else if (slug === 'category') {
      data = await apiService.getCategoryPage(slug)
    } else if (slug === 'shop') {
      data = await apiService.getShopPage(slug)
    } else {
      data = await apiService.getHomePage(slug)
    }
    return data as CmsPageResponse
  } catch (error) {
    console.error(`Error fetching CMS page data for slug "${slug}":`, error)
    return null
  }
}

/**
 * Get a specific section from a CMS page by name
 * @param slug - Page slug (default: 'home')
 * @param sectionName - Name or partial name of the section to find
 * @returns Section data if found, null otherwise
 */
export async function getCmsSection(
  slug: string = 'home',
  sectionName: string
): Promise<CmsSection | null> {
  try {
    const pageData = await getCmsPageData(slug)
    if (!pageData?.page?.sections) {
      return null
    }

    const section = pageData.page.sections.find((section) =>
      section.name.toLowerCase().includes(sectionName.toLowerCase())
    )

    return section || null
  } catch (error) {
    console.error(`Error fetching CMS section "${sectionName}":`, error)
    return null
  }
}

/**
 * Get banner/hero slider data from CMS
 * Finds the first repeater section that contains "banner" in its name
 * @param slug - Page slug (default: 'home')
 * @returns Array of banner items for the hero slider
 */
export async function getBannerData(slug: string = 'home'): Promise<BannerItemData[]> {
  try {
    const bannerSection = await getCmsSection(slug, 'banner')
    
    if (!bannerSection || bannerSection.type !== 'repeater' || !bannerSection.items) {
      console.warn('No banner section found or section is not a repeater type')
      return []
    }

    return bannerSection.items as BannerItemData[]
  } catch (error) {
    console.error('Error fetching banner data:', error)
    return []
  }
}

/**
 * Transform CMS banner items into hero slider slides format
 * @param bannerItems - Array of banner items from CMS
 * @returns Array of formatted slides for the hero slider
 */
export function transformBannerToSlides(bannerItems: BannerItemData[]): HeroSliderSlide[] {
  if (!bannerItems || bannerItems.length === 0) {
    return []
  }

  return bannerItems.map((item, index) => {
    // Strip HTML tags from description if it's HTML
    const description = item["Description"]?.value || ""
    const plainDescription = description.replace(/<[^>]*>/g, "").trim()

    // Get image URL - prefer full URL from API, fallback to value
    const imageUrl = item["Banner Image"]?.url || item["Banner Image"]?.value || "/placeholder.svg"

    // Get button link - prefer Button Link field, fallback to shop page
    const buttonLink = item["Button Link"]?.value || "/shop"

    return {
      id: index + 1,
      image: imageUrl,
      position: "center 30%", // Default position, can be made dynamic if needed
      title: item["Title"]?.value || "",
      description: plainDescription,
      link: buttonLink,
      buttonText: item["Button Text"]?.value || "Shop Now",
    }
  })
}

/**
 * Get formatted hero slider slides directly from CMS
 * This is a convenience function that combines getBannerData and transformBannerToSlides
 * @param slug - Page slug (default: 'home')
 * @returns Array of formatted slides ready for the hero slider component
 */
export async function getHeroSliderSlides(slug: string = 'home'): Promise<HeroSliderSlide[]> {
  try {
    const bannerItems = await getBannerData(slug)
    return transformBannerToSlides(bannerItems)
  } catch (error) {
    console.error('Error getting hero slider slides:', error)
    return []
  }
}

/**
 * Get "Why Shop" section data from CMS
 * Finds the section that contains "why shop" in its name
 * @param slug - Page slug (default: 'home')
 * @returns Section data with fields or null
 */
export async function getWhyShopSection(slug: string = 'home'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'why shop')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Why Shop" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Why Shop" section:', error)
    return null
  }
}

/**
 * Get "Featured Products" section data from CMS
 * Finds the section that contains "featured products" in its name
 * @param slug - Page slug (default: 'home')
 * @returns Section data with fields or null
 */
export async function getFeaturedProductsSection(slug: string = 'home'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'featured products')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Featured Products" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Featured Products" section:', error)
    return null
  }
}

/**
 * Get "Shop by Category" section data from CMS
 * Finds the section that contains "shop by category" in its name
 * @param slug - Page slug (default: 'home')
 * @returns Section data with fields or null
 */
export async function getShopByCategorySection(slug: string = 'home'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'shop by category')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Shop by Category" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Shop by Category" section:', error)
    return null
  }
}

/**
 * Get "Seasonal Promotion" / "Limited Offer" section data from CMS
 * Finds the section that contains "limited offer" or "seasonal promotion" in its name
 * @param slug - Page slug (default: 'home')
 * @returns Section data with fields or null
 */
export async function getPromotionsSection(slug: string = 'home'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'limited offer') || await getCmsSection(slug, 'seasonal promotion')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Promotions" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Promotions" section:', error)
    return null
  }
}

/**
 * Get "Testimonial Content" / "What Our Customers Say" section data from CMS
 * Finds the section that contains "testimonial" in its name (single type for title/description)
 * @param slug - Page slug (default: 'home')
 * @returns Section data with fields or null
 */
export async function getTestimonialSection(slug: string = 'home'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'testimonial content')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Testimonial Content" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Testimonial Content" section:', error)
    return null
  }
}

/**
 * Get testimonials repeater data from CMS
 * Finds the repeater section that contains "testimonials" in its name
 * @param slug - Page slug (default: 'home')
 * @returns Array of testimonial items or empty array
 */
export async function getTestimonialsData(slug: string = 'home'): Promise<BannerItemData[]> {
  try {
    const section = await getCmsSection(slug, 'testimonials')
    
    if (!section || section.type !== 'repeater' || !section.items) {
      console.warn('No "Testimonials" repeater section found or section is not a repeater type')
      return []
    }

    return section.items as BannerItemData[]
  } catch (error) {
    console.error('Error fetching testimonials data:', error)
    return []
  }
}

/**
 * Get "Our Story" / "About Us" section data from CMS
 * Finds the section that contains "our story" in its name
 * @param slug - Page slug (default: 'home')
 * @returns Section data with fields or null
 */
export async function getAboutUsSection(slug: string = 'home'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'our story')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Our Story" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Our Story" section:', error)
    return null
  }
}

/**
 * Get "Our Mission" section data from CMS
 * Finds the section that contains "our mission" in its name
 * @param slug - Page slug (default: 'home')
 * @returns Section data with fields or null
 */
export async function getMissionSection(slug: string = 'home'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'our mission')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Our Mission" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Our Mission" section:', error)
    return null
  }
}

/**
 * Get "Our Vision" section data from CMS
 * Finds the section that contains "our vision" in its name
 * @param slug - Page slug (default: 'home')
 * @returns Section data with fields or null
 */
export async function getVisionSection(slug: string = 'home'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'our vision')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Our Vision" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Our Vision" section:', error)
    return null
  }
}

/**
 * Get "About Us Banner" section data from CMS
 * Finds the section that contains "banner" in its name for the about page
 * @param slug - Page slug (default: 'about')
 * @returns Section data with fields or null
 */
export async function getAboutBannerSection(slug: string = 'about'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'banner')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "About Banner" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "About Banner" section:', error)
    return null
  }
}

/**
 * Get "Crafted with intention" section data from CMS
 * Finds the section that contains "crafted" in its name for the about page
 * @param slug - Page slug (default: 'about-us')
 * @returns Section data with fields or null
 */
export async function getCraftedSection(slug: string = 'about-us'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'crafted')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Crafted" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Crafted" section:', error)
    return null
  }
}

/**
 * Get "About us" repeater section data from CMS
 * Finds the repeater section that contains "about us" in its name for the about page
 * @param slug - Page slug (default: 'about-us')
 * @returns Array of repeater items or empty array
 */
export async function getAboutUsRepeaterSection(slug: string = 'about-us'): Promise<BannerItemData[]> {
  try {
    const section = await getCmsSection(slug, 'about us')
    
    if (!section || section.type !== 'repeater' || !section.items) {
      console.warn('No "About Us" repeater section found or section is not a repeater type')
      return []
    }

    return section.items as BannerItemData[]
  } catch (error) {
    console.error('Error fetching "About Us" repeater section:', error)
    return []
  }
}

/**
 * Get "From inspiration" / "How a scarf comes to life" section data from CMS
 * Finds the section that contains "from inspiration" in its name for the about page
 * @param slug - Page slug (default: 'about-us')
 * @returns Section data with fields or null
 */
export async function getFromInspirationSection(slug: string = 'about-us'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'from inspiration')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "From Inspiration" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "From Inspiration" section:', error)
    return null
  }
}

/**
 * Get craftsmanship steps repeater section data from CMS
 * Finds the repeater section that contains process steps for the about page
 * Looks for repeater sections that come after "from inspiration" section
 * @param slug - Page slug (default: 'about-us')
 * @returns Array of repeater items or empty array
 */
export async function getCraftsmanshipStepsSection(slug: string = 'about-us'): Promise<BannerItemData[]> {
  try {
    const pageData = await getCmsPageData(slug)
    if (!pageData?.page?.sections) {
      return []
    }

    // Find the "from inspiration" section to get its sort_order
    const fromInspirationSection = pageData.page.sections.find((section) =>
      section.name.toLowerCase().includes('from inspiration')
    )

    // Look for repeater sections that come after "from inspiration" or have process-related names
    const stepsSection = pageData.page.sections.find((section) => {
      const name = section.name.toLowerCase()
      const isRepeater = section.type === 'repeater'
      
      if (!isRepeater) return false
      
      // Check if it's after "from inspiration" section
      if (fromInspirationSection && section.sort_order > fromInspirationSection.sort_order) {
        return true
      }
      
      // Or check if name suggests it contains steps/process
      return (
        name.includes('process') || 
        name.includes('step') || 
        name.includes('craftsmanship') ||
        name.includes('atelier')
      )
    })

    if (!stepsSection || !stepsSection.items) {
      console.warn('No craftsmanship steps repeater section found')
      return []
    }

    return stepsSection.items as BannerItemData[]
  } catch (error) {
    console.error('Error fetching craftsmanship steps section:', error)
    return []
  }
}

/**
 * Get "Milestones we cherish" section data from CMS
 * Finds the section that contains "milestones" in its name for the about page
 * @param slug - Page slug (default: 'about-us')
 * @returns Section data with fields or null
 */
export async function getMilestonesSection(slug: string = 'about-us'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'milestones')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Milestones" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Milestones" section:', error)
    return null
  }
}

/**
 * Get timeline/milestones repeater section data from CMS
 * Finds the repeater section that contains timeline items for the about page
 * @param slug - Page slug (default: 'about-us')
 * @returns Array of repeater items or empty array
 */
export async function getTimelineSection(slug: string = 'about-us'): Promise<BannerItemData[]> {
  try {
    const section = await getCmsSection(slug, 'timeline')
    
    if (!section || section.type !== 'repeater' || !section.items) {
      console.warn('No "Timeline" repeater section found or section is not a repeater type')
      return []
    }

    return section.items as BannerItemData[]
  } catch (error) {
    console.error('Error fetching "Timeline" section:', error)
    return []
  }
}

/**
 * Get "Commitments beyond the loom" section data from CMS
 * Finds the section that contains "commitments" in its name for the about page
 * @param slug - Page slug (default: 'about-us')
 * @returns Section data with fields or null
 */
export async function getCommitmentsSection(slug: string = 'about-us'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'commitments')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Commitments" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Commitments" section:', error)
    return null
  }
}

/**
 * Get "Promotions Banner" section data from CMS
 * Finds the section that contains "banner" in its name for the promotions page
 * @param slug - Page slug (default: 'promotions')
 * @returns Section data with fields or null
 */
export async function getPromotionsBannerSection(slug: string = 'promotions'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'banner')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Promotions Banner" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Promotions Banner" section:', error)
    return null
  }
}

/**
 * Get "Bundle Savings & Gift Sets" section data from CMS
 * Finds the section that contains "bundle" in its name for the promotions page
 * @param slug - Page slug (default: 'promotions')
 * @returns Section data with fields or null
 */
export async function getBundleSection(slug: string = 'promotions'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'bundle')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Bundle" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Bundle" section:', error)
    return null
  }
}

/**
 * Get "Featured Promotions" section data from CMS
 * Finds the section that contains "featured promotions" in its name
 * @param slug - Page slug (default: 'promotions')
 * @returns Section data with fields or null
 */
export async function getFeaturedPromotionsSection(slug: string = 'promotions'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'featured promotions')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Featured Promotions" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Featured Promotions" section:', error)
    return null
  }
}

/**
 * Get "On the Horizon" / "Upcoming Drops" section data from CMS
 * @param slug - Page slug (default: 'promotions')
 * @returns Section data with fields or null
 */
export async function getUpcomingDropsSection(slug: string = 'promotions'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'upcoming drops')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Upcoming Drops" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Upcoming Drops" section:', error)
    return null
  }
}

/**
 * Get "Redeeming Your Promotion" section data from CMS
 * @param slug - Page slug (default: 'promotions')
 * @returns Section data with fields or null
 */
export async function getRedeemingSection(slug: string = 'promotions'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'redeeming')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Redeeming" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Redeeming" section:', error)
    return null
  }
}

/**
 * Get redemption steps repeater section data from CMS
 * Finds the repeater section that contains redemption steps
 * @param slug - Page slug (default: 'promotions')
 * @returns Array of redemption step items or empty array
 */
export async function getRedemptionStepsSection(slug: string = 'promotions'): Promise<Array<{ title: string; detail: string }>> {
  try {
    const pageData = await getCmsPageData(slug)
    if (!pageData?.page?.sections) {
      return []
    }

    // Find the repeater section that contains "select your pieces"
    const stepsSection = pageData.page.sections.find((section) => {
      const name = section.name.toLowerCase()
      return section.type === 'repeater' && name.includes('select your pieces')
    })

    if (!stepsSection || !stepsSection.items || !Array.isArray(stepsSection.items)) {
      console.warn('No redemption steps repeater section found')
      return []
    }

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

    // Transform repeater items to match component format
    return stepsSection.items.map((item: any) => ({
      title: item['Heading']?.value || '',
      detail: processDescription(item['Description']?.value || ''),
    })).filter((step: { title: string; detail: string }) => step.title && step.detail)
  } catch (error) {
    console.error('Error fetching redemption steps section:', error)
    return []
  }
}

/**
 * Get "Promotion FAQs" section data from CMS
 * @param slug - Page slug (default: 'promotions')
 * @returns Section data with fields or null
 */
export async function getPromotionFaqsSection(slug: string = 'promotions'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'promotion faqs')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Promotion FAQs" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Promotion FAQs" section:', error)
    return null
  }
}

/**
 * Get FAQs repeater section data from CMS
 * Finds the repeater section that contains FAQs
 * @param slug - Page slug (default: 'promotions')
 * @returns Array of FAQ items or empty array
 */
export async function getFaqsRepeaterSection(slug: string = 'promotions'): Promise<Array<{ question: string; answer: string }>> {
  try {
    const pageData = await getCmsPageData(slug)
    if (!pageData?.page?.sections) {
      return []
    }

    // Find the repeater section that contains FAQs
    const faqsSection = pageData.page.sections.find((section) => {
      const name = section.name.toLowerCase()
      return section.type === 'repeater' && name.includes('faqs')
    })

    if (!faqsSection || !faqsSection.items || !Array.isArray(faqsSection.items)) {
      console.warn('No FAQs repeater section found')
      return []
    }

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

    // Transform repeater items to match component format
    return faqsSection.items.map((item: any) => ({
      question: processDescription(item['Question']?.value || ''),
      answer: processDescription(item['Answer']?.value || ''),
    })).filter((faq: { question: string; answer: string }) => faq.question && faq.answer)
  } catch (error) {
    console.error('Error fetching FAQs repeater section:', error)
    return []
  }
}

/**
 * Get "Ready for Your Next Signature Layer?" section data from CMS
 * @param slug - Page slug (default: 'promotions')
 * @returns Section data with fields or null
 */
export async function getSignatureLayerSection(slug: string = 'promotions'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'signature layer')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Signature Layer" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Signature Layer" section:', error)
    return null
  }
}

/**
 * Get category banner section data from CMS
 * @param slug - Page slug (default: 'category')
 * @returns Section data with fields or null
 */
export async function getCategoryBannerSection(slug: string = 'category'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'banner')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No category banner section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching category banner section:', error)
    return null
  }
}

/**
 * Get "Categories at a Glance" section data from CMS
 * @param slug - Page slug (default: 'category')
 * @returns Section data with fields or null
 */
export async function getCategoriesGlanceSection(slug: string = 'category'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'categories glance')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Categories Glance" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Categories Glance" section:', error)
    return null
  }
}

/**
 * Get "Curated Spotlights" section data from CMS
 * @param slug - Page slug (default: 'category')
 * @returns Section data with fields or null
 */
export async function getCuratedSpotlightsSection(slug: string = 'category'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'curated spotlights')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Curated Spotlights" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Curated Spotlights" section:', error)
    return null
  }
}

/**
 * Get shop banner section data from CMS
 * @param slug - Page slug (default: 'shop')
 * @returns Section data with fields or null
 */
export async function getShopBannerSection(slug: string = 'shop'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'banner')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No shop banner section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching shop banner section:', error)
    return null
  }
}

/**
 * Get "Shop Collection" section data from CMS
 * @param slug - Page slug (default: 'shop')
 * @returns Section data with fields or null
 */
export async function getShopCollectionSection(slug: string = 'shop'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'shop collection')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Shop Collection" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Shop Collection" section:', error)
    return null
  }
}

/**
 * Get "Refine Results" section data from CMS
 * @param slug - Page slug (default: 'shop')
 * @returns Section data with fields or null
 */
export async function getRefineResultsSection(slug: string = 'shop'): Promise<CmsSection | null> {
  try {
    const section = await getCmsSection(slug, 'refine results')
    
    if (!section || section.type !== 'single' || !section.fields) {
      console.warn('No "Refine Results" section found or section is not a single type')
      return null
    }

    return section
  } catch (error) {
    console.error('Error fetching "Refine Results" section:', error)
    return null
  }
}
