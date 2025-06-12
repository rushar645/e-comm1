"use client"

import { useState } from "react"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState<
    "pending" | "shipped" | "delivered" | "cancelled"
  >("pending")

  // Sample order data
  const order = {
    id: params.id,
    date: "June 5, 2023",
    customer: {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43210",
    },
    shipping: {
      address: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",

    }
  }
}
