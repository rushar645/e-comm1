// app/api/banners/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/mongodb';
import Banner from '@/models/Banner';
import { verifyAdmin } from '@/lib/verifyAdmin';

export async function POST(req: NextRequest) {
  try {
    await verifyAdmin(req);
    const db = await connectToDB();

    const data = await req.json();
    const banner = await Banner.create(data);

    return NextResponse.json(banner, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Error creating banner" }, { status: 401 });
  }
}
