'use client';

import InstrumentProvider from '@/contexts/InstrumentContext';
import Header from '../components/Header';
import AudioPlayer from '../components/AudioPlayer';

const Playground = () => {
  return (
    <InstrumentProvider>
      <main className="min-h-screen w-full flex flex-col justify-center items-center">
        <Header />
        <AudioPlayer />
      </main>
    </InstrumentProvider>
  );
};

export default Playground;
