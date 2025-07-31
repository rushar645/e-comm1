"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, ShoppingCart, Lock, Trash2, Heart } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
// import { Item } from "@/types"


import google from "@/images/payments/google-pay.png"
import visa from "@/images/payments/visa.png"
import upi from "@/images/payments/upi.png"
import phonepe from "@/images/payments/phonepe.png"
import paytm from "@/images/payments/paytm.png"

export default function CartPage() {
  const router = useRouter()
  const {
    items: cartItems,
    savedItems,
    updateQuantity, 
    removeItem,
    saveForLater,
    moveToCart,
    removeSavedItem,
    getSubtotal,
    getShippingCost,
    getTotal,
    appliedDiscount,
    discountAmount,
    applyDiscount,
    removeDiscount,
  } = useCart()

  const { addItem: addToWishlist } = useWishlist()

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({})
  const [discountCode, setDiscountCode] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false)
  const [discountError, setDiscountError] = useState("")

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle item selection
  const toggleItemSelection = (itemId: string | number, color?: string, size?: string) => {
    const key = `${itemId}-${color || ""}-${size || ""}`
    setSelectedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (!cartItems.length) return

    const allSelected = cartItems.every((item) => {
      const key = `${item.id}-${item.color || ""}-${item.size || ""}`
      return selectedItems[key]
    })

    const newSelectedItems: Record<string, boolean> = {}
    cartItems.forEach((item) => {
      const key = `${item.id}-${item.color || ""}-${item.size || ""}`
      newSelectedItems[key] = !allSelected
    })

    setSelectedItems(newSelectedItems)
  }

  // Count selected items
  const selectedCount = Object.values(selectedItems).filter(Boolean).length
 
  // Handle add to wishlist
  const handleAddToWishlist = (item: Item) => {
    addToWishlist({
      id: item.id,
      name: item.name,
      price: item.price,
      numericPrice: item.numericPrice,
      imageSrc: item.imageSrc,
      category: item.category,
    })
  }

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to proceed.")
      return
    }

    // Navigate to checkout page
    router.push("/checkout")
  }

  // Apply discount code
  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setDiscountError("Please enter a discount code")
      return
    }

    setIsApplyingDiscount(true)
    setDiscountError("")

    const result = await applyDiscount(discountCode)

    if (result.success) {
      setDiscountCode("")
    } else {
      setDiscountError(result.message)
    }

    setIsApplyingDiscount(false)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(2)}`
  }

  // If not client-side yet, show a simple loading state
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif text-[#3A3A3A] mb-8">My Cart</h1>
          <p className="text-center py-12">Loading cart...</p>
        </main>
      </div>
    )
  }

  const subtotal = getSubtotal()
  const shipping = getShippingCost()
  const total = getTotal()

  return (
    <div className="min-h-screen bg-white">

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif text-[#3A3A3A]">
          My Cart <span className="text-lg font-normal text-gray-500">Available Piece</span>
        </h1>

        {cartItems.length > 0 && (
          <div className="mt-4 mb-6">
            <div className="flex items-center">
              <Checkbox
                id="select-all"
                checked={
                  cartItems.length > 0 &&
                  cartItems.every((item) => {
                    const key = `${item.id}-${item.color || ""}-${item.size || ""}`
                    return selectedItems[key]
                  })
                }
                onCheckedChange={toggleSelectAll}
                className="mr-2"
              />
              <label htmlFor="select-all" className="text-sm text-[#5A5A5A]">
                {selectedCount}/{cartItems.length} item selected
              </label>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 border-t border-[#E0D0C0]">
                <ShoppingCart className="h-16 w-16 text-[#D0B090] mx-auto mb-4" />
                <p className="text-[#5A5A5A] mb-4">Your cart is empty</p>
                <Button asChild>
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => {
                  const itemKey = `${item.id}-${item.color || ""}-${item.size || ""}`
                  return (
                    <div key={itemKey} className="border-b pb-6">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={selectedItems[itemKey] || false}
                          onCheckedChange={() => toggleItemSelection(item.id, item.color, item.size)}
                          className="mt-2"
                        />

                        <div className="w-24 h-24 bg-gray-200 relative">
                          <Image
                            src={item.imageSrc || "/placeholder.svg?height=96&width=96"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-600">
                                Color : {item.color || "Default"} | Size : {item.size || "M"}
                              </p>
                              <p className="text-sm text-[#D35400] mt-1">
                                You save <span className="font-medium">Amount</span>
                              </p>

                              <div className="flex items-center gap-4 mt-2">
                                <button
                                  className="text-xs text-[#5A5A5A] hover:text-[#8B4513] flex items-center gap-1"
                                  onClick={() => saveForLater(item.id, item.color, item.size)}
                                >
                                  <Checkbox className="h-3 w-3 mr-1" />
                                  Save for later
                                </button>
                                <button
                                  className="text-xs text-[#5A5A5A] hover:text-[#8B4513] flex items-center gap-1"
                                  onClick={() => handleAddToWishlist(item)}
                                >
                                  <Heart className="h-3 w-3 mr-1" />
                                  Add to wishlist
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="font-medium">{item.price}</p>
                            </div>
                          </div>

                          <div className="flex justify-end items-center mt-4">
                            <div className="flex items-center border rounded-md">
                              <button
                                className="px-2 py-1 border-r"
                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                                aria-label="Decrease quantity"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                              <span className="px-4">{item.quantity}</span>
                              <button
                                className="px-2 py-1 border-l"
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Saved for later */}
            {savedItems?.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-serif text-[#3A3A3A]">
                  Saved for later <span className="text-lg font-normal text-gray-500">Available Piece</span>
                </h2>

                <div className="space-y-6 mt-6">
                  {savedItems.map((item) => (
                    <div key={`saved-${item.id}-${item.color || ""}-${item.size || ""}`} className="border-b pb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 bg-gray-200 relative">
                          <Image
                            src={item.imageSrc || "/placeholder.svg?height=96&width=96"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-600">
                                Color : {item.color || "Default"} | Size : {item.size || "M"}
                              </p>
                              <p className="text-sm text-[#D35400] mt-1">
                                You save <span className="font-medium">Amount</span>
                              </p>

                              <div className="flex items-center gap-4 mt-2">
                                <button
                                  className="text-xs text-[#5A5A5A] hover:text-[#8B4513] flex items-center gap-1"
                                  onClick={() => moveToCart(item.id, item.color, item.size)}
                                >
                                  <ShoppingCart className="h-3 w-3 mr-1" />
                                  Add to cart
                                </button>
                                <button
                                  className="text-xs text-[#5A5A5A] hover:text-[#8B4513] flex items-center gap-1"
                                  onClick={() => handleAddToWishlist(item)}
                                >
                                  <Heart className="h-3 w-3 mr-1" />
                                  Add to wishlist
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="font-medium">{item.price}</p>
                            </div>
                          </div>

                          <div className="flex justify-end items-center mt-4">
                            <div className="flex items-center border rounded-md">
                              <button
                                className="px-2 py-1 border-r"
                                onClick={() => removeSavedItem(item.id, item.color, item.size)}
                                aria-label="Remove saved item"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                              <span className="px-4">{item.quantity}</span>
                              <button className="px-2 py-1 border-l" aria-label="Increase quantity">
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="border border-[#E0D0C0] rounded-md p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-medium text-[#3A3A3A] mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#5A5A5A]">Cart Total</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>

                {/* Discount Display */}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedDiscount?.code})</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-[#5A5A5A]">Shipping Charges</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
                </div>

                <div className="flex justify-between pt-3 border-t border-[#E0D0C0]">
                  <span className="text-[#3A3A3A] font-medium">Total :</span>
                  <span className="font-medium">{formatCurrency(total)}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6 bg-[#3A2723] hover:bg-[#5A3A33] text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
                onClick={handleProceedToCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to checkout
              </Button>

              <div className="mt-6">
                <p className="text-sm text-[#5A5A5A] mb-2">Discount code</p>
                <div className="flex">
                  <Input
                    placeholder="Enter a coupon"
                    className="rounded-r-none border-r-0"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value.toUpperCase())
                      setDiscountError("")
                    }}
                    disabled={!!appliedDiscount}
                  />
                  <Button
                    className="rounded-l-none bg-[#3A2723] hover:bg-[#5A3A33] text-white transition-all duration-200 hover:shadow-md active:scale-95"
                    onClick={handleApplyDiscount}
                    disabled={isApplyingDiscount || !!appliedDiscount}
                  >
                    {isApplyingDiscount ? (
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs">Applying...</span>
                      </div>
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>
                {discountError && <p className="text-sm text-red-600 mt-1">{discountError}</p>}
                {appliedDiscount && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">{appliedDiscount.code} applied!</span>
                      <button onClick={removeDiscount} className="text-green-600 hover:text-green-800 text-xs">
                        Remove
                      </button>
                    </div>
                    <p className="text-green-600 text-xs mt-1">{appliedDiscount.description}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 text-center">
                <p className="flex items-center justify-center text-sm font-medium text-[#3A3A3A] mb-4">
                  <Lock className="h-4 w-4 mr-1" /> Secure checkout
                </p>

                <div className="flex justify-center space-x-2 mb-2">
                  <Image src={google} width={40} height={30} alt="Google Pay" />
                  <Image src={visa}  width={40} height={30} alt="Visa" />
                  <Image src={paytm}  width={40} height={30} alt="Paytm" />
                </div>

                <div className="flex justify-center space-x-2">
                  <Image src={phonepe} width={40} height={30} alt="PhonePe" />
                  <Image src={upi}width={40} height={30} alt="UPI" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

          </div>
  )
}
