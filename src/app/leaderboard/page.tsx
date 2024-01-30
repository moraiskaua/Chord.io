'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);
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
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody className="align-top text-center h-full">
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Leaderboard;
