import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Providers from './providers';
import { getAppUrl } from '@/lib/app-url';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(getAppUrl()),
  title: 'Doerforge by Alex Studio | Practical AI Tools',
  description: 'Doerforge by Alex Studio brings practical AI tools for careers, business, creators, productivity, and learning.',
  keywords: 'Doerforge, Alex Studio, AI tools, career tools, productivity tools, business tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Providers>
          <Toaster position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
