"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Tag, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/contexts/cart-context"
import { DISCOUNT_CODES } from "@/lib/discount-utils"

export default function CheckoutPage() {
  const {
    items,
    getSubtotal,
    getShippingCost,
    getTotal,
    appliedDiscount,
    discountAmount,
    shippingDiscount,
    applyDiscount,
    removeDiscount,
  } = useCart()

  const [couponCode, setCouponCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [couponError, setCouponError] = useState("")
  const [showAvailableCoupons, setShowAvailableCoupons] = useState(false)

  const subtotal = getSubtotal()
  const shipping = getShippingCost()
  const total = getTotal()

  const handlePayNow = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    // Handle payment logic here
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a discount code")
      return
    }

    setIsApplyingCoupon(true)
    setCouponError("")

    const result = await applyDiscount(couponCode)

    if (result.success) {
      setCouponCode("")
      setShowAvailableCoupons(false)
    } else {
      setCouponError(result.message)
    }

    setIsApplyingCoupon(false)
  }

  const handleRemoveDiscount = () => {
    removeDiscount()
    setCouponCode("")
    setCouponError("")
  }

  const handleUseCoupon = (code: string) => {
    setCouponCode(code)
    setShowAvailableCoupons(false)
    setCouponError("")
  }

  return (
    <div className="min-h-screen bg-white">

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Delivery & Payment */}
          <div className="space-y-6 lg:space-y-8">
            {/* Delivery Section */}
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-[#3A3A3A] mb-4 md:mb-6">Delivery</h2>
              <div className="space-y-4">
                <div>
                  <Select>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Country/Region" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="india">India</SelectItem>
                      {/* <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input placeholder="First name" className="h-12" />
                  </div>
                  <div>
                    <Input placeholder="Last name" className="h-12" />
                  </div>
                </div>

                <div>
                  <Input placeholder="Address" className="h-12" />
                </div>

                <div>
                  <Input placeholder="Apartment, Suite etc" className="h-12" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Input placeholder="City" className="h-12" />
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input placeholder="PIN code" className="h-12" />
                  </div>
                </div>

                <div>
                  <Input placeholder="Phone*" className="h-12" />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-[#3A3A3A] mb-4">Payment</h2>
              <p className="text-sm text-[#5A5A5A] mb-4">All transactions are secure and encrypted.</p>

              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <input type="radio" id="razorpay" name="payment" defaultChecked className="text-[#3A2723]" />
                  <label htmlFor="razorpay" className="text-sm font-medium">
                    Razorpay Secure
                  </label>
                </div>
                <p className="text-xs text-[#5A5A5A] mb-3">(UPI, Cards, Wallets, Net Banking)</p>
                <div className="flex flex-wrap gap-2">
                  <Image
                    src="/images/payments/google-pay.png"
                    alt="Google Pay"
                    width={32}
                    height={20}
                    className="h-5 w-auto"
                  />
                  <Image src="/images/payments/visa.png" alt="Visa" width={32} height={20} className="h-5 w-auto" />
                  <Image src="/images/payments/paytm.png" alt="Paytm" width={32} height={20} className="h-5 w-auto" />
                  <Image
                    src="/images/payments/phonepe.png"
                    alt="PhonePe"
                    width={32}
                    height={20}
                    className="h-5 w-auto"
                  />
                  <Image src="/images/payments/upi.png" alt="UPI" width={32} height={20} className="h-5 w-auto" />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div>
              {/* <h2 className="text-xl md:text-2xl font-medium text-[#3A3A3A] mb-4">Billing Address</h2>
              <RadioGroup defaultValue="same" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="same" id="same" />
                  <Label htmlFor="same" className="text-sm">
                    Same as shipping address
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="different" id="different" />
                  <Label htmlFor="different" className="text-sm">
                    Use a different billing address
                  </Label>
                </div>
              </RadioGroup> */}

              <div className="flex items-start space-x-2 mt-6 mb-6">
                <Checkbox id="terms" className="mt-1" />
                <Label htmlFor="terms" className="text-sm text-[#5A5A5A] leading-relaxed">
                  By clicking on Pay Now you are agreeing to our Return Policy
                </Label>
              </div>

              <Button
                className="w-full bg-[#3A2723] hover:bg-[#5A3A33] text-white py-3 h-12 text-base md:text-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
                onClick={handlePayNow}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Pay now"
                )}
              </Button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <h2 className="text-xl md:text-2xl font-medium text-[#3A3A3A] mb-4 md:mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6 max-h-64 lg:max-h-96 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[#5A5A5A]">Your cart is empty</p>
                  <Link href="/" className="text-[#3A2723] hover:underline mt-2 inline-block">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex space-x-3">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.imageSrc || "/placeholder.svg?height=64&width=64"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#3A3A3A] text-sm md:text-base truncate">{item.name}</h3>
                      <p className="text-xs md:text-sm text-[#5A5A5A]">
                        Color: {"Default"} Size: {"M"}
                      </p>
                      <p className="text-xs md:text-sm text-[#5A5A5A]">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-medium text-[#3A3A3A] text-sm md:text-base">{item.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Applied Discount Display */}
            {appliedDiscount && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">{appliedDiscount.code}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveDiscount}
                    className="text-green-600 hover:text-green-800 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-green-600 mt-1">{appliedDiscount.description}</p>
              </div>
            )}

            {/* Coupon Code */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase())
                    setCouponError("")
                  }}
                  className="flex-1 h-12"
                  disabled={!!appliedDiscount}
                />
                <Button
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || !!appliedDiscount}
                  className="bg-[#3A2723] hover:bg-[#5A3A33] text-white px-6 h-12 transition-all duration-200 hover:shadow-md active:scale-95 whitespace-nowrap"
                >
                  {isApplyingCoupon ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Applying...</span>
                    </div>
                  ) : (
                    "Apply"
                  )}
                </Button>
              </div>

              {couponError && <p className="text-sm text-red-600 mb-2">{couponError}</p>}

              {!appliedDiscount && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAvailableCoupons(!showAvailableCoupons)}
                  className="text-[#3A2723] hover:text-[#5A3A33] p-0 h-auto text-sm"
                >
                  {showAvailableCoupons ? "Hide" : "View"} available coupons
                </Button>
              )}

              {/* Available Coupons */}
              {showAvailableCoupons && !appliedDiscount && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {DISCOUNT_CODES.filter((code) => code.isActive).map((discount) => (
                    <div
                      key={discount.code}
                      className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#3A2723] transition-colors"
                      onClick={() => handleUseCoupon(discount.code)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#3A2723]">{discount.code}</span>
                        <Button variant="ghost" size="sm" className="text-xs p-1 h-auto">
                          Use Code
                        </Button>
                      </div>
                      <p className="text-xs text-[#5A5A5A] mt-1">{discount.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Totals */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-[#5A5A5A]">Sub Total</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>

              {/* Discount Display */}
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({appliedDiscount?.code})</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <span className="text-[#5A5A5A]">Shipping</span>
                  <div className="w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center">
                    <Info className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="text-right">
                  {shippingDiscount > 0 && (
                    <div className="text-xs text-gray-500 line-through">
                      ₹{(shipping + shippingDiscount).toFixed(2)}
                    </div>
                  )}
                  <span className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}>
                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-medium border-t pt-3">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              {/* Savings Display */}
              {(discountAmount > 0 || shippingDiscount > 0) && (
                <div className="text-center text-sm text-green-600 bg-green-50 p-2 rounded">
                  You saved ₹{(discountAmount + shippingDiscount).toFixed(2)} on this order!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
