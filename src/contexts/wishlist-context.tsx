"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/components/ui/use-toast"

export interface WishlistItem {
  id: string | number
  name: string
  price: string
  numericPrice: number
  imageSrc: string
  color?: string
  size?: string
  category?: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string | number) => void
  isInWishlist: (id: string | number) => boolean
  clearWishlist: () => void
  itemCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        setItems(JSON.parse(storedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("wishlist", JSON.stringify(items))
    }
  }, [items, mounted])

  // Add item to wishlist
  const addItem = (item: WishlistItem) => {
    setItems((prevItems) => {
      // Check if item already exists in wishlist
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        toast({
          title: "Already in wishlist",
          description: `${item.name} is already in your wishlist`,
          duration: 2000,
        })
        return prevItems
      }

      // Add new item
      toast({
        title: "Added to wishlist",
        description: `${item.name} added to your wishlist`,
        duration: 2000,
      })
      return [...prevItems, item]
    })
  }

  // Remove item from wishlist
  const removeItem = (id: string | number) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id)
      if (itemToRemove) {
        toast({
          title: "Removed from wishlist",
          description: `${itemToRemove.name} removed from your wishlist`,
          duration: 2000,
        })
      }
      return prevItems.filter((item) => item.id !== id)
    })
  }

  // Check if item is in wishlist
  const isInWishlist = (id: string | number) => {
    return items.some((item) => item.id === id)
  }

  // Clear wishlist
  const clearWishlist = () => {
    setItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
      duration: 2000,
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
        itemCount: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
