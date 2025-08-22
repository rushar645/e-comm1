import { type NextRequest, NextResponse } from "next/server"
import { createRazorpayOrder } from "@/lib/razorpay"
import { createServerClient } from "@/lib/supabase"
import { validateSession } from "@/lib/auth"
// import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    // const cookieStore = cookies()
    const supabase = createServerClient()

    // Get authenticated user
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "No session found" }, { status: 402 })
    }

    // Try customer first, then admin
    let user = await validateSession(token, "customer")

    if (!user) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { amount, currency = "INR", notes } = body
    const receipt = `order_${Date.now()}`

    if (!amount) {
      return NextResponse.json({ success: false, message: "Amount and receipt are required" }, { status: 400 })
    }

    // Create Razorpay order
    const result = await createRazorpayOrder({
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt,
      notes: {
        user_id: user.id,
        user_email: user.email || "",
        ...notes,
      },
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Failed to create Razorpay order", error: result.error },
        { status: 500 },
      )
    }

    // Store order in database
    const { error: dbError } = await supabase.from("payment_orders").insert({
      user_id: user.id,
      razorpay_order_id: result.order?.id,
      amount: amount,
      currency: currency,
      status: "created",
      receipt: receipt,
      notes: notes,
    })

    if (dbError) {
      console.error("Error storing payment order:", dbError)
      // Continue even if DB storage fails
    }

    return NextResponse.json({
      success: true,
      order: result.order,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("Error in create-order API:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
