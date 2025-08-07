"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

interface ProductCardProps {
  id: string
  imageSrc: string
  name: string
  price: number
  highlighted?: boolean
  showRating?: boolean
  category?: string
  numericPrice?: number
  colors?: string[]
  fabric?: string
  sku:string
}

export function ProductCard({
  id,
  imageSrc,
  name,
  price,
  highlighted = false,
  showRating = false,
  category = "all",
  numericPrice,
  colors,
  fabric,
  sku
}: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      sku,
      name,
      price,
      imageSrc,
      color: colors?.[0] || "",
      size: "M",
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWishlist(sku)) {
      removeFromWishlist(sku)
    } else {
      addToWishlist({
        sku,
        name,
        price,
        imageSrc,
      })
    }
  }

  return (
    <Link href={`/product/${sku}`} className="block w-full">
      <div
        className={`bg-white rounded-lg overflow-hidden transition-all duration-300 ${
          highlighted ? "shadow-xl" : "shadow-sm hover:shadow-md"
        } w-full max-w-[280px] mx-auto`}
      >
        <div className="relative aspect-[4/5] overflow-hidden group">
          <Image
            src={imageSrc || "/placeholder.svg"}
            fill 
            alt={name}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all duration-300 ${
              isInWishlist(id) ? "bg-red-50 text-red-500" : "bg-white text-gray-500 opacity-0 group-hover:opacity-100"
            } md:opacity-100`}
            aria-label={isInWishlist(id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`size-4 ${isInWishlist(sku) ? "fill-red-500 stroke-red-500" : ""}`} />
          </button>

          {/* Add to cart overlay - Hidden on mobile, shown on hover for desktop */}
          <div className="absolute inset-0 bg-black/20 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              className="bg-white text-brand-gray hover:bg-brand-light shadow-md text-xs px-3 py-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="size-3 mr-1" />
              Add to Cart
            </Button>
          </div>

          {/* Mobile Add to Cart Button */}
          <div className="md:hidden absolute bottom-2 left-2 right-2">
            <Button
              className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white text-xs py-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="size-3 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-3 bg-brand-light">
          <h3 className="text-sm font-medium text-brand-gray text-center line-clamp-2">{name}</h3>
          <p className="text-sm text-brand-orange text-center font-medium mt-1">{numericPrice}</p>

          {showRating && (
            <div className="flex items-center justify-center mt-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="size-3 fill-current text-yellow-400" />
                ))}
              </div>
            </div>
          )}

          {/* Color options */}
          {colors && colors.length > 0 && (
            <div className="flex justify-center mt-2 gap-1">
              {colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="size-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                  title={`Color option ${index + 1}`}
                />
              ))}
              {colors.length > 4 && <span className="text-xs text-muted-foreground ml-1">+{colors.length - 4}</span>}
            </div>
          )}

          {/* Fabric tag */}
          {fabric && (
            <div className="mt-1 text-center">
              <span className="text-xs text-muted-foreground">{fabric}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
