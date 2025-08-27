"use client"

import { useRef } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { Product } from "@/types"
import Link from "next/link"



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
              imageSrc={product.images[0]}
              name={product.name}
              price={product.price}
              numericPrice={product.price}
              showRating={showRating}
              category={product.category || category}
              sku={product.sku}
            />
          </div>
        ))}
        <div className="h-92 aspect-[9/16] flex flex-col items-center justify-center rounded-lg  transition-colors cursor-pointer">
          <Link href={`/category/${products[0].category}`} className="h-full flex flex-col justify-center items-center gap-5 text-white">
            <h2 className="flex items-center gap-2 text-2xl font-medium">
              Explore More
            </h2>
            <div className="bg-white h-12 w-12 rounded-4xl p-3">
              <ArrowRight className="h-full w-full text-black" />
            </div>
          </Link>
        </div>
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
