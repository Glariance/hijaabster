import { HeroSlider } from "@/components/hero-slider"
import { FeaturedProducts } from "@/components/featured-products"
import { CategorySection } from "@/components/category-section"
import { ValueProps } from "@/components/value-props"
import { PromotionsSection } from "@/components/promotions-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { AboutUsSection } from "@/components/about-us-section"
import { MissionSection } from "@/components/mission-section"
import { VisionSection } from "@/components/vision-section"
import { getBannerData, getWhyShopSection, getFeaturedProductsSection, getShopByCategorySection, getPromotionsSection, getTestimonialSection, getAboutUsSection, getMissionSection, getVisionSection } from "@/lib/services/cms-service"
import type { BannerItemData } from "@/lib/types/cms"
import type { CmsSection } from "@/lib/types/cms"

/**
 * Home Page Component
 * Fetches banner/hero slider data dynamically from CMS and displays all home page sections
 */
export default async function Page() {
  // Fetch banner data from CMS using the standardized service function
  let bannerItems: BannerItemData[] = []
  let whyShopSection: CmsSection | null = null
  let featuredProductsSection: CmsSection | null = null
  let shopByCategorySection: CmsSection | null = null
  let promotionsSection: CmsSection | null = null
  let testimonialSection: CmsSection | null = null
  let aboutUsSection: CmsSection | null = null
  let missionSection: CmsSection | null = null
  let visionSection: CmsSection | null = null
  
  try {
    bannerItems = await getBannerData('home')
    whyShopSection = await getWhyShopSection('home')
    featuredProductsSection = await getFeaturedProductsSection('home')
    shopByCategorySection = await getShopByCategorySection('home')
    promotionsSection = await getPromotionsSection('home')
    testimonialSection = await getTestimonialSection('home')
    aboutUsSection = await getAboutUsSection('home')
    missionSection = await getMissionSection('home')
    visionSection = await getVisionSection('home')
  } catch (error) {
    console.error("Error loading page data:", error)
    // Fallback to empty array - Components will handle fallback display
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-stretch bg-background">
      {/* Hero Slider - Dynamically populated from CMS */}
      <HeroSlider bannerItems={bannerItems} />
      
      {/* Why Shop Section - Dynamically populated from CMS */}
      <ValueProps sectionData={whyShopSection} />
      
      {/* Featured Products Section - Dynamically populated from CMS */}
      <FeaturedProducts sectionData={featuredProductsSection} />
      
      {/* Shop by Category Section - Dynamically populated from CMS */}
      <CategorySection sectionData={shopByCategorySection} />
      
      {/* Promotions Section - Dynamically populated from CMS */}
      <PromotionsSection sectionData={promotionsSection} />
      
      {/* Testimonial Section - Dynamically populated from CMS */}
      <TestimonialSection sectionData={testimonialSection} />
      
      {/* About Us Section - Dynamically populated from CMS */}
      <AboutUsSection sectionData={aboutUsSection} />
      
      {/* Mission Section - Dynamically populated from CMS */}
      <MissionSection sectionData={missionSection} />
      
      {/* Vision Section - Dynamically populated from CMS */}
      <VisionSection sectionData={visionSection} />
    </main>
  )
}





