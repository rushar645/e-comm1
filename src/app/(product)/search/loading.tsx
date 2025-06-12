import { ProductGridSkeleton } from "@/components/ui/skeleton"

export default function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
        <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-5 w-64 bg-gray-200 rounded-md animate-pulse" />
      </div>
      <ProductGridSkeleton count={12} />
    </div>
  )
}
