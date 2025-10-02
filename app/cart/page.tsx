import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-24 lg:py-32 bg-background text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Shopping Cart</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Review your selected items before proceeding to checkout.
              </p>
            </div>
            {/* Placeholder for cart items */}
            <div className="w-full max-w-3xl mx-auto bg-card p-6 rounded-lg shadow-md mt-8 text-left">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image src="/placeholder.svg?key=j38rl" alt="Scarf 1" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Silk Scarf</h3>
                      <p className="text-muted-foreground">$29.99</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-2 py-1 border rounded-md">-</button>
                    <span>1</span>
                    <button className="px-2 py-1 border rounded-md">+</button>
                    <button className="text-red-500 ml-4">Remove</button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image src="/placeholder.svg?key=0mqd4" alt="Scarf 2" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Cotton Scarf</h3>
                      <p className="text-muted-foreground">$19.99</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-2 py-1 border rounded-md">-</button>
                    <span>2</span>
                    <button className="px-2 py-1 border rounded-md">+</button>
                    <button className="text-red-500 ml-4">Remove</button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <h2 className="text-xl font-bold">Total: $69.97</h2>
                <button className="bg-white/90 text-foreground py-2 px-6 rounded-md hover:bg-white">
                  Proceed to Checkout
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
