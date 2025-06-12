import connectToDB from "@/lib/mongodb";
import Banner from "@/models/Banner";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const selected = searchParams.get('selected');

    const filter = selected === 'true' ? { selected: true } : {};
    const banners = await Banner.find(filter).sort({ createdAt: -1 });

    return NextResponse.json(banners);
  } catch (err) {
    return NextResponse.json({ error: "Internal Server error" }, { status: 500 });
  }
}
