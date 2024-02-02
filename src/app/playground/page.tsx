'use client';

import InstrumentProvider from '@/app/contexts/InstrumentContext';
import Header from '../components/Header';
import AudioPlayer from '../components/AudioPlayer';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { useTranslations } from 'next-intl';

const Playground = () => {
  const t = useTranslations('playgroundModal');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const playgroundModal = localStorage.getItem('playground-modal');

    if (!playgroundModal) {
      setShowModal(true);
      localStorage.setItem('playground-modal', 'true');
    }
  }, []);

  return (
    <InstrumentProvider>
      {showModal && (
        <Modal
          variant="playground"
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

export default Playground;
