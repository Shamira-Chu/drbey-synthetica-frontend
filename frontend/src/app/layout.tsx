import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Orbitron, Rajdhani, Share_Tech_Mono, Audiowide } from 'next/font/google';
import { AppShell } from '@/components/layout/AppShell';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-orbitron',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-rajdhani',
  display: 'swap',
});

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-share-tech-mono',
  display: 'swap',
});

const audiowide = Audiowide({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-audiowide',
  display: 'swap',
});

const DESCRICAO =
  'Portal editorial do flat track roller derby na temporada 2047: tática, equipamento, arbitragem assistida, transmissão e a cultura da pista.';

export const metadata: Metadata = {
  title: 'DERBY SYNTHETICA',
  description: DESCRICAO,
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'DERBY SYNTHETICA | Temporada 2047.',
    description: DESCRICAO,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable} ${audiowide.variable}`}
    >
      <body className="bg-black text-ink antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
