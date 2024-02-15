import type { Metadata } from 'next';
import AuthContext from './contexts/AuthContext';
import './globals.css';
import LanguageProvider from '@/app/contexts/LanguageContext';
import ToasterContext from './contexts/ToasterContext';
import InstrumentProvider from './contexts/InstrumentContext';

export const metadata: Metadata = {
  title: 'Chord.io',
  description: 'Guess the chord!',
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <link rel="icon" href="/assets/favicon.ico" />
      <body className="bg-[#201d20]">
        <LanguageProvider>
          <InstrumentProvider>
            <ToasterContext />
            <AuthContext>{children}</AuthContext>
          </InstrumentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
