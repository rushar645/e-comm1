import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase"
import { verifyPassword, createSession } from "@/lib/auth"
import {cookies} from 'next/headers';
import { PublicUser, AdminUser, CustomerUser } from "@/types/user"


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  userType: z.enum(["customer", "admin"]).default("customer"),
})

export async function POST(request: NextRequest) {

  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    const supabase = createServerClient()
    const userType = validatedData.userType === "customer" ? "customers" : "admin_users"
    console.log(validatedData.userType)

    let select = "id, name, email, password, status, role, cart, wishlist"
    if (userType == "admin_users"){
      select = "id, name, email, password, status, role"
    }

    const { data, error } = await supabase
    .from(userType)
    .select(select)
    .eq("email", validatedData.email)
    .single<AdminUser | CustomerUser>()

    const user = data

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
    const publicUser =
    userType === "customers"
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          cart: (user as CustomerUser).cart,
          wishlist: (user as CustomerUser).wishlist,
          status: user.status,
        }
      : {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        }

  const response = NextResponse.json({ success: true, user: publicUser })


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
