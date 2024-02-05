import prisma from '@/app/database/prismadb';
import getCurrentUser from '@/app/helpers/getCurrentUser';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const session = await getCurrentUser();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const dailyChord = await prisma.dailyChord.findMany({
      orderBy: {
        date: 'desc',
      },
    });

    const userChord = await prisma.userChord.findFirst({
      where: {
        userId: session.id,
        dailyChordId: dailyChord[0].id,
      },
    });

    return NextResponse.json(
      userChord ? userChord : { attempts: 0, correct: false },
      { status: 200 },
    );
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
