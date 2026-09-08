'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from './Preloader';
import { Header } from './Header';
import { Footer } from './Footer';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ClientLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Max 2 seconds as requested

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </ReactLenis>
  );
}
