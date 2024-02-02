'use client';

import { useTranslations } from 'next-intl';

import InstrumentProvider from '@/app/contexts/InstrumentContext';
import { useEffect, useState } from 'react';
import Modal from '@/app/components/Modal';
import Header from '@/app/components/Header';
import AudioPlayer from '@/app/components/AudioPlayer';

const Home = () => {
  const t = useTranslations('WelcomeModal');
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
          title={t('title')}
          message={t('message')}
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
