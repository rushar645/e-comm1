// app/api/orders/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, items, couponCode } = body;

  if (!userId || !items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }

  const db = await connectToDB();

  const productIds = items.map((item: any) => new ObjectId(item.productId));
  const products = await db.collection("products")
    .find({ _id: { $in: productIds } })
    .toArray();

  const productMap = Object.fromEntries(products.map(p => [p._id.toString(), p]));
  let total = 0;

  for (const item of items) {
    const product = productMap[item.productId];
    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
    total += product.price * item.quantity;
  }

  let discount = 0;
  let couponApplied = false;

  if (couponCode) {
    const coupon = await db.collection("coupons").findOne({ code: couponCode });
    if (coupon) {
      couponApplied = true;
      discount = coupon.discountAmount || 0;
    }
  }

  const finalTotal = total - discount;

  const order = {
    userId: new ObjectId(userId),
    items: items.map((item: any) => ({
      productId: new ObjectId(item.productId),
      quantity: item.quantity
    })),
    totalAmount: finalTotal,
    couponApplied,
    couponCode: couponApplied ? couponCode : null,
    createdAt: new Date()
  };

  const result = await db.collection("orders").insertOne(order);

  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $push: { orderIds: result.insertedId } }
  );

  return NextResponse.json({ message: "Order placed", orderId: result.insertedId });
}
