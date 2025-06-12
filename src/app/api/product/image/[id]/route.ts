// app/api/products/image/[id]/route.ts
import { NextRequest } from "next/server";
import connectToDB from "@/lib/mongodb";
import { GridFSBucket, ObjectId } from "mongodb";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await connectToDB();
  
  const bucket = new GridFSBucket(db, { bucketName: "productImages" });

  const imageId = new ObjectId(params.id);

  const stream = bucket.openDownloadStream(imageId);

  return new Response(stream as any, {
    headers: { "Content-Type": "image/jpeg" }, // or dynamic
  });
}
