import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Missing user_id parameter' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Fetch orders for the user
    const { data: orders, error: ordersError, count } = await supabase
      .from('orders')
      .select('*', { count: 'exact' })
      .eq('customer_id', id)

    if (ordersError) {
      console.error('Error fetching orders:', ordersError)
      return NextResponse.json(
        { error: 'Failed to fetch user orders' },
        { status: 500 }
      )
    }

    const orderIds = orders?.map((order) => order.id) || []

    if (orderIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          count: 0,
          total_spent: 0,
          orders: [],
        },
      })
    }

    // Fetch total spent
    const { data: sumData, error: sumError } = await supabase
      .from('orders')
      .select('total', { head: false })
      .eq('customer_id', id)

    if (sumError) {
      console.error('Error calculating total:', sumError)
      return NextResponse.json(
        { error: 'Failed to calculate total spent' },
        { status: 500 }
      )
    }

    const totalSpent =
      sumData?.reduce(
        (acc: number, order: { total: number }) => acc + (order.total || 0),
        0
      ) || 0

    // Fetch order items for the fetched orders
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select(
        'order_id, sku, image, name, color, size, quantity, price, custom_size'
      )
      .in('order_id', orderIds)

    if (itemsError) {
      console.error('Error fetching order items:', itemsError)
      return NextResponse.json(
        { error: `Failed to fetch order items:::${itemsError.message}` },
        { status: 500 }
      )
    }

    // Map items into their respective orders
    const ordersWithItems = orders.map((order) => ({
      ...order,
      items: orderItems?.filter((item) => item.order_id === order.id) || [],
    }))

    return NextResponse.json({
      success: true,
      data: {
        count: count || 0,
        total_spent: totalSpent,
        orders: ordersWithItems,
      },
    })
  } catch (error) {
    console.error('User order summary API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
