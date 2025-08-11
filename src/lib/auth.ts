import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createServerClient } from "./supabase"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const JWT_EXPIRES_IN = "7d"

export interface AuthUser {
  id: string
  name: string
  email: string
  role?: "customer" | "admin"
  phone?: number
}

export interface SessionData {
  user: AuthUser
  token: string
  expiresAt: Date
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Generate JWT token
export function generateToken(payload: {userType:string, userId:string}): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Verify JWT token
export function verifyToken(token: string){
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    console.log(error)
    return null
  }
}

// Create session
export async function createSession(userId: string, userType: "customer" | "admin"): Promise<string> {
  const supabase = createServerClient()
  const sessionToken = generateToken({ userId, userType })
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  const tableName = userType === "customer" ? "customer_sessions" : "admin_sessions"
  const columnName = userType === "customer" ? "customer_id" : "admin_id"

  await supabase.from(tableName).insert({
    [columnName]: userId,
    session_token: sessionToken,
    expires_at: expiresAt.toISOString(),
  })

  return sessionToken
}

// Validate session
export async function validateSession(token: string, userType: "customer" | "admin"): Promise<AuthUser | null> {
  try {
    const decoded = verifyToken(token)
    if (!decoded) return null

    const supabase = createServerClient()
    const tableName = userType === "customer" ? "customer_sessions" : "admin_sessions"
    const userTable = userType === "customer" ? "customers" : "admin_users"
    const columnName = userType === "customer" ? "customer_id" : "admin_id"

    // Check if session exists and is not expired
    const { data: session } = await supabase
      .from(tableName)
      .select("*")
      .eq("session_token", token)
      .gt("expires_at", new Date().toISOString())
      .single()

    if (!session) return null

    // Get user data
    const { data: user } = await supabase
      .from(userTable)
      .select("id, name, email, phone")
      .eq("id", session[columnName])
      .single()

    if (!user) return null

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone:user.phone,
      role: userType,
    }
    
  } catch (error) {
    console.log(error)
    return null
  }
}

// Delete session (logout)
export async function deleteSession(token: string, userType: "customer" | "admin"): Promise<void> {
  const supabase = createServerClient()
  const tableName = userType === "customer" ? "customer_sessions" : "admin_sessions"

  await supabase.from(tableName).delete().eq("session_token", token)
}

// Clean expired sessions
export async function cleanExpiredSessions(): Promise<void> {
  const supabase = createServerClient()
  const now = new Date().toISOString()

  await Promise.all([
    supabase.from("customer_sessions").delete().lt("expires_at", now),
    supabase.from("admin_sessions").delete().lt("expires_at", now),
  ])
}
