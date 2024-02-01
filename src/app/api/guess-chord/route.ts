import getNewChord from '@/app/helpers/getNewChord';
import { prisma } from '@/database/prismadb';
import { NextRequest, NextResponse } from 'next/server';

interface IGuessChordBody {
  userEmail: string;
  userInput: string;
  calculatedPoints: number;
}

export const POST = async (req: NextRequest) => {
  try {
    const body: IGuessChordBody = await req.json();
    const { userEmail, userInput, calculatedPoints } = body;
    const dailyChord = await getNewChord();
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
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
            email: userEmail,
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
