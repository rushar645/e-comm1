"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/contexts/admin-context"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Edit, Trash2, Copy, Calendar, Percent, Tag, Users } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import type { Coupon } from "@/contexts/admin-context"

export default function CouponsPage() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon, loading } = useAdmin()
  const { toast } = useToast()
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed" | "free_shipping",
    value: 0,
    minOrderValue: 0,
    maxDiscount: 0,
    expiryDate: "",
    usageLimit: 0,
    isActive: true,
  })

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minOrderValue: coupon.minOrderValue,
      maxDiscount: coupon.maxDiscount || 0,
      expiryDate: coupon.expiryDate,
      usageLimit: coupon.usageLimit,
      isActive: coupon.isActive,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      await deleteCoupon(id)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingCoupon) {
      await updateCoupon(editingCoupon.id, formData)
    } else {
      await addCoupon(formData)
    }

    setIsModalOpen(false)
    setEditingCoupon(null)
    setFormData({
      code: "",
      type: "percentage",
      value: 0,
      minOrderValue: 0,
      maxDiscount: 0,
      expiryDate: "",
      usageLimit: 0,
      isActive: true,
    })
  }

  const stats = {
    total: coupons.length,
    active: coupons.filter((c) => c.isActive).length,
    expired: coupons.filter((c) => new Date(c.expiryDate) < new Date()).length,
    totalUsage: coupons.reduce((sum, c) => sum + c.usedCount, 0),
  }

  const columns: ColumnDef<Coupon>[] = [
    {
      accessorKey: "code",
      header: "Coupon Code",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4 text-[#3A2723]" />
          <span className="font-mono font-medium">{row.original.code}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(row.original.code)
              toast({ title: "Copied!", description: "Coupon code copied to clipboard" })
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const typeLabels = {
          percentage: "Percentage",
          fixed: "Fixed Amount",
          free_shipping: "Free Shipping",
        }
        return (
          <Badge variant="outline" className="capitalize">
            {typeLabels[row.original.type]}
          </Badge>
        )
      },
    },
    {
      accessorKey: "value",
      header: "Discount",
      cell: ({ row }) => {
        const { type, value } = row.original
        if (type === "percentage") return `${value}%`
        if (type === "fixed") return `₹${value}`
        return "Free Shipping"
      },
    },
    {
      accessorKey: "minOrderValue",
      header: "Min Order",
      cell: ({ row }) => `₹${row.original.minOrderValue}`,
    },
    {
      accessorKey: "usageLimit",
      header: "Usage",
      cell: ({ row }) => {
        const { usageLimit, usedCount } = row.original
        const percent = Math.min((usedCount / usageLimit) * 100, 100)
        return (
          <div className="text-center">
            <div className="text-sm font-medium">{usedCount} / {usageLimit}</div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div className="bg-[#3A2723] h-1.5 rounded-full" style={{ width: `${percent}%` }} />
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "expiryDate",
      header: "Expires",
      cell: ({ row }) => {
        const expiryDate = new Date(row.original.expiryDate)
        const isExpired = expiryDate < new Date()
        return (
          <div className={`flex items-center space-x-1 ${isExpired ? "text-red-600" : ""}`}>
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{expiryDate.toLocaleDateString()}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "default" : "secondary"}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => handleEdit(row.original)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleDelete(row.original.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Coupon Management"
        description="Create and manage discount coupons"
        action={
          <div className="flex space-x-2">
            <Button onClick={() => router.push("/admin/coupons/new")} variant="default">
              <Plus className="h-4 w-4 mr-2" />
              Create New Coupon
            </Button>
            <Button onClick={() => setIsModalOpen(true)} variant="outline">
              Quick Add
            </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Coupons</CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Coupons</CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">{stats.active}</div></CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expired Coupons</CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-600">{stats.expired}</div></CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Usage</CardTitle>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.totalUsage}</div></CardContent>
        </Card>
      </div>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={coupons} searchKey="code" searchPlaceholder="Search coupons..." />
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCoupon(null)
        }}
        title={editingCoupon ? "Edit Coupon" : "Add New Coupon"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Coupon Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="WELCOME10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Discount Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as any })}
              >
                <SelectTrigger><SelectValue placeholder="Select discount type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                  <SelectItem value="free_shipping">Free Shipping</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.type !== "free_shipping" && (
              <div className="space-y-2">
                <Label htmlFor="value">Discount {formData.type === "percentage" ? "Percentage" : "Amount"}</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  placeholder={formData.type === "percentage" ? "10" : "100"}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="minOrderValue">Minimum Order Value (₹)</Label>
              <Input
                id="minOrderValue"
                type="number"
                value={formData.minOrderValue}
                onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                placeholder="500"
                required
              />
            </div>

            {formData.type === "percentage" && (
              <div className="space-y-2">
                <Label htmlFor="maxDiscount">Maximum Discount (₹)</Label>
                <Input
                  id="maxDiscount"
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                  placeholder="200"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="usageLimit">Usage Limit</Label>
              <Input
                id="usageLimit"
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                placeholder="100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isActive">Status</Label>
              <Select
                value={formData.isActive ? "active" : "inactive"}
                onValueChange={(value) => setFormData({ ...formData, isActive: value === "active" })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1" disabled={loading.coupons}>
              {editingCoupon ? "Update Coupon" : "Create Coupon"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
