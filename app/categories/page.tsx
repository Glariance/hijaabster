import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-24 lg:py-32 bg-background text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Scarf Categories</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our wide range of scarf categories to find your perfect match.
              </p>
            </div>
            {/* Placeholder for category listings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              <div className="bg-card p-4 rounded-lg shadow-md">
                <div className="relative w-full h-56 overflow-hidden rounded-md mb-4">
                  <Image src="/placeholder.svg?key=j38rl" alt="Category 1" fill style={{ objectFit: "contain" }} />
                </div>
                <h3 className="font-semibold text-lg">Silk Scarves</h3>
                <p className="text-muted-foreground">Luxurious and elegant.</p>
              </div>
              <div className="bg-card p-4 rounded-lg shadow-md">
                <div className="relative w-full h-56 overflow-hidden rounded-md mb-4">
                  <Image src="/placeholder.svg?key=0mqd4" alt="Category 2" fill style={{ objectFit: "contain" }} />
                </div>
                <h3 className="font-semibold text-lg">Cotton Scarves</h3>
                <p className="text-muted-foreground">Comfortable and breathable.</p>
              </div>
              <div className="bg-card p-4 rounded-lg shadow-md">
                <div className="relative w-full h-56 overflow-hidden rounded-md mb-4">
                  <Image src="/placeholder.svg?key=cyz14" alt="Category 3" fill style={{ objectFit: "contain" }} />
                </div>
                <h3 className="font-semibold text-lg">Winter Scarves</h3>
                <p className="text-muted-foreground">Warm and stylish.</p>
              </div>
              <div className="bg-card p-4 rounded-lg shadow-md">
                <div className="relative w-full h-56 overflow-hidden rounded-md mb-4">
                  <Image src="/placeholder.svg?key=abc12" alt="Category 4" fill style={{ objectFit: "contain" }} />
                </div>
                <h3 className="font-semibold text-lg">Patterned Scarves</h3>
                <p className="text-muted-foreground">Unique designs.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
