"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/components/ui/use-toast"
import { validateDiscountCode, calculateDiscount, type DiscountCode } from "@/lib/discount-utils"

export interface CartItem {
  id: string | number
  name: string
  price: string
  numericPrice: number
  imageSrc: string
  quantity: number
  color?: string
  size?: string
  category?: string
}

interface SavedItem extends CartItem {}

interface CartContextType {
  items: CartItem[]
  savedItems: SavedItem[]
  appliedDiscount: DiscountCode | null
  discountAmount: number
  shippingDiscount: number
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeItem: (id: string | number, color?: string, size?: string) => void
  updateQuantity: (id: string | number, quantity: number, color?: string, size?: string) => void
  clearCart: () => void
  saveForLater: (id: string | number, color?: string, size?: string) => void
  moveToCart: (id: string | number, color?: string, size?: string) => void
  removeSavedItem: (id: string | number, color?: string, size?: string) => void
  isInCart: (id: string | number, color?: string, size?: string) => boolean
  itemCount: number
  subtotal: number
  getSubtotal: () => number
  getShippingCost: () => number
  getTotal: () => number
  applyDiscount: (code: string) => Promise<{ success: boolean; message: string }>
  removeDiscount: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null)
  const [mounted, setMounted] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const storedCart = localStorage.getItem("cart")
    const storedSavedItems = localStorage.getItem("savedItems")
    const storedDiscount = localStorage.getItem("appliedDiscount")

    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }

    if (storedSavedItems) {
      try {
        setSavedItems(JSON.parse(storedSavedItems))
      } catch (error) {
        console.error("Failed to parse saved items from localStorage:", error)
      }
    }

    if (storedDiscount) {
      try {
        setAppliedDiscount(JSON.parse(storedDiscount))
      } catch (error) {
        console.error("Failed to parse discount from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, mounted])

  // Save saved items to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("savedItems", JSON.stringify(savedItems))
    }
  }, [savedItems, mounted])

  // Save applied discount to localStorage
  useEffect(() => {
    if (mounted) {
      if (appliedDiscount) {
        localStorage.setItem("appliedDiscount", JSON.stringify(appliedDiscount))
      } else {
        localStorage.removeItem("appliedDiscount")
      }
    }
  }, [appliedDiscount, mounted])

  // Add item to cart
  const addItem = (newItem: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prevItems) => {
      // Check if item already exists in cart (with same id, color, and size)
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size,
      )

      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity

        toast({
          title: "Cart updated",
          description: `${newItem.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
          duration: 2000,
        })

        return updatedItems
      }

      // Add new item
      toast({
        title: "Added to cart",
        description: `${newItem.name} added to your cart`,
        duration: 2000,
      })

      return [...prevItems, { ...newItem, quantity }]
    })
  }

  // Remove item from cart
  const removeItem = (id: string | number, color?: string, size?: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id && item.color === color && item.size === size)

      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.name} removed from your cart`,
          duration: 2000,
        })
      }

      return prevItems.filter((item) => !(item.id === id && item.color === color && item.size === size))
    })
  }

  // Update item quantity
  const updateQuantity = (id: string | number, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeItem(id, color, size)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.color === color && item.size === size ? { ...item, quantity } : item,
      ),
    )
  }

  // Clear cart
  const clearCart = () => {
    setItems([])
    setAppliedDiscount(null)
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      duration: 2000,
    })
  }

  // Save for later
  const saveForLater = (id: string | number, color?: string, size?: string) => {
    const itemToSave = items.find((item) => item.id === id && item.color === color && item.size === size)

    if (itemToSave) {
      setSavedItems((prev) => [...prev, itemToSave])
      removeItem(id, color, size)

      toast({
        title: "Saved for later",
        description: `${itemToSave.name} saved for later`,
        duration: 2000,
      })
    }
  }

  // Move to cart
  const moveToCart = (id: string | number, color?: string, size?: string) => {
    const itemToMove = savedItems.find((item) => item.id === id && item.color === color && item.size === size)

    if (itemToMove) {
      addItem(
        {
          id: itemToMove.id,
          name: itemToMove.name,
          price: itemToMove.price,
          numericPrice: itemToMove.numericPrice,
          imageSrc: itemToMove.imageSrc,
          color: itemToMove.color,
          size: itemToMove.size,
          category: itemToMove.category,
        },
        itemToMove.quantity,
      )

      removeSavedItem(id, color, size)
    }
  }

  // Remove saved item
  const removeSavedItem = (id: string | number, color?: string, size?: string) => {
    setSavedItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.color === color && item.size === size)),
    )
  }

  // Check if item is in cart
  const isInCart = (id: string | number, color?: string, size?: string) => {
    return items.some((item) => item.id === id && item.color === color && item.size === size)
  }

  // Calculate total number of items in cart
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.numericPrice * item.quantity, 0)

  // Get subtotal function
  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.numericPrice * item.quantity, 0)
  }

  // Calculate shipping cost
  const getShippingCost = () => {
    const baseShipping = subtotal > 1000 ? 0 : 100

    // Apply shipping discount if applicable
    if (appliedDiscount) {
      const { finalShippingCost } = calculateDiscount(appliedDiscount, subtotal, baseShipping)
      return finalShippingCost
    }

    return baseShipping
  }

  // Calculate discount amounts
  const getDiscountCalculation = () => {
    if (!appliedDiscount) {
      return { discountAmount: 0, shippingDiscount: 0 }
    }

    const baseShipping = subtotal > 1000 ? 0 : 100
    return calculateDiscount(appliedDiscount, subtotal, baseShipping)
  }

  const { discountAmount, shippingDiscount } = getDiscountCalculation()

  // Calculate total
  const getTotal = () => {
    const shipping = getShippingCost()
    return Math.max(0, subtotal - discountAmount + shipping)
  }

  // Apply discount code
  const applyDiscount = async (code: string): Promise<{ success: boolean; message: string }> => {
    if (!code.trim()) {
      return { success: false, message: "Please enter a discount code" }
    }

    const validation = validateDiscountCode(code, subtotal)

    if (!validation.isValid) {
      return { success: false, message: validation.error || "Invalid discount code" }
    }

    setAppliedDiscount(validation.discount)

    toast({
      title: "Discount applied!",
      description: validation.discount?.description || "Discount code applied successfully",
      duration: 3000,
    })

    return { success: true, message: "Discount applied successfully!" }
  }

  // Remove discount
  const removeDiscount = () => {
    setAppliedDiscount(null)
    toast({
      title: "Discount removed",
      description: "Discount code has been removed from your order",
      duration: 2000,
    })
  }

  const value = {
    items,
    savedItems,
    appliedDiscount,
    discountAmount,
    shippingDiscount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    saveForLater,
    moveToCart,
    removeSavedItem,
    isInCart,
    itemCount,
    subtotal,
    getSubtotal,
    getShippingCost,
    getTotal,
    applyDiscount,
    removeDiscount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
