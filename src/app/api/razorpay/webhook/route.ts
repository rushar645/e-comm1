import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-razorpay-signature")

    if (!signature) {
      return NextResponse.json({ success: false, message: "Missing signature" }, { status: 400 })
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "")
      .update(body)
      .digest("hex")

    if (expectedSignature !== signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)
    const supabase = createClient()

    switch (event.event) {
      case "payment.captured":
        // Handle successful payment
        const payment = event.payload.payment.entity
        await supabase
          .from("payment_orders")
          .update({
            status: "captured",
            webhook_data: event.payload,
          })
          .eq("razorpay_payment_id", payment.id)
        break

      case "payment.failed":
        // Handle failed payment
        const failedPayment = event.payload.payment.entity
        await supabase
          .from("payment_orders")
          .update({
            status: "failed",
            webhook_data: event.payload,
          })
          .eq("razorpay_order_id", failedPayment.order_id)
        break

      case "order.paid":
        // Handle order paid event
        const order = event.payload.order.entity
        await supabase
          .from("payment_orders")
          .update({
            status: "paid",
            webhook_data: event.payload,
          })
          .eq("razorpay_order_id", order.id)
        break

      default:
        console.log("Unhandled webhook event:", event.event)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ success: false, message: "Webhook processing failed" }, { status: 500 })
  }
}
