import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase"

const customerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  customize_size: z.any().optional(), // Accept JSON for customize_size
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const supabase = createServerClient()
    let query = supabase.from("customers").select(
      `
        *,
        orders!inner(count)
      `,
      { count: "exact" },
    )

    // Apply filters
    if (status) {
      query = query.eq("status", status)
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: customers, error, count } = await query.range(from, to).order("created_at", { ascending: false })

    if (error) {
      console.error("Customers fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 })
    }

    // Calculate customer stats
    const customersWithStats = await Promise.all(
      customers?.map(async (customer) => {
        const { data: orderStats } = await supabase.from("orders").select("total").eq("customer_id", customer.id)

        const totalOrders = orderStats?.length || 0
        const totalSpent = orderStats?.reduce((sum, order) => sum + order.total, 0) || 0

        return {
          ...customer,
          totalOrders,
          totalSpent,
        }
      }) || [],
    )

    return NextResponse.json({
      success: true,
      data: customersWithStats,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("Customers API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = customerSchema.parse(body)

    const supabase = createServerClient()

    const { data: customer, error } = await supabase.from("customers").insert(validatedData).select().single()

    if (error) {
      console.error("Customer creation error:", error)
      return NextResponse.json({ error: "Failed to create customer" }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        data: customer,
      },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || "Invalid input" }, { status: 400 })
    }

    console.error("Customer creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
