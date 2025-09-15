import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'BytePlus Pro - Own Your Data, Earn Your Rewards',
  description: 'A consumer-first platform enabling users to securely share personal data with brands and researchers for rewards.',
  openGraph: {
    title: 'BytePlus Pro',
    description: 'Own Your Data, Earn Your Rewards',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-textPrimary">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
