import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase"

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  stock: z.number().int().min(0, "Stock must be non-negative"),
  status: z.enum(["active", "draft", "out-of-stock"]).default("active"),
  images: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  material: z.string().optional(),
  care_instructions: z.string().optional(),
  featured: z.boolean().default(false),
  new_arrival: z.boolean().default(false),
  best_seller: z.boolean().default(false),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured")

    const supabase = createServerClient()
    let query = supabase.from("products").select("*", { count: "exact" })

    // Apply filters
    if (category) {
      query = query.eq("category", category)
    }
    if (status) {
      query = query.eq("status", status)
    }
    if (featured === "true") {
      query = query.eq("featured", true)
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: products, error, count } = await query.range(from, to).order("created_at", { ascending: false })

    if (error) {
      console.error("Products fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }
 
    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    }, { status : 200})
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = productSchema.parse(body)

    const supabase = createServerClient()

    // Check if SKU already exists
    const { data: existingProduct } = await supabase.from("products").select("id").eq("sku", validatedData.sku).single()

    if (existingProduct) {
      return NextResponse.json({ error: "Product with this SKU already exists" }, { status: 400 })
    }

    const { data: product, error } = await supabase.from("products").insert(validatedData).select().single()

    if (error) {
      console.error("Product creation error:", error)
      return NextResponse.json({ error: `Failed to create product ;; ${error.message}` }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.error("Product creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
