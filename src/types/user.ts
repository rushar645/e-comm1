import { WishlistItem } from "@/contexts/wishlist-context"

export type BaseUser = {
    id: string
    name: string
    email: string
    phone: number
    password: string
    status: "active" | "inactive"
    role: "admin" | "customer"
  }
  
  export interface AdminUser extends BaseUser {
    role: "admin"
    last_login?: string
  }
  
  export interface CustomerUser extends BaseUser {
    role: "customer"
    cart: Record<string, any>[]
    wishlist: WishlistItem[]
  }
  

export type PublicAdminUser = Omit<AdminUser, "password">
export type PublicCustomerUser = Omit<CustomerUser, "password">

export type PublicUser = PublicAdminUser | PublicCustomerUser
