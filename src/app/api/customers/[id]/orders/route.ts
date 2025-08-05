import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(request: NextRequest, { params }: {params: Promise<{id:string}>}) {
  try {
    

    const {id} = await params;

    if (!id) {
      return NextResponse.json({ error: 'Missing user_id parameter' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Fetch orders for the user
    const { data: orders, error: ordersError, count } = await supabase
      .from('orders')
      .select('*', { count: 'exact' })
      .eq('customer_id', id)

    if (ordersError) {
      console.error('Error fetching orders:', ordersError)
      return NextResponse.json({ error: 'Failed to fetch user orders' }, { status: 500 })
    }

    // Sum the "total" field
    const { data: sumData, error: sumError } = await supabase
      .from('orders')
      .select('total', { head: false })
      .eq('customer_id', id)

    if (sumError) {
      console.error('Error calculating total:', sumError)
      return NextResponse.json({ error: 'Failed to calculate total spent' }, { status: 500 })
    }

    const totalSpent = sumData?.reduce((acc: number, order: { total: number }) => acc + (order.total || 0), 0) || 0

    return NextResponse.json({
      success: true,
      data: {
        count: count || 0, 
        total_spent: totalSpent || 0,
        orders,
      },
    })
  } catch (error) {
    console.error('User order summary API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
