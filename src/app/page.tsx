'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Modal from '@/app/components/Modal';
import Header from '@/app/components/Header';
import AudioPlayer from '@/app/components/AudioPlayer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const t = useTranslations('WelcomeModal');
  const g = useTranslations('guestModal');

  const [showModal, setShowModal] = useState(false);
  const [guestModal, setGuestModal] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === 'unauthenticated') {
      setGuestModal(true);
    }

    const welcomeModal = localStorage.getItem('welcome-modal');

    if (!welcomeModal) {
      setShowModal(true);
      localStorage.setItem('welcome-modal', 'true');
    }
  }, [session?.status]);

  return (
    <>
      {showModal && (
        <Modal
          title={t('title')}
          message={t('message')}
          onClose={() => setShowModal(false)}
        />
      )}
      {guestModal && (
        <Modal
          title={g('title')}
          message={g('message')}
          onClose={() => {
            setGuestModal(false);
            router.push('/playground');
          }}
          buttonText={g('buttonText')}
          handleClickButton={() => router.push('/sign-in')}
        />
      )}
      <main className="min-h-screen w-full flex flex-col justify-center items-center">
        <Header />
        <AudioPlayer />
      </main>
    </>
  );
};

export default Home;
