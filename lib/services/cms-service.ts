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
    const data = await apiService.getHomePage(slug)
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

