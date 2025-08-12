"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

// Define filter types
export interface PriceRange {
  min: number
  max: number
}

export interface FilterState {
  priceRange: PriceRange
  colors: string[]
  fabrics: string[]
}

interface FilterSidebarProps {
  initialFilters?: FilterState
  onFilterChange: (filters: FilterState) => void
  availableFilters?: {
    priceRange: { min: number; max: number }
    colors: Array<{ name: string; value: string }>
    fabrics: string[]
  }
  activeFilterCount: number
  onClearFilters: () => void
}

// Default available filters
const defaultAvailableFilters = {
  priceRange: { min: 0, max: 100000 },
  colors: [
    { name: "Red", value: "#FF5733" },
    { name: "Blue", value: "#3498DB" },
    { name: "Green", value: "#2ECC71" },
    { name: "Purple", value: "#9B59B6" },
    { name: "Yellow", value: "#F1C40F" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Pink", value: "#FF69B4" },
  ],
  fabrics: [
    "Cotton", "Linen", "Polyester", "Denim", "Chiffon", "Satin", "GGT", "Cotto Slub", "Chanderi", "Butter Cotton",
    "Poplin", "Cotton Voil", "Poly Crepe", "Organza", "Poly Spendex", "Modal", "Reyon", "Nylon", "Net", "Dobby", 
    "Velvet", "Taffta", "Viscose", "Polysaint"
  ],
}

export function FilterSidebar({
  initialFilters,
  onFilterChange,
  availableFilters = defaultAvailableFilters,
  activeFilterCount,
  onClearFilters,
}: FilterSidebarProps) {
  const [sections, setSections] = useState([
    { title: "Price", isOpen: true },
    { title: "Color", isOpen: false },
    { title: "Fabric", isOpen: false },
  ])

  const [filters, setFilters] = useState<FilterState>({
    priceRange: initialFilters?.priceRange || availableFilters.priceRange,
    colors: initialFilters?.colors || [],
    fabrics: initialFilters?.fabrics || [],
  })

  // New: mobile toggle
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleSection = (index: number) => {
    setSections(sections.map((section, i) =>
      i === index ? { ...section, isOpen: !section.isOpen } : section
    ))
  }

  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: { min: value[0], max: value[1] },
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...filters.colors, color]
      : filters.colors.filter((c) => c !== color)

    const newFilters = { ...filters, colors: newColors }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleFabricChange = (fabric: string, checked: boolean) => {
    const newFabrics = checked
      ? [...filters.fabrics, fabric]
      : filters.fabrics.filter((f) => f !== fabric)

    const newFilters = { ...filters, fabrics: newFabrics }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const formatPrice = (price: number) => `₹${price}`

  const clearFilters = () => {
    setFilters({
      priceRange: availableFilters.priceRange,
      colors: [],
      fabrics: [],
    })
    onClearFilters()
  }

  return (
    <div>
      {/* Mobile toggle button */}
      <div className="md:hidden mb-4">
        <Button
          variant="default"
          className="flex items-center w-full justify-between border-1 border-gray-300"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <span className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </span>
          {isMobileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Filter Box */}
      <div className={`${isMobileOpen ? "block" : "hidden"} md:block bg-white rounded-lg p-4`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif text-[#3A3A3A]">Filters</h2>
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#8B4513] hover:text-[#5A3A33]">
              Clear all
            </Button>
          )}
        </div>

        {/* Active filter badges */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.colors.map((color) => {
              const colorObj = availableFilters.colors.find((c) => c.value === color)
              return (
                <Badge key={color} variant="outline" className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
                  {colorObj?.name || color}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleColorChange(color, false)} />
                </Badge>
              )
            })}

            {filters.fabrics.map((fabric) => (
              <Badge key={fabric} variant="outline" className="flex items-center gap-1">
                {fabric}
                <X className="h-3 w-3 cursor-pointer" onClick={() => handleFabricChange(fabric, false)} />
              </Badge>
            ))}

            {(filters.priceRange.min !== availableFilters.priceRange.min ||
              filters.priceRange.max !== availableFilters.priceRange.max) && (
              <Badge variant="outline" className="flex items-center gap-1">
                {formatPrice(filters.priceRange.min)} - {formatPrice(filters.priceRange.max)}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handlePriceChange([availableFilters.priceRange.min, availableFilters.priceRange.max])}
                />
              </Badge>
            )}
          </div>
        )}

        {/* PRICE FILTER */}
        <div className="mb-4 border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection(0)}
            className="flex justify-between w-full font-medium text-[#3A3A3A]"
          >
            Price {sections[0].isOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
          {sections[0].isOpen && (
            <div className="mt-4">
              <Slider
                defaultValue={[filters.priceRange.min, filters.priceRange.max]}
                min={availableFilters.priceRange.min}
                max={availableFilters.priceRange.max}
                step={10}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between text-sm mt-2">
                <span>{formatPrice(filters.priceRange.min)}</span>
                <span>{formatPrice(filters.priceRange.max)}</span>
              </div>
            </div>
          )}
        </div>

        {/* COLOR FILTER */}
        <div className="mb-4 border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection(1)}
            className="flex justify-between w-full font-medium text-[#3A3A3A]"
          >
            Color {sections[1].isOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
          {sections[1].isOpen && (
            <div className="mt-4 space-y-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {availableFilters.colors.map((color) => (
                  <button
                    key={color.value}
                    className={`w-6 h-6 rounded-full border ${filters.colors.includes(color.value) ? "ring-2 ring-[#8B4513] ring-offset-2" : "border-gray-300"}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorChange(color.value, !filters.colors.includes(color.value))}
                  />
                ))}
              </div>
              {availableFilters.colors.map((color) => (
                <div key={color.value} className="flex items-center">
                  <Checkbox
                    checked={filters.colors.includes(color.value)}
                    onCheckedChange={(checked) => handleColorChange(color.value, !!checked)}
                  />
                  <label className="text-sm ml-2">{color.name}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FABRIC FILTER */}
        <div className="mb-4 border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection(2)}
            className="flex justify-between w-full font-medium text-[#3A3A3A]"
          >
            Fabric {sections[2].isOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
          {sections[2].isOpen && (
            <div className="mt-4 space-y-2">
              {availableFilters.fabrics.map((fabric) => (
                <div key={fabric} className="flex items-center">
                  <Checkbox
                    checked={filters.fabrics.includes(fabric)}
                    onCheckedChange={(checked) => handleFabricChange(fabric, !!checked)}
                  />
                  <label className="text-sm ml-2">{fabric}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
