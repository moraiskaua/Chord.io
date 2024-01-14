'use client';

import { IoSettings, IoHelpCircleSharp } from 'react-icons/io5';
import { MdLeaderboard } from 'react-icons/md';
import { CgPiano } from 'react-icons/cg';
import { FaGuitar } from 'react-icons/fa';
import { useContext } from 'react';
import { InstrumentContext } from '@/contexts/InstrumentContext';

const Header = () => {
  const { instrument, setInstrument } = useContext(InstrumentContext);

  return (
    <header className="w-full uppercase text-primary font-bold text-7xl flex justify-around items-center h-40">
      <div className="flex gap-4 items-center">
        <IoSettings size={30} />
        <IoHelpCircleSharp size={35} />
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
