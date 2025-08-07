"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type ConfirmVariant = "default" | "warning"

interface ConfirmOptions {
  title?: string
  description?: string
  variant?: ConfirmVariant
  className?: string
}

let confirmCallback: ((result: boolean) => void) | null = null

export function ConfirmDialog({
  open,
  title,
  description,
  variant = "default",
  className,
  onClose,
}: {
  open: boolean
  title?: string
  description?: string
  variant?: ConfirmVariant
  className?: string
  onClose: () => void
}) {
  const handleConfirm = (result: boolean) => {
    if (confirmCallback) confirmCallback(result)
    onClose()
  }

  const variantClasses = {
    default: "bg-white border-[#D0B090]",
    warning: "bg-yellow-50 border-yellow-200",
  }

  const textColorClasses = {
    default: "text-[#3A3A3A]",
    warning: "text-yellow-800",
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
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleConfirm(true)}
                className="px-3 py-1 text-sm rounded-md bg-black text-white hover:bg-opacity-90"
              >
                Yes
              </button>
              <button
                onClick={() => handleConfirm(false)}
                className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
          <button onClick={() => handleConfirm(false)} className="rounded-full p-1 hover:bg-black/5" aria-label="Close">
            <X className="h-4 w-4 text-[#5A5A5A]" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ------------------- Hook and API -------------------

export function useConfirm() {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<ConfirmOptions>({ variant: "default" })

  const confirm = (opts: ConfirmOptions = {}) => {
    setOptions(opts)
    setOpen(true)
    return new Promise<boolean>((resolve) => {
      confirmCallback = resolve
    })
  }

  const handleClose = () => {
    setOpen(false)
    confirmCallback = null
  }

  const ConfirmElement = (
    <ConfirmDialog open={open} onClose={handleClose} {...options} />
  )

  return { confirm, ConfirmElement }
}
