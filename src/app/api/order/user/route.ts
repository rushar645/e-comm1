// app/api/orders/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ message: "Missing userId" }, { status: 400 });

  const db = await connectToDB();

  const orders = await db.collection("orders")
    .find({ userId: new ObjectId(userId) })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(orders);
}
