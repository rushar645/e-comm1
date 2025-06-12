import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { connect } from "http2";

export async function POST(req: NextRequest) {
  const { userId, productId } = await req.json();

  const db = await connectToDB();

  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { wishlist: new ObjectId(productId) } }
  );

  return NextResponse.json({ message: "Product removed from wishlist" });
}
