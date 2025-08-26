import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface OrderEmailData {
  customerName: string
  customerEmail: string
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

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  try {
    const { data: emailResult, error } = await resend.emails.send({
      from: "Dress Dexterity <orders@dressdexterity.com>",
      to: [data.customerEmail],
      subject: `Order Confirmation - #${data.orderId}`,
      html: generateOrderEmailHTML(data),
    })

    if (error) {
      console.error("Email sending error:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log("Order confirmation email sent:", emailResult)
    return emailResult
  } catch (error) {
    console.error("Error sending order confirmation email:", error)
    throw error
  }
}

function generateOrderEmailHTML(data: OrderEmailData): string {
  const itemsHTML = data.items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 16px 0; display: flex; align-items: center;">
        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 12px;">
        <div>
          <h4 style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">${item.name}</h4>
          ${item.color ? `<p style="margin: 4px 0 0 0; font-size: 12px; color: #6b7280;">Color: ${item.color}</p>` : ""}
          ${item.size ? `<p style="margin: 2px 0 0 0; font-size: 12px; color: #6b7280;">Size: ${item.size}</p>` : ""}
        </div>
      </td>
      <td style="padding: 16px 0; text-align: center; font-size: 14px; color: #374151;">
        ${item.quantity}
      </td>
      <td style="padding: 16px 0; text-align: right; font-size: 14px; font-weight: 600; color: #111827;">
        ₹${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `,
    )
    .join("")

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Order Confirmed!</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Thank you for your purchase, ${data.customerName}</p>
      </div>

      <!-- Order Details -->
      <div style="background: #f9fafb; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
        <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #111827;">Order Details</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div>
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Order ID</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 600; color: #111827;">#${data.orderId}</p>
          </div>
          <div>
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Order Date</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 600; color: #111827;">${data.orderDate}</p>
          </div>
          <div>
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Payment Method</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 600; color: #111827;">${data.paymentMethod}</p>
          </div>
          <div>
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Estimated Delivery</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 600; color: #10b981;">${data.estimatedDelivery}</p>
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
        <div style="background: #f3f4f6; padding: 16px; border-bottom: 1px solid #e5e7eb;">
          <h3 style="margin: 0; font-size: 18px; color: #111827;">Order Items</h3>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f9fafb;">
              <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Item</th>
              <th style="padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Qty</th>
              <th style="padding: 12px 16px; text-align: right; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>
      </div>

      <!-- Order Summary -->
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 24px; padding: 20px;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #111827;">Order Summary</h3>
        <div style="space-y: 8px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #6b7280;">Subtotal</span>
            <span style="font-weight: 600; color: #111827;">₹${data.subtotal.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #6b7280;">Shipping</span>
            <span style="font-weight: 600; color: #111827;">${data.shippingCost === 0 ? "Free" : `₹${data.shippingCost.toFixed(2)}`}</span>
          </div>
          ${
            data.discountAmount > 0
              ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #10b981;">Discount</span>
            <span style="font-weight: 600; color: #10b981;">-₹${data.discountAmount.toFixed(2)}</span>
          </div>
          `
              : ""
          }
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 12px 0;">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 18px; font-weight: 700; color: #111827;">Total</span>
            <span style="font-size: 18px; font-weight: 700; color: #111827;">₹${data.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <!-- Shipping Address -->
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 24px; padding: 20px;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #111827;">Shipping Address</h3>
        <div style="color: #374151; line-height: 1.6;">
          <p style="margin: 0; font-weight: 600;">${data.shippingAddress.fullName}</p>
          <p style="margin: 4px 0 0 0;">${data.shippingAddress.addressLine1}</p>
          ${data.shippingAddress.addressLine2 ? `<p style="margin: 2px 0 0 0;">${data.shippingAddress.addressLine2}</p>` : ""}
          <p style="margin: 2px 0 0 0;">${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.zipCode}</p>
          <p style="margin: 4px 0 0 0; font-weight: 600;">Phone: ${data.shippingAddress.phone}</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 20px; background: #f9fafb; border-radius: 12px; margin-top: 30px;">
        <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #111827;">Need Help?</p>
        <p style="margin: 0 0 16px 0; color: #6b7280;">Contact our customer support team</p>
        <div style="margin-bottom: 16px;">
          <a href="mailto:support@dressdexterity.com" style="color: #667eea; text-decoration: none; margin-right: 16px;">support@dressdexterity.com</a>
          <a href="tel:+919876543210" style="color: #667eea; text-decoration: none;">+91 98765 43210</a>
        </div>
        <p style="margin: 0; font-size: 12px; color: #9ca3af;">
          © 2024 Dress Dexterity. All rights reserved.
        </p>
      </div>

    </body>
    </html>
  `
}
