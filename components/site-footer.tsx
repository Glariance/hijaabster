import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40 py-12">
      <div className="grid w-full grid-cols-1 gap-10 px-4 sm:px-6 lg:px-12 md:grid-cols-3 lg:grid-cols-5">
        <div className="space-y-5">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Hijaabster" width={320} height={96} className="h-20 w-auto" />
          </Link>
          <p className="text-sm text-muted-foreground">
            Elevate every look with thoughtfully designed scarves crafted for comfort and effortless style.
          </p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Link href="#" aria-label="Follow on Instagram" className="rounded-full border border-border/60 p-2 transition-colors hover:border-primary hover:text-primary">
              <Instagram className="h-4 w-4" />
            </Link>
            <Link href="#" aria-label="Follow on Facebook" className="rounded-full border border-border/60 p-2 transition-colors hover:border-primary hover:text-primary">
              <Facebook className="h-4 w-4" />
            </Link>
            <Link href="#" aria-label="Follow on Twitter" className="rounded-full border border-border/60 p-2 transition-colors hover:border-primary hover:text-primary">
              <Twitter className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Shop</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="transition-colors hover:text-primary">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-primary">
                Best Sellers
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-primary">
                Seasonal Edits
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-primary">
                Gift Cards
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">About</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="transition-colors hover:text-primary">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-primary">
                Craftsmanship
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-primary">
                Journal
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-primary">
                Sustainability
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Support</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="transition-colors hover:text-primary">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-primary">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-primary">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Newsletter</h3>
          <p className="text-sm text-muted-foreground">
            Join our community for styling inspiration, curated drops, and early access to exclusive offers.
          </p>
          <form className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 rounded-full bg-white/90 px-4 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:ring-primary"
            />
            <Button type="submit" className="whitespace-nowrap rounded-full px-6">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-12 flex w-full flex-col gap-3 border-t border-border/70 px-4 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-12">
        <span>&copy; {new Date().getFullYear()} Scarves Co. All rights reserved.</span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="#" className="transition-colors hover:text-primary">
            Terms
          </Link>
          <Link href="#" className="transition-colors hover:text-primary">
            Privacy
          </Link>
          <Link href="#" className="transition-colors hover:text-primary">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  )
}
