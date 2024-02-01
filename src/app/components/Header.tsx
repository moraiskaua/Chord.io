'use client';

import { MdLeaderboard } from 'react-icons/md';
import { CgPiano } from 'react-icons/cg';
import { FaGuitar } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { InstrumentContext } from '@/contexts/InstrumentContext';
import { HiCalendarDays } from 'react-icons/hi2';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { BiUser } from 'react-icons/bi';
import { RxExit } from 'react-icons/rx';
import { IoMdSettings, IoMdHelpCircle } from 'react-icons/io';
import { GiPerspectiveDiceSixFacesRandom as LuckyCube } from 'react-icons/gi';
import Modal from './Modal';
import { helpData } from '@/data/helpData';

const Header = () => {
  const [settingsModal, setSettingsModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);

  const { instrument, setInstrument } = useContext(InstrumentContext);
  const pathname = usePathname();
  const session = useSession();

  return (
    <>
      {helpModal && (
        <Modal
          variant="help"
          title="Tutorial"
          bodyModal={helpData}
          onClose={() => setHelpModal(false)}
        />
      )}
      <header className="w-full uppercase text-primary font-bold text-7xl flex justify-around items-center h-40">
        <div className="flex gap-4 items-center">
          {session.status === 'authenticated' ? (
            <RxExit
              size={35}
              className="cursor-pointer hover:scale-110 transition-all duration-300"
              onClick={() => signOut()}
            />
          ) : (
            <Link href="/sign-in">
              <BiUser
                size={30}
                className="cursor-pointer hover:scale-110 transition-all duration-300"
              />
            </Link>
          )}
          {pathname === '/playground' ? (
            <Link href="/">
              <HiCalendarDays
                size={35}
                className="cursor-pointer hover:scale-110 transition-all duration-300"
              />
            </Link>
          ) : (
            <Link href="/playground">
              <LuckyCube
                size={45}
                className="cursor-pointer hover:scale-110 transition-all duration-300"
              />
            </Link>
          )}
          {instrument === 'piano' ? (
            <CgPiano
              size={35}
              className="cursor-pointer hover:scale-110 transition-all duration-300"
              onClick={() => setInstrument(prev => 'guitar-acoustic')}
            />
          ) : (
            <FaGuitar
              size={35}
              className="cursor-pointer hover:scale-110 transition-all duration-300"
              onClick={() => setInstrument(prev => 'piano')}
            />
          )}
        </div>
        <h1>CHORD.IO</h1>
        <div className="flex gap-4 items-center">
          <IoMdHelpCircle
            size={35}
            className="cursor-pointer hover:scale-110 transition-all duration-300"
            onClick={() => setHelpModal(true)}
          />
          <Link href="/leaderboard">
            <MdLeaderboard
              size={35}
              className="cursor-pointer hover:scale-110 transition-all duration-300"
            />
          </Link>
          <IoMdSettings
            size={35}
            className="cursor-pointer hover:scale-110 transition-all duration-300"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
