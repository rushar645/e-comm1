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
  shipping: number
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
  minOrderValue: number
  maxDiscount?: number
  expiryDate: string
  usageLimit: number
  usedCount: number
  isActive: boolean
  createdAt: string
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
  products: Product[]
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>

  // Orders
  orders: Order[]
  updateOrderStatus: (id: string, status: Order["status"]) => Promise<void>
  updatePaymentStatus: (id: string, status: Order["paymentStatus"]) => Promise<void>

  // Customers
  customers: Customer[]
  updateCustomerStatus: (id: string, status: Customer["status"]) => Promise<void>

  // Coupons
  coupons: Coupon[]
  addCoupon: (coupon: Omit<Coupon, "id" | "usedCount" | "createdAt">) => Promise<void>
  updateCoupon: (id: string, updates: Partial<Coupon>) => Promise<void>
  deleteCoupon: (id: string) => Promise<void>

  // Reviews
  reviews: Review[]
  updateReviewStatus: (id: string, status: Review["status"]) => Promise<void>
  deleteReview: (id: string) => Promise<void>

  // Admin Users
  adminUsers: AdminUser[]
  addAdminUser: (user: Omit<AdminUser, "id" | "createdAt">) => Promise<void>
  updateAdminUser: (id: string, updates: Partial<AdminUser>) => Promise<void>
  deleteAdminUser: (id: string) => Promise<void>

  // Dashboard Stats
  dashboardStats: {
    totalSales: number
    totalOrders: number
    totalCustomers: number
    pendingOrders: number
  }

  // Loading states
  loading: {
    products: boolean
    orders: boolean
    customers: boolean
    coupons: boolean
    reviews: boolean
    adminUsers: boolean
  }

  // Add these to the AdminContextType interface
  // CMS
  staticPages: StaticPage[]
  homepageBanners: HomepageBanner[]
  addStaticPage: (page: Omit<StaticPage, "id" | "lastModified">) => Promise<void>
  updateStaticPage: (id: string, updates: Partial<StaticPage>) => Promise<void>
  deleteStaticPage: (id: string) => Promise<void>
  addHomepageBanner: (banner: Omit<HomepageBanner, "id" | "lastModified">) => Promise<void>
  updateHomepageBanner: (id: string, updates: Partial<HomepageBanner>) => Promise<void>
  deleteHomepageBanner: (id: string) => Promise<void>
  cmsContent: {
    staticPages: StaticPage[]
    homepageBanners: HomepageBanner[]
  }
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  // Sample data - in real app, this would come from API
  const [products, setProducts] = useState<Product[]>([
    {
      id: "PROD-001",
      name: "Floral Embroidered Lehenga",
      description: "Beautiful floral embroidered lehenga perfect for weddings",
      price: 12500,
      sku: "LEH-001",
      category: "Lehenga",
      stock: 15,
      status: "active",
      images: ["/placeholder.svg?height=400&width=400"],
      colors: ["red", "blue", "pink"],
      sizes: ["S", "M", "L", "XL"],
      material: "Silk",
      careInstructions: "Dry clean only",
      featured: true,
      newArrival: false,
      bestSeller: true,
      createdAt: "2023-06-01",
      updatedAt: "2023-06-01",
    },
    // Add more sample products...
  ])

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: {
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        phone: "+91 98765 43210",
      },
      shipping: {
        address: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
      },
      items: [
        {
          productId: "PROD-001",
          name: "Floral Embroidered Lehenga",
          price: 12500,
          quantity: 1,
          color: "red",
          size: "M",
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
      subtotal: 12500,
      shipping: 0,
      tax: 1250,
      discount: 0,
      total: 13750,
      status: "pending",
      paymentStatus: "paid",
      date: "2023-06-01",
    },
    // Add more sample orders...
  ])

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "CUST-001",
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43210",
      registrationDate: "2023-05-15",
      totalOrders: 3,
      totalSpent: 25000,
      status: "active",
    },
    {
      id: "CUST-002",
      name: "Anita Patel",
      email: "anita.patel@example.com",
      phone: "+91 87654 32109",
      registrationDate: "2023-04-20",
      totalOrders: 5,
      totalSpent: 45000,
      status: "active",
    },
    {
      id: "CUST-003",
      name: "Meera Singh",
      email: "meera.singh@example.com",
      phone: "+91 76543 21098",
      registrationDate: "2023-03-10",
      totalOrders: 2,
      totalSpent: 18000,
      status: "inactive",
    },
    {
      id: "CUST-004",
      name: "Kavya Reddy",
      email: "kavya.reddy@example.com",
      phone: "+91 65432 10987",
      registrationDate: "2023-06-01",
      totalOrders: 7,
      totalSpent: 62000,
      status: "active",
    },
    {
      id: "CUST-005",
      name: "Riya Gupta",
      email: "riya.gupta@example.com",
      registrationDate: "2023-02-28",
      totalOrders: 1,
      totalSpent: 8500,
      status: "active",
    },
  ])

  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "COUP-001",
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      minOrderValue: 500,
      maxDiscount: 200,
      expiryDate: "2024-12-31",
      usageLimit: 1000,
      usedCount: 45,
      isActive: true,
      createdAt: "2023-06-01",
    },
    {
      id: "COUP-002",
      code: "FESTIVE25",
      type: "percentage",
      value: 25,
      minOrderValue: 2000,
      maxDiscount: 500,
      expiryDate: "2024-10-31",
      usageLimit: 500,
      usedCount: 123,
      isActive: true,
      createdAt: "2023-06-01",
    },
    {
      id: "COUP-003",
      code: "FLAT500",
      type: "fixed",
      value: 500,
      minOrderValue: 3000,
      expiryDate: "2024-09-30",
      usageLimit: 200,
      usedCount: 67,
      isActive: true,
      createdAt: "2023-06-01",
    },
    {
      id: "COUP-004",
      code: "FREESHIP",
      type: "free_shipping",
      value: 0,
      minOrderValue: 1000,
      expiryDate: "2024-11-30",
      usageLimit: 2000,
      usedCount: 234,
      isActive: true,
      createdAt: "2023-06-01",
    },
    {
      id: "COUP-005",
      code: "EXPIRED20",
      type: "percentage",
      value: 20,
      minOrderValue: 1500,
      maxDiscount: 300,
      expiryDate: "2023-05-31",
      usageLimit: 100,
      usedCount: 89,
      isActive: false,
      createdAt: "2023-04-01",
    },
  ])

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "REV-001",
      productId: "PROD-001",
      productName: "Floral Embroidered Lehenga",
      customerName: "Priya Sharma",
      customerEmail: "priya.sharma@example.com",
      rating: 5,
      comment: "Absolutely beautiful! Perfect for my wedding.",
      date: "2023-06-01",
      status: "pending",
    },
    // Add more sample reviews...
  ])

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    {
      id: "ADMIN-001",
      name: "Admin User",
      email: "admin@dressdexterity.com",
      role: "admin",
      permissions: ["all"],
      isActive: true,
      lastLogin: "2023-06-01",
      createdAt: "2023-01-01",
    },
    // Add more sample admin users...
  ])

  // Add these state variables after the existing ones
  const [staticPages, setStaticPages] = useState<StaticPage[]>([
    {
      id: "about",
      title: "About Us",
      slug: "/about",
      metaTitle: "About Us - Dress Dexterity",
      metaDescription: "Learn about Dress Dexterity's mission and values",
      content: "# About Us\n\nWelcome to Dress Dexterity...",
      status: "published",
      showInFooter: true,
      showInHeader: false,
      lastModified: "2024-01-15",
    },
    // Add more sample pages...
  ])

  const [homepageBanners, setHomepageBanners] = useState<HomepageBanner[]>([
    {
      id: "banner-1",
      title: "Summer Collection 2024",
      subtitle: "Discover vibrant styles for the season",
      image: "/placeholder.svg?height=400&width=800",
      buttonText: "Shop Now",
      buttonLink: "/category/summer",
      position: 1,
      isActive: true,
      backgroundColor: "#FFF2E6",
      textColor: "#3A3A3A",
      buttonColor: "#FF6B35",
      alignment: "left",
      lastModified: "2024-01-15",
    },
    // Add more sample banners...
  ])

  const [loading, setLoading] = useState({
    products: false,
    orders: false,
    customers: false,
    coupons: false,
    reviews: false,
    adminUsers: false,
  })

  // Product functions
  const addProduct = async (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    setLoading((prev) => ({ ...prev, products: true }))
    try {
      const newProduct: Product = {
        ...productData,
        id: `PROD-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setProducts((prev) => [...prev, newProduct])
      toast({
        title: "Success",
        description: "Product added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, products: false }))
    }
  }

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setLoading((prev) => ({ ...prev, products: true }))
    try {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...updates, updatedAt: new Date().toISOString() } : product,
        ),
      )
      toast({
        title: "Success",
        description: "Product updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, products: false }))
    }
  }

  const deleteProduct = async (id: string) => {
    setLoading((prev) => ({ ...prev, products: true }))
    try {
      setProducts((prev) => prev.filter((product) => product.id !== id))
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, products: false }))
    }
  }

  // Order functions
  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    setLoading((prev) => ({ ...prev, orders: true }))
    try {
      setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)))
      toast({
        title: "Success",
        description: `Order status updated to ${status}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, orders: false }))
    }
  }

  const updatePaymentStatus = async (id: string, status: Order["paymentStatus"]) => {
    setLoading((prev) => ({ ...prev, orders: true }))
    try {
      setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, paymentStatus: status } : order)))
      toast({
        title: "Success",
        description: `Payment status updated to ${status}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update payment status",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, orders: false }))
    }
  }

  // Customer functions
  const updateCustomerStatus = async (id: string, status: Customer["status"]) => {
    setLoading((prev) => ({ ...prev, customers: true }))
    try {
      setCustomers((prev) => prev.map((customer) => (customer.id === id ? { ...customer, status } : customer)))
      toast({
        title: "Success",
        description: `Customer status updated to ${status}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update customer status",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, customers: false }))
    }
  }

  // Coupon functions
  const addCoupon = async (couponData: Omit<Coupon, "id" | "usedCount" | "createdAt">) => {
    setLoading((prev) => ({ ...prev, coupons: true }))
    try {
      const newCoupon: Coupon = {
        ...couponData,
        id: `COUP-${Date.now()}`,
        usedCount: 0,
        createdAt: new Date().toISOString(),
      }
      setCoupons((prev) => [...prev, newCoupon])
      toast({
        title: "Success",
        description: "Coupon added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add coupon",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, coupons: false }))
    }
  }

  const updateCoupon = async (id: string, updates: Partial<Coupon>) => {
    setLoading((prev) => ({ ...prev, coupons: true }))
    try {
      setCoupons((prev) => prev.map((coupon) => (coupon.id === id ? { ...coupon, ...updates } : coupon)))
      toast({
        title: "Success",
        description: "Coupon updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update coupon",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, coupons: false }))
    }
  }

  const deleteCoupon = async (id: string) => {
    setLoading((prev) => ({ ...prev, coupons: true }))
    try {
      setCoupons((prev) => prev.filter((coupon) => coupon.id !== id))
      toast({
        title: "Success",
        description: "Coupon deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete coupon",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, coupons: false }))
    }
  }

  // Review functions
  const updateReviewStatus = async (id: string, status: Review["status"]) => {
    setLoading((prev) => ({ ...prev, reviews: true }))
    try {
      setReviews((prev) => prev.map((review) => (review.id === id ? { ...review, status } : review)))
      toast({
        title: "Success",
        description: `Review ${status} successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update review status",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, reviews: false }))
    }
  }

  const deleteReview = async (id: string) => {
    setLoading((prev) => ({ ...prev, reviews: true }))
    try {
      setReviews((prev) => prev.filter((review) => review.id !== id))
      toast({
        title: "Success",
        description: "Review deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, reviews: false }))
    }
  }

  // Admin user functions
  const addAdminUser = async (userData: Omit<AdminUser, "id" | "createdAt">) => {
    setLoading((prev) => ({ ...prev, adminUsers: true }))
    try {
      const newUser: AdminUser = {
        ...userData,
        id: `ADMIN-${Date.now()}`,
        createdAt: new Date().toISOString(),
      }
      setAdminUsers((prev) => [...prev, newUser])
      toast({
        title: "Success",
        description: "Admin user added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add admin user",
        variant: "destructive",
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
      toast({
        title: "Error",
        description: "Failed to update admin user",
        variant: "destructive",
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
      toast({
        title: "Error",
        description: "Failed to delete admin user",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, adminUsers: false }))
    }
  }

  // Add these functions after the existing ones
  // CMS functions
  const addStaticPage = async (pageData: Omit<StaticPage, "id" | "lastModified">) => {
    try {
      const newPage: StaticPage = {
        ...pageData,
        id: `page-${Date.now()}`,
        lastModified: new Date().toISOString().split("T")[0],
      }
      setStaticPages((prev) => [...prev, newPage])
      toast({
        title: "Success",
        description: "Page added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add page",
        variant: "destructive",
      })
    }
  }

  const updateStaticPage = async (id: string, updates: Partial<StaticPage>) => {
    try {
      setStaticPages((prev) =>
        prev.map((page) =>
          page.id === id ? { ...page, ...updates, lastModified: new Date().toISOString().split("T")[0] } : page,
        ),
      )
      toast({
        title: "Success",
        description: "Page updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update page",
        variant: "destructive",
      })
    }
  }

  const deleteStaticPage = async (id: string) => {
    try {
      setStaticPages((prev) => prev.filter((page) => page.id !== id))
      toast({
        title: "Success",
        description: "Page deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete page",
        variant: "destructive",
      })
    }
  }

  const addHomepageBanner = async (bannerData: Omit<HomepageBanner, "id" | "lastModified">) => {
    try {
      const newBanner: HomepageBanner = {
        ...bannerData,
        id: `banner-${Date.now()}`,
        lastModified: new Date().toISOString().split("T")[0],
      }
      setHomepageBanners((prev) => [...prev, newBanner])
      toast({
        title: "Success",
        description: "Banner added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add banner",
        variant: "destructive",
      })
    }
  }

  const updateHomepageBanner = async (id: string, updates: Partial<HomepageBanner>) => {
    try {
      setHomepageBanners((prev) =>
        prev.map((banner) =>
          banner.id === id ? { ...banner, ...updates, lastModified: new Date().toISOString().split("T")[0] } : banner,
        ),
      )
      toast({
        title: "Success",
        description: "Banner updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update banner",
        variant: "destructive",
      })
    }
  }

  const deleteHomepageBanner = async (id: string) => {
    try {
      setHomepageBanners((prev) => prev.filter((banner) => banner.id !== id))
      toast({
        title: "Success",
        description: "Banner deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete banner",
        variant: "destructive",
      })
    }
  }

  // Calculate dashboard stats
  const dashboardStats = {
    totalSales: orders.reduce((sum, order) => sum + order.total, 0),
    totalOrders: orders.length,
    totalCustomers: customers.length,
    pendingOrders: orders.filter((order) => order.status === "pending").length,
  }

  const value: AdminContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    updatePaymentStatus,
    customers,
    updateCustomerStatus,
    coupons,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    reviews,
    updateReviewStatus,
    deleteReview,
    adminUsers,
    addAdminUser,
    updateAdminUser,
    deleteAdminUser,
    dashboardStats,
    loading,
    // Add these to the value object
    staticPages,
    homepageBanners,
    addStaticPage,
    updateStaticPage,
    deleteStaticPage,
    addHomepageBanner,
    updateHomepageBanner,
    deleteHomepageBanner,
    cmsContent: {
      staticPages,
      homepageBanners,
    },
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
