import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface AdvancedSkeletonProps {
  variant?: "card" | "list" | "grid" | "table" | "form"
  count?: number
  className?: string
}

export function AdvancedSkeleton({ variant = "card", count = 1, className }: AdvancedSkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return (
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        )

      case "list":
        return (
          <div className="flex items-center space-x-4 py-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        )

      case "grid":
        return (
          <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        )

      case "table":
        return (
          <div className="border-b border-gray-200 py-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        )

      case "form":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        )

      default:
        return <Skeleton className="h-20 w-full" />
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  )
}

// Specific skeleton components for common use cases
export function ProductListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AdvancedSkeleton variant="grid" count={count} />
    </div>
  )
}

export function CustomerListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-1">
      <AdvancedSkeleton variant="list" count={count} />
    </div>
  )
}

export function OrderTableSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="space-y-0">
      <AdvancedSkeleton variant="table" count={count} />
    </div>
  )
}
