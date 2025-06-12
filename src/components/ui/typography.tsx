import type React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

export function TypographyH1({ children, className }: TypographyProps) {
  return <h1 className={cn("text-3xl md:text-4xl font-serif text-[#3A3A3A] font-medium", className)}>{children}</h1>
}

export function TypographyH2({ children, className }: TypographyProps) {
  return <h2 className={cn("text-2xl md:text-3xl font-serif text-[#3A3A3A] font-medium", className)}>{children}</h2>
}

export function TypographyH3({ children, className }: TypographyProps) {
  return <h3 className={cn("text-xl md:text-2xl font-serif text-[#3A3A3A] font-medium", className)}>{children}</h3>
}

export function TypographyH4({ children, className }: TypographyProps) {
  return <h4 className={cn("text-lg md:text-xl font-serif text-[#3A3A3A] font-medium", className)}>{children}</h4>
}

export function TypographyP({ children, className }: TypographyProps) {
  return <p className={cn("text-base text-[#5A5A5A] leading-relaxed", className)}>{children}</p>
}

export function TypographySmall({ children, className }: TypographyProps) {
  return <p className={cn("text-sm text-[#5A5A5A]", className)}>{children}</p>
}

export function TypographyMuted({ children, className }: TypographyProps) {
  return <p className={cn("text-sm text-[#8A8A8A]", className)}>{children}</p>
}

export function TypographyLead({ children, className }: TypographyProps) {
  return <p className={cn("text-lg text-[#3A3A3A]", className)}>{children}</p>
}

export function TypographyLarge({ children, className }: TypographyProps) {
  return <div className={cn("text-lg font-medium text-[#3A3A3A]", className)}>{children}</div>
}

export function TypographyPrice({ children, className }: TypographyProps) {
  return <span className={cn("text-lg font-medium text-[#D35400]", className)}>{children}</span>
}
