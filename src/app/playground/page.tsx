'use client';

import InstrumentProvider from '@/contexts/InstrumentContext';
import Header from '../components/Header';
import AudioPlayer from '../components/AudioPlayer';
import { useState } from 'react';
import Modal from '../components/Modal';

const Playground = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <InstrumentProvider>
      {showModal && (
        <Modal
          title="Welcome to the playground!"
          message="Here you can guess as many chords as you want."
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

export default Playground;
