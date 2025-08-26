import twilio from "twilio"

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export interface WhatsAppOrderData {
  customerName: string
  customerPhone: string
  orderId: string
  orderDate: string
  totalAmount: number
  itemCount: number
  paymentMethod: string
  estimatedDelivery: string
  trackingUrl: string
}

export async function sendOrderConfirmationWhatsApp(data: WhatsAppOrderData) {
  try {
    // Format phone number to international format
    const formattedPhone = formatPhoneNumber(data.customerPhone)

    const message = generateOrderWhatsAppMessage(data)

    const result = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Your Twilio WhatsApp number
      to: `whatsapp:${formattedPhone}`,
      body: message,
    })

    console.log("WhatsApp message sent:", result.sid)
    return result
  } catch (error) {
    console.error("Error sending WhatsApp message:", error)
    throw error
  }
}

function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "")

  // If it's a 10-digit Indian number, add country code
  if (cleaned.length === 10) {
    return `+91${cleaned}`
  }

  // If it already has country code
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+${cleaned}`
  }

  // If it starts with +, return as is
  if (phone.startsWith("+")) {
    return phone
  }

  // Default: assume it's Indian number
  return `+91${cleaned}`
}

function generateOrderWhatsAppMessage(data: WhatsAppOrderData): string {
  return `🎉 *Order Confirmed!*

Hi ${data.customerName}! 👋

Your order has been successfully placed with Dress Dexterity.

📋 *Order Details:*
• Order ID: #${data.orderId}
• Date: ${data.orderDate}
• Items: ${data.itemCount} item${data.itemCount > 1 ? "s" : ""}
• Total: ₹${data.totalAmount.toFixed(2)}
• Payment: ${data.paymentMethod}

📦 *Delivery Information:*
• Estimated Delivery: ${data.estimatedDelivery}
• Track your order: ${data.trackingUrl}

📞 *Need Help?*
Contact us at +91 98765 43210 or support@dressdexterity.com

Thank you for choosing Dress Dexterity! ✨

---
*This is an automated message. Please do not reply to this number.*`
}

export async function sendOrderStatusUpdateWhatsApp(
  customerPhone: string,
  customerName: string,
  orderId: string,
  status: string,
  trackingUrl: string,
) {
  try {
    const formattedPhone = formatPhoneNumber(customerPhone)

    let statusMessage = ""
    let emoji = ""

    switch (status.toLowerCase()) {
      case "confirmed":
        emoji = "✅"
        statusMessage = "Your order has been confirmed and is being prepared."
        break
      case "processing":
        emoji = "⚡"
        statusMessage = "Your order is being processed and will be shipped soon."
        break
      case "shipped":
        emoji = "🚚"
        statusMessage = "Great news! Your order has been shipped and is on its way."
        break
      case "out_for_delivery":
        emoji = "🏃‍♂️"
        statusMessage = "Your order is out for delivery and will reach you today."
        break
      case "delivered":
        emoji = "🎉"
        statusMessage = "Your order has been delivered successfully. Enjoy your purchase!"
        break
      default:
        emoji = "📦"
        statusMessage = `Your order status has been updated to: ${status}`
    }

    const message = `${emoji} *Order Update*

Hi ${customerName}!

Order #${orderId} - ${statusMessage}

Track your order: ${trackingUrl}

Questions? Contact us at +91 98765 43210

Thank you for choosing Dress Dexterity! ✨`

    const result = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedPhone}`,
      body: message,
    })

    console.log("WhatsApp status update sent:", result.sid)
    return result
  } catch (error) {
    console.error("Error sending WhatsApp status update:", error)
    throw error
  }
}
