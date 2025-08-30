"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/contexts/user-contexts"
import api from "@/lib/axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const default_order = {
    order: {
      id: "",
      status: "",
      order_items: [{
        sku: "",
        id: "",
        image: "",
        name: "",
        color: "",
        size: "",
        quantity: "",
        price: "",
        customSize: {
          unit:""
        }
      }],
      created_at: "",
      tracking_number: ""
    },
    customer: {
      name: "",
      email: "",
      phone: "",
    },
    shipping: {
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  }
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [order, setOrder] = useState(default_order)
  const [status, setStatus] = useState<
    "pending" | "shipped" | "delivered" | "cancelled"
  >("pending")
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {

    params.then((p) => setResolvedParams(p))

  }, [params])

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await api.get(`/api/orders/${resolvedParams?.id}`)

        if (res.status == 200) {
          setOrder(res.data.data)
          setStatus(res.data.data.order.status)
          console.log("Order recieveded", res.data.data)
        }
      } catch (error) {
        console.log("No order found", error)
      }
    }
    if (resolvedParams)
      fetchOrder();
  }, [resolvedParams])


  async function updateOrder() {
    const payload = order.order
    payload.status = status
    try {
      const res = await api.put(`/api/orders/${resolvedParams?.id}`, order.order)
      if (res.status == 200) {
        toast({
          title: "Order Updated",
          description: "The order has been successfully updated",
          variant: "success"
        })
      }
    } catch (error) {
      toast({
        title: "Order Update Failed",
        description: "Something went wrong, try again",
        variant: "error"
      })
    }
  }


  useEffect(() => {
    if (!loading)
      if (user?.role == "customer" || !user)
        router.push("/admin/login")

  }, [router, user])

  if (user?.role == "customer" || !user) {
    return (
      <div></div>
    )
  }
  else if (user?.role == "admin")
    return (
      <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <p><strong>Order ID:</strong> {order.order.id}</p>
        <p><strong>Date:</strong> {order.order.created_at}</p>

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
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="" className="text-xl">Tracking Number</label><input value={order.order.tracking_number} className="rounded-sm border-1 border-amber-800 px-2 py-4" onChange={(e) => setOrder((prev) => ({ ...prev, order: { ...prev.order, tracking_number: e.target.value }, }))} />
          </div>
          <Button onClick={updateOrder} className="mt-4 border-amber-800" size={"lg"} variant={"outline"}>
            Update Order
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {order?.order.order_items?.map((item) => (
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
                    {item.color} • {item.size || "M"} • Qty: {item.quantity}
                  </p>
                  <div className="text-xs flex flex-col mt-2 text-[#5A5A5A]">
                    {item.customSize && Object.entries(item.customSize)
                      .filter(([key]) => key !== "unit")
                      .map(([key, value]) => (
                        <span key={key}>
                          {String(key)} •{String(value)} {item.customSize.unit}
                        </span>
                      ))}
                  </div>

                  <p className="text-sm font-semibold">₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <button>Update Order</button> */}
        </div>
      </div>
    )
}
