import { NextRequest, NextResponse } from "next/server";
import { ObjectId, GridFSBucket } from "mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import connectToDB from "@/lib/mongodb";

export async function DELETE(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const { productId } = await req.json();

  const db = await connectToDB();
  const product = await db.collection("products").findOne({ _id: new ObjectId(productId) });

  if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

  if (product.imageId) {
    const bucket = new GridFSBucket(db, { bucketName: "productImages" });
    await bucket.delete(product.imageId);
  }

  await db.collection("products").deleteOne({ _id: new ObjectId(productId) });

  return NextResponse.json({ message: "Product deleted" });
}
