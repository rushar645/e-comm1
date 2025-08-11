import { Suspense } from "react"
import { ProductGrid } from "@/components/product-grid"
// import { products } from "@/app/data/products"
import { TypographyH1, TypographyP } from "@/components/ui/typography"
import { ProductGridSkeleton } from "@/components/ui/skeleton"

interface SearchPageProps {
  searchParams?: {
    q?: string
  }
}

export default function SearchPage({
  searchParams,
}: SearchPageProps) {
  const query = searchParams?.q || ""

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <TypographyH1>Search Results</TypographyH1>
        <TypographyP>
          {filteredProducts.length} results for &quot;{query}&quot;
        </TypographyP>
      </div>

      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-12">
            <TypographyH1 className="text-2xl mb-4">No products found</TypographyH1>
            <TypographyP>We couldn&apos;t find any products matching your search. Try using different keywords.</TypographyP>
          </div>
        )}
      </Suspense>
    </main>
  )
}
