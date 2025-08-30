// import { type NextRequest, NextResponse } from "next/server"
// import { sendOrderConfirmationEmail, type OrderEmailData } from "@/lib/email"
// import { sendOrderConfirmationWhatsApp, type WhatsAppOrderData } from "@/lib/whatsapp"

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const {
//       customerName,
//       customerEmail,
//       customerPhone,
//       orderId,
//       orderDate,
//       items,
//       subtotal,
//       shippingCost,
//       discountAmount,
//       totalAmount,
//       shippingAddress,
//       paymentMethod,
//       estimatedDelivery,
//     } = body

//     // Validate required fields
//     if (!customerEmail || !customerPhone || !orderId) {
//       return NextResponse.json(
//         { error: "Missing required fields: customerEmail, customerPhone, or orderId" },
//         { status: 400 },
//       )
//     }

//     const results = {
//       email: null as any,
//       whatsapp: null as any,
//       errors: [] as string[],
//     }

//     // Send email notification
//     try {
//       const emailData: OrderEmailData = {
//         customerName,
//         customerEmail,
//         orderId,
//         orderDate,
//         items,
//         subtotal,
//         shippingCost,
//         discountAmount,
//         totalAmount,
//         shippingAddress,
//         paymentMethod,
//         estimatedDelivery,
//       }

//       results.email = await sendOrderConfirmationEmail(emailData)
//     } catch (error: any) {
//       console.error("Email notification failed:", error)
//       results.errors.push(`Email: ${error.message}`)
//     }

//     // Send WhatsApp notification
//     try {
//       const whatsappData: WhatsAppOrderData = {
//         customerName,
//         customerPhone,
//         orderId,
//         orderDate,
//         totalAmount,
//         itemCount: items.length,
//         paymentMethod,
//         estimatedDelivery,
//         trackingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/track?order=${orderId}`,
//       }

//       results.whatsapp = await sendOrderConfirmationWhatsApp(whatsappData)
//     } catch (error: any) {
//       console.error("WhatsApp notification failed:", error)
//       results.errors.push(`WhatsApp: ${error.message}`)
//     }

//     // Return response based on results
//     if (results.errors.length === 0) {
//       return NextResponse.json({
//         success: true,
//         message: "Notifications sent successfully",
//         results,
//       })
//     } else if (results.email || results.whatsapp) {
//       return NextResponse.json(
//         {
//           success: true,
//           message: "Partial success - some notifications failed",
//           results,
//         },
//         { status: 207 },
//       ) // Multi-status
//     } else {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "All notifications failed",
//           results,
//         },
//         { status: 500 },
//       )
//     }
//   } catch (error: any) {
//     console.error("Notification API error:", error)
//     return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
//   }
// }
