// app/api/coupons/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/mongodb';
import Coupon from '@/models/Coupon';
import { verifyAdmin } from '@/lib/verifyAdmin';

export async function POST(req: NextRequest) {
  try {
    await verifyAdmin();
    await connectToDB();

    const { code, discountAmount } = await req.json();

    if (!code || !discountAmount) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }

    const existing = await Coupon.findOne({ code });
    if (existing) {
      return NextResponse.json({ message: 'Coupon already exists' }, { status: 409 });
    }

    const coupon = await Coupon.create({ code, discountAmount });
    return NextResponse.json(coupon, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
