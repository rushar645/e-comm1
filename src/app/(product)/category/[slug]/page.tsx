'use client'

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { use } from "react"
import { ProductGrid } from "@/components/product-grid"
import { FilterSidebar, type FilterState } from "@/components/filter-sidebar"
import { SortDropdown } from "@/components/sort-dropdown"
import { ProductGridSkeleton } from "@/components/ui/skeleton"
import api from "@/lib/axios"
import { Product } from "@/types"

// interface Product {
//   id: number | string
//   name: string
//   price: string
//   numericPrice: number
//   imageSrc: string
//   colors?: string[]
//   fabric?: string
//   sku?:string
// }

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // Get the category from the URL
  const category = use(params)
  const formattedCategory = category.slug
    .split("-")
    .join(" ")

  // --- NEW: State for loaded allProducts from API ---
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 🟡 Fetch products from your API on mount/category change
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      setError(null) 
      try {
        const res = await api.get(`/api/products?category=${encodeURIComponent(category.slug)}`)
        // console.log("result of products fetch", res.data.data)
        
        const data = res.data.data
        // console.log("Fetched Images :",data[0].images[0])
        setAllProducts(
          data.map((p: Product) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            imageSrc: p.images[0] || "/placeholder.svg?height=300&width=240",
            colors: p.colors || [],
            fabric: p.material || "",
            sku:p.sku
          }))
        )

        // setAllProducts(data);

      } catch (err) {
        setError("Could not load products")
        console.log("ERror loading products..", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category.slug])
  // ----------------------------------------------------

  // Filter/Sort States (no change)
  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: 0, max: 10000 },
    colors: [],
    fabrics: [],
  })
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [activeFilterCount, setActiveFilterCount] = useState(0)

  const availableFilters = {
    priceRange: { min: 0, max: 10000 },
    colors: [
      { name: "red", value: "#FF5733" },
      { name: "blue", value: "#3498DB" },
      { name: "green", value: "#2ECC71" },
      { name: "purple", value: "#9B59B6" },
      { name: "yellow", value: "#F1C40F" },
      { name: "black", value: "#000000" },
      { name: "white", value: "#FFFFFF" },
      { name: "pink", value: "#FF69B4" },
    ],
    fabrics: ["Cotton", "Linen", "Polyester", "Denim", "Chiffon", "Satin", "GGT", "Cotto Slub","Chanderi","Butter Cotton","Poplin", "Cotton Voil", "Poly Crepe", "Organza", "Poly Spendex", "Modal", "Reyon", "Nylon", "Net", "Dobby", "Velvet", "Taffta", "Viscose", "Polysaint"],
  }

  const handleFilterChange = (newFilters: FilterState) => setFilters(newFilters)
  const clearFilters = () =>
    setFilters({
      priceRange: { min: 0, max: 10000 },
      colors: [],
      fabrics: [],
    })

  // ✔️ Filter logic updates on allProducts change
  useEffect(() => {
    let filtered = allProducts
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    )
    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) => product.colors?.some((color) => filters.colors.includes(color)))
    }
    if (filters.fabrics.length > 0) {
      filtered = filtered.filter((product) => product.material && filters.fabrics.includes(product.material))
    }
    setFilteredProducts(filtered)
    console.log("The product data   da", filteredProducts)

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
  }, [filters, allProducts,availableFilters.priceRange.min,  availableFilters.priceRange.max])

  return (
    <div className="min-h-screen bg-white">
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
            {/* Loading & Error */}
            {loading ? (
              <ProductGridSkeleton count={12} />
            ) : error ? (
              <div className="text-center py-8 text-destructive">{error}</div>
            ) : filteredProducts.length === 0 ? (
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
