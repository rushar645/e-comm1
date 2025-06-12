"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

interface ToastProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  variant: "default" | "success" | "error" | "warning" | "info"
  duration?: number
  className?: string
}

export function Toast({
  open,
  onClose,
  title,
  description,
  variant = "default",
  duration = 5000,
  className,
}: ToastProps) {
  const timerRef = React.useRef<NodeJS.Timeout>(null)

  // Set up auto-dismiss timer
  React.useEffect(() => {
    if (open && duration > 0) {
      timerRef.current = setTimeout(() => {
        onClose()
      }, duration)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [open, duration, onClose])

  // Variant classes
  const variantClasses = {
    default: "bg-white border-[#D0B090]",
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200",
  }

  // Text color classes
  const textColorClasses = {
    default: "text-[#3A3A3A]",
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-yellow-800",
    info: "text-blue-800",
  }

  if (!open) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div
        className={cn(
          "rounded-lg border shadow-md p-4 transition-all duration-300",
          variantClasses[variant],
          className,
        )}
      >
        <div className="flex items-start">
          <div className="flex-1 mr-2">
            {title && <h3 className={cn("font-medium", textColorClasses[variant])}>{title}</h3>}
            {description && <p className={cn("text-sm mt-1", textColorClasses[variant])}>{description}</p>}
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-black/5" aria-label="Close toast">
            <X className="h-4 w-4 text-[#5A5A5A]" />
          </button>
        </div>
      </div>
    </div>
  )
}
