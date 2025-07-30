import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase"
import { verifyPassword, createSession } from "@/lib/auth"
import {cookies} from 'next/headers';


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  userType: z.enum(["customer", "admin"]).default("customer"),
})

export async function POST(request: NextRequest) {
  // const cookieStore = cookies();
  // const token = cookieStore.get('auth-token')?.value;
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    const supabase = createServerClient()
    const tableName = validatedData.userType === "customer" ? "customers" : "admin_users"
    console.log(validatedData.userType)
    // Find user
    const { data: user, error } = await supabase
      .from(tableName)
      .select("id, name, email, password, status, role")
      .eq("email", validatedData.email)
      .single()

    if (error || !user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check if user is active
    if (user.status === "inactive") {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "wrong password" }, { status: 401 })
    }

    // Update last login for admin users
    if (user.role === "admin") {
      await supabase.from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", user.id)
    }

    // Create session
    const sessionToken = await createSession(user.id, user.role)

    // Set cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    response.cookies.set("auth-token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
