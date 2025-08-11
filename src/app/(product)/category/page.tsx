// "use client"

// import { useState } from "react"
// import Link from "next/link"
// // import { Navbar } from "@/components/navbar"
// import { ProductGrid } from "@/components/product-grid"
// // import { PaymentMethods } from "@/components/payment-methods"
// // import { SocialLinks } from "@/components/social-links"
// import { FilterSidebar, type FilterState } from "@/components/filter-sidebar"
// import { SortDropdown } from "@/components/sort-dropdown"
// // import { products } from "@/app/data/products"


// const availableFilters = {
//   priceRange: { min: 0, max: 300 },
//   colors: [
//     { name: "Red", value: "#FF5733" },
//     { name: "Blue", value: "#3498DB" },
//     { name: "Green", value: "#2ECC71" },
//     { name: "Purple", value: "#9B59B6" },
//     { name: "Yellow", value: "#F1C40F" },
//     { name: "Black", value: "#000000" },
//     { name: "White", value: "#FFFFFF" },
//     { name: "Pink", value: "#FF69B4" },
//   ],
//   fabrics: ["Cotton", "Silk", "Linen", "Polyester", "Denim", "Wool", "Chiffon", "Satin"],
// }

// export default function CategoryPage() {
//   const [products, setProducts] = useState([{}])
  
//   const [filters, setFilters] = useState<FilterState>({
//     priceRange: { min: 0, max: 300 },
//     colors: [],
//     fabrics: [],
//   })

//   // State for active filter count
//   const [activeFilterCount, setActiveFilterCount] = useState(0)

//   // Get all products for the main category page
//   const allProducts = products.map((product) => ({
//     id: product.id,
//     name: product.name,
//     price: product.price,
//     numericPrice: product.price,
//     imageSrc: product.imageSrc,
//     colors: product.colors?.map((c) => c.value) || [],
//     fabric: product.fabric || "",
//     sku:product.sku,
//   }))

//   // State for filtered products
//   const [filteredProducts, setFilteredProducts] = useState(allProducts)

//   // Handle filter changes
//   const handleFilterChange = (newFilters: FilterState) => {
//     setFilters(newFilters)

//     // Apply filters
//     let filtered = allProducts

//     // Filter by price
//     filtered = filtered.filter(
//       (product) =>
//         product.numericPrice >= newFilters.priceRange.min && product.numericPrice <= newFilters.priceRange.max,
//     )

//     // Filter by colors
//     if (newFilters.colors.length > 0) {
//       filtered = filtered.filter((product) => product.colors?.some((color) => newFilters.colors.includes(color)))
//     }

//     // Filter by fabrics
//     if (newFilters.fabrics.length > 0) {
//       filtered = filtered.filter((product) => product.fabric && newFilters.fabrics.includes(product.fabric))
//     }

//     setFilteredProducts(filtered)
//     // setProducts(filtered)

//     // Calculate active filter count
//     let count = 0
//     if (
//       newFilters.priceRange.min !== availableFilters.priceRange.min ||
//       newFilters.priceRange.max !== availableFilters.priceRange.max
//     ) {
//       count++
//     }
//     count += newFilters.colors.length
//     count += newFilters.fabrics.length
//     setActiveFilterCount(count)
//   }

//   // Clear all filters
//   const clearFilters = () => {
//     const resetFilters = {
//       priceRange: { min: 0, max: 300 },
//       colors: [],
//       fabrics: [],
//     }
//     setFilters(resetFilters)
//     setFilteredProducts(allProducts)
//     setActiveFilterCount(0)
//   }

//   return (
//     <div className="min-h-screen bg-white">

//       <div className="container mx-auto px-4 py-8">
//         {/* Breadcrumb */}
//         <div className="flex items-center text-sm mb-8">
//           <Link href="/" className="text-[#5A5A5A] hover:text-[#8B4513]">
//             Home
//           </Link>
//           <span className="mx-2 text-[#5A5A5A]">/</span>
//           <span className="text-[#3A3A3A] capitalize">All Categories</span>
//         </div>

//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Filters Sidebar */}
//           <div className="w-full md:w-1/4">
//             <FilterSidebar
//               initialFilters={filters}
//               onFilterChange={handleFilterChange}
//               availableFilters={availableFilters}
//               activeFilterCount={activeFilterCount}
//               onClearFilters={clearFilters}
//             />
//           </div>

//           {/* Main Content */}
//           <div className="w-full md:w-3/4">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//               <h1 className="text-2xl md:text-3xl font-serif text-[#3A3A3A] mb-4 md:mb-0">
//                 Explore Our Collection <span className="text-[#8B4513]">Available Piece</span>
//               </h1>

//               {/* Sort Dropdown */}
//               <SortDropdown />
//             </div>

//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-lg text-[#5A5A5A]">No products match your selected filters.</p>
//                 <button onClick={clearFilters} className="mt-4 text-[#8B4513] hover:underline">
//                   Clear all filters
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <p className="mb-4 text-sm text-[#5A5A5A]">
//                   Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
//                 </p>
//                 <ProductGrid products={filteredProducts} />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

const Page = () => {

  const router = useRouter();

  useEffect(()=>{
    router.push("/category/lehenga")
  },[router])
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar Skeleton */}
        <div className="w-full md:w-1/4">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse" />
                <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse" />
                <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse" />
                <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse" />
                <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse mb-4 md:mb-0" />
            <div className="h-10 w-40 bg-gray-200 rounded-md animate-pulse" />
          </div>

          <div className="mb-4">
            <div className="h-5 w-48 bg-gray-200 rounded-md animate-pulse" />
          </div>

          <ProductGridSkeleton count={12} />
        </div>
      </div>
    </div>
  )
}

export default Page

