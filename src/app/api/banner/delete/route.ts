import connectToDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Banner from "@/models/Banner";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyAdmin(req);
    await connectToDB();

    const deleted = await Banner.findByIdAndDelete(params.id);
    if (!deleted) throw new Error('Banner not found');

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 401 });
  }
}
