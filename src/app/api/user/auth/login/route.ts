// src/app/api/users/login/route.ts

import { NextResponse } from 'next/server';
import connectToDB  from '@/lib/mongodb'
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const db = await connectToDB();

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const {email, password} = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ message: 'Login successful', user: userWithoutPassword });

  } catch (error) {
    console.error('Login error:',  error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}