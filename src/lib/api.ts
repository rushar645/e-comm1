import api from "./axios"

export async function fetchOrders({
  page = 1,
  limit = 20,
  status,
  customer_id,
}: {
  page?: number
  limit?: number
  status?: string
  customer_id?: string
}) {
  try {
    const response = await api.get("/api/orders", {
      params: {
        page,
        limit,
        status,
        customer_id,
      },
    })

    return response.data
  } catch (error: any) {
    console.error("Error fetching orders:", error.response?.data || error.message)
    throw error
  }
}
