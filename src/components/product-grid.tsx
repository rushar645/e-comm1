
import { Product } from "@/types"
import { ProductCard } from "./product-card"
import { ProductCardSkeleton } from "@/components/ui/skeleton"

// interface Product {
//   id: number | string
//   name: string
//   price: string
//   numericPrice: number
//   imageSrc: string
//   colors?: string[]
//   fabric?: string
//   sku?:string
// }

interface ProductGridProps {
  products: Product[]
  loading?: boolean
}

export function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }
 
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} numericPrice={product.price} colors={product.colors} fabric={product.material} imageSrc={product.images[0]} sku={product.sku}/>
      ))}
    </div>
  )
}
