import { notFound } from "next/navigation"
import { getProductBySlug, getRelatedProducts, products } from "@/lib/shop-data"
import { ProductDetailClient } from "./product-detail-client"

// Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(params.slug, 4)

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}
