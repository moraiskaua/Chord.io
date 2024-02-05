import prisma from '@/app/database/prismadb';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        points: 'desc',
      },
    });

    return NextResponse.json(users ? users : [], { status: 200 });
  } catch {
    return new NextResponse('Internal server error', { status: 500 });
  }
};
