import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase"
import { hashPassword, createSession } from "@/lib/auth"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = signupSchema.parse(body)

    const supabase = createServerClient()

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("customers")
      .select("id")
      .eq("email", validatedData.email)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const passwordHash = await hashPassword(validatedData.password)

    // Create user
    const { data: newUser, error } = await supabase
      .from("customers")
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        password: passwordHash,
      })
      .select("id, name, email")
      .single()

    if (error) {
      console.error("Signup error:", error)
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
    }

    // Create session
    const sessionToken = await createSession(newUser.id, "customer")

    // Set cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: "customer",
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
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
