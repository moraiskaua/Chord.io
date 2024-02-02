import type { Metadata } from 'next';
import AuthContext from '../../contexts/AuthContext';
import '../../globals.css';
import { NextIntlClientProvider } from 'next-intl';

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
      <body className="bg-[#201d20]">
        <NextIntlClientProvider
          messages={{
            pt: require('../../../../messages/pt.json'),
            en: require('../../../../messages/en.json'),
          }}
        >
          <AuthContext>{children}</AuthContext>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
