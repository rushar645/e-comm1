"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CustomSizeForm, type CustomMeasurements } from "./custom-size-form"

interface SizeSelectorProps {
  sizes?: string[]
  selectedSize?: string | null
  onChange?: (size: string) => void
}

export function SizeSelector({
  sizes = ["XS", "S", "M", "L", "XL"],
  selectedSize = null,
  onChange,
}: SizeSelectorProps) {
  const [internalSelectedSize, setInternalSelectedSize] = useState<string | null>(selectedSize)
  const [isCustomFormOpen, setIsCustomFormOpen] = useState(false)
  const [customMeasurements, setCustomMeasurements] = useState<CustomMeasurements | null>(null)

  const handleSizeSelect = (size: string) => {
    if (size === "Customize") {
      setIsCustomFormOpen(true)
      return
    }

    if (onChange) {
      onChange(size)
    } else {
      setInternalSelectedSize(size)
    }
  }

  const handleCustomMeasurements = (measurements: CustomMeasurements) => {
    setCustomMeasurements(measurements)
    if (onChange) {
      onChange("Custom")
    } else {
      setInternalSelectedSize("Custom")
    }
  }

  // Use either the controlled or uncontrolled state
  const currentSelectedSize = selectedSize !== undefined ? selectedSize : internalSelectedSize

  // Include "Customize" option in the sizes array
  const allSizes = [...sizes, "Customize"]

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {allSizes.map((size) => (
          <Button
            key={size}
            type="button"
            variant="outline"
            className={`${size === "Customize" ? "px-4 h-10" : "h-10 w-10"} rounded-md p-0 ${
              currentSelectedSize === size || (currentSelectedSize === "Custom" && size === "Customize")
                ? "bg-[#3A2723] text-white border-[#3A2723]"
                : "border-gray-300 text-[#3A3A3A] hover:bg-gray-100"
            }`}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </Button>
        ))}
      </div>

      {/* Show custom measurements summary if available */}
      {customMeasurements && currentSelectedSize === "Custom" && (
        <div className="mt-3 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-[#3A3A3A] font-medium mb-2">Custom Measurements ({customMeasurements.unit}):</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-[#5A5A5A]">
            {customMeasurements.chest && <span>Chest: {customMeasurements.chest}</span>}
            {customMeasurements.waist && <span>Waist: {customMeasurements.waist}</span>}
            {customMeasurements.shoulder && <span>Shoulder: {customMeasurements.shoulder}</span>}
            {customMeasurements.dressLength && <span>Length: {customMeasurements.dressLength}</span>}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-2 text-[#8B4513] hover:text-[#8B4513] hover:bg-transparent p-0 h-auto"
            onClick={() => setIsCustomFormOpen(true)}
          >
            Edit measurements
          </Button>
        </div>
      )}

      <CustomSizeForm
        isOpen={isCustomFormOpen}
        onClose={() => setIsCustomFormOpen(false)}
        onSubmit={handleCustomMeasurements}
      />
    </>
  )
}
