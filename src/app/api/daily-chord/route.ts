import getNewChord from '@/app/helpers/getNewChord';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const dailyChord = await getNewChord();

    let chord = {
      name: dailyChord.name,
      notes: dailyChord.notes,
    };

    return NextResponse.json(chord);
  } catch (e) {
    return new NextResponse('Internal server error', { status: 500 });
  }
};
