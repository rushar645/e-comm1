"use client"

import * as React from "react"
import { Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onSearch?: (value: string) => void
  onChange?: (value: string) => void
  onClear?: () => void
  className?: string
  buttonClassName?: string
  inputClassName?: string
}

export function SearchInput({
  onSearch,
  onChange,
  onClear,
  className,
  buttonClassName,
  inputClassName,
  ...props
}: SearchInputProps) {
  const [value, setValue] = React.useState(props.defaultValue?.toString() || "")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onChange?.(newValue)
  }

  const handleClear = () => {
    setValue("")
    onClear?.()
    onChange?.("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(value)
    }
  }

  return (
    <div className={cn("relative flex w-full items-center", className)}>
      <Input
        type="text"
        className={cn("pr-16", inputClassName)}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-8 h-8 w-8"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn("absolute right-0 h-8 w-8", buttonClassName)}
        onClick={() => onSearch?.(value)}
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}
