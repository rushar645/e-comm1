"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Package, MapPin, Settings, Edit, Eye, Truck, CheckCircle, Clock, X } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@/contexts/user-contexts"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { Address, Order } from "@/types"
import Link from "next/link"
// import { Camera } from "lucide-react"
// import { SingleImageUpload } from "@/components/ui/single-image-upload"
// import { UploadedImage } from "@/components/ui/single-image-upload"


const defaultFormData = {
  id: "",
  name: "Your Name",
  avatar:"",
  totalOrders:"",
  totalSpent:"",
  email:"your-email@host.com",
  phone:9999999999
}


type WishListItem = {
  id: string;
  image: string;
  name: string;
  inStock: boolean;
  price: string;
  originalPrice: string;
  colors: string[];
  sizes: string[];
};

const defaultWishList: WishListItem[] = [{
  id: "",
  image: "",
  name: "",
  inStock: false,
  price: "",
  originalPrice: "",
  colors: [],
  sizes: [],
}];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showAvatarUpload, setShowAvatarUpload] = useState(false)
  const [formData, setFormData] = useState(defaultFormData)
  const [wishlistItems, setWishlistItems] = useState<WishListItem[]>(defaultWishList)
  const [orderHistory, setOrderHistory] = useState<Order[]>([])
  const [addresses, setAdresses] = useState<Address[]>([])
  
  const { toast } = useToast()
  const router = useRouter();
  const {user, loading} = useUser();

  useEffect(() => {
    if (!user){
      if(!loading)
        router.push('/')
      return
    }
    if(user?.role=="admin"){
      router.push('/')
    }
    const fetchData = async () => {
      try {
        const res = await api.get(`api/customers/${user.id}/orders`)
        const { data } = res.data
        // console.log(data)
        // console.log(user)
        if(user.role == "customer")
        setFormData({
          id: user.id,
          name: user.name,
          avatar: '',
          email: user.email,
          phone: user.phone,
          totalOrders: data.count.toString(),
          totalSpent: data.total_spent.toFixed(2)
        })
        setOrderHistory(data.orders)
      } catch (e) {
        console.error("Error fetching account data", e)
      }

      // Restore wishlist from localStorage
      const savedWishlist = localStorage.getItem("wishlist")
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist))
        } catch (e) {
          console.error("Invalid wishlist data", e)
          setWishlistItems([])
        }
      }
    }

    fetchData()
  }, [user, loading, router])

  useEffect(()=>{
    if(!user){
      if(!loading)
        router.push('/')
      return;
    }
    const fetchAddresses = async() =>{
      try{
        const res = await api.get(`api/customers/${user.id}/address`)
        const data = res.data.data;

        if (res.status == 200){
          setAdresses(data)
        }
      }
      catch(e){
        console.log("Error occured while fetching Address(es)", e)
      }
    }

    fetchAddresses()
  },[user, loading])

  const handleSaveProfile = async () => {
    try {
      // In real app, this would make an API call
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      setIsEditing(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Profile update error:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "warning",
      })
    }
  }

  // const handleAvatarChange = (image: UploadedImage) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     avatar: image,
  //   }))
  //   setShowAvatarUpload(false)

  //   toast({
  //     title: "Avatar Updated",
  //     description: "Your profile picture has been updated successfully.",
  //   })
  // }

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
                    <div className="relative group mb-4">
                      <Avatar className="h-20 w-20 bg-amber-800">
                        <AvatarImage src={formData.avatar || "/placeholder.svg"} alt={formData.name} />
                        <AvatarFallback className="text-xl font-semibold text-white">
                          {formData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      {/* Camera overlay */}
                      <button
                        onClick={() => (console.log("It's Youuu!!"))}
                        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-10 transition-opacity"
                      >
                        {/* <Camera className="h-6 w-6 text-white" /> */}
                      </button>
                    </div>

                    {/* Avatar Upload Modal */}
                    {showAvatarUpload && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Update Profile Picture</h3>
                            <Button variant="ghost" size="sm" onClick={() => setShowAvatarUpload(false)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* <SingleImageUpload
                            onImageChange={handleAvatarChange}
                            folder="avatars"
                            width={200}
                            height={200}
                            className="w-full"
                          /> */}
                        </div>
                      </div>
                    )}

                    <h3 className="font-semibold text-lg">{formData.name}</h3>
                    {/* <p className="text-sm text-[#5A5A5A]">Member since {formData.joinDate}</p> */}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Orders:</span>
                      <span className="font-semibold">{formData.totalOrders}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Spent:</span>
                      <span className="font-semibold">₹{formData.totalSpent?.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 mb-1">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="flex w-full">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="h-6 w-6 scale-130 sm:scale-100" />
                    <span className="hidden sm:inline">Profile</span>
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="flex items-center gap-2">
                    <Package className="h-6 w-6 scale-130 sm:scale-100" />
                    <span className="hidden sm:inline">Orders</span>
                  </TabsTrigger>
                  {/* <TabsTrigger value="wishlist" className="flex items-center gap-2">
                    <Heart className="h-10 w-10" />
                    <span className="hidden sm:inline">Wishlist</span>
                  </TabsTrigger> */}
                  <TabsTrigger value="addresses" className="flex items-center gap-2">
                    <MapPin className="h-6 w-6 scale-130 sm:scale-100" />
                    <span className="hidden sm:inline">Addresses</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="h-6 w-6 scale-130 sm:scale-100" />
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
                            onChange={(e) => setFormData({ ...formData, phone: Number(e.target.value) })}
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
                        {orderHistory?.map((order) => (
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
                                  {/* <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </Button> */}
                                  {order.tracking_number && (
                                    <>
                                    <Button variant="outline"  size="sm">
                                      <Truck className="h-4 w-4 mr-2" />
                                      <a target="blank" href="https://www.dtdc.in/trace.asp">Track Your Order</a>
                                    </Button>
                                    <Button variant="outline" size="sm">
                                    <MapPin className="h-6 w-6 scale-130 sm:scale-100 mr-2" />
                                      Tracking ID: {order.tracking_number}
                                    </Button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {order?.items?.map((item) => (
                                <div key={item.sku} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
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
                        <CardDescription className="py-2">{addresses.length>0 ?"All your delivery addresses" : "No address found"}</CardDescription>
                      </div>
                      {/* <Button>
                        <MapPin className="h-4 w-4 mr-2" />
                        Add New Address
                      </Button> */}
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses?.map((address) => (
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
                    {/* <Card>
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
                    </Card> */}

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
