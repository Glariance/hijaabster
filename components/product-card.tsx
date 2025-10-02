import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: string
    image: string
    alt: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View Product</span>
      </Link>
      <div className="relative w-full h-80 bg-transparent flex items-center justify-center overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.alt}
          fill
          style={{ objectFit: "contain" }}
          className="transition-transform duration-300 group-hover:scale-105 p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-balance">{product.name}</h3>
        <p className="text-muted-foreground text-pretty">{product.price}</p>
        <Button className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground">Add to Cart</Button>
      </div>
    </div>
  )
}
