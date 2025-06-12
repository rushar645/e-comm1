import { ProductGridSkeleton } from "@/components/ui/skeleton"

export default function CategoryLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar Skeleton */}
        <div className="w-full md:w-1/4">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse" />
                <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse" />
                <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse" />
                <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse" />
                <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse mb-4 md:mb-0" />
            <div className="h-10 w-40 bg-gray-200 rounded-md animate-pulse" />
          </div>

          <div className="mb-4">
            <div className="h-5 w-48 bg-gray-200 rounded-md animate-pulse" />
          </div>

          <ProductGridSkeleton count={12} />
        </div>
      </div>
    </div>
  )
}
