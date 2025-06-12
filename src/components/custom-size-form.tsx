"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CustomSizeFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (measurements: CustomMeasurements) => void
}

export interface CustomMeasurements {
  mori: string
  waist: string
  chest: string
  armhole: string
  shoulder: string
  dressLength: string
  sleeveLength: string
  unit: "cm" | "inch"
}

export function CustomSizeForm({ isOpen, onClose, onSubmit }: CustomSizeFormProps) {
  const [unit, setUnit] = useState<"cm" | "inch">("cm")
  const [measurements, setMeasurements] = useState<CustomMeasurements>({
    mori: "",
    waist: "",
    chest: "",
    armhole: "",
    shoulder: "",
    dressLength: "",
    sleeveLength: "",
    unit: "cm",
  })

  const handleInputChange = (field: keyof CustomMeasurements, value: string) => {
    setMeasurements((prev) => ({
      ...prev,
      [field]: value,
      unit: unit,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...measurements, unit })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#3A3A3A]">Custom Size</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex justify-end mb-4 md:mb-6">
            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                type="button"
                className={`px-3 py-1 text-sm rounded ${
                  unit === "cm" ? "bg-white text-[#3A3A3A] shadow-sm" : "text-gray-600"
                }`}
                onClick={() => setUnit("cm")}
              >
                Cm
              </button>
              <button
                type="button"
                className={`px-3 py-1 text-sm rounded ${
                  unit === "inch" ? "bg-white text-[#3A3A3A] shadow-sm" : "text-gray-600"
                }`}
                onClick={() => setUnit("inch")}
              >
                Inch
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mori" className="text-[#3A3A3A] font-normal text-sm">
                    Mori:
                  </Label>
                  <Input
                    id="mori"
                    type="number"
                    step="0.1"
                    value={measurements.mori}
                    onChange={(e) => handleInputChange("mori", e.target.value)}
                    className="mt-1 border-b border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:border-[#8B4513] focus:ring-0 h-10"
                    placeholder={`Enter ${unit}`}
                  />
                </div>

                <div>
                  <Label htmlFor="chest" className="text-[#3A3A3A] font-normal text-sm">
                    Chest:
                  </Label>
                  <Input
                    id="chest"
                    type="number"
                    step="0.1"
                    value={measurements.chest}
                    onChange={(e) => handleInputChange("chest", e.target.value)}
                    className="mt-1 border-b border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:border-[#8B4513] focus:ring-0 h-10"
                    placeholder={`Enter ${unit}`}
                  />
                </div>

                <div>
                  <Label htmlFor="shoulder" className="text-[#3A3A3A] font-normal text-sm">
                    Shoulder:
                  </Label>
                  <Input
                    id="shoulder"
                    type="number"
                    step="0.1"
                    value={measurements.shoulder}
                    onChange={(e) => handleInputChange("shoulder", e.target.value)}
                    className="mt-1 border-b border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:border-[#8B4513] focus:ring-0 h-10"
                    placeholder={`Enter ${unit}`}
                  />
                </div>

                <div>
                  <Label htmlFor="sleeveLength" className="text-[#3A3A3A] font-normal text-sm">
                    Sleeve length:
                  </Label>
                  <Input
                    id="sleeveLength"
                    type="number"
                    step="0.1"
                    value={measurements.sleeveLength}
                    onChange={(e) => handleInputChange("sleeveLength", e.target.value)}
                    className="mt-1 border-b border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:border-[#8B4513] focus:ring-0 h-10"
                    placeholder={`Enter ${unit}`}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="waist" className="text-[#3A3A3A] font-normal text-sm">
                    Waist:
                  </Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    value={measurements.waist}
                    onChange={(e) => handleInputChange("waist", e.target.value)}
                    className="mt-1 border-b border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:border-[#8B4513] focus:ring-0 h-10"
                    placeholder={`Enter ${unit}`}
                  />
                </div>

                <div>
                  <Label htmlFor="armhole" className="text-[#3A3A3A] font-normal text-sm">
                    Armhole:
                  </Label>
                  <Input
                    id="armhole"
                    type="number"
                    step="0.1"
                    value={measurements.armhole}
                    onChange={(e) => handleInputChange("armhole", e.target.value)}
                    className="mt-1 border-b border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:border-[#8B4513] focus:ring-0 h-10"
                    placeholder={`Enter ${unit}`}
                  />
                </div>

                <div>
                  <Label htmlFor="dressLength" className="text-[#3A3A3A] font-normal text-sm">
                    Dress length:
                  </Label>
                  <Input
                    id="dressLength"
                    type="number"
                    step="0.1"
                    value={measurements.dressLength}
                    onChange={(e) => handleInputChange("dressLength", e.target.value)}
                    className="mt-1 border-b border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:border-[#8B4513] focus:ring-0 h-10"
                    placeholder={`Enter ${unit}`}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-300 text-[#3A3A3A] hover:bg-gray-50 h-12"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-[#3A2723] hover:bg-[#5A3A33] text-white h-12">
                Save Measurements
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
