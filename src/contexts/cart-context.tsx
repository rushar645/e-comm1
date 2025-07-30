// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
// import { toast } from "@/components/ui/use-toast"
// import { validateDiscountCode, calculateDiscount, type DiscountCode } from "@/lib/discount-utils"

// export interface CartItem {
//   id: string | number
//   name: string
//   price: string
//   numericPrice: number
//   imageSrc: string
//   quantity: number
//   color?: string
//   size?: string
//   category?: string
// }

// interface SavedItem extends CartItem {}

// interface CartContextType {
//   items: CartItem[]
//   savedItems: SavedItem[]
//   appliedDiscount: DiscountCode | null
//   discountAmount: number
//   shippingDiscount: number
//   addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
//   removeItem: (id: string | number, color?: string, size?: string) => void
//   updateQuantity: (id: string | number, quantity: number, color?: string, size?: string) => void
//   clearCart: () => void
//   saveForLater: (id: string | number, color?: string, size?: string) => void
//   moveToCart: (id: string | number, color?: string, size?: string) => void
//   removeSavedItem: (id: string | number, color?: string, size?: string) => void
//   isInCart: (id: string | number, color?: string, size?: string) => boolean
//   itemCount: number
//   subtotal: number
//   getSubtotal: () => number
//   getShippingCost: () => number
//   getTotal: () => number
//   applyDiscount: (code: string) => Promise<{ success: boolean; message: string }>
//   removeDiscount: () => void
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [items, setItems] = useState<CartItem[]>([])
//   const [savedItems, setSavedItems] = useState<SavedItem[]>([])
//   const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null)
//   const [mounted, setMounted] = useState(false)

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     setMounted(true)
//     const storedCart = localStorage.getItem("cart")
//     const storedSavedItems = localStorage.getItem("savedItems")
//     const storedDiscount = localStorage.getItem("appliedDiscount")

//     if (storedCart) {
//       try {
//         setItems(JSON.parse(storedCart))
//       } catch (error) {
//         console.error("Failed to parse cart from localStorage:", error)
//       }
//     }

//     if (storedSavedItems) {
//       try {
//         setSavedItems(JSON.parse(storedSavedItems))
//       } catch (error) {
//         console.error("Failed to parse saved items from localStorage:", error)
//       }
//     }

//     if (storedDiscount) {
//       try {
//         setAppliedDiscount(JSON.parse(storedDiscount))
//       } catch (error) {
//         console.error("Failed to parse discount from localStorage:", error)
//       }
//     }
//   }, [])

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     if (mounted) {
//       localStorage.setItem("cart", JSON.stringify(items))
//     }
//   }, [items, mounted])

//   // Save saved items to localStorage whenever they change
//   useEffect(() => {
//     if (mounted) {
//       localStorage.setItem("savedItems", JSON.stringify(savedItems))
//     }
//   }, [savedItems, mounted])

//   // Save applied discount to localStorage
//   useEffect(() => {
//     if (mounted) {
//       if (appliedDiscount) {
//         localStorage.setItem("appliedDiscount", JSON.stringify(appliedDiscount))
//       } else {
//         localStorage.removeItem("appliedDiscount")
//       }
//     }
//   }, [appliedDiscount, mounted])

//   // Add item to cart
//   const addItem = (newItem: Omit<CartItem, "quantity">, quantity = 1) => {
//     setItems((prevItems) => {
//       // Check if item already exists in cart (with same id, color, and size)
//       const existingItemIndex = prevItems.findIndex(
//         (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size,
//       )

//       if (existingItemIndex !== -1) {
//         // Item already exists, update quantity
//         const updatedItems = [...prevItems]
//         updatedItems[existingItemIndex].quantity += quantity

//         toast({
//           title: "Cart updated",
//           description: `${newItem.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
//           duration: 2000,
//         })

//         return updatedItems
//       }

//       // Add new item
//       toast({
//         title: "Added to cart",
//         description: `${newItem.name} added to your cart`,
//         duration: 2000,
//       })

//       return [...prevItems, { ...newItem, quantity }]
//     })
//   }

//   // Remove item from cart
//   const removeItem = (id: string | number, color?: string, size?: string) => {
//     setItems((prevItems) => {
//       const itemToRemove = prevItems.find((item) => item.id === id && item.color === color && item.size === size)

//       if (itemToRemove) {
//         toast({
//           title: "Removed from cart",
//           description: `${itemToRemove.name} removed from your cart`,
//           duration: 2000,
//         })
//       }

//       return prevItems.filter((item) => !(item.id === id && item.color === color && item.size === size))
//     })
//   }

//   // Update item quantity
//   const updateQuantity = (id: string | number, quantity: number, color?: string, size?: string) => {
//     if (quantity <= 0) {
//       removeItem(id, color, size)
//       return
//     }

//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id && item.color === color && item.size === size ? { ...item, quantity } : item,
//       ),
//     )
//   }

//   // Clear cart
//   const clearCart = () => {
//     setItems([])
//     setAppliedDiscount(null)
//     toast({
//       title: "Cart cleared",
//       description: "All items have been removed from your cart",
//       duration: 2000,
//     })
//   }

//   // Save for later
//   const saveForLater = (id: string | number, color?: string, size?: string) => {
//     const itemToSave = items.find((item) => item.id === id && item.color === color && item.size === size)

//     if (itemToSave) {
//       setSavedItems((prev) => [...prev, itemToSave])
//       removeItem(id, color, size)

//       toast({
//         title: "Saved for later",
//         description: `${itemToSave.name} saved for later`,
//         duration: 2000,
//       })
//     }
//   }

//   // Move to cart
//   const moveToCart = (id: string | number, color?: string, size?: string) => {
//     const itemToMove = savedItems.find((item) => item.id === id && item.color === color && item.size === size)

//     if (itemToMove) {
//       addItem(
//         {
//           id: itemToMove.id,
//           name: itemToMove.name,
//           price: itemToMove.price,
//           numericPrice: itemToMove.numericPrice,
//           imageSrc: itemToMove.imageSrc,
//           color: itemToMove.color,
//           size: itemToMove.size,
//           category: itemToMove.category,
//         },
//         itemToMove.quantity,
//       )

//       removeSavedItem(id, color, size)
//     }
//   }

//   // Remove saved item
//   const removeSavedItem = (id: string | number, color?: string, size?: string) => {
//     setSavedItems((prevItems) =>
//       prevItems.filter((item) => !(item.id === id && item.color === color && item.size === size)),
//     )
//   }

//   // Check if item is in cart
//   const isInCart = (id: string | number, color?: string, size?: string) => {
//     return items.some((item) => item.id === id && item.color === color && item.size === size)
//   }

//   // Calculate total number of items in cart
//   const itemCount = items.reduce((count, item) => count + item.quantity, 0)

//   // Calculate subtotal
//   const subtotal = items.reduce((total, item) => total + item.numericPrice * item.quantity, 0)

//   // Get subtotal function
//   const getSubtotal = () => {
//     return items.reduce((total, item) => total + item.numericPrice * item.quantity, 0)
//   }

//   // Calculate shipping cost
//   const getShippingCost = () => {
//     const baseShipping = subtotal > 1000 ? 0 : 100

//     // Apply shipping discount if applicable
//     if (appliedDiscount) {
//       const { finalShippingCost } = calculateDiscount(appliedDiscount, subtotal, baseShipping)
//       return finalShippingCost
//     }

//     return baseShipping
//   }

//   // Calculate discount amounts
//   const getDiscountCalculation = () => {
//     if (!appliedDiscount) {
//       return { discountAmount: 0, shippingDiscount: 0 }
//     }

//     const baseShipping = subtotal > 1000 ? 0 : 100
//     return calculateDiscount(appliedDiscount, subtotal, baseShipping)
//   }

//   const { discountAmount, shippingDiscount } = getDiscountCalculation()

//   // Calculate total
//   const getTotal = () => {
//     const shipping = getShippingCost()
//     return Math.max(0, subtotal - discountAmount + shipping)
//   }

//   // Apply discount code
//   const applyDiscount = async (code: string): Promise<{ success: boolean; message: string }> => {
//     if (!code.trim()) {
//       return { success: false, message: "Please enter a discount code" }
//     }

//     const validation = validateDiscountCode(code, subtotal)

//     if (!validation.isValid) {
//       return { success: false, message: validation.error || "Invalid discount code" }
//     }

//     setAppliedDiscount(validation.discount)

//     toast({
//       title: "Discount applied!",
//       description: validation.discount?.description || "Discount code applied successfully",
//       duration: 3000,
//     })

//     return { success: true, message: "Discount applied successfully!" }
//   }

//   // Remove discount
//   const removeDiscount = () => {
//     setAppliedDiscount(null)
//     toast({
//       title: "Discount removed",
//       description: "Discount code has been removed from your order",
//       duration: 2000,
//     })
//   }

//   const value = {
//     items,
//     savedItems,
//     appliedDiscount,
//     discountAmount,
//     shippingDiscount,
//     addItem,
//     removeItem,
//     updateQuantity,
//     clearCart,
//     saveForLater,
//     moveToCart,
//     removeSavedItem,
//     isInCart,
//     itemCount,
//     subtotal,
//     getSubtotal,
//     getShippingCost,
//     getTotal,
//     applyDiscount,
//     removeDiscount,
//   }

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// }

// export function useCart() {
//   const context = useContext(CartContext)
//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider")
//   }
//   return context
// }
"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  price: string 
  numericPrice: number
  imageSrc: string
  imageAlt: string
  category: string
  brand: string
  selectedColor?: string
  selectedSize?: string
  quantity: number
  maxQuantity?: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  couponCode: string
  discountPercentage: number
  shippingCost: number
  freeShippingThreshold: number
}

export interface CartContextType {
  // State
  items: CartItem[]
  isOpen: boolean
  couponCode: string
  discountPercentage: number
  discountAmount: number

  // Actions
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void

  // Calculations
  getItemCount: () => number
  getSubtotal: () => number
  getShippingCost: () => number
  getTotal: () => number
  getTotalSavings: () => number
  isEligibleForFreeShipping: () => boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "APPLY_COUPON"; payload: { code: string; discount: number } }
  | { type: "REMOVE_COUPON" }
  | { type: "LOAD_CART"; payload: CartState }

const initialState: CartState = {
  items: [],
  isOpen: false,
  couponCode: "",
  discountPercentage: 0,
  shippingCost: 99,
  freeShippingThreshold: 1999,
}

// Available coupons
const AVAILABLE_COUPONS = {
  WELCOME10: 10,
  SAVE20: 20,
  FESTIVE25: 25,
  NEWUSER15: 15,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize,
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        const existingItem = updatedItems[existingItemIndex]
        const maxQuantity = existingItem.maxQuantity || 10
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: Math.min(existingItem.quantity + action.payload.quantity, maxQuantity),
        }
        return { ...state, items: updatedItems }
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      }
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.min(action.payload.quantity, item.maxQuantity || 10) }
            : item,
        ),
      }
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        couponCode: "",
        discountPercentage: 0,
      }

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }

    case "OPEN_CART":
      return { ...state, isOpen: true }

    case "CLOSE_CART":
      return { ...state, isOpen: false }

    case "APPLY_COUPON":
      return {
        ...state,
        couponCode: action.payload.code,
        discountPercentage: action.payload.discount,
      }

    case "REMOVE_COUPON":
      return {
        ...state,
        couponCode: "",
        discountPercentage: 0,
      }

    case "LOAD_CART":
      return action.payload

    default:
      return state
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        if (parsedCart && Array.isArray(parsedCart.items)) {
          dispatch({ type: "LOAD_CART", payload: parsedCart })
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state))
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  }, [state])

  // Actions
  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const cartItem: CartItem = {
      ...item,
      quantity: item.quantity || 1,
      maxQuantity: 10, // Default max quantity
    }
    dispatch({ type: "ADD_ITEM", payload: cartItem })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const openCart = () => {
    dispatch({ type: "OPEN_CART" })
  }

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" })
  }

  const applyCoupon = (code: string): boolean => {
    const upperCode = code.toUpperCase()
    const discount = AVAILABLE_COUPONS[upperCode as keyof typeof AVAILABLE_COUPONS]

    if (discount) {
      dispatch({ type: "APPLY_COUPON", payload: { code: upperCode, discount } })
      return true
    }
    return false
  }

  const removeCoupon = () => {
    dispatch({ type: "REMOVE_COUPON" })
  }

  // Calculations
  const getItemCount = (): number => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getSubtotal = (): number => {
    return state.items.reduce((total, item) => total + item.numericPrice * item.quantity, 0)
  }

  const getShippingCost = (): number => {
    const subtotal = getSubtotal()
    return subtotal >= state.freeShippingThreshold ? 0 : state.shippingCost
  }

  const getDiscountAmount = (): number => {
    const subtotal = getSubtotal()
    return Math.round((subtotal * state.discountPercentage) / 100)
  }

  const getTotal = (): number => {
    const subtotal = getSubtotal()
    const shipping = getShippingCost()
    const discount = getDiscountAmount()
    return Math.max(0, subtotal + shipping - discount)
  }

  const getTotalSavings = (): number => {
    return getDiscountAmount()
  }

  const isEligibleForFreeShipping = (): boolean => {
    return getSubtotal() >= state.freeShippingThreshold
  }

  const contextValue: CartContextType = {
    // State
    items: state.items,
    isOpen: state.isOpen,
    couponCode: state.couponCode,
    discountPercentage: state.discountPercentage,
    discountAmount: getDiscountAmount(),

    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    applyCoupon,
    removeCoupon,

    // Calculations
    getItemCount,
    getSubtotal,
    getShippingCost,
    getTotal,
    getTotalSavings,
    isEligibleForFreeShipping,
  }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
