"use client"

import { useState, useEffect, useCallback } from "react"
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  clearWishlist,
  getWishlistItemCount,
  type WishlistItem,
} from "@/lib/wishlist-utils"

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load wishlist on initial render
  useEffect(() => {
    setWishlist(getWishlist())
    setIsLoaded(true)
  }, [])

  // Add item to wishlist
  const addItem = useCallback((item: WishlistItem) => {
    const updatedWishlist = addToWishlist(item)
    setWishlist(updatedWishlist)
    return updatedWishlist
  }, [])

  // Remove item from wishlist
  const removeItem = useCallback((itemId: string | number) => {
    const updatedWishlist = removeFromWishlist(itemId)
    setWishlist(updatedWishlist)
    return updatedWishlist
  }, [])

  // Check if item is in wishlist
  const isItemInWishlist = useCallback((itemId: string | number) => {
    return isInWishlist(itemId)
  }, [])

  // Clear wishlist
  const emptyWishlist = useCallback(() => {
    const updatedWishlist = clearWishlist()
    setWishlist(updatedWishlist)
    return updatedWishlist
  }, [])

  // Get item count
  const itemCount = useCallback(() => {
    return getWishlistItemCount()
  }, [])

  return {
    wishlist,
    isLoaded,
    addItem,
    removeItem,
    isItemInWishlist,
    emptyWishlist,
    itemCount,
  }
}
