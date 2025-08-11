"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

// Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  sku: string
  category: string
  stock: number
  status: "active" | "draft" | "out-of-stock"
  images: string[]
  colors: string[]
  sizes: string[]
  material?: string
  careInstructions?: string
  featured: boolean
  newArrival: boolean
  bestSeller: boolean
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
  }
  shipping: {
    address: string
    city: string
    state: string
    pincode: string
  }
  items: Array<{
    productId: string
    name: string
    price: number
    quantity: number
    color?: string
    size?: string
    image: string
  }>
  subtotal: number
  shippingNumber: number
  tax: number
  discount: number
  total: number
  status: "pending" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "pending" | "failed"
  date: string
  trackingNumber?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  registrationDate: string
  totalOrders: number
  totalSpent: number
  status: "active" | "inactive"
}

export interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed" | "free_shipping"
  value: number
  min_order_value: number
  max_discount?: number
  expiry_date: string
  usage_limit: number
  used_count: number
  is_active: boolean
  created_at: string
}

export interface Review {
  id: string
  productId: string
  productName: string
  customerName: string
  customerEmail: string
  rating: number
  comment: string
  date: string
  status: "pending" | "approved" | "rejected"
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "editor"
  permissions: string[]
  isActive: boolean
  lastLogin?: string
  createdAt: string
}

// Add these interfaces after the existing ones
export interface StaticPage {
  id: string
  title: string
  slug: string
  metaTitle: string
  metaDescription: string
  content: string
  status: "published" | "draft"
  showInFooter: boolean
  showInHeader: boolean
  lastModified: string
}

export interface HomepageBanner {
  id: string
  title: string
  subtitle: string
  image: string
  buttonText: string
  buttonLink: string
  position: number
  isActive: boolean
  backgroundColor: string
  textColor: string
  buttonColor: string
  alignment: "left" | "center" | "right"
  lastModified: string
}

interface AdminContextType {
  // Products
  // products: Product[]
  // addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<void>
  // updateProduct: (id: string, updates: Partial<Product>) => Promise<void>
  // deleteProduct: (id: string) => Promise<void>

  // Orders
  // orders: Order[]
  // updateOrderStatus: (id: string, status: Order["status"]) => Promise<void>
  // updatePaymentStatus: (id: string, status: Order["paymentStatus"]) => Promise<void>

  // Customers
  // customers: Customer[]
  // updateCustomerStatus: (id: string, status: Customer["status"]) => Promise<void>

  // Coupons
  // coupons: Coupon[]
  // addCoupon: (coupon: Omit<Coupon, "id" | "usedCount" | "createdAt">) => Promise<void>
  // updateCoupon: (id: string, updates: Partial<Coupon>) => Promise<void>
  // deleteCoupon: (id: string) => Promise<void>

  // Reviews
  // reviews: Review[]
  // updateReviewStatus: (id: string, status: Review["status"]) => Promise<void>
  // deleteReview: (id: string) => Promise<void>

  // Admin Users
  adminUsers: AdminUser[]
  addAdminUser: (user: Omit<AdminUser, "createdAt">) => Promise<void>
  updateAdminUser: (id: string, updates: Partial<AdminUser>) => Promise<void>
  deleteAdminUser: (id: string) => Promise<void>

  // Dashboard Stats
  // dashboardStats: {
  //   totalSales: number
  //   totalOrders: number
  //   totalCustomers: number
  //   pendingOrders: number
  // }

  // Loading states
  // loading: {
  //   products: boolean
  //   orders: boolean
  //   customers: boolean
  //   coupons: boolean
  //   reviews: boolean
  //   adminUsers: boolean
  // }

  // Add these to the AdminContextType interface
  // CMS
  // staticPages: StaticPage[]
  // homepageBanners: HomepageBanner[]
  // addStaticPage: (page: Omit<StaticPage, "id" | "lastModified">) => Promise<void>
  // updateStaticPage: (id: string, updates: Partial<StaticPage>) => Promise<void>
  // deleteStaticPage: (id: string) => Promise<void>
  // addHomepageBanner: (banner: Omit<HomepageBanner, "id" | "lastModified">) => Promise<void>
  // updateHomepageBanner: (id: string, updates: Partial<HomepageBanner>) => Promise<void>
  // deleteHomepageBanner: (id: string) => Promise<void>
  // cmsContent: {
  //   staticPages: StaticPage[]
  //   homepageBanners: HomepageBanner[]
  // }
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  // Sample data - in real app, this would come from API
  // const [products, setProducts] = useState<Product[]>([])

  // const [orders, setOrders] = useState<Order[]>([])

  // const [customers, setCustomers] = useState<Customer[]>([])

  // const [coupons, setCoupons] = useState<Coupon[]>([])

  // const [reviews, setReviews] = useState<Review[]>([])

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])

  // const [staticPages, setStaticPages] = useState<StaticPage[]>([])

  // const [homepageBanners, setHomepageBanners] = useState<HomepageBanner[]>([])

  const [loading, setLoading] = useState({
    products: false,
    orders: false,
    customers: false,
    coupons: false,
    reviews: false,
    adminUsers: false,
  })

  // Product functions
  // const addProduct = async (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
  //   setLoading((prev) => ({ ...prev, products: true }))
  //   try {
  //     const newProduct: Product = {
  //       ...productData,
  //       id: `PROD-${Date.now()}`,
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //     }
  //     setProducts((prev) => [...prev, newProduct])
  //     toast({
  //       title: "Success",
  //       description: "Product added successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to add product",
  //       variant: "warning",
  //     })
  //   } finally {
  //     setLoading((prev) => ({ ...prev, products: false }))
  //   }
  // }

  // const updateProduct = async (id: string, updates: Partial<Product>) => {
  //   setLoading((prev) => ({ ...prev, products: true }))
  //   try {
  //     setProducts((prev) =>
  //       prev.map((product) =>
  //         product.id === id ? { ...product, ...updates, updatedAt: new Date().toISOString() } : product,
  //       ),
  //     )
  //     toast({
  //       title: "Success",
  //       description: "Product updated successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to update product",
  //       variant: "warning",
  //     })
  //   } finally {
  //     setLoading((prev) => ({ ...prev, products: false }))
  //   }
  // }

  // const deleteProduct = async (id: string) => {
  //   setLoading((prev) => ({ ...prev, products: true }))
  //   try {
  //     setProducts((prev) => prev.filter((product) => product.id !== id))
  //     toast({
  //       title: "Success",
  //       description: "Product deleted successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to delete product",
  //       variant: "warning",
  //     })
  //   } finally {
  //     setLoading((prev) => ({ ...prev, products: false }))
  //   }
  // }

  // // Order functions
  // const updateOrderStatus = async (id: string, status: Order["status"]) => {
  //   setLoading((prev) => ({ ...prev, orders: true }))
  //   try {
  //     setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)))
  //     toast({
  //       title: "Success",
  //       description: `Order status updated to ${status}`,
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to update order status",
  //       variant: "warning",
  //     })
  //   } finally {
  //     setLoading((prev) => ({ ...prev, orders: false }))
  //   }
  // }

  // const updatePaymentStatus = async (id: string, status: Order["paymentStatus"]) => {
  //   setLoading((prev) => ({ ...prev, orders: true }))
  //   try {
  //     setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, paymentStatus: status } : order)))
  //     toast({
  //       title: "Success",
  //       description: `Payment status updated to ${status}`,
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to update payment status",
  //       variant: "warning",
  //     })
  //   } finally {
  //     setLoading((prev) => ({ ...prev, orders: false }))
  //   }
  // }

  // // Customer functions
  // const updateCustomerStatus = async (id: string, status: Customer["status"]) => {
  //   setLoading((prev) => ({ ...prev, customers: true }))
  //   try {
  //     setCustomers((prev) => prev.map((customer) => (customer.id === id ? { ...customer, status } : customer)))
  //     toast({
  //       title: "Success",
  //       description: `Customer status updated to ${status}`,
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to update customer status",
  //       variant: "warning",
  //     })
  //   } finally {
  //     setLoading((prev) => ({ ...prev, customers: false }))
  //   }
  // }

  // // Coupon functions
  // const addCoupon = async (couponData: Omit<Coupon, "id" | "usedCount" | "createdAt">) => {
  //   setLoading((prev) => ({ ...prev, coupons: true }))
  //   try {
  //     const newCoupon: Coupon = {
  //       ...couponData,
  //       id: `COUP-${Date.now()}`,
  //       used_count: 0,
  //       created_at: new Date().toISOString(),
  //     }
  //     setCoupons((prev) => [...prev, newCoupon])
  //     toast({
  //       title: "Success",
  //       description: "Coupon added successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to add coupon",
  //       variant: "warning",
  //     })
  //   } finally {
  //     setLoading((prev) => ({ ...prev, coupons: false }))
  //   }
  // }

  // const updateCoupon = async (id: string, updates: Partial<Coupon>) => {
  //   setLoading((prev) => ({ ...prev, coupons: true }))
  //   try {
  //     setCoupons((prev) => prev.map((coupon) => (coupon.id === id ? { ...coupon, ...updates } : coupon)))
  //     toast({
  //       title: "Success",
  //       description: "Coupon updated successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to update coupon",
  //       variant: "warning",
  //     })
  //   } finally {
  //     setLoading((prev) => ({ ...prev, coupons: false }))
  //   }
  // }

  // const deleteCoupon = async (id: string) => {
  //   setLoading((prev) => ({ ...prev, coupons: true }))
  //   try {
  //     setCoupons((prev) => prev.filter((coupon) => coupon.id !== id))
  //     toast({
  //       title: "Success",
  //       description: "Coupon deleted successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to delete coupon",
  //       variant: "warning",
  //     })
  //   } finally {
  //     setLoading((prev) => ({ ...prev, coupons: false }))
  //   }
  // }

  // // Review functions
  // const updateReviewStatus = async (id: string, status: Review["status"]) => {
  //   setLoading((prev) => ({ ...prev, reviews: true }))
  //   try {
  //     setReviews((prev) => prev.map((review) => (review.id === id ? { ...review, status } : review)))
  //     toast({
  //       title: "Success",
  //       description: `Review ${status} successfully`,
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to update review status",
  //       variant: "warning",
  //     })
  //   } finally {
  //     setLoading((prev) => ({ ...prev, reviews: false }))
  //   }
  // }

  // const deleteReview = async (id: string) => {
  //   setLoading((prev) => ({ ...prev, reviews: true }))
  //   try {
  //     setReviews((prev) => prev.filter((review) => review.id !== id))
  //     toast({
  //       title: "Success",
  //       description: "Review deleted successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to delete review",
  //       variant: "warning",
  //     })
  //   } finally {
  //     setLoading((prev) => ({ ...prev, reviews: false }))
  //   }
  // }

  // Admin user functions
  const addAdminUser = async (userData: Omit<AdminUser, "createdAt">) => {
    setLoading((prev) => ({ ...prev, adminUsers: true }))
    try {
      const newUser: AdminUser = {
        ...userData,
        createdAt: new Date().toISOString(),
      }
      setAdminUsers((prev) => [...prev, newUser])
      toast({
        title: "Success",
        description: "Admin user added successfully",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to add admin user",
        variant: "warning",
      })
    } finally {
      setLoading((prev) => ({ ...prev, adminUsers: false }))
    }
  }

  const updateAdminUser = async (id: string, updates: Partial<AdminUser>) => {
    setLoading((prev) => ({ ...prev, adminUsers: true }))
    try {
      setAdminUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...updates } : user)))
      toast({
        title: "Success",
        description: "Admin user updated successfully",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to update admin user",
        variant: "warning",
      })
    } finally {
      setLoading((prev) => ({ ...prev, adminUsers: false }))
    }
  }

  const deleteAdminUser = async (id: string) => {
    setLoading((prev) => ({ ...prev, adminUsers: true }))
    try {
      setAdminUsers((prev) => prev.filter((user) => user.id !== id))
      toast({
        title: "Success",
        description: "Admin user deleted successfully",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to delete admin user",
        variant: "warning",
      })
    } finally {
      setLoading((prev) => ({ ...prev, adminUsers: false }))
    }
  }

  // Add these functions after the existing ones
  // CMS functions
  // const addStaticPage = async (pageData: Omit<StaticPage, "id" | "lastModified">) => {
  //   try {
  //     const newPage: StaticPage = {
  //       ...pageData,
  //       id: `page-${Date.now()}`,
  //       lastModified: new Date().toISOString().split("T")[0],
  //     }
  //     setStaticPages((prev) => [...prev, newPage])
  //     toast({
  //       title: "Success",
  //       description: "Page added successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to add page",
  //       variant: "warning",
  //     })
  //   }
  // }

  // const updateStaticPage = async (id: string, updates: Partial<StaticPage>) => {
  //   try {
  //     setStaticPages((prev) =>
  //       prev.map((page) =>
  //         page.id === id ? { ...page, ...updates, lastModified: new Date().toISOString().split("T")[0] } : page,
  //       ),
  //     )
  //     toast({
  //       title: "Success",
  //       description: "Page updated successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to update page",
  //       variant: "warning",
  //     })
  //   }
  // }

  // const deleteStaticPage = async (id: string) => {
  //   try {
  //     setStaticPages((prev) => prev.filter((page) => page.id !== id))
  //     toast({
  //       title: "Success",
  //       description: "Page deleted successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to delete page",
  //       variant: "warning",
  //     })
  //   }
  // }

  // const addHomepageBanner = async (bannerData: Omit<HomepageBanner, "id" | "lastModified">) => {
  //   try {
  //     const newBanner: HomepageBanner = {
  //       ...bannerData,
  //       id: `banner-${Date.now()}`,
  //       lastModified: new Date().toISOString().split("T")[0],
  //     }
  //     setHomepageBanners((prev) => [...prev, newBanner])
  //     toast({
  //       title: "Success",
  //       description: "Banner added successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to add banner",
  //       variant: "warning",
  //     })
  //   }
  // }

  // const updateHomepageBanner = async (id: string, updates: Partial<HomepageBanner>) => {
  //   try {
  //     setHomepageBanners((prev) =>
  //       prev.map((banner) =>
  //         banner.id === id ? { ...banner, ...updates, lastModified: new Date().toISOString().split("T")[0] } : banner,
  //       ),
  //     )
  //     toast({
  //       title: "Success",
  //       description: "Banner updated successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to update banner",
  //       variant: "warning",
  //     })
  //   }
  // }

  // const deleteHomepageBanner = async (id: string) => {
  //   try {
  //     setHomepageBanners((prev) => prev.filter((banner) => banner.id !== id))
  //     toast({
  //       title: "Success",
  //       description: "Banner deleted successfully",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to delete banner",
  //       variant: "warning",
  //     })
  //   }
  // }

  // // Calculate dashboard stats
  // const dashboardStats = {
  //   totalSales: orders.reduce((sum, order) => sum + order.total, 0),
  //   totalOrders: orders.length,
  //   totalCustomers: customers.length,
  //   pendingOrders: orders.filter((order) => order.status === "pending").length,
  // }

  const value = {
    adminUsers,
    addAdminUser,
    updateAdminUser,
    deleteAdminUser,
    loading,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
