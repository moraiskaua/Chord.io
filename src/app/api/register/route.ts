import bcrypt from 'bcrypt';
import prisma from '@/app/database/prismadb';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch {
    return new NextResponse('Internal server error', { status: 500 });
  }
};
