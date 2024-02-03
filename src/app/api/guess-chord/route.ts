import getNewChord from '@/app/helpers/getNewChord';
import prisma from '@/app/database/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/helpers/getCurrentUser';

interface IGuessChordBody {
  userInput: string;
  calculatedPoints: number;
}

export const POST = async (req: NextRequest) => {
  try {
    const body: IGuessChordBody = await req.json();
    const { userInput, calculatedPoints } = body;
    const session = await getCurrentUser();
    const dailyChord = await getNewChord();

    const user = await prisma.user.findUnique({
      where: {
        email: session.email,
      },
    });

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const existingUserChord = await prisma.userChord.findFirst({
      where: {
        userId: user.id,
        dailyChordId: dailyChord.id,
      },
    });

    if (existingUserChord && existingUserChord.correct) {
      return NextResponse.json('User already answered correctly', {
        status: 200,
      });
    }

    if (userInput === dailyChord.name) {
      await prisma.$transaction([
        prisma.userChord.create({
          data: {
            userId: user.id,
            dailyChordId: dailyChord.id,
            correct: userInput === dailyChord.name,
          },
        }),
        prisma.user.update({
          where: {
            email: session.email,
          },
          data: {
            points: {
              increment: calculatedPoints,
            },
          },
        }),
      ]);

      return NextResponse.json('Correct chord!', { status: 200 });
    }

    return NextResponse.json('Incorrect chord!', { status: 200 });
  } catch {
    return new NextResponse('Internal server error', { status: 500 });
  }
};
