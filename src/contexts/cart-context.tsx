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
