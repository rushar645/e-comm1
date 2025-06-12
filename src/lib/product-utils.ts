import { formatPrice } from "@/lib/utils"

/**
 * Calculates the discount percentage between original and sale price
 * @param originalPrice - The original price
 * @param salePrice - The sale price
 * @returns Discount percentage string (e.g., "20%")
 */
export function calculateDiscountPercentage(originalPrice: number, salePrice: number) {
  if (originalPrice <= 0 || salePrice >= originalPrice) return "0%"
  const discount = ((originalPrice - salePrice) / originalPrice) * 100
  return `${Math.round(discount)}%`
}

/**
 * Formats a price range for display
 * @param minPrice - The minimum price
 * @param maxPrice - The maximum price
 * @param currency - The currency code (default: USD)
 * @returns Formatted price range string
 */
export function formatPriceRange(minPrice: number, maxPrice: number, currency = "USD") {
  if (minPrice === maxPrice) {
    return formatPrice(minPrice, currency)
  }
  return `${formatPrice(minPrice, currency)} - ${formatPrice(maxPrice, currency)}`
}

/**
 * Sorts products by different criteria
 * @param products - Array of products to sort
 * @param sortBy - Sort criteria (price-asc, price-desc, newest, popular)
 * @returns Sorted products array
 */
export function sortProducts<T extends { price: string | number; createdAt?: string | Date; popularity?: number }>(
  products: T[],
  sortBy: "price-asc" | "price-desc" | "newest" | "popular" = "newest",
) {
  const productsCopy = [...products]

  switch (sortBy) {
    case "price-asc":
      return productsCopy.sort((a, b) => {
        const priceA = typeof a.price === "string" ? Number.parseFloat(a.price.replace(/[^0-9.-]+/g, "")) : a.price
        const priceB = typeof b.price === "string" ? Number.parseFloat(b.price.replace(/[^0-9.-]+/g, "")) : b.price
        return priceA - priceB
      })
    case "price-desc":
      return productsCopy.sort((a, b) => {
        const priceA = typeof a.price === "string" ? Number.parseFloat(a.price.replace(/[^0-9.-]+/g, "")) : a.price
        const priceB = typeof b.price === "string" ? Number.parseFloat(b.price.replace(/[^0-9.-]+/g, "")) : b.price
        return priceB - priceA
      })
    case "newest":
      return productsCopy.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB.getTime() - dateA.getTime()
      })
    case "popular":
      return productsCopy.sort((a, b) => {
        const popularityA = a.popularity || 0
        const popularityB = b.popularity || 0
        return popularityB - popularityA
      })
    default:
      return productsCopy
  }
}

/**
 * Filters products by various criteria
 * @param products - Array of products to filter
 * @param filters - Filter criteria
 * @returns Filtered products array
 */
export function filterProducts<
  T extends {
    price: string | number
    category?: string
    colors?: string[]
    sizes?: string[]
    tags?: string[]
  },
>(
  products: T[],
  filters: {
    priceRange?: [number, number]
    categories?: string[]
    colors?: string[]
    sizes?: string[]
    tags?: string[]
  },
) {
  return products.filter((product) => {
    // Price filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      const price =
        typeof product.price === "string" ? Number.parseFloat(product.price.replace(/[^0-9.-]+/g, "")) : product.price
      if (price < min || price > max) return false
    }

    // Category filter
    if (filters.categories?.length && product.category) {
      if (!filters.categories.includes(product.category)) return false
    }

    // Color filter
    if (filters.colors?.length && product.colors?.length) {
      if (!product.colors.some((color) => filters.colors?.includes(color))) return false
    }

    // Size filter
    if (filters.sizes?.length && product.sizes?.length) {
      if (!product.sizes.some((size) => filters.sizes?.includes(size))) return false
    }

    // Tag filter
    if (filters.tags?.length && product.tags?.length) {
      if (!product.tags.some((tag) => filters.tags?.includes(tag))) return false
    }

    return true
  })
}

/**
 * Extracts unique filter values from products
 * @param products - Array of products
 * @returns Object with unique filter values
 */
export function extractFilterOptions<
  T extends {
    category?: string
    colors?: string[]
    sizes?: string[]
    tags?: string[]
    price: string | number
  },
>(products: T[]) {
  const categories = new Set<string>()
  const colors = new Set<string>()
  const sizes = new Set<string>()
  const tags = new Set<string>()
  let minPrice = Number.POSITIVE_INFINITY
  let maxPrice = 0

  products.forEach((product) => {
    // Categories
    if (product.category) {
      categories.add(product.category)
    }

    // Colors
    if (product.colors?.length) {
      product.colors.forEach((color) => colors.add(color))
    }

    // Sizes
    if (product.sizes?.length) {
      product.sizes.forEach((size) => sizes.add(size))
    }

    // Tags
    if (product.tags?.length) {
      product.tags.forEach((tag) => tags.add(tag))
    }

    // Price range
    const price =
      typeof product.price === "string" ? Number.parseFloat(product.price.replace(/[^0-9.-]+/g, "")) : product.price
    if (price < minPrice) minPrice = price
    if (price > maxPrice) maxPrice = price
  })

  return {
    categories: Array.from(categories),
    colors: Array.from(colors),
    sizes: Array.from(sizes),
    tags: Array.from(tags),
    priceRange: [minPrice, maxPrice] as [number, number],
  }
}
