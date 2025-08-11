import Razorpay from "razorpay"

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay credentials are not configured")
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const razorpayConfig = {
  keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  keySecret: process.env.RAZORPAY_KEY_SECRET,
}

// Razorpay order creation options
export interface RazorpayOrderOptions {
  amount: number // Amount in paise (multiply by 100)
  currency: string
  receipt: string
  notes?: Record<string, string>
}

// Razorpay payment verification
export interface RazorpayPaymentVerification {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

// Create Razorpay order
export async function createRazorpayOrder(options: RazorpayOrderOptions) {
  try {
    const order = await razorpay.orders.create({
      amount: options.amount,
      currency: options.currency,
      receipt: options.receipt,
      notes: options.notes,
    })
    return { success: true, order }
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return { success: false, error }
  }
}

// Verify Razorpay payment signature
// export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
//   try {
//     const crypto = require("crypto")
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${orderId}|${paymentId}`)
//       .digest("hex")

//     return expectedSignature === signature
//   } catch (error) {
//     console.error("Error verifying Razorpay signature:", error)
//     return false
//   }
// }
