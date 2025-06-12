"use client"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface QuantitySelectorProps {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  className?: string
}

export function QuantitySelector({ value, min = 1, max = 99, onChange, className }: QuantitySelectorProps) {
  const increment = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const decrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  return (
    <div className={cn("flex items-center border border-[#D0B090] rounded-md overflow-hidden", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none border-r border-[#D0B090] text-[#3A3A3A]"
        onClick={decrement}
        disabled={value <= min}
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">Decrease quantity</span>
      </Button>

      <div className="w-10 text-center text-sm font-medium text-[#3A3A3A]">{value}</div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none border-l border-[#D0B090] text-[#3A3A3A]"
        onClick={increment}
        disabled={value >= max}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  )
}
