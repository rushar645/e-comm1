import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import connectToDB from "@/lib/mongodb";
import { GridFSBucket, ObjectId } from "mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const formData = await req.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File;

  const db = await connectToDB();
  
  const bucket = new GridFSBucket(db, { bucketName: "productImages" });

  const stream = bucket.openUploadStream(imageFile.name);
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  Readable.from(buffer).pipe(stream);

  const imageId = stream.id;

  const result = await db.collection("products").insertOne({
    name,
    description,
    price,
    category,
    imageId,
    createdAt: new Date(),
  });

  return NextResponse.json({ message: "Product created", id: result.insertedId });
}
