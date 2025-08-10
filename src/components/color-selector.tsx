"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

function CustomColorPicker({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean
  onClose: () => void
  onSelect: (color: string) => void
}) {
  if (!isOpen) return null

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-md">
      <input
        type="text"
        placeholder="Enter color name"
        className="border p-1 rounded w-40 text-sm"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value.trim()) {
            onSelect(e.currentTarget.value.trim().toLowerCase())
          }
        }}
      />
      <Button
        variant="ghost"
        size="sm"
        className="ml-3 text-[#8B4513]"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  )
}

interface ColorSelectorProps {
  colors?: string[]
  selectedColor?: string | null
  onChange?: (color: string) => void
}

export function ColorSelector({
  colors = ["red", "blue", "black", "white", "green"],
  selectedColor = null,
  onChange,
}: ColorSelectorProps) {
  const [internalSelectedColor, setInternalSelectedColor] = useState<string | null>(selectedColor)
  const [isCustomPickerOpen, setIsCustomPickerOpen] = useState(false)

  const handleColorSelect = (color: string) => {
    if (color === "Other") {
      setIsCustomPickerOpen(true)
      return
    }

    if (onChange) {
      onChange(color)
    } else {
      setInternalSelectedColor(color)
    }
  }

  const handleCustomColor = (color: string) => {
    if (onChange) {
      onChange(color)
    } else {
      setInternalSelectedColor(color)
    }
    setIsCustomPickerOpen(false)
  }

  const currentSelectedColor = selectedColor !== undefined ? selectedColor : internalSelectedColor
  const allColors = [...colors, "Other"]

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {allColors.map((color) =>
          color === "Other" ? (
            <Button
              key="other"
              type="button"
              variant="outline"
              className={`h-10 px-4 rounded-md ${
                currentSelectedColor && !colors.includes(currentSelectedColor)
                  ? "bg-[#3A2723] text-white border-[#3A2723]"
                  : "border-gray-300 text-[#3A3A3A] hover:bg-gray-100"
              }`}
              onClick={() => handleColorSelect("Other")}
            >
              Other
            </Button>
          ) : (
            <button
              key={color}
              type="button"
              className={`h-10 w-10 rounded-full border-2 ${
                currentSelectedColor === color ? "border-[#3A2723]" : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
              title={color} // tooltip on hover
            />
          )
        )}
      </div>

      <CustomColorPicker
        isOpen={isCustomPickerOpen}
        onClose={() => setIsCustomPickerOpen(false)}
        onSelect={handleCustomColor}
      />
    </>
  )
}
