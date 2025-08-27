"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Currency, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/contexts/cart-context"
import { DISCOUNT_CODES } from "@/lib/discount-utils"
import { useUser } from "@/contexts/user-contexts"
import api from "@/lib/axios"

export default function CheckoutPage() {
  const {
    items,
    getSubtotal,
    getShippingCost,
    getTotal,
    // appliedDiscount,
    // discountAmount,
    // shippingDiscount,
    // applyDiscount,
    // removeDiscount,
  } = useCart()
  const {user, loading} = useUser()
  const router = useRouter()

  const [couponCode, setCouponCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [couponError, setCouponError] = useState("")
  const [showAvailableCoupons, setShowAvailableCoupons] = useState(false)

  const subtotal = getSubtotal()
  const shipping = getShippingCost()
  const total = getTotal()

  const handlePayNow = async () => {
    try {
      setIsProcessing(true)
      const response = await api.post("/api/razorpay/create-order", {amount:total, currency:"INR", notes: {}})
      if (response.status == 200)
      alert("order placed")
      
    } catch (error) {
      console.log(error)
      
    } finally{
      setIsProcessing(false)
    }
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a discount code")
      return
    }

    setIsApplyingCoupon(true)
    setCouponError("")

    // const result = await applyDiscount(couponCode)

    // if (result.success) {
    //   setCouponCode("")
    //   setShowAvailableCoupons(false)
    // } else {
    //   setCouponError(result.message)
    // }

    setIsApplyingCoupon(false)
  }

  // const handleRemoveDiscount = () => {
  //   // removeDiscount()
  //   setCouponCode("")
  //   setCouponError("")
  // }

  const handleUseCoupon = (code: string) => {
    setCouponCode(code)
    setShowAvailableCoupons(false)
    setCouponError("")
  }
  if(!user && !loading){
    router.push('/login')
    return(
      <div className="h-screen">
      </div>
    )
  }
  else
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
                      <SelectTrigger size="big">
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                          <SelectItem value="arunachal-pradesh">Arunachal Pradesh</SelectItem>
                          <SelectItem value="assam">Assam</SelectItem>
                          <SelectItem value="bihar">Bihar</SelectItem>
                          <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                          <SelectItem value="goa">Goa</SelectItem>
                          <SelectItem value="gujarat">Gujarat</SelectItem>
                          <SelectItem value="haryana">Haryana</SelectItem>
                          <SelectItem value="himachal-pradesh">Himachal Pradesh</SelectItem>
                          <SelectItem value="jharkhand">Jharkhand</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="kerala">Kerala</SelectItem>
                          <SelectItem value="madhya-pradesh">Madhya Pradesh</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="manipur">Manipur</SelectItem>
                          <SelectItem value="meghalaya">Meghalaya</SelectItem>
                          <SelectItem value="mizoram">Mizoram</SelectItem>
                          <SelectItem value="nagaland">Nagaland</SelectItem>
                          <SelectItem value="odisha">Odisha</SelectItem>
                          <SelectItem value="punjab">Punjab</SelectItem>
                          <SelectItem value="rajasthan">Rajasthan</SelectItem>
                          <SelectItem value="sikkim">Sikkim</SelectItem>
                          <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="telangana">Telangana</SelectItem>
                          <SelectItem value="tripura">Tripura</SelectItem>
                          <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                          <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                          <SelectItem value="west-bengal">West Bengal</SelectItem>
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
            {/* {appliedDiscount && (
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
            )} */}

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
                  // disabled={!!appliedDiscount}
                />
                <Button
                  onClick={handleApplyCoupon}
                  // disabled={isApplyingCoupon || !!appliedDiscount}
                  disabled={false}
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

              {/* {!appliedDiscount && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAvailableCoupons(!showAvailableCoupons)}
                  className="text-[#3A2723] hover:text-[#5A3A33] p-0 h-auto text-sm"
                >
                  {showAvailableCoupons ? "Hide" : "View"} available coupons
                </Button>
              )} */}

              {/* Available Coupons */}
              {/* {showAvailableCoupons && !appliedDiscount && ( */}
              {showAvailableCoupons && (
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
              {/* {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({appliedDiscount?.code})</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )} */}

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <span className="text-[#5A5A5A]">Shipping</span>
                  <div className="w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center">
                    <Info className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="text-right">
                  {/* {shippingDiscount > 0 && (
                    <div className="text-xs text-gray-500 line-through">
                      ₹{(shipping + shippingDiscount).toFixed(2)}
                    </div>
                  )} */}
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
              {/* {(discountAmount > 0 || shippingDiscount > 0) && (
                <div className="text-center text-sm text-green-600 bg-green-50 p-2 rounded">
                  You saved ₹{(discountAmount + shippingDiscount).toFixed(2)} on this order!
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useCart } from "@/contexts/cart-context"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { useToast } from "@/components/ui/use-toast"
// import { RazorpayPayment } from "@/components/payment/razorpay-payment"
// import { applyCouponToCart } from "@/lib/discount-utils"
// import { isValidEmail, isNotEmpty, isValidPhoneNumber } from "@/lib/validation-utils"
// import { createClient } from "@/lib/supabase"
// import { getCouponByCode } from "@/app/data/coupons"

// export default function CheckoutPage() {
//   const { items, getSubtotal, clearCart } = useCart()
//   const router = useRouter()
//   const { toast } = useToast()

//   const [shippingAddress, setShippingAddress] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     zipCode: "",
//   })
//   const [paymentMethod, setPaymentMethod] = useState("razorpay")
//   const [couponCode, setCouponCode] = useState("")
//   const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
//   const [discountAmount, setDiscountAmount] = useState(0)
//   const [loading, setLoading] = useState(false)

//   const subtotal = getSubtotal()
//   const shippingCost = subtotal >= 999 ? 0 : 50
//   const totalAmount = subtotal + shippingCost - discountAmount

//   useEffect(() => {
//     if (items.length === 0) {
//       toast({
//         title: "Your cart is empty!",
//         description: "Please add items to your cart before proceeding to checkout.",
//         variant: "destructive",
//       })
//       router.push("/cart")
//     }
//   }, [items, router, toast])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setShippingAddress((prev) => ({ ...prev, [name]: value }))
//   }

//   const validateShippingAddress = () => {
//     if (!isNotEmpty(shippingAddress.fullName)) return "Full Name is required."
//     if (!isValidEmail(shippingAddress.email)) return "Valid Email is required."
//     if (!isValidPhoneNumber(shippingAddress.phone)) return "Valid Phone Number is required (10 digits)."
//     if (!isNotEmpty(shippingAddress.addressLine1)) return "Address Line 1 is required."
//     if (!isNotEmpty(shippingAddress.city)) return "City is required."
//     if (!isNotEmpty(shippingAddress.state)) return "State is required."
//     if (!isNotEmpty(shippingAddress.zipCode)) return "Zip Code is required."
//     return null
//   }

//   const handleApplyCoupon = async () => {
//     if (!couponCode) {
//       toast({
//         title: "Please enter a coupon code.",
//         variant: "destructive",
//       })
//       return
//     }

//     const coupon = getCouponByCode(couponCode)
//     if (!coupon) {
//       toast({
//         title: "Invalid Coupon Code",
//         description: "The coupon code you entered is not valid.",
//         variant: "destructive",
//       })
//       setAppliedCoupon(null)
//       setDiscountAmount(0)
//       return
//     }

//     const { discountAmount: calculatedDiscount, message } = applyCouponToCart(items, coupon)

//     if (calculatedDiscount > 0) {
//       setAppliedCoupon(coupon)
//       setDiscountAmount(calculatedDiscount)
//       toast({
//         title: "Coupon Applied!",
//         description: message,
//         variant: "default",
//       })
//     } else {
//       setAppliedCoupon(null)
//       setDiscountAmount(0)
//       toast({
//         title: "Coupon Not Applied",
//         description: message,
//         variant: "destructive",
//       })
//     }
//   }

//   const handleCODOrder = async () => {
//     const validationError = validateShippingAddress()
//     if (validationError) {
//       toast({
//         title: "Validation Error",
//         description: validationError,
//         variant: "destructive",
//       })
//       return
//     }

//     setLoading(true)
//     try {
//       const supabase = createClient()

//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser()
//       if (userError || !user) {
//         toast({
//           title: "Authentication Required",
//           description: "Please log in to place your order.",
//           variant: "destructive",
//         })
//         router.push("/auth/login")
//         return
//       }

//       const orderData = {
//         user_id: user.id,
//         total_amount: totalAmount,
//         shipping_cost: shippingCost,
//         discount_amount: discountAmount,
//         coupon_code: appliedCoupon?.code || null,
//         payment_method: "cod",
//         payment_status: "pending",
//         status: "pending",
//         shipping_address: shippingAddress,
//         order_items: items.map((item) => ({
//           product_id: item.id,
//           name: item.name,
//           price: item.numericPrice,
//           quantity: item.quantity,
//           color: item.selectedColor,
//           size: item.selectedSize,
//           image_src: item.imageSrc,
//         })),
//       }

//       const { error: orderError } = await supabase.from("orders").insert([orderData])

//       if (orderError) {
//         console.error("Error placing order:", orderError)
//         toast({
//           title: "Order Placement Failed",
//           description: "There was an error placing your order. Please try again.",
//           variant: "destructive",
//         })
//       } else {
//         clearCart()
//         toast({
//           title: "Order Placed Successfully!",
//           description: "Your order has been placed and will be processed shortly.",
//           variant: "default",
//         })
//         router.push("/track")
//       }
//     } catch (error) {
//       console.error("Unexpected error during order placement:", error)
//       toast({
//         title: "An unexpected error occurred",
//         description: "Please try again later.",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handlePaymentSuccess = (paymentData: any) => {
//     clearCart()
//     toast({
//       title: "Payment Successful!",
//       description: "Your order has been placed successfully.",
//     })
//     router.push("/track")
//   }

//   const handlePaymentError = (error: any) => {
//     console.error("Payment error:", error)
//     toast({
//       title: "Payment Failed",
//       description: "There was an error processing your payment. Please try again.",
//       variant: "destructive",
//     })
//   }

//   const orderData = {
//     total_amount: totalAmount,
//     shipping_cost: shippingCost,
//     discount_amount: discountAmount,
//     coupon_code: appliedCoupon?.code || null,
//     shipping_address: shippingAddress,
//     order_items: items.map((item) => ({
//       product_id: item.id,
//       name: item.name,
//       price: item.numericPrice,
//       quantity: item.quantity,
//       color: item.selectedColor,
//       size: item.selectedSize,
//       image_src: item.imageSrc,
//     })),
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 md:py-12">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Shipping Address */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle>Shipping Address</CardTitle>
//           </CardHeader>
//           <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="fullName">Full Name</Label>
//               <Input
//                 id="fullName"
//                 name="fullName"
//                 value={shippingAddress.fullName}
//                 onChange={handleInputChange}
//                 placeholder="John Doe"
//               />
//             </div>
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={shippingAddress.email}
//                 onChange={handleInputChange}
//                 placeholder="john.doe@example.com"
//               />
//             </div>
//             <div>
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 value={shippingAddress.phone}
//                 onChange={handleInputChange}
//                 placeholder="9876543210"
//               />
//             </div>
//             <div className="md:col-span-2">
//               <Label htmlFor="addressLine1">Address Line 1</Label>
//               <Input
//                 id="addressLine1"
//                 name="addressLine1"
//                 value={shippingAddress.addressLine1}
//                 onChange={handleInputChange}
//                 placeholder="123 Main St"
//               />
//             </div>
//             <div className="md:col-span-2">
//               <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
//               <Input
//                 id="addressLine2"
//                 name="addressLine2"
//                 value={shippingAddress.addressLine2}
//                 onChange={handleInputChange}
//                 placeholder="Apartment, Suite, etc."
//               />
//             </div>
//             <div>
//               <Label htmlFor="city">City</Label>
//               <Input
//                 id="city"
//                 name="city"
//                 value={shippingAddress.city}
//                 onChange={handleInputChange}
//                 placeholder="Mumbai"
//               />
//             </div>
//             <div>
//               <Label htmlFor="state">State</Label>
//               <Input
//                 id="state"
//                 name="state"
//                 value={shippingAddress.state}
//                 onChange={handleInputChange}
//                 placeholder="Maharashtra"
//               />
//             </div>
//             <div>
//               <Label htmlFor="zipCode">Zip Code</Label>
//               <Input
//                 id="zipCode"
//                 name="zipCode"
//                 value={shippingAddress.zipCode}
//                 onChange={handleInputChange}
//                 placeholder="400001"
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Order Summary */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Order Summary</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex justify-between text-sm text-gray-700">
//               <span>Subtotal ({items.length} items)</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-sm text-gray-700">
//               <span>Shipping</span>
//               <span>{shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}</span>
//             </div>
//             {discountAmount > 0 && (
//               <div className="flex justify-between text-sm text-green-600 font-medium">
//                 <span>Discount ({appliedCoupon?.code})</span>
//                 <span>- ₹{discountAmount.toFixed(2)}</span>
//               </div>
//             )}
//             <Separator />
//             <div className="flex justify-between text-lg font-bold text-gray-900">
//               <span>Total</span>
//               <span>₹{totalAmount.toFixed(2)}</span>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="coupon">Coupon Code</Label>
//               <div className="flex gap-2">
//                 <Input
//                   id="coupon"
//                   placeholder="Enter coupon code"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                 />
//                 <Button onClick={handleApplyCoupon} variant="outline">
//                   Apply
//                 </Button>
//               </div>
//             </div>

//             <Separator />

//             {/* Payment Method */}
//             <div className="space-y-2">
//               <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
//               <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="razorpay" id="razorpay" />
//                   <Label htmlFor="razorpay">Pay Online (UPI, Cards, Net Banking)</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="cod" id="cod" />
//                   <Label htmlFor="cod">Cash on Delivery (COD)</Label>
//                 </div>
//               </RadioGroup>
//             </div>

//             {paymentMethod === "razorpay" ? (
//               
//             ) : (
//               <Button
//                 onClick={handleCODOrder}
//                 className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-lg"
//                 disabled={items.length === 0 || loading}
//               >
//                 {loading ? "Placing Order..." : "Place Order (COD)"}
//               </Button>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
