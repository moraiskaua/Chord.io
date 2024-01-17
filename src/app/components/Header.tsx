'use client';

import { IoSettings, IoHelpCircleSharp } from 'react-icons/io5';
import { MdLeaderboard } from 'react-icons/md';
import { CgPiano } from 'react-icons/cg';
import { FaGuitar } from 'react-icons/fa';
import { useContext } from 'react';
import { InstrumentContext } from '@/contexts/InstrumentContext';
import { HiCalendarDays } from 'react-icons/hi2';
import { GiSandCastle } from 'react-icons/gi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { instrument, setInstrument } = useContext(InstrumentContext);
  const pathname = usePathname();

  return (
    <header className="w-full uppercase text-primary font-bold text-7xl flex justify-around items-center h-40">
      <div className="flex gap-4 items-center">
        <IoSettings size={30} />
        {pathname === '/playground' ? (
          <Link href="/">
            <HiCalendarDays size={35} />
          </Link>
        ) : (
          <Link href="/playground">
            <GiSandCastle size={35} />
          </Link>
        )}
      </div>
      <h1>CHORD.IO</h1>
      <div className="flex gap-4 items-center">
        <MdLeaderboard size={35} />
        {instrument === 'piano' ? (
          <CgPiano
            size={35}
            className="cursor-pointer hover:scale-125 transition-all duration-300"
            onClick={() => setInstrument(prev => 'guitar-acoustic')}
          />
        ) : (
          <FaGuitar
            size={30}
            className="cursor-pointer hover:scale-125 transition-all duration-300"
            onClick={() => setInstrument(prev => 'piano')}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
