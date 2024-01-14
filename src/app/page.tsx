'use client';

import InstrumentProvider from '@/contexts/InstrumentContext';
import AudioPlayer from './components/AudioPlayer';
import Header from './components/Header';

const Home = () => {
  return (
    <InstrumentProvider>
      <main className="min-h-screen w-full flex flex-col justify-center items-center">
        <Header />
        <AudioPlayer />
      </main>
    </InstrumentProvider>
  );
};

export default Home;
