"use client"

import { useUser } from "@/contexts/user-contexts"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function OrderDetailPage({
  params,
}: { 
  params: Promise<{ id: string }>
}) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

  useEffect(() => {
    params.then((p) => setResolvedParams(p))
  }, [params])

  const [status, setStatus] = useState<
    "pending" | "shipped" | "delivered" | "cancelled"
  >("pending")

  // Sample order data
  const order = {
    id: resolvedParams?.id,
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
    },
    status: status,
  }
  const { user } = useUser();
  const router = useRouter();

  useEffect(()=>{

    if(user?.role == "customer" || !user)
      router.push("/admin/login")

  },[router,user])


   if(user?.role == "customer" || !user){
    return(
      <div></div>
    )
  }
  else if(user?.role == "admin")
  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Order Details</h1>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Date:</strong> {order.date}</p>

      <div>
        <h2 className="text-xl font-semibold">Customer Info</h2>
        <p><strong>Name:</strong> {order.customer.name}</p>
        <p><strong>Email:</strong> {order.customer.email}</p>
        <p><strong>Phone:</strong> {order.customer.phone}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Shipping Info</h2>
        <p><strong>Address:</strong> {order.shipping.address}</p>
        <p><strong>City:</strong> {order.shipping.city}</p>
        <p><strong>State:</strong> {order.shipping.state}</p>
        <p><strong>Pincode:</strong> {order.shipping.pincode}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Status</h2>
        <select
          className="border rounded p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
        >
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <p className="mt-2">Current Status: <strong>{status}</strong></p>
      </div>
    </div>
  )
}
