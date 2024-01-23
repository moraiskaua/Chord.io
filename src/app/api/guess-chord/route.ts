import getNewChord from '@/app/helpers/getNewChord';
import { prisma } from '@/database/prismadb';
import { NextResponse } from 'next/server';

export const POST = async req => {
  try {
    const body = await req.json();
    const { userEmail, userInput, calculatedPoints } = body;
    const dailyChord = await getNewChord();

    if (userInput === dailyChord.name) {
      await prisma.dailyChord.update({
        where: { id: dailyChord.id },
        data: { correct: true, user: { connect: { email: userEmail } } },
      });

      await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          points: calculatedPoints,
        },
      });

      return NextResponse.json('Correct chord!', { status: 200 });
    }

    return NextResponse.json('Incorrect chord!', { status: 200 });
  } catch {
    return new NextResponse('Internal server error', { status: 500 });
  }
};
