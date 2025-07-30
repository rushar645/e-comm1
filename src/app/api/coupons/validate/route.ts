import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase"

const validateCouponSchema = z.object({
  code: z.string().min(1),
  order_value: z.number().positive(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, order_value } = validateCouponSchema.parse(body)

    const supabase = createServerClient()

    // Find coupon
    const { data: coupon, error } = await supabase.from("coupons").select("*").eq("code", code.toUpperCase()).single()

    if (error || !coupon) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid coupon code",
        },
        { status: 400 },
      )
    }

    // Check if coupon is active
    if (!coupon.is_active) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon is not active",
        },
        { status: 400 },
      )
    }

    // Check expiry date
    if (new Date(coupon.expiry_date) < new Date()) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon has expired",
        },
        { status: 400 },
      )
    }

    // Check usage limit
    if (coupon.used_count >= coupon.usage_limit) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon usage limit exceeded",
        },
        { status: 400 },
      )
    }

    // Check minimum order value
    if (order_value < coupon.min_order_value) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum order value of ₹${coupon.min_order_value} required`,
        },
        { status: 400 },
      )
    }

    // Calculate discount
    let discount = 0
    switch (coupon.type) {
      case "percentage":
        discount = (order_value * coupon.value) / 100
        if (coupon.max_discount && discount > coupon.max_discount) {
          discount = coupon.max_discount
        }
        break
      case "fixed":
        discount = coupon.value
        break
      case "free_shipping":
        discount = 0 // Handled separately in shipping calculation
        break
    }

    return NextResponse.json({
      success: true,
      data: {
        coupon,
        discount,
        type: coupon.type,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.errors[0].message,
        },
        { status: 400 },
      )
    }

    console.error("Coupon validation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
