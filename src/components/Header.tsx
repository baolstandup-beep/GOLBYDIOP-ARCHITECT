'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#F4F3EE]/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="cursor-hover relative w-[180px] h-[60px]" data-cursor-text="HOME">
          <Image 
            src="/assets/images/logo.png" 
            alt="GDA Golby Diop Architect" 
            fill 
            className="object-contain object-left" 
            priority
          />
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
          <Link href="/" className="cursor-hover text-[#12201D] hover:text-[#A2CB13] transition-colors" data-cursor-text="GO">Accueil</Link>
          <Link href="/about" className="cursor-hover text-[#12201D] hover:text-[#A2CB13] transition-colors" data-cursor-text="READ">À propos</Link>
          <Link href="/services" className="cursor-hover text-[#12201D] hover:text-[#A2CB13] transition-colors" data-cursor-text="SEE">Services</Link>
          <Link href="/projets" className="cursor-hover text-[#12201D] hover:text-[#A2CB13] transition-colors" data-cursor-text="EXPLORE">Projets</Link>
          <Link href="/equipe" className="cursor-hover text-[#12201D] hover:text-[#A2CB13] transition-colors" data-cursor-text="MEET">Équipe</Link>
        </nav>
        
        <div>
          <Link href="/contact" className="cursor-hover group flex items-center gap-2 border border-[#12201D] rounded-full px-5 py-2 text-sm font-medium text-[#12201D] hover:bg-[#A2CB13] hover:border-[#A2CB13] hover:text-[#12201D] transition-all duration-300" data-cursor-text="START">
            <span>Démarrer un projet</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
