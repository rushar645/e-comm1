"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useUser } from "@/contexts/user-contexts"
import api from "@/lib/axios"
import { toast } from "@/components/ui/use-toast"

export interface CartItem {
  id?: number
  sku: string
  name: string
  price: number 
  numericPrice?: number
  imageSrc: string
  imageAlt?: string
  category?: string
  color?: string
  size?: string
  quantity: number
  customSize: CustomSize | null
}

export interface CustomSize{
  unit: "inch" | "cm",
  mori:string,
  waist:string,
  chest:string,
  armhole:string,
  shoulder:string,
  dressLength:string,
  sleeveLength:string
}

export interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (sku: string) => void
  updateQuantity: (sku: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
  getShippingCost: () => number
  getTotal: () => number
  isEligibleForFreeShipping: () => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const shippingCost = 99
  const freeShippingThreshold = 1999

  const { user, cart } = useUser()


  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      } catch (e) {
        console.error("Error parsing saved cart", e)
      }
    }
  }, [])
 

  useEffect(() => {
    const loadOrSyncCart = async () => {
      if (!user?.id) return
  
      try {
        // const res = await api.get(`/api/user-cart?id=${user.id}`)
        const userCart = cart
  
        if (Array.isArray(userCart) && userCart.length > 0) {
          // Use user cart from backend
          setItems(userCart)
          localStorage.removeItem("cart")
        } else {
          // Fallback to localStorage cart
          const localCart = localStorage.getItem("cart")
          if (localCart) {
            const parsedLocalCart = JSON.parse(localCart)
            if (Array.isArray(parsedLocalCart) && parsedLocalCart.length > 0) {
              setItems(parsedLocalCart)
              await updateCartInDB(parsedLocalCart)
              localStorage.removeItem("cart")
            }
          }
        }
      } catch (e) {
        console.error("Failed to load or sync user cart", e)
      }
    }
  
    loadOrSyncCart()
  }, [user?.id])
  

  useEffect(() => {

      localStorage.setItem("cart", JSON.stringify(items))
  }, [items, user?.id])



  const updateCartInDB = async (updatedItems: CartItem[]) => {
    if (!user?.id) return
    try {
      await api.put("/api/updatecart", {
        id: user.id,
        cart: updatedItems.map(({ id, color, size, quantity }) => ({
          id,
          color,
          size,
          quantity,
        })),
      })
    } catch (e) {
      console.error("Failed to update cart in DB", e)
    }
  }

  // Actions
  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    let flag = 0
    setItems((prev) => {
      const existing = prev.find(
        (p) =>
          item.sku === p.sku  
      )

      let updated: CartItem[]
      if (existing) {
        updated = prev
        toast({
          title: "Item already in cart",
          description: `${item.name} is already in your cart`,
        })
      } else {
        flag = 1
        updated = [...prev, { ...item, quantity: item.quantity || 1 }]
      }
      
      updateCartInDB(updated)
      return updated
    })
    // if (flag == 1)
    //   toast({
    //     title: "Item added in your cart",
    //     description: `${item.name} is added to your cart`,
    //     link:"/cart"
    //   })
  }

  const removeItem = (sku: string) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.sku !== sku)
      updateCartInDB(updated)
      return updated
    })
    toast({
      title: "Removed item from your cart",
      description: `Item removed from your cart`,
    })
  }

  const updateQuantity = (sku: string, quantity: number) => {
    setItems((prev) => {
      let updated: CartItem[]
      if (quantity <= 0) {
        updated = prev.filter((item) => item.sku !== sku)
      } else {
        updated = prev.map((item) =>
          item.sku === sku ? { ...item, quantity: Math.min(quantity, 10) } : item
        )
      }
      updateCartInDB(updated)
      return updated
    })
  }

  const clearCart = () => {
    setItems([])
    updateCartInDB([])
  }

  const toggleCart = () => setIsOpen((prev) => !prev)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  // Calculations
  const getItemCount = () => items.reduce((sum, item) => sum + item.quantity, 0)
  const getSubtotal = () => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const getShippingCost = () => (getSubtotal() >= freeShippingThreshold ? 0 : shippingCost)
  const getTotal = () => getSubtotal() + getShippingCost()
  const isEligibleForFreeShipping = () => getSubtotal() >= freeShippingThreshold

  const value: CartContextType = {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getItemCount,
    getSubtotal,
    getShippingCost,
    getTotal,
    isEligibleForFreeShipping,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
