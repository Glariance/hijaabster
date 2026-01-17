import { notFound } from "next/navigation"
import { apiService } from "@/lib/api-client"
import { ProductDetailClient } from "./product-detail-client"
import { getTestimonialsData } from "@/lib/services/cms-service"

// Generate static params - will be dynamic at build time
export async function generateStaticParams() {
  try {
    const products = await apiService.getProducts()
    const productsList = products?.data || (Array.isArray(products) ? products : [])
    return productsList.map((product: { slug: string }) => ({
      slug: product.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Fetch all products and find the one matching the slug
  let product: any = null
  let relatedProducts: any[] = []
  
  try {
    const productsResponse = await apiService.getProducts()
    const productsList = productsResponse?.data || (Array.isArray(productsResponse) ? productsResponse : [])
    
    // Find the product by slug
    product = productsList.find((p: { slug: string }) => p.slug === params.slug)
    
    if (!product) {
      notFound()
    }

    // Fetch related products from the same category (excluding current product)
    if (product.category_id || product.category_name) {
      const allProducts = await apiService.getProducts({ category: product.category_name })
      const categoryProducts = allProducts?.data || (Array.isArray(allProducts) ? allProducts : [])
      relatedProducts = categoryProducts
        .filter((p: { id: number; slug: string }) => p.id !== product.id && p.slug !== params.slug)
        .slice(0, 4)
    }

    // If we don't have enough related products, add some featured products
    if (relatedProducts.length < 4) {
      const featuredResponse = await apiService.getFeaturedProducts(4)
      const featuredProducts = featuredResponse?.data || (Array.isArray(featuredResponse) ? featuredResponse : [])
      const additionalProducts = featuredProducts
        .filter((p: { id: number; slug: string }) => p.id !== product.id && p.slug !== params.slug)
        .slice(0, 4 - relatedProducts.length)
      relatedProducts = [...relatedProducts, ...additionalProducts]
    }

    // Fetch testimonials data
    const testimonialsData = await getTestimonialsData('home')
    
    return (
      <ProductDetailClient 
        product={product} 
        relatedProducts={relatedProducts}
        testimonialsData={testimonialsData}
      />
    )
  } catch (error) {
    console.error("Error fetching product data:", error)
    notFound()
  }
}
