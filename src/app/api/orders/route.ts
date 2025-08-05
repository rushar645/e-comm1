import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase"

const orderItemSchema = z.object({
  product_id: z.string().uuid(),
  product_name: z.string(),
  product_sku: z.string(),
  product_price: z.number().positive(),
  quantity: z.number().int().positive(),
  color: z.string().optional(),
  size: z.string().optional(),
  product_image: z.string().optional(),
})

const orderSchema = z.object({
  customer_id: z.string().uuid().optional(),
  shipping_id: z.uuid(),
  items: z.array(orderItemSchema).min(1),
  subtotal: z.number().positive(),
  shipping_cost: z.number().min(0).default(0),
  discount: z.number().min(0).default(0),
  total: z.number().positive(),
  coupon_code: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const status = searchParams.get("status")
    const customer_id = searchParams.get("customer_id")

    const supabase = createServerClient()
    let query = supabase.from("orders").select(
      `
        *,
        order_items (*)
      `,
      { count: "exact" },
    )

    // Apply filters
    if (status) {
      query = query.eq("status", status)
    }
    if (customer_id) {
      query = query.eq("customer_id", customer_id)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: orders, error, count } = await query.range(from, to).order("created_at", { ascending: false })

    if (error) {
      console.error("Orders fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("Orders API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = orderSchema.parse(body)

    const supabase = createServerClient()

    // Start transaction
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: validatedData.customer_id,
        shipping_address_id:validatedData.shipping_id,
        subtotal: validatedData.subtotal,
        shipping_cost: validatedData.shipping_cost,
        discount: validatedData.discount,
        total: validatedData.total,
        coupon_code: validatedData.coupon_code,
        status:"pending",
        tracking_number:""
      })
      .select()
      .single()

    if (orderError) {
      console.error("Order creation error:", orderError)
      return NextResponse.json({ error: `Failed to create order:: ${orderError.message}` }, { status: 500 })
    }

    // Insert order items
    const orderItems = validatedData.items.map((item) => ({
      ...item,
      order_id: order.id,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("Order items creation error:", itemsError)
      // Rollback order creation
      await supabase.from("orders").delete().eq("id", order.id)
      return NextResponse.json({ error: "Failed to create order items" }, { status: 500 })
    }

    // Update product stock
    for (const item of validatedData.items) {
      await supabase.rpc("decrement_stock", {
        product_id: item.product_id,
        quantity: item.quantity,
      })
    }

    // Update coupon usage if applicable
    if (validatedData.coupon_code) {
      await supabase.rpc("increment_coupon_usage", {
        coupon_code: validatedData.coupon_code,
      })
    }

    return NextResponse.json(
      {
        success: true,
        data: order,
      },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
