"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Package, Heart, MapPin, Settings, Edit, Eye, Truck, CheckCircle, Clock, X } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

// Mock user data - in real app, this would come from authentication context
const userData = {
  id: "USER-001",
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  phone: "+91 98765 43210",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "May 2023",
  totalOrders: 12,
  totalSpent: 45000,
  loyaltyPoints: 450,
}

const orderHistory = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 12500,
    items: [
      {
        id: "1",
        name: "Floral Embroidered Lehenga",
        image: "/placeholder.svg?height=80&width=80",
        price: 12500,
        quantity: 1,
        color: "Red",
        size: "M",
      },
    ],
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 8500,
    items: [
      {
        id: "2",
        name: "Designer Anarkali Suit",
        image: "/placeholder.svg?height=80&width=80",
        price: 8500,
        quantity: 1,
        color: "Blue",
        size: "L",
      },
    ],
    trackingNumber: "TRK987654321",
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "pending",
    total: 15000,
    items: [
      {
        id: "3",
        name: "Silk Saree with Blouse",
        image: "/placeholder.svg?height=80&width=80",
        price: 15000,
        quantity: 1,
        color: "Green",
        size: "Free Size",
      },
    ],
  },
]

const addresses = [
  {
    id: "ADDR-001",
    type: "Home",
    name: "Priya Sharma",
    address: "123 Main Street, Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    phone: "+91 98765 43210",
    isDefault: true,
  },
  {
    id: "ADDR-002",
    type: "Office",
    name: "Priya Sharma",
    address: "456 Business Park, Floor 3",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400002",
    phone: "+91 98765 43210",
    isDefault: false,
  },
]

const wishlistItems = [
  {
    id: "WISH-001",
    productId: "PROD-001",
    name: "Traditional Lehenga Choli",
    price: 18500,
    originalPrice: 22000,
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    colors: ["Red", "Blue", "Pink"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "WISH-002",
    productId: "PROD-002",
    name: "Elegant Party Dress",
    price: 6500,
    originalPrice: 8000,
    image: "/placeholder.svg?height=200&width=200",
    inStock: false,
    colors: ["Black", "Navy"],
    sizes: ["S", "M", "L"],
  },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userData)
  const { toast } = useToast()

  const handleSaveProfile = () => {
    // In real app, this would make an API call
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#3A3A3A] mb-2">My Account</h1>
            <p className="text-[#5A5A5A]">Manage your profile, orders, and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                      <AvatarFallback className="text-lg">
                        {userData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{userData.name}</h3>
                    <p className="text-sm text-[#5A5A5A]">Member since {userData.joinDate}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Orders:</span>
                      <span className="font-semibold">{userData.totalOrders}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Spent:</span>
                      <span className="font-semibold">₹{userData.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Loyalty Points:</span>
                      <span className="font-semibold text-[#D35400]">{userData.loyaltyPoints}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span className="hidden sm:inline">Orders</span>
                  </TabsTrigger>
                  <TabsTrigger value="wishlist" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span className="hidden sm:inline">Wishlist</span>
                  </TabsTrigger>
                  <TabsTrigger value="addresses" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="hidden sm:inline">Addresses</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Settings</span>
                  </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details and contact information</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                        <Edit className="h-4 w-4 mr-2" />
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex gap-4">
                          <Button onClick={handleSaveProfile}>Save Changes</Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>Track and manage your orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {orderHistory.map((order) => (
                          <div key={order.id} className="border rounded-lg p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                              <div className="flex items-center gap-4 mb-4 lg:mb-0">
                                <div>
                                  <h3 className="font-semibold">Order #{order.id}</h3>
                                  <p className="text-sm text-[#5A5A5A]">{order.date}</p>
                                </div>
                                <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                                  {getStatusIcon(order.status)}
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-semibold text-lg">₹{order.total.toLocaleString()}</span>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </Button>
                                  {order.trackingNumber && (
                                    <Button variant="outline" size="sm">
                                      <Truck className="h-4 w-4 mr-2" />
                                      Track Order
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    width={60}
                                    height={60}
                                    className="rounded-md object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                    <p className="text-xs text-[#5A5A5A]">
                                      {item.color} • {item.size} • Qty: {item.quantity}
                                    </p>
                                    <p className="text-sm font-semibold">₹{item.price.toLocaleString()}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Wishlist Tab */}
                <TabsContent value="wishlist">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Wishlist</CardTitle>
                      <CardDescription>Items you&apos;ve saved for later</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((item) => (
                          <div key={item.id} className="border rounded-lg overflow-hidden">
                            <div className="relative">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={300}
                                height={300}
                                className="w-full h-48 object-cover"
                              />
                              <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                                <X className="h-4 w-4" />
                              </button>
                              {!item.inStock && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                  <span className="text-white font-semibold">Out of Stock</span>
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold mb-2">{item.name}</h3>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="font-bold text-lg">₹{item.price.toLocaleString()}</span>
                                {item.originalPrice > item.price && (
                                  <span className="text-sm text-[#5A5A5A] line-through">
                                    ₹{item.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              <div className="flex gap-2 mb-3">
                                <Button size="sm" className="flex-1" disabled={!item.inStock}>
                                  Add to Cart
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="text-xs text-[#5A5A5A]">
                                Colors: {item.colors.join(", ")} • Sizes: {item.sizes.join(", ")}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Addresses Tab */}
                <TabsContent value="addresses">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Saved Addresses</CardTitle>
                        <CardDescription>Manage your delivery addresses</CardDescription>
                      </div>
                      <Button>
                        <MapPin className="h-4 w-4 mr-2" />
                        Add New Address
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((address) => (
                          <div key={address.id} className="border rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{address.type}</h3>
                                {address.isDefault && <Badge variant="secondary">Default</Badge>}
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-1 text-sm">
                              <p className="font-medium">{address.name}</p>
                              <p>{address.address}</p>
                              <p>
                                {address.city}, {address.state} {address.pincode}
                              </p>
                              <p>{address.phone}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>Manage your account preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Email Notifications</h4>
                            <p className="text-sm text-[#5A5A5A]">Receive updates about your orders</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">SMS Notifications</h4>
                            <p className="text-sm text-[#5A5A5A]">Get order updates via SMS</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Privacy Settings</h4>
                            <p className="text-sm text-[#5A5A5A]">Manage your data and privacy</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>Keep your account secure</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Change Password</h4>
                            <p className="text-sm text-[#5A5A5A]">Update your account password</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Change
                          </Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-[#5A5A5A]">Add an extra layer of security</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Enable
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600">Danger Zone</CardTitle>
                        <CardDescription>Irreversible actions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-red-600">Delete Account</h4>
                            <p className="text-sm text-[#5A5A5A]">Permanently delete your account and data</p>
                          </div>
                          <Button variant="destructive" size="sm">
                            Delete Account
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
