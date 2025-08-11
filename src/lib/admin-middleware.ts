import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { createServerClient } from "@/lib/supabase"

interface AdminUser {
  id: string
  email: string
  name: string
  role: "super_admin" | "admin" | "manager"
  permissions: string[]
  status: "active" | "inactive"
}

export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest, user: AdminUser) => Promise<NextResponse>,
  requiredRole?: "super_admin" | "admin" | "manager",
) {
  try { 
    // Get token from cookie
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required nahi mili" }, { status: 401 })
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")
    // console.log("Decoded JWT TOKEN",decoded)
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", decoded.userId)
      .eq("status", "active")
    const adminUser = data as AdminUser | null
    if (error) {
      return NextResponse.json({ error: `Error Occured, ${error.message}` }, { status: 401 })
    }

    if (!adminUser){
      return NextResponse.json({error: "No Admin User Found"}, {status:401})
    }

    // Check role permissions
    if (requiredRole) {
      const roleHierarchy = {
        super_admin: 3,
        admin: 2,
        manager: 1,
      }

      const userLevel = roleHierarchy[adminUser.role as keyof typeof roleHierarchy] || 0
      const requiredLevel = roleHierarchy[requiredRole] || 0

      if (userLevel < requiredLevel) {
        return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
      }
    }

    // Call the handler with authenticated user
    return await handler(request, adminUser)
  } catch (error) {
    console.error("Auth middleware error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
  }
}
