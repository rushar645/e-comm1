"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-contexts" // adjust import if needed
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/admin/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, MoreHorizontal, Eye, Trash2, Plus } from "lucide-react"
import api from "@/lib/axios"

// Your Product type
type Product = {
  id: string
  name: string
  description?: string
  price: number
  sku: string
  category: string
  stock: number
  status: "active" | "draft" | "out-of-stock"
  images: string[]
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useUser()
  const router = useRouter()

  // ✅ Fetch products via Axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await api.get("/api/products", {
          params: {
            page: 1,
            limit: 50,
            category: selectedCategory || undefined,
            status: selectedStatus || undefined,
          },
        })
        setProducts(response.data.data)
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory, selectedStatus]) // 🔑 re-fetch when filters change

  
  async function deleteProduct(id: string) {
    try {
      const response = await api.delete(`/api/products/${id}`)
      return response.data
    } catch (error: any) {
      console.error("Delete product error:", error.response?.data || error.message)
      throw new Error(error.response?.data?.error || "Failed to delete product")
    }
  }


  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      console.error(err)
    } finally {
      setDeletingId(null)
    }
  }



  // const handleStatusChange = async (id: string, status: Product["status"]) => {
  //   try {
  //     await api.put(`/api/products/${id}`, { status }) // you’ll need this API route
  //     setProducts((prev) =>
  //       prev.map((p) => (p.id === id ? { ...p, status } : p))
  //     )
  //   } catch (err) {
  //     console.error("Status update failed:", err)
  //   }
  // }

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false
    if (selectedStatus && product.status !== selectedStatus) return false
    return true
  })

  const categories = Array.from(new Set(products.map((p) => p.category)))
  const statuses = [
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
    { value: "out-of-stock", label: "Out of Stock" },
  ]

  // ✅ Your existing table columns (no change except handleDelete + handleStatusChange wired in)
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "images",
      header: "",
      cell: ({ row }) => (
        <div className="w-10 h-10 relative">
          <Image
            src={row.original.images[0] || "/placeholder.svg"}
            alt={row.original.name}
            fill
            className="rounded-md object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div>
          <Link
            href={`/admin/products/${row.original.sku}`}
            className="font-medium hover:underline"
          >
            {row.original.name}
          </Link>
          <div className="text-xs text-gray-500">{row.original.sku}</div>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>₹{row.original.price.toLocaleString()}</span>,
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => (
        <span
          className={
            row.original.stock === 0 ? "text-red-500 font-medium" : ""
          }
        >
          {row.original.stock}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Badge
                  className={
                    status === "active"
                      ? "bg-green-100 text-green-800"
                      : status === "draft"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                  }
                >
                  {status === "active"
                    ? "Active"
                    : status === "draft"
                      ? "Draft"
                      : "Out of Stock"}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            {/* <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleStatusChange(row.original.id, "active")}
              >
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange(row.original.id, "draft")}
              >
                Draft
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleStatusChange(row.original.id, "out-of-stock")
                }
              >
                Out of Stock
              </DropdownMenuItem>
            </DropdownMenuContent> */}
          </DropdownMenu>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                href={`/product/${row.original.sku}`}
                className="cursor-pointer flex items-center"
              >
                <Eye className="mr-2 h-4 w-4" />
                <span>View on Site</span>
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <Link
                href={`/admin/products/${row.original.id}`}
                className="cursor-pointer flex items-center"
              >
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer flex items-center"
                  onSelect={(e) => e.preventDefault()}
                  onClick={() => { }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the product `{row.original.name}`.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(row.original.id)}
                    className="bg-red-600 hover:bg-red-700"
                    disabled={deletingId === row.original.id}
                  >
                    {deletingId === row.original.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  useEffect(()=>{

    if(user?.role == "customer" || !user)
      router.push("/admin/login")

  },[router,user])


   if(user?.role == "customer" || !user){
    return(
      <div></div>
    )
  }
  
  else if (user?.role == "admin")
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Manage your product inventory and listings.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Product Inventory ({filteredProducts.length} products)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Category
                </label>
                <select
                  className="border rounded-md px-3 py-2 w-40"
                  value={selectedCategory || ""}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value || null)
                  }
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <select
                  className="border rounded-md px-3 py-2 w-40"
                  value={selectedStatus || ""}
                  onChange={(e) =>
                    setSelectedStatus(e.target.value || null)
                  }
                >
                  <option value="">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              {(selectedCategory || selectedStatus) && (
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory(null)
                      setSelectedStatus(null)
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading products...</span>
              </div>
            ) : error ? (
              <div className="text-red-500 py-8">{error}</div>
            ) : (
              <DataTable
                columns={columns}
                data={filteredProducts}
                searchKey="name"
                searchPlaceholder="Search products..."
              />
            )}
          </CardContent>
        </Card>
      </div>
    )
}