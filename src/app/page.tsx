'use client';

import InstrumentProvider from '@/contexts/InstrumentContext';
import AudioPlayer from './components/AudioPlayer';
import Header from './components/Header';
import Modal from './components/Modal';
import { useState } from 'react';

const Home = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <InstrumentProvider>
      {showModal && (
        <Modal
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
