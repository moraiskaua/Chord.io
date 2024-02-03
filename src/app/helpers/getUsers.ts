import prisma from '@/app/database/prismadb';

const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        points: 'desc',
      },
    });

    return users;
  } catch {
    return [];
  }
};

export default getUsers;
