'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SplashScreen } from '@/components/splash/SplashScreen';
import { Backdrop } from '@/components/common/Backdrop';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <div className="min-h-screen bg-[#050611] text-ink relative overflow-x-hidden">
        <Backdrop />

        <Header />

        <main className="relative z-10">{children}</main>

        <Footer />
      </div>
    </>
  );
};
