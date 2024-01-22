import type { Metadata } from 'next';
import AuthContext from '@/contexts/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chord.io',
  description: 'Guess the chord!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#201d20]">
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
