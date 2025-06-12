// app/api/banners/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/mongodb';
import Banner from '@/models/Banner';
import { verifyAdmin } from '@/lib/verifyAdmin';


export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyAdmin(req);
    await connectToDB();

    const data = await req.json();
    const updated = await Banner.findByIdAndUpdate(params.id, data, { new: true });

    if (!updated) throw new Error('Banner not found');
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 401 });
  }
}
