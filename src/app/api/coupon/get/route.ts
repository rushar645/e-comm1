// app/api/coupons/lookup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

export async function GET(req: NextRequest) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ message: 'No coupon code provided' }, { status: 400 });
  }

  const coupon = await Coupon.findOne({ code });

  if (!coupon) {
    return NextResponse.json({ valid: false, message: 'Coupon not found' }, { status: 404 });
  }

  return NextResponse.json({
    valid: true,
    discountAmount: coupon.discountAmount,
    code: coupon.code
  });
}
