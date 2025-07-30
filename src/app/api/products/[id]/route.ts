import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase"

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  sku: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  stock: z.number().int().min(0).optional(),
  status: z.enum(["active", "draft", "out-of-stock"]).optional(),
  images: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  material: z.string().optional(),
  care_instructions: z.string().optional(),
  featured: z.boolean().optional(),
  new_arrival: z.boolean().optional(),
  best_seller: z.boolean().optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()

    const { data: product, error } = await supabase.from("products").select("*").eq("sku", params.id).single()

    if (error) {
      return NextResponse.json({ error: `Product finding error: ${error.message}` }, { status: 404 })
    }

    if (!product) {
      return NextResponse.json({ error: `Product nahi mila: ${error?.message}` }, { status: 404 })
    }


    return NextResponse.json({
      success: true,
      data: product,
    }, {status:200})
  } catch (error) {
    console.error("Product fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const validatedData = updateProductSchema.parse(body)

    const supabase = createServerClient()

    // Check if product exists
    const { data: existingProduct } = await supabase.from("products").select("id").eq("id", params.id).single()

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Check SKU uniqueness if updating SKU
    if (validatedData.sku) {
      const { data: skuCheck } = await supabase
        .from("products")
        .select("id")
        .eq("sku", validatedData.sku)
        .neq("id", params.id)
        .single()

      if (skuCheck) {
        return NextResponse.json({ error: "Product with this SKU already exists" }, { status: 400 })
      }
    }

    const { data: product, error } = await supabase
      .from("products")
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Product update error:", error)
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.error("Product update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()

    const { error } = await supabase.from("products").delete().eq("id", params.id)

    if (error) {
      console.error("Product deletion error:", error)
      return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("Product deletion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
