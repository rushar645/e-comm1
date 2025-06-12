"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/admin/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Eye } from "lucide-react"

// Sample order data
type Order = {
  id: string
  customer: {
    name: string
    email: string
  }
  date: string
  total: number
  status: "pending" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "pending" | "failed"
  items: number
}

const orders: Order[] = [
  {
    id: "ORD-001",
    customer: {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
    },
    date: "2023-06-01",
    total: 4500,
    status: "delivered",
    paymentStatus: "paid",
    items: 2,
  },
  {
    id: "ORD-002",
    customer: {
      name: "Rahul Patel",
      email: "rahul.patel@example.com",
    },
    date: "2023-06-02",
    total: 3200,
    status: "shipped",
    paymentStatus: "paid",
    items: 1,
  },
  {
    id: "ORD-003",
    customer: {
      name: "Ananya Singh",
      email: "ananya.singh@example.com",
    },
    date: "2023-06-03",
    total: 7800,
    status: "pending",
    paymentStatus: "pending",
    items: 3,
  },
  {
    id: "ORD-004",
    customer: {
      name: "Vikram Mehta",
      email: "vikram.mehta@example.com",
    },
    date: "2023-06-03",
    total: 2100,
    status: "cancelled",
    paymentStatus: "failed",
    items: 1,
  },
  {
    id: "ORD-005",
    customer: {
      name: "Neha Gupta",
      email: "neha.gupta@example.com",
    },
    date: "2023-06-04",
    total: 5600,
    status: "pending",
    paymentStatus: "pending",
    items: 2,
  },
  {
    id: "ORD-006",
    customer: {
      name: "Arjun Kumar",
      email: "arjun.kumar@example.com",
    },
    date: "2023-06-05",
    total: 9200,
    status: "shipped",
    paymentStatus: "paid",
    items: 4,
  },
  {
    id: "ORD-007",
    customer: {
      name: "Kavita Reddy",
      email: "kavita.reddy@example.com",
    },
    date: "2023-06-06",
    total: 3800,
    status: "delivered",
    paymentStatus: "paid",
    items: 2,
  },
  {
    id: "ORD-008",
    customer: {
      name: "Sanjay Verma",
      email: "sanjay.verma@example.com",
    },
    date: "2023-06-07",
    total: 6500,
    status: "pending",
    paymentStatus: "pending",
    items: 3,
  },
  {
    id: "ORD-009",
    customer: {
      name: "Meera Joshi",
      email: "meera.joshi@example.com",
    },
    date: "2023-06-08",
    total: 4200,
    status: "shipped",
    paymentStatus: "paid",
    items: 2,
  },
  {
    id: "ORD-010",
    customer: {
      name: "Rajesh Khanna",
      email: "rajesh.khanna@example.com",
    },
    date: "2023-06-09",
    total: 8100,
    status: "delivered",
    paymentStatus: "paid",
    items: 3,
  },
]

// Table columns
const columns: ColumnDef<Order>[] = [
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
    accessorKey: "customer.name",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <div>{row.original.customer.name}</div>
        <div className="text-xs text-gray-500">{row.original.customer.email}</div>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <span>₹{row.original.total.toLocaleString()}</span>,
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
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const status = row.original.paymentStatus
      return (
        <Badge
          variant="outline"
          className={
            status === "paid"
              ? "border-green-500 text-green-600"
              : status === "pending"
                ? "border-yellow-500 text-yellow-600"
                : "border-red-500 text-red-600"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "items",
    header: "Items",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant="outline" size="sm" asChild>
        <Link href={`/admin/orders/${row.original.id}`}>
          <Eye className="mr-2 h-4 w-4" /> View
        </Link>
      </Button>
    ),
  },
]

export default function OrdersPage() {
  const searchParams = useSearchParams()
  const statusFilter = searchParams.get("status")

  const [dateRange, setDateRange] = useState<{
    from: string
    to: string
  }>({
    from: "",
    to: "",
  })

  const filteredOrders = orders.filter((order) => {
    if (statusFilter && order.status !== statusFilter) {
      return false
    }

    if (dateRange.from && new Date(order.date) < new Date(dateRange.from)) {
      return false
    }

    if (dateRange.to && new Date(order.date) > new Date(dateRange.to)) {
      return false
    }

    return true
  })

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Manage and process customer orders.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Link href="/admin/orders">
          <Card className={!statusFilter ? "bg-[#FFF2E6]" : ""}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">All Orders</p>
                <p className="text-2xl font-bold">{statusCounts.all}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/orders?status=pending">
          <Card className={statusFilter === "pending" ? "bg-[#FFF2E6]" : ""}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">{statusCounts.pending}</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">{statusCounts.pending}</Badge>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/orders?status=shipped">
          <Card className={statusFilter === "shipped" ? "bg-[#FFF2E6]" : ""}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Shipped</p>
                <p className="text-2xl font-bold">{statusCounts.shipped}</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">{statusCounts.shipped}</Badge>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/orders?status=delivered">
          <Card className={statusFilter === "delivered" ? "bg-[#FFF2E6]" : ""}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Delivered</p>
                <p className="text-2xl font-bold">{statusCounts.delivered}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">{statusCounts.delivered}</Badge>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {statusFilter ? `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Orders` : "All Orders"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">From Date</label>
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="w-40"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">To Date</label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="w-40"
              />
            </div>
            {(dateRange.from || dateRange.to) && (
              <div className="flex items-end">
                <Button variant="outline" onClick={() => setDateRange({ from: "", to: "" })}>
                  Clear Dates
                </Button>
              </div>
            )}
          </div>

          <DataTable
            columns={columns}
            data={filteredOrders}
            searchKey="customer.name"
            searchPlaceholder="Search by customer..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
