import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase"

const updateOrderSchema = z.object({
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]).optional(),
  payment_status: z.enum(["pending", "paid", "failed", "refunded"]).optional(),
  tracking_number: z.string().optional(),
  notes: z.string().optional(),
})

export async function GET(_request: NextRequest, { params }: { params: Promise<{id:string}> }) {
  try {
    const supabase = createServerClient()
    const { id } = await params;

    const { data: order, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (*)
      `)
      .eq("id", id)
      .single()

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const { data:customer, error:customer_error} = await supabase
    .from("customers")
    .select("name, email, phone")
    .eq("id", order.customer_id)
    .single()

    if (customer_error || !customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    const { data:address, error:address_error} = await supabase
    .from("customer_addresses")
    .select("address, city, state, phone, pincode")
    .eq("id", order.shipping_address_id)
    .single()

    if (address_error || !address) {
      return NextResponse.json({ error: "Shipping address not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {order, customer:customer, shipping:address},
    }, {status:200})

  } catch (error) {

    console.error("Order fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


export async function PUT(request: NextRequest, { params }: { params: Promise<{id:string}> }) {
  try {
    const body = await request.json()
    const validatedData = updateOrderSchema.parse(body)
    const {id} = await params;
    const supabase = createServerClient()

    const { data: order, error } = await supabase
      .from("orders")
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Order update error:", error)
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: order,
    },{status: 200})
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.error("Order update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
