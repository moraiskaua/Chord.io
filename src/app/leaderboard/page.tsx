'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { User } from '@prisma/client';
import axios from 'axios';
import Loading from '../components/Loading';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const t = useTranslations('leaderboard');
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('/api/get-users');
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <>
      {users.length === 0 && <Loading />}
      <header className="w-full uppercase text-primary font-bold text-7xl flex justify-around items-center h-40">
        <div
          className="absolute top-3 left-3 ring-2 ring-primary p-2 rounded-full text-primary cursor-pointer"
          onClick={() => router.back()}
        >
          <FaArrowLeft size={15} />
        </div>
        <Link href="/">
          <h1>CHORD.IO</h1>
        </Link>
      </header>
      <table className="w-full h-full text-white">
        <thead className="bg-tertiary">
          <tr>
            <th>{t('rank')}</th>
            <th>{t('name')}</th>
            <th>{t('points')}</th>
          </tr>
        </thead>
        <tbody className="text-center h-full shadow-custom bg-tertiary">
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td className="flex justify-center items-center gap-3">
                {user.image ? (
                  <Image
                    src={user.image ?? localStorage.getItem('userImage')}
                    height={35}
                    width={35}
                    alt="Profile photo"
                    className="rounded-full aspect-square"
                  />
                ) : (
                  <FaUserCircle size={35} className="text-white/45" />
                )}
                {user.name}
              </td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Leaderboard;
