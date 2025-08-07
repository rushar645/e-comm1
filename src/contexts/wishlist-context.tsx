"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/components/ui/use-toast"
import { createBrowserClient } from "@/lib/supabase"
import { useUser } from "./user-contexts"

import api from "@/lib/axios" 

export interface WishlistItem {
  sku: string 
  price: number
  name: string
  imageSrc: string
  color?: string
  size?: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (sku: string) => void
  isInWishlist: (sku: string) => boolean
  clearWishlist: () => void
  itemCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const { user, setUser } = useUser()

  useEffect(() => {
    if (user?.wishlist) {
      setItems(user.wishlist)
    }
  }, [user?.wishlist])
 
  // Update wishlist in the DB, no await (fire-and-forget style)
  const updateWishlistInDB = (updatedItems: WishlistItem[]) => {
    if (!user?.id) return

    try{
      const res = api.put("api/updatewish", {id:user.id, wishlist:updatedItems})
    }
    catch(e){
      console.log(e)
    }
  }

  const addItem = (item: WishlistItem) => {
    setItems((prevItems) => {
      const exists = prevItems.some((i) => i.sku === item.sku)
      if (exists)
        return prevItems

      const updated = [...prevItems, item]
      updateWishlistInDB(updated)
      
      return updated
    })
    toast({
      title: "Added to wishlist",
      description: `${item.name} added to your wishlist`,
    })
  }

  const removeItem = (sku: string) => {
    setItems((prevItems) => {
      const updated = prevItems.filter((item) => item.sku !== sku)
      updateWishlistInDB(updated)
      return updated
    })
    toast({ title: "Removed", description: "Item removed from your wishlist" })
  }

  const isInWishlist = (sku: string) => items.some((item) => item.sku === sku)

  const clearWishlist = () => {
    setItems([])
    updateWishlistInDB([])
    toast({ title: "Wishlist cleared", description: "All items removed" })
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
