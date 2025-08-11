"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { CustomerUser } from "@/types/user"

type UserContextType = {
  user: CustomerUser | null
  setUser: (user: CustomerUser | null) => void
  loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CustomerUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (!res.ok) throw new Error("Failed to fetch user")
        const data = await res.json()
        setUser(data.user)
      } catch (err) {
        setUser(null)
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])
  
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used within a UserProvider")
  return context
}
