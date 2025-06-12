"use server"

import { z } from "zod"

// Form validation schema
const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
})

export async function submitContactForm(formData: FormData) {
  // In Next.js 15, we can use the unstable_after API for post-response processing
  // This is useful for things like sending emails after the response has been sent

  try {
    // Extract and validate form data
    const data = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    const validatedData = contactFormSchema.parse(data)

    // In a real application, you would send this data to your backend or email service
    console.log("Form submission:", validatedData)

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, message: "Thank you for your message! We'll get back to you soon." }
  } catch (error) {
    console.error("Form submission error:", error)
    return { success: false, message: "There was an error submitting your form. Please try again." }
  }
}
