"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/admin/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, MoreHorizontal, Edit, Trash2, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAdmin, type Product } from "@/contexts/admin-context"

export default function ProductsPage() {
  const { products, deleteProduct, updateProduct, loading } = useAdmin()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    await deleteProduct(id)
    setDeletingId(null)
  }

  const handleStatusChange = async (id: string, status: Product["status"]) => {
    await updateProduct(id, { status })
  }

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) {
      return false
    }
    if (selectedStatus && product.status !== selectedStatus) {
      return false
    }
    return true
  })

  const categories = Array.from(new Set(products.map((p) => p.category)))
  const statuses = [
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
    { value: "out-of-stock", label: "Out of Stock" },
  ]

  // Table columns
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
          <Link href={`/admin/products/${row.original.id}`} className="font-medium hover:underline">
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
        <span className={row.original.stock === 0 ? "text-red-500 font-medium" : ""}>{row.original.stock}</span>
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
                      ? "bg-green-100 text-green-800 cursor-pointer"
                      : status === "draft"
                        ? "bg-gray-100 text-gray-800 cursor-pointer"
                        : "bg-red-100 text-red-800 cursor-pointer"
                  }
                >
                  {status === "active" ? "Active" : status === "draft" ? "Draft" : "Out of Stock"}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleStatusChange(row.original.id, "active")}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(row.original.id, "draft")}>Draft</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(row.original.id, "out-of-stock")}>
                Out of Stock
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/product/${row.original.id}`} className="cursor-pointer flex items-center">
                <Eye className="mr-2 h-4 w-4" />
                <span>View on Site</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/products/${row.original.id}`} className="cursor-pointer flex items-center">
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer flex items-center"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the product `{row.original.name}`.
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory and listings.</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory ({filteredProducts.length} products)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <select
                className="border rounded-md px-3 py-2 w-40"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
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
                onChange={(e) => setSelectedStatus(e.target.value || null)}
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

          {loading.products ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading products...</span>
            </div>
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
