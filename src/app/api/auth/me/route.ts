import { type NextRequest, NextResponse } from "next/server"
import { validateSession } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "No session found" }, { status: 402 })
    }

    // Try customer first, then admin
    let user = await validateSession(token, "customer")
    if (!user) {
      user = await validateSession(token, "admin")
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid session" }, { status: 403 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Session validation error:", error)
    return NextResponse.json({ error: "Session validation failed" }, { status: 500 })
  }
}
