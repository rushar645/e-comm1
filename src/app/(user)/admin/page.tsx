"use client"

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
import { ArrowUpIcon, ArrowDownIcon, DollarSign, ShoppingBag, Users, Ticket, PlusCircle } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
  { name: "Jul", sales: 7000 },
]

const productPerformance = [
  { name: "Lehenga", sales: 35, revenue: 12000 },
  { name: "Suit", sales: 28, revenue: 9800 },
  { name: "Jumpsuit", sales: 15, revenue: 5200 },
  { name: "Long Dress", sales: 22, revenue: 7500 },
  { name: "Short Dress", sales: 18, revenue: 6300 },
]

// Sample data for recent orders
type Order = {
  id: string
  customer: string
  date: string
  total: number
  status: "pending" | "shipped" | "delivered" | "cancelled"
  items: number
}

const recentOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    date: "2023-06-01",
    total: 4500,
    status: "delivered",
    items: 2,
  },
  {
    id: "ORD-002",
    customer: "Rahul Patel",
    date: "2023-06-02",
    total: 3200,
    status: "shipped",
    items: 1,
  },
  {
    id: "ORD-003",
    customer: "Ananya Singh",
    date: "2023-06-03",
    total: 7800,
    status: "pending",
    items: 3,
  },
  {
    id: "ORD-004",
    customer: "Vikram Mehta",
    date: "2023-06-03",
    total: 2100,
    status: "cancelled",
    items: 1,
  },
  {
    id: "ORD-005",
    customer: "Neha Gupta",
    date: "2023-06-04",
    total: 5600,
    status: "pending",
    items: 2,
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
    accessorKey: "customer",
    header: "Customer",
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
    accessorKey: "items",
    header: "Items",
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
            <div className="text-2xl font-bold">₹42,500</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                +12.5%
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
            <div className="text-2xl font-bold">+24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <ArrowDownIcon className="mr-1 h-4 w-4" />
                -4%
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
            <div className="text-2xl font-bold">+128</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                +18.2%
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
                <LineChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8B4513" activeDot={{ r: 8 }} />
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
                <BarChart
                  data={productPerformance}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
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
          <DataTable columns={columns} data={recentOrders} />
        </CardContent>
      </Card>
    </div>
  )
}
