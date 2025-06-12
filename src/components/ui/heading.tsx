import { cn } from "@/lib/utils"
import type React from "react" // Import React to declare JSX

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

export function Heading({ level, children, className }: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements

  const baseStyles = "font-semibold text-gray-900"
  const levelStyles = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg",
    5: "text-base",
    6: "text-sm",
  }

  return <Component className={cn(baseStyles, levelStyles[level], className)}>{children}</Component>
}
