import { ProductGridSkeleton } from "@/components/ui/skeleton"

export default function Loading() {
  // You can add any UI inside Loading, including a skeleton.
  return (
    <main className="container mx-auto px-4 py-8">
      <ProductGridSkeleton count={12} />
    </main>
  )
}

