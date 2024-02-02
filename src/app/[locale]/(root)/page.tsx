'use client';

import { useTranslations } from 'next-intl';

import InstrumentProvider from '@/app/contexts/InstrumentContext';
import { useEffect, useState } from 'react';
import Modal from '@/app/components/Modal';
import Header from '@/app/components/Header';
import AudioPlayer from '@/app/components/AudioPlayer';

const Home = () => {
  const t = useTranslations('Home');
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
          message={t('welcomeMessage')}
          onClose={() => setShowModal(false)}
        />
      )}
      <main className="min-h-screen w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl text-white">{t('title')}</h1>
        <Header />
        <AudioPlayer />
      </main>
    </InstrumentProvider>
  );
};

export default Home;
