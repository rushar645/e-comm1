"use client"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

interface ColorOption {
  name: string
  value: string
}

interface ColorSelectorProps {
  colors: ColorOption[]
  selectedColor: string
  onChange: (color: string) => void
  className?: string
}

export function ColorSelector({ colors, selectedColor, onChange, className }: ColorSelectorProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {colors.map((color) => (
        <button
          key={color.value}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center border",
            selectedColor === color.value ? "border-[#8B4513] ring-2 ring-[#D0B090] ring-offset-2" : "border-gray-300",
          )}
          style={{ backgroundColor: color.value }}
          onClick={() => onChange(color.value)}
          title={color.name}
          aria-label={`Select ${color.name} color`}
        >
          {selectedColor === color.value && (
            <Check className={cn("h-4 w-4", isLightColor(color.value) ? "text-black" : "text-white")} />
          )}
        </button>
      ))}
    </div>
  )
}

// Helper function to determine if a color is light or dark
function isLightColor(color: string): boolean {
  // For hex colors
  if (color.startsWith("#")) {
    const hex = color.substring(1)
    const rgb = Number.parseInt(hex, 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128
  }

  // Default to dark text
  return false
}
