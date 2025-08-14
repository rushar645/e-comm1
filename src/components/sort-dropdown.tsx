"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface SortOption {
  label: string
  value: string
}

interface SortDropdownProps {
  onChange?: (value: string) => void
}

export function SortDropdown({ onChange }: SortDropdownProps = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<SortOption>({
    label: "Featured",
    value: "featured",
  })

  const options: SortOption[] = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Newest", value: "newest" },
    { label: "Best Selling", value: "bestselling" },
  ]

  const handleSelect = (option: SortOption) => {
    setSelected(option)
    setIsOpen(false)
    onChange?.(option.value)
  }

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-48 px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>Sort By: {selected.label}</span>
        <ChevronDown className="h-4 w-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-20 w-48 mt-1 bg-white border border-gray-300 rounded-md shadow-lg" role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                selected.value === option.value ? "font-medium text-[#8B4513]" : ""
              }`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={selected.value === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
