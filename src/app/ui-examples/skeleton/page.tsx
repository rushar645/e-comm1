import {
  Skeleton,
  CardSkeleton,
  ProductCardSkeleton,
  TableRowSkeleton,
  FormSkeleton,
  DashboardSkeleton,
  ProductGridSkeleton,
} from "@/components/ui/skeleton"

export default function SkeletonExamplesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-6">Skeleton UI Components</h1>
        <p className="text-gray-600 mb-8">
          A collection of skeleton loading components for various UI elements. These components provide a visual
          placeholder while content is loading.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Basic Skeleton</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Text Line</h3>
            <Skeleton className="h-4 w-full" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Circle</h3>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Button</h3>
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Card Skeleton</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Product Card Skeleton</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Table Row Skeleton</h2>
        <div className="border rounded-lg overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-b last:border-0 p-4">
              <TableRowSkeleton />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Form Skeleton</h2>
        <div className="border rounded-lg p-6">
          <FormSkeleton />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Dashboard Skeleton</h2>
        <DashboardSkeleton />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Product Grid Skeleton</h2>
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  )
}
