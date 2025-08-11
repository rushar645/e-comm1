"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ForgotPasswordFormData {
  emailOrPhone: string
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    emailOrPhone: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.emailOrPhone.trim()) {
      setError("Email or phone number is required")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Password reset requested for:", formData.emailOrPhone)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Password reset error:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex">
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md space-y-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-[#3A2723]">Check your email</h1>
              <p className="text-gray-600">We&apos;ve sent a password reset link to {formData.emailOrPhone}</p>
            </div>
            <Link href="/auth/login" className="inline-flex items-center text-[#3A2723] hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
          </div>
        </div>
        <div className="flex-1 relative bg-gradient-to-br from-gray-300 to-gray-400">
          <Image src="/images/auth-model.png" alt="Fashion Model" fill className="object-cover" priority />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-4">
            <Link href="/auth/login" className="inline-flex items-center text-gray-600 hover:text-[#3A2723]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
            <h1 className="text-4xl font-bold text-[#3A2723]">Forgot Password</h1>
            <p className="text-gray-600">
              Enter your email or phone number and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Email Address/Phone Number"
                value={formData.emailOrPhone}
                onChange={(e) => {
                  setFormData({ emailOrPhone: e.target.value })
                  setError("")
                }}
                className="h-14 text-base rounded-2xl border-gray-300 focus:border-[#3A2723] focus:ring-[#3A2723]"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-base font-semibold rounded-2xl bg-[#3A2723] hover:bg-[#2A1F1C] text-white"
            >
              {isLoading ? "SENDING..." : "SEND RESET LINK"}
            </Button>
          </form>
        </div>
      </div>
      <div className="flex-1 relative bg-gradient-to-br from-gray-300 to-gray-400">
        <Image src="/images/auth-model.png" alt="Fashion Model" fill className="object-cover" priority />
      </div>
    </div>
  )
}
