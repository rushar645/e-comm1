"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { use } from "react"

import { Navbar } from "@/components/navbar"
import { ProductGrid } from "@/components/product-grid"
import { FilterSidebar, type FilterState } from "@/components/filter-sidebar"
import { SortDropdown } from "@/components/sort-dropdown"
import { capitalizeFirstLetter } from "@/lib/utils"
import { ProductGridSkeleton } from "@/components/ui/skeleton"

interface Product {
  id: number | string
  name: string
  price: string
  numericPrice: number
  imageSrc: string
  colors?: string[]
  fabric?: string
}


export default function CategoryPage({ params }: {params: Promise<{ slug: string }>}) {
  // Get the category from the URL
  
  const category = use(params)
  const formattedCategory = category.slug.split("-")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ")

  // Sample products data with additional properties for filtering
  const allProducts: Product[] = Array.from({ length: 24 }, (_, i) => {
    // Generate random price between 20 and 300
    const numericPrice = Math.floor(Math.random() * 280) + 20

    // Assign random colors
    const colorOptions = [
      { name: "Red", value: "#FF5733" },
      { name: "Blue", value: "#3498DB" },
      { name: "Green", value: "#2ECC71" },
      { name: "Purple", value: "#9B59B6" },
      { name: "Yellow", value: "#F1C40F" },
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" },
      { name: "Pink", value: "#FF69B4" },
    ]

    // Randomly select 1-2 colors
    const productColors = []
    const numColors = Math.floor(Math.random() * 2) + 1
    for (let j = 0; j < numColors; j++) {
      const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      if (!productColors.includes(randomColor.value)) {
        productColors.push(randomColor.value)
      }
    }

    // Assign random fabric
    const fabricOptions = ["Cotton", "Silk", "Linen", "Polyester", "Denim", "Wool", "Chiffon", "Satin"]
    const fabric = fabricOptions[Math.floor(Math.random() * fabricOptions.length)]

    return {
      id: i + 1,
      name: `${formattedCategory} Product ${i + 1}`,
      price: `$${numericPrice}`,
      numericPrice,
      imageSrc: "/placeholder.svg?height=300&width=240",
      colors: productColors,
      fabric,
    }
  })

  // State for filters
  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: 0, max: 300 },
    colors: [],
    fabrics: [],
  })

  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)

  // State for active filter count
  const [activeFilterCount, setActiveFilterCount] = useState(0)

  // Available filters
  const availableFilters = {
    priceRange: { min: 0, max: 300 },
    colors: [
      { name: "Red", value: "#FF5733" },
      { name: "Blue", value: "#3498DB" },
      { name: "Green", value: "#2ECC71" },
      { name: "Purple", value: "#9B59B6" },
      { name: "Yellow", value: "#F1C40F" },
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" },
      { name: "Pink", value: "#FF69B4" },
    ],
    fabrics: ["Cotton", "Silk", "Linen", "Polyester", "Denim", "Wool", "Chiffon", "Satin"],
  }

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 300 },
      colors: [],
      fabrics: [],
    })
  }

  // Apply filters to products
  useEffect(() => {
    let filtered = allProducts

    // Filter by price
    filtered = filtered.filter(
      (product) => product.numericPrice >= filters.priceRange.min && product.numericPrice <= filters.priceRange.max,
    )

    // Filter by colors
    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) => product.colors?.some((color) => filters.colors.includes(color)))
    }

    // Filter by fabrics
    if (filters.fabrics.length > 0) {
      filtered = filtered.filter((product) => product.fabric && filters.fabrics.includes(product.fabric))
    }

    setFilteredProducts(filtered)

    // Calculate active filter count
    let count = 0
    if (
      filters.priceRange.min !== availableFilters.priceRange.min ||
      filters.priceRange.max !== availableFilters.priceRange.max
    ) {
      count++
    }
    count += filters.colors.length
    count += filters.fabrics.length
    setActiveFilterCount(count)
  }, [filters])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8">
          <Link href="/" className="text-[#5A5A5A] hover:text-[#8B4513]">
            Home
          </Link>
          <span className="mx-2 text-[#5A5A5A]">/</span>
          <span className="text-[#3A3A3A] capitalize">{formattedCategory}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <FilterSidebar
              initialFilters={filters}
              onFilterChange={handleFilterChange}
              availableFilters={availableFilters}
              activeFilterCount={activeFilterCount}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-serif text-[#3A3A3A] mb-4 md:mb-0">
                Explore Our Collection <span className="text-[#8B4513]">Available Piece</span>
              </h1>

              {/* Sort Dropdown */}
              <SortDropdown />
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-[#5A5A5A]">No products match your selected filters.</p>
                <button onClick={clearFilters} className="mt-4 text-[#8B4513] hover:underline">
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-[#5A5A5A]">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </p>
                <Suspense fallback={<ProductGridSkeleton count={filteredProducts.length} />}>
                  <ProductGrid products={filteredProducts} />
                </Suspense>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
