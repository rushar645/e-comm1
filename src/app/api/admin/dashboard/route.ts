import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

interface ProductStats {
  id: string
  name: string
  sales: number
  revenue: number
}

export async function GET(_request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Get total sales
    const { data: salesData } = await supabase.from("orders").select("total").eq("payment_status", "paid")

    const totalSales = salesData?.reduce((sum, order) => sum + order.total, 0) || 0

    // Get total orders
    const { count: totalOrders } = await supabase.from("orders").select("*", { count: "exact", head: true })

    // Get total customers
    const { count: totalCustomers } = await supabase.from("customers").select("*", { count: "exact", head: true })

    // Get pending orders
    const { count: pendingOrders } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending")

    // Get low stock products
    const { count: lowStockProducts } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .lt("stock", 10)

    // Get recent orders
    const { data: recentOrders } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)

    // Get top products
    const { data: topProductsData } = await supabase
      .from("order_items")
      .select(`
        product_id,
        product_name,
        quantity,
        price
      `)
      .limit(100)

    // Calculate top products
    const productStats: Record<string, ProductStats> = {}
    topProductsData?.forEach((item) => {
      if (!productStats[item.product_id]) {
        productStats[item.product_id] = {
          id: item.product_id,
          name: item.product_name,
          sales: 0,
          revenue: 0,
        }
      }
      productStats[item.product_id].sales += item.quantity
      productStats[item.product_id].revenue += item.price * item.quantity
    })

    const topProducts:ProductStats[] = Object.values(productStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    return NextResponse.json({
      success: true,
      data: {
        totalSales,
        totalOrders: totalOrders || 0,
        totalCustomers: totalCustomers || 0,
        pendingOrders: pendingOrders || 0,
        lowStockProducts: lowStockProducts || 0,
        recentOrders: recentOrders || [],
        topProducts,
      },
    })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
