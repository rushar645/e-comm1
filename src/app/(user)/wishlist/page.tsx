"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"

export default function WishlistPage() {
  const { items: wishlistItems, removeItem } = useWishlist()
  const { addItem } = useCart()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleRemoveFromWishlist = (id: string) => {
    removeItem(id)
  }

  const handleAddToCart = (item: any) => {
    // addItem({
    //   id: item.id,
    //   name: item.name,
    //   price: item.price,
    //   numericPrice: item.numericPrice,
    //   imageSrc: item.imageSrc,
    //   color: item.color || "",
    //   size: item.size || "M",
    //   category: item.category || "",
    // })
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
      
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif text-[#3A3A3A] mb-8">My Wishlist</h1>
          <p className="text-center py-12">Loading wishlist...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif text-[#3A3A3A]">
          My Wishlist <span className="text-lg font-normal text-gray-500">Available Piece</span>
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <Link href="/" className="text-[#3A2723] hover:underline">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
            {wishlistItems.map((item) => (
              <div key={item.sku} className="bg-white border rounded-lg overflow-hidden relative">
                <button
                  onClick={() => handleRemoveFromWishlist(item.sku)}
                  className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md"
                  aria-label="Remove from wishlist"
                >
                  <X className="h-4 w-4" />
                </button>
                <Link href={`/product/${item.sku}`}>
                  <div className="relative h-48 bg-gray-200">
                    <Image src={item.imageSrc || "/placeholder.svg"} alt={item.sku} fill className="object-cover" />
                  </div>
                </Link>
                <div className="p-3">
                  <h3 className="text-sm font-medium">{item.sku}</h3>
                  <p className="text-sm">{item.price}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 text-xs"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add to cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
