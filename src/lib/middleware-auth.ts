import { type NextRequest, NextResponse } from "next/server"
import { AuthUser, validateSession } from "./auth"

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>,
  userType: "customer" | "admin" = "customer",
) {
  try {
    console.log("Request wali cookie",request.cookies)
    
    const token =
      request.cookies.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const user = await validateSession(token, userType)
    console.log("User also",user)
    if (!user) {
      return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 })
    }

    return handler(request, user)
  } catch (error:unknown) {
    return NextResponse.json({ error: error }, { status: 401 })
  }
}
