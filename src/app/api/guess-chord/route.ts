import getNewChord from '@/app/helpers/getNewChord';
import { prisma } from '@/database/prismadb';
import { NextResponse } from 'next/server';

export const POST = async req => {
  try {
    const body = await req.json();
    const { name } = body;
    const dailyChord = await getNewChord();

    if (name === dailyChord.name) {
      await prisma.dailyChord.update({
        where: { id: dailyChord.id },
        data: { correct: true },
      });

      return NextResponse.json('Correct chord!', { status: 200 });
    }

    return NextResponse.json('Incorrect chord!', { status: 200 });
  } catch {
    return new NextResponse('Internal server error', { status: 500 });
  }
};
