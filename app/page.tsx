import { HeroSlider } from "@/components/hero-slider"
import { FeaturedProducts } from "@/components/featured-products"
import { CategorySection } from "@/components/category-section"
import { ValueProps } from "@/components/value-props"
import { PromotionsSection } from "@/components/promotions-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { AboutUsSection } from "@/components/about-us-section"
import { MissionSection } from "@/components/mission-section"
import { VisionSection } from "@/components/vision-section"

export default function Page() {
  return (
    <main className="flex min-h-screen w-full flex-col items-stretch bg-background">
      <HeroSlider />
      <ValueProps />
      <FeaturedProducts />
      <CategorySection />
      <PromotionsSection />
      <TestimonialSection />
      <AboutUsSection />
      <MissionSection />
      <VisionSection />
    </main>
  )
}





