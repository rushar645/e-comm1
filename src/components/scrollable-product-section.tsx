"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"

interface Product {
  id: number
  name: string
  price: string
  imageSrc: string
  category?: string
}

interface ScrollableProductSectionProps {
  products: Product[]
  showRating?: boolean
  category?: string
}

export function ScrollableProductSection({
  products,
  showRating = false,
  category = "all",
}: ScrollableProductSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 py-4 px-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="shrink-0 snap-center" style={{ width: "240px" }}>
            <ProductCard
              id={product.id}
              imageSrc={product.imageSrc}
              name={product.name}
              price={product.price}
              showRating={showRating}
              category={product.category || category}
            />
          </div>
        ))}
      </div>

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
        aria-label="Previous product"
      >
        <ChevronLeft className="h-6 w-6 text-[#3A3A3A]" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
        aria-label="Next product"
      >
        <ChevronRight className="h-6 w-6 text-[#3A3A3A]" />
      </button>
    </div>
  )
}
