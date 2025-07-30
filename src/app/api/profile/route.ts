import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import jwt from "jsonwebtoken"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function PUT(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") 
    const userId = decoded.userId

    const body = await request.json()
    const { name, email, phone, avatar } = body

    // Validation
    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Update customer profile
    const { data: customer, error } = await supabase
      .from("customers")
      .update({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        avatar_url: avatar?.url || null,
        avatar_public_id: avatar?.publicId || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      if (error.code === "23505") {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 })
      }
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        avatar: customer.avatar_url
          ? {
              url: customer.avatar_url,
              publicId: customer.avatar_public_id,
            }
          : null,
      },
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Profile update error:", error)
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") 
    const userId = decoded.userId

    // Get customer profile
    const { data: customer, error } = await supabase.from("customers").select("*").eq("id", userId).single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
    }

    // Get order statistics
    const { data: orders } = await supabase.from("orders").select("total, status").eq("customer_id", userId)

    const totalOrders = orders?.length || 0
    const totalSpent = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0

    return NextResponse.json({
      success: true,
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        avatar: customer.avatar_url
          ? {
              url: customer.avatar_url,
              publicId: customer.avatar_public_id,
            }
          : null,
        joinDate: new Date(customer.created_at).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        totalOrders,
        totalSpent,
        loyaltyPoints: Math.floor(totalSpent / 100), // 1 point per ₹100 spent
      },
    })
  } catch (error) {
    console.error("Profile fetch error:", error)
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
