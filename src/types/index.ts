import { CustomSize } from "@/contexts/cart-context"
import type React from "react"
// ============================================================================
// COMPLETE TYPE DEFINITIONS FOR DRESS DEXTERITY E-COMMERCE PROJECT
// ============================================================================

// ============================================================================
// PRODUCT TYPES
// ============================================================================

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
  imageSrc?:string
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

export interface ProductVariant {
  id: string
  productId: string
  color: string
  size: string
  sku: string
  price: number
  stock: number
  image?: string
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  isActive: boolean
  sortOrder: number
}

export interface ProductFilter {
  categories: string[]
  colors: string[]
  sizes: string[]
  priceRange: {
    min: number
    max: number
  }
  materials: string[]
  inStock: boolean
}

export interface ProductSort {
  field: "name" | "price" | "createdAt" | "popularity"
  direction: "asc" | "desc"
}

// ============================================================================
// ORDER TYPES
// ============================================================================

export interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
  }
  shippingAdd: {
    address: string
    city: string
    state: string
    pincode: string
  }
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  status: "pending" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "pending" | "failed"
  date: string
  tracking_number?: string
}
 
export interface OrderItem {
  id: string
  sku:string
  productId: string
  name: string
  price: number
  quantity: number
  color?: string
  size?: string
  image: string
  custom_size?: CustomSize
}

export interface OrderStatus {
  status: Order["status"]
  timestamp: string
  note?: string
}

// ============================================================================
// CART TYPES
// ============================================================================

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  color?: string
  size?: string
  image: string
  maxQuantity: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  couponCode?: string
}

export interface CartContextType {
  cart: Cart
  addToCart: (item: Omit<CartItem, "id">) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string) => Promise<boolean>
  removeCoupon: () => void
  isLoading: boolean
}

// ============================================================================
// CUSTOMER TYPES
// ============================================================================

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

export interface CustomerProfile {
  id: string
  name: string
  email: string
  phone?: string
  dateOfBirth?: string
  gender?: "male" | "female" | "other"
  addresses: Address[]
  preferences: {
    newsletter: boolean
    smsUpdates: boolean
    categories: string[]
  }
}

export interface Address {
  id: string
  type: "home" | "work" | "other"
  name: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

// ============================================================================
// COUPON TYPES
// ============================================================================

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

export interface CouponValidation {
  isValid: boolean
  discount: number
  message: string
}

// ============================================================================
// REVIEW TYPES
// ============================================================================

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

export interface ReviewSummary {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}

// ============================================================================
// ADMIN TYPES
// ============================================================================

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

export interface DashboardStats {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  pendingOrders: number
  lowStockProducts: number
  recentOrders: Order[]
  topProducts: Array<{
    id: string
    name: string
    sales: number
    revenue: number
  }>
}

// ============================================================================
// CMS TYPES
// ============================================================================

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
  image_url: string
  buttonText: string
  buttonLink: string
  position: number
  is_active: boolean
  backgroundColor: string
  textColor: string
  buttonColor: string
  alignment: "left" | "center" | "right"
  lastModified: string
}

export interface CMSContent {
  staticPages: StaticPage[]
  homepageBanners: HomepageBanner[]
}

// ============================================================================
// UI COMPONENT TYPES
// ============================================================================

export interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export interface CardProps {
  className?: string
  children: React.ReactNode
}

export interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  disabled?: boolean
  required?: boolean
}

export interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  disabled?: boolean
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

export interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

export interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: boolean
}

export interface BadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline"
  children: React.ReactNode
  className?: string
}

export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export interface RatingProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  readonly?: boolean
  onChange?: (value: number) => void
}

export interface QuantitySelectorProps {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  disabled?: boolean
}

export interface ColorSelectorProps {
  colors: string[]
  selectedColor?: string
  onColorSelect: (color: string) => void
  size?: "sm" | "md" | "lg"
}

export interface SizeSelectorProps {
  sizes: string[]
  selectedSize?: string
  onSizeSelect: (size: string) => void
  disabled?: boolean
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface FormField {
  name: string
  label: string
  type: "text" | "email" | "password" | "number" | "textarea" | "select" | "checkbox" | "radio"
  placeholder?: string
  required?: boolean
  validation?: {
    min?: number
    max?: number
    pattern?: RegExp
    custom?: (value: unknown) => string | null
  }
  options?: Array<{ value: string; label: string }>
}

export interface FormData {
  [key: string]: unknown
}

export interface FormErrors {
  [key: string]: string
}

export interface FormState {
  data: FormData
  errors: FormErrors
  isSubmitting: boolean
  isValid: boolean
}

// ============================================================================
// SEARCH TYPES
// ============================================================================

export interface SearchFilters {
  query?: string
  category?: string
  priceRange?: {
    min: number
    max: number
  }
  colors?: string[]
  sizes?: string[]
  inStock?: boolean
  sortBy?: "relevance" | "price-low" | "price-high" | "newest" | "rating"
}

export interface SearchResult {
  products: Product[]
  totalCount: number
  currentPage: number
  totalPages: number
  filters: {
    categories: Array<{ name: string; count: number }>
    colors: Array<{ name: string; count: number }>
    sizes: Array<{ name: string; count: number }>
    priceRange: { min: number; max: number }
  }
}

// ============================================================================
// WISHLIST TYPES
// ============================================================================

export interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  addedAt: string
}

export interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (product: Omit<WishlistItem, "id" | "addedAt">) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

// ============================================================================
// PAYMENT TYPES
// ============================================================================

export interface PaymentMethod {
  id: string
  type: "card" | "upi" | "netbanking" | "wallet" | "cod"
  name: string
  icon: string
  isActive: boolean
}

export interface PaymentDetails {
  method: PaymentMethod["type"]
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  upiId?: string
  bankCode?: string
  walletProvider?: string
}

export interface PaymentResponse {
  success: boolean
  transactionId?: string
  message: string
  redirectUrl?: string
}

// ============================================================================
// SHIPPING TYPES
// ============================================================================

export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: number
  isActive: boolean
}

export interface ShippingAddress {
  name: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  landmark?: string
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface AnalyticsEvent {
  event: string
  properties: Record<string, unknown>
  timestamp: string
  userId?: string
  sessionId: string
}

export interface PageView {
  page: string
  referrer?: string
  timestamp: string
  userId?: string
  sessionId: string
}

export interface ConversionEvent {
  type: "add_to_cart" | "purchase" | "signup" | "newsletter_signup"
  value?: number
  productId?: string
  timestamp: string
  userId?: string
}

// ============================================================================
// API TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T = unknown> {
  data: T[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    pageSize: number
  }
}

export interface ApiError {
  message: string
  code?: string
  statusCode?: number
  details?: unknown
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Nullable<T> = T | null

export type ValueOf<T> = T[keyof T]

export type ArrayElement<T> = T extends (infer U)[] ? U : never

// ============================================================================
// CONTEXT TYPES
// ============================================================================

export interface AdminContextType {
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

  // CMS
  staticPages: StaticPage[]
  homepageBanners: HomepageBanner[]
  addStaticPage: (page: Omit<StaticPage, "id" | "lastModified">) => Promise<void>
  updateStaticPage: (id: string, updates: Partial<StaticPage>) => Promise<void>
  deleteStaticPage: (id: string) => Promise<void>
  addHomepageBanner: (banner: Omit<HomepageBanner, "id" | "lastModified">) => Promise<void>
  updateHomepageBanner: (id: string, updates: Partial<HomepageBanner>) => Promise<void>
  deleteHomepageBanner: (id: string) => Promise<void>
  cmsContent: CMSContent

  // Dashboard Stats
  dashboardStats: DashboardStats

  // Loading states
  loading: {
    products: boolean
    orders: boolean
    customers: boolean
    coupons: boolean
    reviews: boolean
    adminUsers: boolean
  }
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
  showQuickView?: boolean
  className?: string
}

export interface ProductGridProps {
  products: Product[]
  loading?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
}

export interface FilterSidebarProps {
  filters: ProductFilter
  onFiltersChange: (filters: ProductFilter) => void
  categories: ProductCategory[]
  priceRange: { min: number; max: number }
}

export interface SortDropdownProps {
  value: ProductSort
  onChange: (sort: ProductSort) => void
  options: Array<{
    label: string
    value: ProductSort
  }>
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  showPrevNext?: boolean
}

export interface BreadcrumbProps {
  items: Array<{
    label: string
    href?: string
  }>
  separator?: React.ReactNode
}

export interface TestimonialCardProps {
  testimonial: {
    id: string
    name: string
    rating: number
    comment: string
    image?: string
    location?: string
  }
}

export interface ContactFormProps {
  onSubmit: (data: {
    name: string
    email: string
    subject: string
    message: string
  }) => Promise<void>
}

// ============================================================================
// HOOK TYPES
// ============================================================================

export interface UseCartReturn {
  cart: Cart
  addToCart: (item: Omit<CartItem, "id">) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  isLoading: boolean
}

export interface UseWishlistReturn {
  items: WishlistItem[]
  addToWishlist: (product: Omit<WishlistItem, "id" | "addedAt">) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export interface UseFormReturn<T = FormData> {
  data: T
  errors: FormErrors
  isSubmitting: boolean
  isValid: boolean
  setValue: (name: keyof T, value: unknown) => void
  setError: (name: keyof T, error: string) => void
  clearErrors: () => void
  handleSubmit: (onSubmit: (data: T) => Promise<void>) => (e: React.FormEvent) => Promise<void>
  reset: () => void
}

export interface UseMobileMenuReturn {
  isOpen: boolean
  toggle: () => void
  close: () => void
  open: () => void
}

// ============================================================================
// THEME TYPES
// ============================================================================

export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    border: string
    destructive: string
  }
  fonts: {
    sans: string[]
    serif: string[]
    mono: string[]
  }
  spacing: Record<string, string>
  borderRadius: Record<string, string>
}

export type ThemeMode = "light" | "dark" | "system"

// ============================================================================
// VALIDATION TYPES
// ============================================================================

export interface ValidationRule {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  custom?: (value: unknown) => string | null
}

export interface ValidationSchema {
  [key: string]: ValidationRule
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

// ============================================================================
// STORAGE TYPES
// ============================================================================

export interface StorageItem<T = unknown> {
  value: T
  timestamp: number
  expiry?: number
}

export interface StorageOptions {
  expiry?: number
  serialize?: boolean
}

// ============================================================================
// EVENT TYPES
// ============================================================================

export interface CustomEvent<T = unknown> {
  type: string
  payload: T
  timestamp: number
}

export interface ProductEvent {
  type: "view" | "add_to_cart" | "add_to_wishlist" | "purchase"
  productId: string
  userId?: string
  sessionId: string
  timestamp: number
}

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================

//  export type {
//     Re-export all types for easy importingProduct,
//     ProductVariant,
//     ProductCategory,
//     Order,
//    OrderItem,
//    CartItem,
//    Cart,
//    Customer,
//    CustomerProfile,
//    Address,
//    Coupon,
//    Review,
//    AdminUser,
//    StaticPage,
//    HomepageBanner,
//    CMSContent,
//    DashboardStats,
//    SearchFilters,
//    SearchResult,
//    WishlistItem,
//    PaymentMethod,
//    PaymentDetails,
//    ShippingMethod,
//    ShippingAddress,
//    ApiResponse,
//     PaginatedResponse,
//     ApiError,
//    }
