"use client"

import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

interface RatingProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  readOnly?: boolean
  onChange?: (value: number) => void
  className?: string
}

export function Rating({ value, max = 5, size = "md", readOnly = true, onChange, className }: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)

  const handleClick = (index: number) => {
    if (!readOnly && onChange) {
      onChange(index + 1)
    }
  }

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverValue(index + 1)
    }
  }

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(null)
    }
  }

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className={cn("flex", className)} onMouseLeave={handleMouseLeave}>
      {[...Array(max)].map((_, index) => {
        const isFilled = hoverValue !== null ? index < hoverValue : index < value

        return (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              isFilled ? "fill-current text-yellow-400" : "text-gray-300",
              !readOnly && "cursor-pointer",
            )}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          />
        )
      })}
    </div>
  )
}
