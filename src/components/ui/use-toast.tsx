"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Link from "next/link"

interface ToastProps {
  title: string
  description?: string
  duration?: number
  variant?: "default" | "success" | "error" | "warning"
  link?:string
}

interface ToastState extends ToastProps {
  id: string
  visible: boolean
}

// Create a simple toast system
const toasts: ToastState[] = []
let listeners: ((toasts: ToastState[]) => void)[] = []

function notify(listeners: Function[]) {
  listeners.forEach((listener) => listener([...toasts]))
}

export function toast(props: ToastProps) {
  const id = Math.random().toString(36).substring(2, 9)
  const newToast: ToastState = {
    id,
    visible: true,
    duration: 3000,
    variant: "default",
    ...props,
  }

  toasts.push(newToast)
  notify(listeners)

  // Auto dismiss
  setTimeout(() => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts[index].visible = false
      notify(listeners)

      // Remove from array after animation
      setTimeout(() => {
        const index = toasts.findIndex((t) => t.id === id)
        if (index !== -1) {
          toasts.splice(index, 1)
          notify(listeners)
        }
      }, 300)
    }
  }, newToast.duration)

  return id
}

export function useToast() {
  const [toastList, setToastList] = useState<ToastState[]>([])

  useEffect(() => {
    const listener = (updatedToasts: ToastState[]) => {
      setToastList(updatedToasts)
    }

    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  const dismissToast = (id: string) => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts[index].visible = false
      notify(listeners)

      // Remove from array after animation
      setTimeout(() => {
        const index = toasts.findIndex((t) => t.id === id)
        if (index !== -1) {
          toasts.splice(index, 1)
          notify(listeners)
        }
      }, 300)
    }
  }

  return {
    toasts: toastList,
    toast,
    dismiss: dismissToast,
  }
}

export function Toaster() {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${
            toast.visible ? "animate-in slide-in-from-right" : "animate-out slide-out-to-right"
          } rounded-lg border shadow-lg p-4 ${
            toast.variant === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : toast.variant === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : toast.variant === "warning"
                  ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                  : "bg-white border-[#D0B090] text-[#3A3A3A]"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{toast.title}</h3>
              {toast.description && <p className="text-sm mt-1">{toast.description}</p>}
              {toast.link && <Link href={toast.link} className="text-md mt-2 underline">Go to Cart</Link>}
            </div>
            <button onClick={() => dismiss(toast.id)} className="text-[#5A5A5A] hover:text-[#3A3A3A] rounded-full p-1">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
