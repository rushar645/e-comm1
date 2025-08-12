"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"

interface FormData {
  fullName: string
  email: string
  subject: string
  message: string
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would call a server action
      await new Promise((resolve) => setTimeout(resolve, 1050))
      setFormSuccess("Thank you for your message! We'll get back to you soon.")
      console.log(data)
      reset()
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {formSuccess && <div className="bg-green-50 p-4 rounded-md text-green-800 text-center mb-4">{formSuccess}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm text-[#3A3A3A] mb-1">
            Full Name*
          </label>
          <Input
            id="fullName"
            placeholder="Full Name"
            className="border-[#D0B090] focus:ring-[#8B4513]"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-[#3A3A3A] mb-1">
            Email Address*
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Email Address"
            className="border-[#D0B090] focus:ring-[#8B4513]"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm text-[#3A3A3A] mb-1">
          Subject*
        </label>
        <Input
          id="subject"
          placeholder="Subject"
          className="border-[#D0B090] focus:ring-[#8B4513]"
          {...register("subject", { required: "Subject is required" })}
        />
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-[#3A3A3A] mb-1">
          Message*
        </label>
        <Textarea
          id="message"
          placeholder="Message"
          className="border-[#D0B090] focus:ring-[#8B4513] min-h-[100px]"
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <div className="text-center">
        <Button
          type="submit"
          className="bg-[#3A2723] hover:bg-[#5A3A33] text-white rounded px-8 py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT"} <Send className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
