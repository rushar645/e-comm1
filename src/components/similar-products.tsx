"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/types"


interface SimilarProductsProps {
  products: Product[]
}

export function SimilarProducts({ products }: SimilarProductsProps) {
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
        className="flex overflow-x-auto gap-6 py-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="shrink-0 snap-center group"
            style={{ width: "240px" }}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  fill
                  alt={product.name}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="240px"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-[#3A3A3A] text-center">{product.name}</h3>
                <p className="text-sm text-[#D35400] text-center font-medium mt-1">{product.price}</p>
              </div>
            </div>
          </Link>
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
