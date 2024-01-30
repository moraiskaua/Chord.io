'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const Leaderboard = () => {
  const router = useRouter();

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
          <tr>
            <td>1</td>
            <td>Kauã</td>
            <td>200</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Kauã</td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Leaderboard;
