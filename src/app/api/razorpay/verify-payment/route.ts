// import { type NextRequest, NextResponse } from "next/server"
// import { verifyRazorpaySignature } from "@/lib/razorpay"
// import { createServerClient } from "@/lib/supabase"
// import { validateSession } from "@/lib/auth"
// // import { cookies } from "next/headers"

// export async function POST(request: NextRequest) {
//   try {
//     // const cookieStore = cookies()
//     const supabase = createServerClient()

//     // Get authenticated user
//     const token = request.cookies.get("auth-token")?.value

//     if (!token) {
//       return NextResponse.json({ error: "No session found" }, { status: 402 })
//     }

//     // Try customer first, then admin
//     let user = await validateSession(token, "customer")

//     if (!user) {
//       return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
//     }

//     const body = await request.json()
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = body

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return NextResponse.json({ success: false, message: "Missing payment verification data" }, { status: 400 })
//     }

//     // Verify payment signature
//     const isValidSignature = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)
//     // const isValidSignature = true
//     if (!isValidSignature) {
//       return NextResponse.json({ success: false, message: "Invalid payment signature" }, { status: 400 })
//     }

//     // Update payment order status
//     const { error: updateError } = await supabase
//       .from("payment_orders")
//       .update({
//         razorpay_payment_id,
//         razorpay_signature,
//         status: "completed",
//         completed_at: new Date().toISOString(),
//       })
//       .eq("razorpay_order_id", razorpay_order_id)
//       .eq("user_id", user.id)

//     if (updateError) {
//       console.error("Error updating payment order:", updateError)
//     }

//     // Create the actual order in the orders table
//     if (orderData) {
//       const { error: orderError } = await supabase.from("orders").insert({
//         user_id: user.id,
//         total_amount: orderData.total_amount,
//         shipping_cost: orderData.shipping_cost || 0,
//         discount_amount: orderData.discount_amount || 0,
//         coupon_code: orderData.coupon_code,
//         payment_method: "razorpay",
//         payment_status: "paid",
//         razorpay_order_id,
//         razorpay_payment_id,
//         status: "confirmed",
//         shipping_address: orderData.shipping_address,
//         order_items: orderData.order_items,
//       })

//       if (orderError) {
//         console.log("Error creating order:", orderError)
//         return NextResponse.json(
//           { success: false, message: "Payment verified but order creation failed" },
//           { status: 500 },
//         )
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Payment verified successfully",
//       payment_id: razorpay_payment_id,
//     })
//   } catch (error) {
//     console.log("Error in verify payment API:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }


import { type NextRequest, NextResponse } from "next/server"
import { verifyRazorpaySignature } from "@/lib/razorpay"
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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, message: "Missing payment verification data" }, { status: 400 })
    }

    // Verify payment signature
    const isValidSignature = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)
    // const isValidSignature = true
    if (!isValidSignature) {
      return NextResponse.json({ success: false, message: "Invalid payment signature" }, { status: 400 })
    }

    // Update payment order status
    const { error: updateError } = await supabase
      .from("payment_orders")
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: "completed",
        // completed_at: new Date().toISOString(),
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .eq("user_id", user.id)

    if (updateError) {
      console.error("Error updating payment order:", updateError)
    }

    // Create the actual order in the orders table
    // if (orderData) {
    //   const { error: orderError } = await supabase.from("orders").insert({
    //     customer_id: user.id,
    //     total: orderData.total_amount,
    //     shipping_cost: orderData.shipping_cost || 0,
    //     discount: orderData.discount || 0,
    //     coupon_code: orderData.coupon_code,
    //     // payment_method: "razorpay",
    //     payment_status: "paid",
    //     razorpay_order_id,
    //     razorpay_payment_id,
    //     status: "confirmed",
    //     shipping_address: orderData.shipping_address,
    //     order_items: orderData.order_items,
    //   })

    //   if (orderError) {
    //     console.log("Error creating order:", orderError)
    //     return NextResponse.json(
    //       { success: false, message: "Payment verified but order creation failed" },
    //       { status: 500 },
    //     )
    //   }
    // }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      payment_id: razorpay_payment_id,
    })
  } catch (error) {
    console.log("Error in verify payment API:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
