import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase"

const couponSchema = z.object({
  code: z.string().min(1).max(50),
  type: z.enum(["percentage", "fixed", "free_shipping"]),
  value: z.number().min(0),
  min_order_value: z.number().min(0).default(0),
  max_discount: z.number().min(0).optional(),
  expiry_date: z.string(),
  usage_limit: z.number().int().min(1).default(1),
  is_active: z.boolean().default(true),
})

const updateCouponSchema = z.object({
  id: z.string(),
  code: z.string(),
  type: z.enum(["percentage", "fixed"]),
  value: z.number(),
  min_order_value: z.number(),
  max_discount: z.number(),
  expiry_date: z.string(),
  usage_limit: z.number(),
  is_active: z.boolean(),
})


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const is_active = searchParams.get("is_active")
    const type = searchParams.get("type")

    const supabase = createServerClient()
    let query = supabase.from("coupons").select("*", { count: "exact" })

    // Apply filters
    if (is_active !== null) {
      query = query.eq("is_active", is_active === "true")
    }
    if (type) {
      query = query.eq("type", type)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: coupons, error, count } = await query.range(from, to).order("created_at", { ascending: false })

    if (error) {
      console.error("Coupons fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: coupons,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("Coupons API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = couponSchema.parse(body)

    const supabase = createServerClient()

    // Check if coupon code already exists
    const { data: existingCoupon } = await supabase
      .from("coupons")
      .select("id")
      .eq("code", validatedData.code.toUpperCase())
      .single()

    if (existingCoupon) {
      return NextResponse.json({ error: "Coupon code already exists" }, { status: 400 })
    }

    const { data: coupon, error } = await supabase
      .from("coupons")
      .insert({
        ...validatedData,
        code: validatedData.code.toUpperCase(),
      })
      .select()
      .single()

    if (error) {
      console.error("Coupon creation error:", error)
      return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        data: coupon,
      },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.error("Coupon creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const id = body.id
    const supabase = createServerClient()

    const { error } = await supabase.from("coupons").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: "Failed to delete coupon" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Coupon deleted successfully" })
  } catch (error) {
    console.error("Coupon deletion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = updateCouponSchema.parse(body)

    const { id, ...updateData } = validatedData

    const supabase = createServerClient()

    const { data: updated, error } = await supabase
      .from("coupons")
      .update({
        ...updateData,
        code: updateData.code.toUpperCase(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error || !updated) {
      console.log(error)
      return NextResponse.json({ error: "Failed to update coupon" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.error("Coupon update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}