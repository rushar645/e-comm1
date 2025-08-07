import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { total } = await req.json();

  if (!total) {
    return NextResponse.json({ error: "Total amount required" }, { status: 400 });
  }

  const options = {
    amount: total * 100, // INR → paise
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
  }
}
