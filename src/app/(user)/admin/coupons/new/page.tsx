"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Check, Percent, RefreshCw, Tag, Truck } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewCouponPage() {
  const router = useRouter()
  const [couponType, setCouponType] = useState("percentage")
  const [couponCode, setCouponCode] = useState("")
  const [discountValue, setDiscountValue] = useState("")
  const [minOrderValue, setMinOrderValue] = useState("")
  const [maxDiscount, setMaxDiscount] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [usageLimit, setUsageLimit] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setCouponCode(result)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin/coupons")
    }, 1000)
  }

  const applyTemplate = (template: string) => {
    switch (template) {
      case "welcome":
        setCouponType("percentage")
        setCouponCode("WELCOME10")
        setDiscountValue("10")
        setMinOrderValue("1000")
        setMaxDiscount("500")
        setExpiryDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])
        setUsageLimit("1")
        break
      case "seasonal":
        setCouponType("percentage")
        setCouponCode("SEASON25")
        setDiscountValue("25")
        setMinOrderValue("2500")
        setMaxDiscount("1000")
        setExpiryDate(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])
        setUsageLimit("100")
        break
      case "shipping":
        setCouponType("shipping")
        setCouponCode("FREESHIP")
        setDiscountValue("0")
        setMinOrderValue("3000")
        setMaxDiscount("0")
        setExpiryDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])
        setUsageLimit("50")
        break
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/admin/coupons">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Create New Coupon</h1>
        </div>
      </div>

      <Tabs defaultValue="form" className="space-y-4">
        <TabsList>
          <TabsTrigger value="form">Coupon Form</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card
              className="cursor-pointer hover:border-[#3A2723] transition-colors"
              onClick={() => applyTemplate("welcome")}
            >
              <CardHeader className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Welcome Discount
                </CardTitle>
                <CardDescription>10% off for new customers</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-2xl font-bold text-center">10% OFF</p>
                <p className="text-sm text-gray-500 text-center mt-2">Min. order ₹1000</p>
                <p className="text-sm text-gray-500 text-center">Single use per customer</p>
                <Button className="w-full mt-4" variant="outline">
                  Use Template
                </Button>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:border-[#3A2723] transition-colors"
              onClick={() => applyTemplate("seasonal")}
            >
              <CardHeader className="bg-gradient-to-r from-rose-100 to-rose-200 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Percent className="mr-2 h-5 w-5" />
                  Seasonal Sale
                </CardTitle>
                <CardDescription>25% off for limited time</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-2xl font-bold text-center">25% OFF</p>
                <p className="text-sm text-gray-500 text-center mt-2">Min. order ₹2500</p>
                <p className="text-sm text-gray-500 text-center">Max discount ₹1000</p>
                <Button className="w-full mt-4" variant="outline">
                  Use Template
                </Button>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:border-[#3A2723] transition-colors"
              onClick={() => applyTemplate("shipping")}
            >
              <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Free Shipping
                </CardTitle>
                <CardDescription>No delivery charges</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-2xl font-bold text-center">FREE SHIPPING</p>
                <p className="text-sm text-gray-500 text-center mt-2">Min. order ₹3000</p>
                <p className="text-sm text-gray-500 text-center">Limited time offer</p>
                <Button className="w-full mt-4" variant="outline">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="form">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="couponCode">Coupon Code</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generateRandomCode}
                      className="h-8 flex items-center text-xs"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                  </div>
                  <Input
                    id="couponCode"
                    placeholder="e.g. SUMMER20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="uppercase"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Discount Type</Label>
                  <RadioGroup value={couponType} onValueChange={setCouponType} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="percentage" id="percentage" />
                      <Label htmlFor="percentage">Percentage Discount</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">Fixed Amount Discount</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="shipping" id="shipping" />
                      <Label htmlFor="shipping">Free Shipping</Label>
                    </div>
                  </RadioGroup>
                </div>

                {couponType !== "shipping" && (
                  <div className="space-y-2">
                    <Label htmlFor="discountValue">
                      {couponType === "percentage" ? "Discount Percentage (%)" : "Discount Amount (₹)"}
                    </Label>
                    <Input
                      id="discountValue"
                      type="number"
                      placeholder={couponType === "percentage" ? "e.g. 10" : "e.g. 500"}
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      min="0"
                      max={couponType === "percentage" ? "100" : undefined}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="minOrderValue">Minimum Order Value (₹)</Label>
                  <Input
                    id="minOrderValue"
                    type="number"
                    placeholder="e.g. 1000"
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(e.target.value)}
                    min="0"
                  />
                </div>

                {couponType === "percentage" && (
                  <div className="space-y-2">
                    <Label htmlFor="maxDiscount">Maximum Discount Amount (₹)</Label>
                    <Input
                      id="maxDiscount"
                      type="number"
                      placeholder="e.g. 500"
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(e.target.value)}
                      min="0"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <div className="relative">
                    <Input
                      id="expiryDate"
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usageLimit">Usage Limit</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    placeholder="e.g. 100 (leave empty for unlimited)"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerType">Customer Type</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="new">New Customers Only</SelectItem>
                      <SelectItem value="existing">Existing Customers Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="active">Active Status</Label>
                    <p className="text-sm text-gray-500">Enable or disable this coupon</p>
                  </div>
                  <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/coupons")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Create Coupon
                  </>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
