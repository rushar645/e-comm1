"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DollarSign,
  ShoppingBag,
  Users,
  Ticket,
  PlusCircle,
} from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type RecentOrder = {
  id: string
  customer?: string
  customer_name?: string
  created_at?: string
  date?: string
  total?: number
  amount?: number
  status?: string
  items?: number | any[]
}

type TopProduct = {
  id: string
  name: string
  sales: number
  revenue: number
}

type DashboardStats = {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  pendingOrders: number
  lowStockProducts: number
  recentOrders: RecentOrder[]
  topProducts: TopProduct[]
}

const columns: ColumnDef<RecentOrder>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <Link href={`/admin/orders/${row.original.id}`} className="font-medium text-blue-600 hover:underline">
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => row.original.customer || row.original.customer_name || "—",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => row.original.created_at?.slice(0, 10) || row.original.date || "—",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <span>₹{((row.original.total ?? row.original.amount ?? 0) as number).toLocaleString()}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge
          className={
            status === "delivered"
              ? "bg-green-100 text-green-800"
              : status === "shipped"
                ? "bg-blue-100 text-blue-800"
                : status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
          }
        >
          {status ? status.charAt(0).toUpperCase() + status.slice(1) : "—"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) =>
      Array.isArray(row.original.items)
        ? row.original.items.length
        : row.original.items ?? "—",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant="outline" size="sm" asChild>
        <Link href={`/admin/orders/${row.original.id}`}>View</Link>
      </Button>
    ),
  },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    recentOrders: [],
    topProducts: [],
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      setError("")
      try {
        const res = await fetch("/api/admin/dashboard")
        const json = await res.json()
        if (json.success) {
          setStats(json.data)
        } else {
          setError(json.error || "Failed to load")
        }
      } catch (e) {
        setError("Failed to load data")
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  // For charts (substitute with your own time-based data as needed)
  const salesData = [
    { name: "Total Sales", sales: stats.totalSales },
    { name: "Pending Orders", sales: stats.pendingOrders },
  ]

  const productPerformance = stats.topProducts.map((prod) => ({
    name: prod.name,
    sales: prod.sales,
    revenue: prod.revenue,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store performance and recent orders.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/products/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <PlusCircle className="h-8 w-8 text-[#8B4513] mr-3" />
              <div>
                <p className="text-sm font-medium">Add Product</p>
                <p className="text-xs text-muted-foreground">Create new product</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/coupons/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <Ticket className="h-8 w-8 text-[#8B4513] mr-3" />
              <div>
                <p className="text-sm font-medium">Create Coupon</p>
                <p className="text-xs text-muted-foreground">Add discount code</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/customers">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <Users className="h-8 w-8 text-[#8B4513] mr-3" />
              <div>
                <p className="text-sm font-medium">Customers</p>
                <p className="text-xs text-muted-foreground">Manage customers</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/orders">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center p-4">
              <ShoppingBag className="h-8 w-8 text-[#8B4513] mr-3" />
              <div>
                <p className="text-sm font-medium">Orders</p>
                <p className="text-xs text-muted-foreground">View all orders</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "…" : `₹${(stats.totalSales || 0).toLocaleString()}`}
            </div>
            <p className="text-xs text-muted-foreground">
              {/* Static compared to last month, see API for dynamic trends */}
              <span className="text-green-600 flex items-center">
                <ArrowUpIcon className="mr-1 h-4 w-4" /> +12.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "…" : `+${stats.totalOrders || 0}`}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <ArrowDownIcon className="mr-1 h-4 w-4" /> -4%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "…" : `+${stats.totalCustomers || 0}`}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpIcon className="mr-1 h-4 w-4" /> +18.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8B4513"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8B4513" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-6 text-center">Loading...</div>
          ) : error ? (
            <div className="py-6 text-red-600 text-center">{error}</div>
          ) : (
            <DataTable columns={columns} data={stats.recentOrders || []} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
