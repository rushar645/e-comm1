import { NextRequest, NextResponse } from "next/server";
import { ObjectId, GridFSBucket } from "mongodb";
import { Readable } from "stream";
import connectToBD from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function PUT(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const formData = await req.formData();
  const productId = formData.get("productId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File | null;

  const db = await connectToBD();

  const updateData: any = { name, description, price, category };

  if (imageFile) {
    const bucket = new GridFSBucket(db, { bucketName: "productImages" });
    const stream = bucket.openUploadStream(imageFile.name);
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    Readable.from(buffer).pipe(stream);
    updateData.imageId = stream.id;
  }

  await db.collection("products").updateOne(
    { _id: new ObjectId(productId) },
    { $set: updateData }
  );

  return NextResponse.json({ message: "Product updated" });
}
