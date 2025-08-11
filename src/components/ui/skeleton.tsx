import type React from "react";
import { cn } from "@/lib/utils";

// interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-primary/10 relative overflow-hidden",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
      {...props}
    />
  );
}

function ProductCardSkeleton() {
  return (
    <div className="w-full max-w-[280px] mx-auto">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="p-3 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex justify-center gap-1 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="size-3 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-8 w-full mt-3" />
        </div>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 py-3">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-8 rounded-full" />
            </div>
            <Skeleton className="mt-3 h-8 w-16" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="p-6">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="p-6 pt-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="py-3 border-b last:border-0">
              <TableRowSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export {
  Skeleton,
  ProductCardSkeleton,
  CardSkeleton,
  TableRowSkeleton,
  FormSkeleton,
  DashboardSkeleton,
  ProductGridSkeleton,
};

// ✅ Fix: Default export for Next.js loading compatibility
export default DashboardSkeleton;
