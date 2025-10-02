export type Product = {
  id: number
  slug: string
  name: string
  price: number
  category: string
  material: string
  color: string
  primaryImage: string
  secondaryImage: string
  description: string
  longDescription: string
  features: string[]
  care: string[]
  dimensions: string
  stockStatus: string
  sku: string
  shippingInfo: string
}

export const products: Product[] = [
  {
    id: 1,
    slug: "silk-radiance-hijab",
    name: "Silk Radiance Hijab",
    price: 68,
    category: "Silk",
    material: "Silk",
    color: "Rose",
    primaryImage:
      "/muslim-woman-wearing-a-silk-scarf-full-face-visible-not-cut-off-covering-head-elegant-modest.jpg",
    secondaryImage: "/muslim-woman-wearing-a-silk-scarf--elegant--modest.jpg",
    description: "Fluid satin-finish silk with hand-rolled hems for evening elegance.",
    longDescription:
      "Our signature silk hijab drapes effortlessly with a luminous sheen that catches the light beautifully. Each piece is dyed in small batches for rich, lasting color and finished with meticulous hand-rolled edges.",
    features: [
      "100% mulberry silk with satin finish",
      "Hand-rolled hems crafted by artisans",
      "Breathable weave ideal for transitional seasons",
      "Pairs seamlessly with both day and evening looks",
    ],
    care: [
      "Dry clean recommended",
      "Use a cool iron on reverse side",
      "Store flat or rolled to prevent creasing",
    ],
    dimensions: "70 cm x 180 cm",
    stockStatus: "In stock",
    sku: "SC-4012",
    shippingInfo: "Complimentary shipping on orders above $75. Express options available at checkout.",
  },
  {
    id: 2,
    slug: "cloud-cotton-veil",
    name: "Cloud Cotton Veil",
    price: 42,
    category: "Everyday",
    material: "Cotton",
    color: "Ivory",
    primaryImage:
      "/muslim-woman-wearing-a-pastel-scarf-full-face-visible-not-cut-off-covering-head-serene-modern.jpg",
    secondaryImage: "/muslim-woman-wearing-a-pastel-scarf--serene--moder.jpg",
    description: "Featherweight cotton blend with a whisper-soft hand feel.",
    longDescription:
      "Designed for everyday ease, this cotton veil feels featherlight while offering full coverage. The delicately textured weave allows for effortless styling without added bulk.",
    features: [
      "Ultra-soft cotton modal blend",
      "Matte finish for non-slip styling",
      "Finished edges to prevent fraying",
      "Breathable comfort suitable for warm climates",
    ],
    care: [
      "Machine wash cold on delicate cycle",
      "Lay flat to dry",
      "Light steam as needed",
    ],
    dimensions: "75 cm x 190 cm",
    stockStatus: "In stock",
    sku: "SC-2148",
    shippingInfo: "Ships within 2 business days. Free exchanges within 30 days of delivery.",
  },
  {
    id: 3,
    slug: "nordic-wool-wrap",
    name: "Nordic Wool Wrap",
    price: 58,
    category: "Seasonal",
    material: "Wool",
    color: "Oat",
    primaryImage:
      "/muslim-woman-wearing-a-warm-winter-scarf-full-face-visible-not-cut-off-covering-head-cozy-stylish.jpg",
    secondaryImage: "/muslim-woman-wearing-a-warm-winter-scarf--cozy--st.jpg",
    description: "Plush merino weave designed to lock in warmth without bulk.",
    longDescription:
      "Crafted from responsibly sourced merino wool, the Nordic wrap is your cold-weather essential. Its lofty texture provides insulating warmth while remaining breathable and lightweight.",
    features: [
      "Ethically sourced merino wool",
      "Brushed finish for exceptional softness",
      "Generous sizing for layered styling",
      "Thermal regulation keeps you comfortable indoors and out",
    ],
    care: [
      "Dry clean or hand wash cold",
      "Reshape and lay flat to dry",
      "Avoid wringing or twisting",
    ],
    dimensions: "80 cm x 200 cm",
    stockStatus: "Limited stock",
    sku: "SC-5620",
    shippingInfo: "Complimentary shipping on domestic orders. International delivery calculated at checkout.",
  },
  {
    id: 4,
    slug: "blush-bloom-chiffon",
    name: "Blush Bloom Chiffon",
    price: 36,
    category: "Silk",
    material: "Chiffon",
    color: "Blush",
    primaryImage: "/blush-pink-scarf.jpg",
    secondaryImage:
      "/muslim-woman-wearing-a-stylish-scarf-full-face-visible-not-cut-off-covering-head-vibrant-modern.jpg",
    description: "Airy chiffon with a subtle sheen and crinkle-resistant finish.",
    longDescription:
      "Blush Bloom showcases a luminous chiffon that feels weightless while providing graceful coverage. The fabric resists creasing, making it a travel-friendly favorite for special occasions.",
    features: [
      "Matte chiffon with anti-slip texture",
      "Soft blush tone flattering for all complexions",
      "Crease-resistant finish",
      "Finished with delicate micro-hem",
    ],
    care: [
      "Hand wash cold with gentle detergent",
      "Hang to dry away from direct sunlight",
      "Steam lightly to refresh",
    ],
    dimensions: "70 cm x 180 cm",
    stockStatus: "In stock",
    sku: "SC-3364",
    shippingInfo: "Orders ship within 24 hours. Gift packaging available upon request.",
  },
  {
    id: 5,
    slug: "lavender-luxe-square",
    name: "Lavender Luxe Square",
    price: 52,
    category: "Statement",
    material: "Silk",
    color: "Lavender",
    primaryImage: "/lavender-dream-scarf.jpg",
    secondaryImage: "/muslim-woman-wearing-an-elegant-scarf--sophisticat.jpg",
    description: "Hand-painted botanicals printed on satin charmeuse silk.",
    longDescription:
      "A collector's piece, Lavender Luxe is printed with hand-illustrated botanicals inspired by evening gardens. The square format invites multiple styling possibilities, from classic drapes to playful knots.",
    features: [
      "Satin charmeuse silk with luminous sheen",
      "Original artwork exclusively for Scarf E-commerce",
      "Hand-rolled edges",
      "Square silhouette ideal for turban and neck styling",
    ],
    care: [
      "Dry clean only",
      "Store flat in protective pouch",
      "Avoid contact with sharp jewelry",
    ],
    dimensions: "90 cm x 90 cm",
    stockStatus: "Pre-order",
    sku: "SC-7815",
    shippingInfo: "Ships in early November. Pre-order now to reserve your piece.",
  },
  {
    id: 6,
    slug: "mint-artisan-weave",
    name: "Mint Artisan Weave",
    price: 48,
    category: "Everyday",
    material: "Cotton",
    color: "Mint",
    primaryImage:
      "/muslim-woman-wearing-a-handcrafted-scarf-full-face-visible-not-cut-off-covering-head-unique-artisan.jpg",
    secondaryImage: "/muslim-woman-wearing-a-handcrafted-scarf--unique--.jpg",
    description: "Hand-loomed cotton blend finished with artisanal tassels.",
    longDescription:
      "Handcrafted by our artisan collective, this mint scarf is woven on traditional looms for a subtly slubbed texture. The knotted tassels are individually finished, highlighting the craftsmanship behind each piece.",
    features: [
      "Hand-loomed cotton blend",
      "Knotted tassels finished by hand",
      "Soft mint hue with tonal variations",
      "Lightweight yet opaque for versatile styling",
    ],
    care: [
      "Hand wash cold with similar colors",
      "Line dry",
      "Iron on medium setting if needed",
    ],
    dimensions: "75 cm x 190 cm",
    stockStatus: "In stock",
    sku: "SC-4589",
    shippingInfo: "Ships within 1-2 business days. Complimentary returns within 14 days.",
  },
]

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(slug: string, limit = 3) {
  return products.filter((product) => product.slug !== slug).slice(0, limit)
}
