import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { Product } from "@/types"

interface Category {
  id: string
  name: string
  slug: string
}

interface CategoriesData {
  category: Category
  products: Product[]
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    console.log(request.method)
    // 1. Fetch categories
    const { data: categories, error: catError } = await supabase
      .from("product_categories")
      .select("id, name, slug")

    if (catError) {
      console.error("Categories fetch error:", catError)
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
    }

    // 2. For each category, fetch top 5 best-selling products
    let categoriesData: CategoriesData[] = []
    if (categories && categories.length > 0) {
      const categoryQueries = categories.map((cat) =>
        supabase
          .from("products")
          .select("*")
          .eq("category", cat.slug)
          .order("units_sold", { ascending: false })
          .limit(8)
      )

      // Run all product fetches concurrently:
      const results = await Promise.all(categoryQueries)

      categoriesData = categories
        .map((cat, idx) => {
          const products = results[idx].data || []
          if (products.length === 0) return null
          return {
            category: cat,
            products,
          }
        })
        .filter((item): item is CategoriesData => item !== null)
    }

    // 3. Fetch up to 7 new arrival products
    const { data: newArrivals, error: naError } = await supabase
      .from("products")
      .select("*")
      .eq("new_arrival", true)
      .order("created_at", { ascending: false })
      .limit(5)

    if (naError) {
      console.error("New arrivals fetch error:", naError)
    }

    return NextResponse.json(
      {
        success: true,
        categories: categoriesData,
        new_arrivals: newArrivals || [],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Homepage Products API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
