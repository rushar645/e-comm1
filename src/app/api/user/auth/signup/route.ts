import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDB from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req: Request) {
  try {
    await connectToDB();

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password || !phone) {
      return NextResponse.json({ error: 'All fields (name, email, phone, password) are required.' }, { status: 400 });
    }

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 409 });
    }

    const existingUser1 = await db.collection('users').findOne({ phone });
    if (existingUser1) {
      return NextResponse.json({ error: 'A user with this phone already exists.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      phone,
      password: hashedPassword,
      wishlist: [],
      cart: [],
      orders: [],
      address: [],
      isAdmin: false,
      isActive: true,
      createdAt: new Date(),
    };

    const result = await db.collection('users').insertOne(newUser);

    return NextResponse.json(
      { message: 'User registered successfully', userId: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
