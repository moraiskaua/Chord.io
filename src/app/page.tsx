'use client';

import InstrumentProvider from '@/app/contexts/InstrumentContext';
import AudioPlayer from './components/AudioPlayer';
import Header from './components/Header';
import Modal from './components/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const welcomeModal = localStorage.getItem('welcome-modal');

    if (!welcomeModal) {
      setShowModal(true);
      localStorage.setItem('welcome-modal', 'true');
    }
  }, []);

  return (
    <InstrumentProvider>
      {showModal && (
        <Modal
          variant="home"
          title="Welcome to CHORD.IO!"
          message="your goal here is to strike the chord of the day."
          onClose={() => setShowModal(false)}
        />
      )}
      <main className="min-h-screen w-full flex flex-col justify-center items-center">
        <Header />
        <AudioPlayer />
      </main>
    </InstrumentProvider>
  );
};

export default Home;
