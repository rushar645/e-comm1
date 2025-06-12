import type * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProductCardUIProps extends React.HTMLAttributes<HTMLDivElement> {
  id: number | string
  name: string
  price: string
  imageSrc: string
  category?: string
  rating?: number
  isNew?: boolean
  isSale?: boolean
  discount?: string
  showQuickAdd?: boolean
  showRating?: boolean
  variant?: "default" | "compact" | "featured"
}

export function ProductCardUI({
  id,
  name,
  price,
  imageSrc,
  category = "all",
  rating = 0,
  isNew = false,
  isSale = false,
  discount,
  showQuickAdd = false,
  showRating = false,
  variant = "default",
  className,
  ...props
}: ProductCardUIProps) {
  return (
    <div
      className={cn(
        "group relative rounded-lg overflow-hidden bg-white transition-all duration-300",
        variant === "compact" ? "shadow-none" : "shadow-sm hover:shadow-md",
        variant === "featured" && "shadow-md hover:shadow-lg",
        className,
      )}
      {...props}
    >
      {/* Product Image */}
      <Link href={`/product/${id}`} className="block">
        <div className={cn("relative overflow-hidden", variant === "compact" ? "h-48" : "h-64 md:h-80")}>
          <Image
            src={imageSrc || "/placeholder.svg"}
            fill
            alt={name}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 240px"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && <Badge variant="new">New</Badge>}
            {isSale && <Badge variant="sale">{discount || "Sale"}</Badge>}
          </div>

          {/* Quick Add Button */}
          {showQuickAdd && (
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button className="bg-white text-[#3A3A3A] hover:bg-[#F0D0B5] shadow-md">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className={cn("p-3", variant === "featured" ? "bg-[#FFF9F5]" : "bg-white")}>
        <Link href={`/product/${id}`} className="block">
          <h3 className={cn("font-medium text-[#3A3A3A] text-center", variant === "compact" ? "text-xs" : "text-sm")}>
            {name}
          </h3>
          <p
            className={cn(
              "text-center font-medium mt-1",
              variant === "compact" ? "text-xs" : "text-sm",
              isSale ? "text-[#D35400]" : "text-[#3A3A3A]",
            )}
          >
            {price}
          </p>
        </Link>

        {/* Rating */}
        {showRating && rating > 0 && (
          <div className="flex items-center justify-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn("h-3 w-3", i < rating ? "fill-current text-yellow-400" : "text-gray-300")}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
