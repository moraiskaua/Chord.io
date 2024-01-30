import getUsers from '@/app/helpers/getUsers';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const users = await getUsers();

    return NextResponse.json(users);
  } catch (e) {
    return new NextResponse('Internal server error', { status: 500 });
  }
};
