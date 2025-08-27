"use client"

import { useState } from "react"
import axios from "axios"
import { Order } from "@/types"

export default function CheckoutButton({ orderData }:{orderData:Order}) {
  const [loading, setLoading] = useState(false)

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
      // 2️⃣ Create order on your backend
      const { data } = await axios.post("/api/create-order", {
        amount: orderData.total, // pass your amount
      })

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // from .env
        amount: data.amount,
        currency: "INR",
        name: "My Shop",
        description: "Order Payment",
        order_id: data.id, // returned by your backend
        handler: async function (response:{razorpay_order_id:string,razorpay_payment_id:string, razorpay_signature:string }) {
          try {
            // 3️⃣ Verify payment on your backend
            const verifyRes = await axios.post("/api/verify-order", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })

            if (verifyRes.data.success) {
              // 4️⃣ Save order in DB
              await axios.post("/api/order", {
                ...orderData,
                paymentId: response.razorpay_payment_id,
              })

              // 5️⃣ Call Twilio API to notify user (comment placeholder)
              // await axios.post("/api/send-sms", {
              //   to: userPhoneNumber,
              //   message: `Your order #${orderData.id} has been placed successfully!`,
              // })

              alert("Payment successful & order placed ✅")
            } else {
              alert("Payment verification failed ❌")
            }
          } catch (err) {
            console.error(err)
            alert("Something went wrong while verifying the payment ❌")
          }
        },
        prefill: {
          name: orderData.customer.name,
          email: orderData.customer.email,
          contact: orderData.customer.phone,
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
      alert("Error creating Razorpay order ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  )
}
