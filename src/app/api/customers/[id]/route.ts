import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase"
import { Order } from "@/types"

const updateCustomerSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  status: z.enum(["active", "inactive"]).optional(),
  newsletter_subscribed: z.boolean().optional(),
  sms_updates: z.boolean().optional(), 
  customize_size: z.any().optional(), // Accept JSON for customize_size
})

export async function GET(request: NextRequest, { params }: {params: Promise<{id:string}>}) {
  try {
    const supabase = createServerClient()
    console.log(request.method)
    const {id} = await params

    const { data: customer, error } = await supabase
      .from("customers")
      .select(`
        *,
        customer_addresses (*),
        orders (*)
      `)
      .eq("id", id)
      .single()

    if (error || !customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    // Calculate stats
    const totalOrders = customer.orders?.length || 0
    const totalSpent = customer.orders?.reduce((sum: number, order: Order) => sum + order.total, 0) || 0

    return NextResponse.json({
      success: true,
      data: {
        ...customer,
        totalOrders,
        totalSpent,
      },
    })
  } catch (error) {
    console.error("Customer fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: {params: Promise<{id:string}>}) {
  try {
    const body = await request.json()
    const validatedData = updateCustomerSchema.parse(body)
    const {id} = await params

    const supabase = createServerClient()

    const { data: customer, error } = await supabase
      .from("customers")
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Customer update error:", error)
      return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: customer,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || "Invalid input" }, { status: 400 })
    }

    console.error("Customer update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


