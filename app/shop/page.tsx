"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { products, type Product } from "@/lib/shop-data"

type CheckedState = boolean | "indeterminate"\r\n\r\nconst currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const uniqueSorted = (values: string[]) =>
  Array.from(new Set(values)).sort((a, b) => a.localeCompare(b))

const categoryFilters = uniqueSorted(products.map((product) => product.category))
const materialFilters = uniqueSorted(products.map((product) => product.material))
const colorFilters = uniqueSorted(products.map((product) => product.color))

const priceValues = products.map((product) => product.price)
const DEFAULT_PRICE_RANGE: [number, number] = [
  Math.min(...priceValues),
  Math.max(...priceValues),
]
export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([DEFAULT_PRICE_RANGE[0], DEFAULT_PRICE_RANGE[1]])

  const handleSelection = (
    checked: CheckedState,
    value: string,
    list: string[],
    setter: (next: string[]) => void,
  ) => {
    if (checked === true) {
      setter(list.includes(value) ? list : [...list, value])
    } else {
      setter(list.filter((item) => item !== value))
    }
  }

  const filteredProducts = useMemo<Product[]>(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesMaterial =
        selectedMaterials.length === 0 || selectedMaterials.includes(product.material)
      const matchesColor =
        selectedColors.length === 0 || selectedColors.includes(product.color)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesCategory && matchesMaterial && matchesColor && matchesPrice
    })
  }, [selectedCategories, selectedMaterials, selectedColors, priceRange])

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedMaterials([])
    setSelectedColors([])
    setPriceRange([DEFAULT_PRICE_RANGE[0], DEFAULT_PRICE_RANGE[1]])
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-slate-950">
          <Image
            src="/woman-wearing-scarf-banner.jpg"
            alt="Shop our curated collection"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-10 object-cover opacity-60"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center md:px-6 md:py-32 lg:py-40">
            <ScrollReveal className="space-y-4 text-white" direction="up">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
                Shop the Edit
              </p>
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">Shop</h1>
              <p className="mx-auto max-w-2xl text-base text-white/80 md:text-xl/relaxed">
                Discover refined silhouettes, artisanal finishes, and everyday staples curated for the modern wardrobe.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
            <aside className="rounded-3xl border border-border/40 bg-card/70 p-6 shadow-lg backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-primary">Refine Results</h2>
                  <p className="text-sm text-muted-foreground">
                    Tailor the collection to match your style, fabric, and color preferences.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-muted-foreground hover:text-primary"
                >
                  Reset
                </Button>
              </div>
              <ScrollArea className="mt-6 max-h-[60vh] pr-2">
                <Accordion
                  type="multiple"
                  defaultValue={["category", "material", "color", "price"]}
                  className="space-y-2"
                >
                  <AccordionItem value="category">
                    <AccordionTrigger className="text-primary">Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categoryFilters.map((category) => {
                          const id = `category-${category.toLowerCase()}`
                          return (
                            <div key={category} className="flex items-center gap-3">
                              <Checkbox
                                id={id}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={(checked) =>
                                  handleSelection(checked, category, selectedCategories, setSelectedCategories)
                                }
                              />
                              <Label htmlFor={id} className="text-sm text-muted-foreground">
                                {category}
                              </Label>
                            </div>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="material">
                    <AccordionTrigger className="text-primary">Materials</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {materialFilters.map((material) => {
                          const id = `material-${material.toLowerCase()}`
                          return (
                            <div key={material} className="flex items-center gap-3">
                              <Checkbox
                                id={id}
                                checked={selectedMaterials.includes(material)}
                                onCheckedChange={(checked) =>
                                  handleSelection(checked, material, selectedMaterials, setSelectedMaterials)
                                }
                              />
                              <Label htmlFor={id} className="text-sm text-muted-foreground">
                                {material}
                              </Label>
                            </div>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="color">
                    <AccordionTrigger className="text-primary">Color Story</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {colorFilters.map((color) => {
                          const id = `color-${color.toLowerCase()}`
                          return (
                            <div key={color} className="flex items-center gap-3">
                              <Checkbox
                                id={id}
                                checked={selectedColors.includes(color)}
                                onCheckedChange={(checked) =>
                                  handleSelection(checked, color, selectedColors, setSelectedColors)
                                }
                              />
                              <Label htmlFor={id} className="text-sm text-muted-foreground">
                                {color}
                              </Label>
                            </div>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price">
                    <AccordionTrigger className="text-primary">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          value={priceRange}
                          min={DEFAULT_PRICE_RANGE[0]}
                          max={DEFAULT_PRICE_RANGE[1]}
                          step={2}
                          onValueChange={(values) =>
                            setPriceRange([values[0] ?? 30, values[1] ?? 80])
                          }
                        />
                        <p className="text-sm text-muted-foreground">
                          {currency.format(priceRange[0])} - {currency.format(priceRange[1])}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollArea>
            </aside>

            <div className="space-y-8">
              <ScrollReveal className="space-y-3 text-center lg:text-left" direction="up">
                <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl">
                  Shop Our Collection
                </h2>
                <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg lg:mx-0">
                  Explore curated edits that pair luxurious fabrics with modern silhouettes. Select filters to discover
                  the scarves that speak to your signature style.
                </p>
              </ScrollReveal>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/40 bg-card/40 px-4 py-3 text-sm text-muted-foreground">
                <span>
                  Showing <span className="font-semibold text-primary">{filteredProducts.length}</span> of {products.length}{" "}
                  pieces
                </span>
                <span>
                  Price: {currency.format(priceRange[0])} - {currency.format(priceRange[1])}
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-border/60 bg-card/40 px-8 py-16 text-center">
                  <h3 className="text-xl font-semibold text-primary">No scarves match your filters.</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your selection or resetting the filters to browse the full collection.
                  </p>
                </div>
              ) : (
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product, index) => (
                    <ScrollReveal key={product.id} delay={index * 80} className="h-full">
                      <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/50 bg-background/90 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                        <div className="relative aspect-[4/5] w-full overflow-hidden">
                          <Image
                            src={product.primaryImage}
                            alt={product.name}
                            fill
                            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                            priority={index < 2}
                          />
                          <Image
                            src={product.secondaryImage || product.primaryImage}
                            alt={`${product.name} alternate view`}
                            fill
                            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                          />
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                        </Link>
                        <div className="flex flex-1 flex-col gap-4 px-6 py-6 text-left">
                          <div>
                            <h3 className="text-xl font-semibold text-primary">
                              <Link
                                href={`/shop/${product.slug}`}
                                className="transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
                              >
                                {product.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                          </div>
                          <div className="mt-auto space-y-4">
                            <div className="flex items-baseline gap-3">
                              <span className="text-2xl font-semibold text-primary">
                                {currency.format(product.price)}
                              </span>
                              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">USD</span>
                            </div>
                            <Button
                              type="button"
                              size="lg"
                              variant="outline"
                              className="w-full border-primary/60 py-3 text-primary hover:bg-primary hover:text-primary-foreground"
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}














