"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock tracking data
const mockTrackingData = {
  TRK123456789: {
    orderId: "ORD-001",
    status: "delivered",
    estimatedDelivery: "2024-01-15",
    currentLocation: "Delivered",
    timeline: [
      {
        status: "Order Placed",
        date: "2024-01-10",
        time: "10:30 AM",
        location: "Mumbai",
        completed: true,
      },
      {
        status: "Order Confirmed",
        date: "2024-01-10",
        time: "11:15 AM",
        location: "Mumbai",
        completed: true,
      },
      {
        status: "Shipped",
        date: "2024-01-12",
        time: "2:00 PM",
        location: "Mumbai Warehouse",
        completed: true,
      },
      {
        status: "Out for Delivery",
        date: "2024-01-15",
        time: "9:00 AM",
        location: "Local Delivery Hub",
        completed: true,
      },
      {
        status: "Delivered",
        date: "2024-01-15",
        time: "3:30 PM",
        location: "Customer Address",
        completed: true,
      },
    ],
  },
  TRK987654321: {
    orderId: "ORD-002",
    status: "shipped",
    estimatedDelivery: "2024-01-18",
    currentLocation: "In Transit - Delhi Hub",
    timeline: [
      {
        status: "Order Placed",
        date: "2024-01-10",
        time: "2:15 PM",
        location: "Mumbai",
        completed: true,
      },
      {
        status: "Order Confirmed",
        date: "2024-01-10",
        time: "3:00 PM",
        location: "Mumbai",
        completed: true,
      },
      {
        status: "Shipped",
        date: "2024-01-14",
        time: "11:30 AM",
        location: "Mumbai Warehouse",
        completed: true,
      },
      {
        status: "In Transit",
        date: "2024-01-16",
        time: "8:00 AM",
        location: "Delhi Hub",
        completed: true,
      },
      {
        status: "Out for Delivery",
        date: "Expected: 2024-01-18",
        time: "Morning",
        location: "Local Delivery Hub",
        completed: false,
      },
    ],
  },
}

interface Timeline {
    status: string;
    date: string;
    time: string;
    location: string;
    completed: boolean;
}

interface Tracking {
  orderId: string;
  status: string;
  estimatedDelivery: string;
  currentLocation: string;
  timeline: Timeline[]
  }

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingData, setTrackingData] = useState<Tracking | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleTrackOrder = () => {
    if (!trackingNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking number",
        variant: "warning",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const data = mockTrackingData[trackingNumber as keyof typeof mockTrackingData]
      if (data) {
        setTrackingData(data)
      } else {
        toast({
          title: "Order Not Found",
          description: "Please check your tracking number and try again",
          variant: "warning",
        })
        setTrackingData(null)
      }
      setIsLoading(false)
    }, 1000)
  }

  const getStatusIcon = (status: string, completed: boolean) => {
    if (!completed) return <Clock className="h-4 w-4 text-gray-400" />

    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "shipped":
      case "in transit":
      case "out for delivery":
        return <Truck className="h-4 w-4 text-blue-600" />
      default:
        return <Package className="h-4 w-4 text-orange-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
      case "in transit":
        return "bg-blue-100 text-blue-800"
      case "out for delivery":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#3A3A3A] mb-2">Track Your Order</h1>
            <p className="text-[#5A5A5A]">Enter your tracking number to get real-time updates</p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter Tracking Details</CardTitle>
              <CardDescription>You can find your tracking number in the order confirmation email</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input
                    id="tracking"
                    placeholder="Enter your tracking number (e.g., TRK123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleTrackOrder()}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleTrackOrder} disabled={isLoading}>
                    <Search className="h-4 w-4 mr-2" />
                    {isLoading ? "Tracking..." : "Track Order"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingData && (
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Order #{trackingData.orderId}</CardTitle>
                      <CardDescription>Tracking Number: {trackingNumber}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(trackingData.status)}>
                      {trackingData.status.charAt(0).toUpperCase() + trackingData.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#5A5A5A]" />
                      <span className="text-sm">
                        <strong>Current Location:</strong> {trackingData.currentLocation}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#5A5A5A]" />
                      <span className="text-sm">
                        <strong>Expected Delivery:</strong> {trackingData.estimatedDelivery}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                  <CardDescription>Track your order&apos;s journey from placement to delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingData.timeline.map((event: Timeline, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`p-2 rounded-full ${
                              event.completed ? "bg-white border-2 border-orange-500" : "bg-gray-100"
                            }`}
                          >
                            {getStatusIcon(event.status, event.completed)}
                          </div>
                          {index < trackingData.timeline.length - 1 && (
                            <div className={`w-0.5 h-8 ${event.completed ? "bg-orange-500" : "bg-gray-200"}`} />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-medium ${event.completed ? "text-[#3A3A3A]" : "text-[#5A5A5A]"}`}>
                              {event.status}
                            </h4>
                            <span className="text-sm text-[#5A5A5A]">
                              {event.date} • {event.time}
                            </span>
                          </div>
                          <p className="text-sm text-[#5A5A5A]">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>Contact our support team for any queries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-[#D35400]" />
                      <div>
                        <p className="font-medium">Call Us</p>
                        <p className="text-sm text-[#5A5A5A]">+91 9959067795</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-[#D35400]" />
                      <div>
                        <p className="font-medium">Email Us</p>
                        <p className="text-sm text-[#5A5A5A]">support@dressdexterity.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Sample Tracking Numbers */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Try Sample Tracking Numbers</CardTitle>
              <CardDescription>Use these sample tracking numbers to see the tracking in action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Delivered Order</p>
                  <p className="text-sm text-[#5A5A5A] mb-2">TRK123456789</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTrackingNumber("TRK123456789")
                      handleTrackOrder()
                    }}
                  >
                    Try This
                  </Button>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">In Transit Order</p>
                  <p className="text-sm text-[#5A5A5A] mb-2">TRK987654321</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTrackingNumber("TRK987654321")
                      handleTrackOrder()
                    }}
                  >
                    Try This
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
