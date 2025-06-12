"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
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
  priceRange: { min: 0, max: 300 },
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
  fabrics: ["Cotton", "Silk", "Linen", "Polyester", "Denim", "Wool", "Chiffon", "Satin"],
}

export function FilterSidebar({
  initialFilters,
  onFilterChange,
  availableFilters = defaultAvailableFilters,
  activeFilterCount,
  onClearFilters,
}: FilterSidebarProps) {
  // Set up filter sections state
  const [sections, setSections] = useState([
    { title: "Price", isOpen: true },
    { title: "Color", isOpen: false },
    { title: "Fabric", isOpen: false },
  ])

  // Set up filter state
  const [filters, setFilters] = useState<FilterState>({
    priceRange: initialFilters?.priceRange || availableFilters.priceRange,
    colors: initialFilters?.colors || [],
    fabrics: initialFilters?.fabrics || [],
  })

  // Toggle section visibility
  const toggleSection = (index: number) => {
    setSections(sections.map((section, i) => (i === index ? { ...section, isOpen: !section.isOpen } : section)))
  }

  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: { min: value[0], max: value[1] },
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  // Handle color selection
  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked ? [...filters.colors, color] : filters.colors.filter((c) => c !== color)

    const newFilters = {
      ...filters,
      colors: newColors,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  // Handle fabric selection
  const handleFabricChange = (fabric: string, checked: boolean) => {
    const newFabrics = checked ? [...filters.fabrics, fabric] : filters.fabrics.filter((f) => f !== fabric)

    const newFilters = {
      ...filters,
      fabrics: newFabrics,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  // Format price for display
  const formatPrice = (price: number) => {
    return `$${price}`
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      priceRange: availableFilters.priceRange,
      colors: [],
      fabrics: [],
    })
    onClearFilters()
  }

  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif text-[#3A3A3A]">Filters</h2>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#8B4513] hover:text-[#5A3A33]">
            Clear all
          </Button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.colors.length > 0 &&
            filters.colors.map((color) => {
              const colorObj = availableFilters.colors.find((c) => c.value === color)
              return (
                <Badge key={color} variant="outline" className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} aria-hidden="true"></span>
                  {colorObj?.name || color}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleColorChange(color, false)} />
                </Badge>
              )
            })}

          {filters.fabrics.length > 0 &&
            filters.fabrics.map((fabric) => (
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

      {/* Price Filter */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium text-[#3A3A3A]"
          onClick={() => toggleSection(0)}
          aria-expanded={sections[0].isOpen}
        >
          Price
          {sections[0].isOpen ? (
            <ChevronUp className="h-4 w-4 text-[#3A3A3A]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#3A3A3A]" />
          )}
        </button>

        {sections[0].isOpen && (
          <div className="mt-4 space-y-4">
            <div className="px-2">
              <Slider
                defaultValue={[filters.priceRange.min, filters.priceRange.max]}
                min={availableFilters.priceRange.min}
                max={availableFilters.priceRange.max}
                step={10}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between mt-2 text-sm text-[#5A5A5A]">
                <span>{formatPrice(filters.priceRange.min)}</span>
                <span>{formatPrice(filters.priceRange.max)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox
                  id="price-1"
                  checked={filters.priceRange.min === 0 && filters.priceRange.max === 50}
                  onCheckedChange={(checked) => {
                    if (checked) handlePriceChange([0, 50])
                  }}
                  className="mr-2"
                />
                <label htmlFor="price-1" className="text-sm text-[#5A5A5A] cursor-pointer">
                  $0 - $50
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="price-2"
                  checked={filters.priceRange.min === 50 && filters.priceRange.max === 100}
                  onCheckedChange={(checked) => {
                    if (checked) handlePriceChange([50, 100])
                  }}
                  className="mr-2"
                />
                <label htmlFor="price-2" className="text-sm text-[#5A5A5A] cursor-pointer">
                  $50 - $100
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="price-3"
                  checked={filters.priceRange.min === 100 && filters.priceRange.max === 150}
                  onCheckedChange={(checked) => {
                    if (checked) handlePriceChange([100, 150])
                  }}
                  className="mr-2"
                />
                <label htmlFor="price-3" className="text-sm text-[#5A5A5A] cursor-pointer">
                  $100 - $150
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="price-4"
                  checked={filters.priceRange.min === 150 && filters.priceRange.max === 500}
                  onCheckedChange={(checked) => {
                    if (checked) handlePriceChange([150, 500])
                  }}
                  className="mr-2"
                />
                <label htmlFor="price-4" className="text-sm text-[#5A5A5A] cursor-pointer">
                  $150+
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium text-[#3A3A3A]"
          onClick={() => toggleSection(1)}
          aria-expanded={sections[1].isOpen}
        >
          Color
          {sections[1].isOpen ? (
            <ChevronUp className="h-4 w-4 text-[#3A3A3A]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#3A3A3A]" />
          )}
        </button>

        {sections[1].isOpen && (
          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {availableFilters.colors.map((color) => (
                <button
                  key={color.value}
                  className={`w-6 h-6 rounded-full border ${
                    filters.colors.includes(color.value) ? "ring-2 ring-[#8B4513] ring-offset-2" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorChange(color.value, !filters.colors.includes(color.value))}
                  title={color.name}
                  aria-label={`${color.name} color`}
                />
              ))}
            </div>

            {availableFilters.colors.map((color) => (
              <div key={color.value} className="flex items-center">
                <Checkbox
                  id={`color-${color.value}`}
                  checked={filters.colors.includes(color.value)}
                  onCheckedChange={(checked) => handleColorChange(color.value, !!checked)}
                  className="mr-2"
                />
                <label
                  htmlFor={`color-${color.value}`}
                  className="text-sm text-[#5A5A5A] flex items-center cursor-pointer"
                >
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color.value }}></span>
                  {color.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fabric Filter */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium text-[#3A3A3A]"
          onClick={() => toggleSection(2)}
          aria-expanded={sections[2].isOpen}
        >
          Fabric
          {sections[2].isOpen ? (
            <ChevronUp className="h-4 w-4 text-[#3A3A3A]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#3A3A3A]" />
          )}
        </button>

        {sections[2].isOpen && (
          <div className="mt-4 space-y-2">
            {availableFilters.fabrics.map((fabric) => (
              <div key={fabric} className="flex items-center">
                <Checkbox
                  id={`fabric-${fabric}`}
                  checked={filters.fabrics.includes(fabric)}
                  onCheckedChange={(checked) => handleFabricChange(fabric, !!checked)}
                  className="mr-2"
                />
                <label htmlFor={`fabric-${fabric}`} className="text-sm text-[#5A5A5A] cursor-pointer">
                  {fabric}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
              <path d="m3.3 7 8.7 5 8.7-5"></path>
              <path d="M12 22V12"></path>
            </svg>
          </div>
          <div className="text-sm">
            <p className="font-medium">7-day easy return</p>
          </div>
        </div>
        <Button className="bg-[#3A2723] hover:bg-[#5A3A33] text-white w-full">Know more</Button>
      </div>
    </div>
  )
}
