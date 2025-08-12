import { type NextRequest, NextResponse } from "next/server"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { createServerClient } from "@/lib/supabase"

interface AdminUser {
  id: string
  email: string
  name: string
  role: "super_admin" | "admin" | "manager"
  permissions: string[]
  status: "active" | "inactive"
}

interface DecodedToken extends JwtPayload {
  userId: string
}

export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest, user: AdminUser) => Promise<NextResponse>,
  requiredRole?: AdminUser["role"],
) {
  try {
    // Get token from cookies
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken
    if (!decoded.userId) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 401 })
    }

    // Fetch admin user
    const supabase = createServerClient()
    console.log("This si hte sueers",decoded)
    const { data: adminUser, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", decoded.userId)
      .eq("status", "active")
      .single()

    if (error) {
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 })
    }

    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 })
    }

    // Check role permissions
    if (requiredRole) {
      const roleHierarchy = {
        super_admin: 3,
        admin: 2,
        manager: 1,
      } as const

      const userLevel = roleHierarchy[adminUser.role]
      const requiredLevel = roleHierarchy[requiredRole]

      if (userLevel < requiredLevel) {
        return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
      }
    }

    // Call the handler with authenticated user
    return await handler(request, adminUser)
  } catch (err) {
    console.error("Auth middleware error:", err)
    if (err instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
  }
}
