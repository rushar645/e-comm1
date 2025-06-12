import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  const { userId, productId } = await req.json();

  const db = await connectToDB();

  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { cart: new ObjectId(productId) } }
  );

  return NextResponse.json({ message: "Product removed from cart" });
}
