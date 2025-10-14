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
  {
    id: 7,
    slug: "azure-horizon-wrap",
    name: "Azure Horizon Wrap",
    price: 54,
    category: "Statement",
    material: "Viscose",
    color: "Sky",
    primaryImage: "/woman-with-scarf.jpg",
    secondaryImage: "/diverse-woman-smiling.png",
    description: "Ombre-dyed viscose with a fluid drape and hand-finished edges.",
    longDescription:
      "Inspired by dawn light, the Azure Horizon wrap moves from soft porcelain to vivid sky blue. The lightweight viscose blend sits effortlessly on the shoulders while remaining opaque for confident coverage.",
    features: [
      "Hand-ombre dyed for unique tonal gradients",
      "Viscose blend with soft, fluid drape",
      "Finished edges prevent fraying",
      "Generous length ideal for layered styling",
    ],
    care: [
      "Hand wash cold with mild detergent",
      "Lay flat to dry",
      "Steam on low to refresh the fabric",
    ],
    dimensions: "75 cm x 190 cm",
    stockStatus: "In stock",
    sku: "SC-6721",
    shippingInfo: "Dispatched within 48 hours. Complimentary gift wrap available.",
  },
  {
    id: 8,
    slug: "terracotta-texture-scarf",
    name: "Terracotta Texture Scarf",
    price: 46,
    category: "Seasonal",
    material: "Wool",
    color: "Terracotta",
    primaryImage: "/scarf-making-process.jpg",
    secondaryImage: "/muslim-woman-wearing-a-warm-winter-scarf--cozy--st.jpg",
    description: "Heirloom-inspired wool weave with tonal strié patterning.",
    longDescription:
      "Terracotta Texture combines artisan weaving techniques with natural color variations for depth and dimension. The medium weight makes it perfect for chilly mornings without adding bulk.",
    features: [
      "Premium wool blend with tonal striping",
      "Soft brushed finish against the skin",
      "Tasselled hem knotted by hand",
      "Moderate weight for transitional weather",
    ],
    care: [
      "Dry clean recommended",
      "If hand washing, reshape and dry flat",
      "Store folded to preserve the tassels",
    ],
    dimensions: "70 cm x 180 cm",
    stockStatus: "In stock",
    sku: "SC-9034",
    shippingInfo: "Ships next business day. Free shipping over $75.",
  },
  {
    id: 9,
    slug: "gilded-evening-shawl",
    name: "Gilded Evening Shawl",
    price: 72,
    category: "Occasion",
    material: "Silk Blend",
    color: "Champagne",
    primaryImage: "/woman-wearing-elegant-scarf.jpg",
    secondaryImage: "/woman-with-elegant-scarf-looking-thoughtfully.jpg",
    description: "Opulent silk blend with metallic threads for luminous evenings.",
    longDescription:
      "Designed for celebrations, the Gilded Evening shawl pairs a silk blend base with subtle metallic filaments woven throughout. The result is a whisper-light layer that shimmers with every movement.",
    features: [
      "Silk blend with fine metallic threads",
      "Hand-rolled hems for a couture finish",
      "Lightweight yet striking for evening wear",
      "Exclusive weave developed by our atelier",
    ],
    care: [
      "Dry clean only",
      "Store rolled in tissue to prevent creasing",
      "Avoid perfumes directly on the fabric",
    ],
    dimensions: "70 cm x 200 cm",
    stockStatus: "Limited stock",
    sku: "SC-1120",
    shippingInfo: "Express shipping available worldwide. Signature required on delivery.",
  },
  {
    id: 10,
    slug: "copper-leaf-bandana",
    name: "Copper Leaf Bandana",
    price: 32,
    category: "Accessories",
    material: "Cotton",
    color: "Copper",
    primaryImage: "/silky-rose-scarf.jpg",
    secondaryImage: "/blush-pink-scarf.jpg",
    description: "Square cotton bandana with botanical linework in copper tones.",
    longDescription:
      "The Copper Leaf bandana offers endless styling potential, crafted from breathable cotton and printed with botanical lineart in warm copper hues. Tie it around the neck, hair, or bag for an instant refresh.",
    features: [
      "100% cotton percale",
      "Hand-drawn botanical print",
      "Square silhouette for multi-way styling",
      "Colorfast inks retain vibrancy after washing",
    ],
    care: [
      "Machine wash cold with like colors",
      "Tumble dry low or line dry",
      "Iron on reverse side if needed",
    ],
    dimensions: "60 cm x 60 cm",
    stockStatus: "In stock",
    sku: "SC-2234",
    shippingInfo: "Ships within 1 business day. Domestic flat-rate shipping $5.",
  },
  {
    id: 11,
    slug: "midnight-mosaic-scarf",
    name: "Midnight Mosaic Scarf",
    price: 64,
    category: "Statement",
    material: "Modal",
    color: "Midnight",
    primaryImage: "/muslim-woman-wearing-an-elegant-scarf-full-face-visible-not-cut-off-covering-head-sophisticated.jpg",
    secondaryImage: "/muslim-woman-wearing-an-elegant-scarf--sophisticat.jpg",
    description: "Modal scarf featuring geometric mosaics inspired by nocturnal skylines.",
    longDescription:
      "A gallery-worthy piece, Midnight Mosaic showcases an original print inspired by city skylines at night. The modal base is exceptionally soft with a fluid drape that holds shape without slipping.",
    features: [
      "Custom artwork designed in-house",
      "Modal fabric for softness and sheen",
      "Digitally printed for crisp, lasting color",
      "Lightweight yet opaque coverage",
    ],
    care: [
      "Hand wash cold",
      "Line dry away from direct sunlight",
      "Steam to remove any creases",
    ],
    dimensions: "75 cm x 190 cm",
    stockStatus: "In stock",
    sku: "SC-5481",
    shippingInfo: "Ships within 48 hours. International shipping calculated at checkout.",
  },
  {
    id: 12,
    slug: "sage-breeze-hijab",
    name: "Sage Breeze Hijab",
    price: 38,
    category: "Everyday",
    material: "Chiffon",
    color: "Sage",
    primaryImage: "/mint-green-scarf.jpg",
    secondaryImage: "/muslim-woman-wearing-a-handcrafted-scarf--unique--.jpg",
    description: "Featherlight chiffon hijab with a matte finish for secure styling.",
    longDescription:
      "Sage Breeze brings a serene green hue to our signature chiffon hijab. The matte texture resists slipping while the featherlight hand feel keeps you comfortable through every season.",
    features: [
      "Matte chiffon to prevent slipping",
      "Subtle sage tone pairs with neutrals",
      "Finished hems for durability",
      "Breathable fabric ideal for layering",
    ],
    care: [
      "Machine wash cold in a garment bag",
      "Hang to dry",
      "Steam lightly to release wrinkles",
    ],
    dimensions: "70 cm x 180 cm",
    stockStatus: "In stock",
    sku: "SC-3375",
    shippingInfo: "Ships within 24 hours. Free exchanges within 30 days.",
  },
  {
    id: 13,
    slug: "blossom-charm-shawl",
    name: "Blossom Charm Shawl",
    price: 66,
    category: "Occasion",
    material: "Silk",
    color: "Rose",
    primaryImage: "/muslim-woman-wearing-a-silk-scarf-full-face-visible-not-cut-off-covering-head-elegant-modest.jpg",
    secondaryImage: "/muslim-woman-wearing-a-stylish-scarf--vibrant--mod.jpg",
    description: "Silk shawl with painterly blossom motifs and hand-fringed edges.",
    longDescription:
      "The Blossom Charm shawl combines hand-painted florals with the luminosity of pure silk. Each shawl is finished with hand-knotted fringe, making every piece one-of-a-kind.",
    features: [
      "100% silk with luminous finish",
      "Hand-painted floral artwork",
      "Knotted fringe crafted individually",
      "Statement accessory for evening events",
    ],
    care: [
      "Dry clean only",
      "Store in protective pouch",
      "Avoid exposure to rain or moisture",
    ],
    dimensions: "75 cm x 190 cm",
    stockStatus: "Limited stock",
    sku: "SC-8842",
    shippingInfo: "Ships within 48 hours. Priority shipping available at checkout.",
  },
]

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(slug: string, limit = 3) {
  return products.filter((product) => product.slug !== slug).slice(0, limit)
}


