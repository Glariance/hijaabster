import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PromotionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-24 lg:py-32 bg-background text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Latest Promotions</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't miss out on our special offers and discounts!
              </p>
            </div>
            {/* Placeholder for promotion listings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-card p-6 rounded-lg shadow-md text-left">
                <h3 className="font-semibold text-xl mb-2">Summer Sale!</h3>
                <p className="text-muted-foreground mb-4">Get 20% off all silk scarves for a limited time.</p>
                <button className="bg-white/90 text-foreground py-2 px-4 rounded-md hover:bg-white">Shop Now</button>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md text-left">
                <h3 className="font-semibold text-xl mb-2">New Customer Discount</h3>
                <p className="text-muted-foreground mb-4">Enjoy 15% off your first order with code WELCOME15.</p>
                <button className="bg-white/90 text-foreground py-2 px-4 rounded-md hover:bg-white">Get Offer</button>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md text-left">
                <h3 className="font-semibold text-xl mb-2">Free Shipping</h3>
                <p className="text-muted-foreground mb-4">On all orders over $50. No code needed!</p>
                <button className="bg-white/90 text-foreground py-2 px-4 rounded-md hover:bg-white">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
