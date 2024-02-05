import getUsers from '@/app/helpers/getUsers';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const users = await getUsers();

    const headers = {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    };

    return new NextResponse(JSON.stringify(users), {
      headers,
    });
  } catch {
    return new NextResponse('Internal server error', { status: 500 });
  }
};
