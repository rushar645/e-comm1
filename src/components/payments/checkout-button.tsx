"use client"

import { useState } from "react"
import axios from "axios"
import { Order } from "@/types"
import { useCart } from "@/contexts/cart-context"

export default function CheckoutButton({ orderData }:{orderData:Order}) {

  const [loading, setLoading] = useState(false)
  const {clearCart} = useCart();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setLoading(true)

    // 1️⃣ Load Razorpay script
    const res = await loadRazorpayScript()
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?")
      setLoading(false)
      return
    }

    try {
      // 2️⃣ Create order on backend
      const { data } = await axios.post("/api/razorpay/create-order", {
        amount: orderData.total,
      })

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "My Shop",
        description: "Order Payment",
        order_id: data.id,
        method:{
          upi:true,
          paylater: false
        },
        handler: async function (response:{razorpay_order_id:string,razorpay_payment_id:string, razorpay_signature:string }) {
          try {
            // 3️⃣ Verify payment on backend
            const verifyRes = await axios.post("/api/razorpay/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: orderData
            })

            if (verifyRes.data.success) {
              // 4️⃣ Save order in DB
              await axios.post("/api/orders", {
                ...orderData,
                payment_id: response.razorpay_payment_id,
              })

              // 5️⃣ Call Twilio API to notify user (comment placeholder)
              // await axios.post("/api/send-sms", {
              //   to: userPhoneNumber,
              //   message: `Your order #${orderData.id} has been placed successfully!`,
              // })

              alert("Payment successful & order placed ✅")
              clearCart()
              
            } else {
              alert("Payment verification failed ❌")
              console.log("Verify Error",verifyRes.data)
            }
          } catch (err) {
            console.error("Errorr Ayiii",err)
            // console.error("Errorr ",err)
            alert("Something went wrong while verifying the payment ❌")
          }
        },
        prefill: {
          // name: orderData.customer.name,
          // email: orderData.customer.email,
          // contact: orderData.customer.phone,
        },
        theme: {
          color: "#3399cc",
        },
      }

      // 6️⃣ Open Razorpay checkout
      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error(err)
      alert(`Error creating Razorpay order ❌${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-[#3A2723] hover:bg-[#5A3A33] text-white py-3 h-12 text-base md:text-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg rounded-md"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  )
}
