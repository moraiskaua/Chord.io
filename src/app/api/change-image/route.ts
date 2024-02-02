import { prisma } from '@/app/database/prismadb';
import getCurrentUser from '@/app/helpers/getCurrentUser';
import { NextResponse } from 'next/server';

export const POST = async req => {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { imageUrl } = body;

    const updatedUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        image: imageUrl,
      },
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
