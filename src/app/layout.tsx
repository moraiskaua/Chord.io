import type { Metadata } from 'next';
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
      <body className="bg-[#201d20]">{children}</body>
    </html>
  );
}
