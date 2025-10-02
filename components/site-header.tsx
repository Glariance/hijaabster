import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-muted/40 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-muted/30">
      <div className="flex h-20 w-full items-center gap-6 px-4 sm:px-6 lg:px-12">
        <div className="flex flex-1 items-center gap-3 sm:gap-4 lg:gap-6">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Hijaabster" width={320} height={96} priority className="h-20 w-auto" />
          </Link>
        </div>
        <nav className="hidden flex-1 items-center justify-center gap-5 text-sm font-medium text-muted-foreground md:flex lg:gap-6">
          <Link href="#" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="#" className="transition-colors hover:text-primary">
            Shop
          </Link>
          <Link href="#" className="transition-colors hover:text-primary">
            Categories
          </Link>
          <Link href="#" className="transition-colors hover:text-primary">
            Promotions
          </Link>
          <Link href="#" className="transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <div className="hidden items-center rounded-full border border-border/70 bg-muted/10 px-3 py-1.5 md:flex">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search scarves"
              aria-label="Search scarves"
              className="h-8 w-[160px] border-0 bg-transparent px-0 text-sm text-foreground shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 md:w-[200px] lg:w-[240px]"
            />
          </div>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button size="sm" className="hidden sm:inline-flex">
            Shop Now
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            <span className="sr-only">Shopping Cart</span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              3
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}
