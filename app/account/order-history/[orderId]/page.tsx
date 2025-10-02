import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"

export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-24 lg:py-32 bg-background text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Order Details: {orderId}</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Detailed information about your order and invoice.
              </p>
            </div>
            {/* Placeholder for order details and invoice */}
            <div className="w-full max-w-3xl mx-auto bg-card p-6 rounded-lg shadow-md mt-8 text-left">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span>#{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>September 20, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total:</span>
                  <span>$69.97</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span>Delivered</span>
                </div>
              </div>

              <h2 className="text-xl font-bold mt-6 mb-4">Shipping Information</h2>
              <div className="space-y-2">
                <p>John Doe</p>
                <p>123 Main St, Anytown, USA</p>
                <p>john.doe@example.com</p>
              </div>

              <h2 className="text-xl font-bold mt-6 mb-4">Items Ordered</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image src="/placeholder.svg?key=j38rl" alt="Scarf 1" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Silk Scarf</h3>
                      <p className="text-muted-foreground">Quantity: 1</p>
                    </div>
                  </div>
                  <span className="font-semibold">$29.99</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image src="/placeholder.svg?key=0mqd4" alt="Scarf 2" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Cotton Scarf</h3>
                      <p className="text-muted-foreground">Quantity: 2</p>
                    </div>
                  </div>
                  <span className="font-semibold">$39.98</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t flex justify-end">
                <button className="bg-white/90 text-foreground py-2 px-6 rounded-md hover:bg-white">
                  Download Invoice
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
