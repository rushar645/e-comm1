export interface NotificationData {
  customerName: string
  customerEmail: string
  customerPhone: string
  orderId: string
  orderDate: string
  items: Array<{
    name: string
    quantity: number
    price: number
    color?: string
    size?: string
    image: string
  }>
  subtotal: number
  shippingCost: number
  discountAmount: number
  totalAmount: number
  shippingAddress: {
    fullName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    zipCode: string
    phone: string
  }
  paymentMethod: string
  estimatedDelivery: string
}

export async function sendOrderNotifications(data: NotificationData) {
  try {
    const response = await fetch("/api/notifications/order-confirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Failed to send notifications")
    }

    return result
  } catch (error) {
    console.error("Error sending order notifications:", error)
    throw error
  }
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `DD${timestamp.slice(-6)}${random}`
}

export function calculateEstimatedDelivery(days = 7): string {
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + days)

  return deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatOrderDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
