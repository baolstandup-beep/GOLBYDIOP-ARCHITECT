'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!footerRef.current) return;
    
    // Select elements to animate
    const topTitle = footerRef.current.querySelector('.footer-top-title');
    const cols = footerRef.current.querySelectorAll('.footer-col');
    const bottomElements = footerRef.current.querySelectorAll('.footer-bottom');
    const bigSign = footerRef.current.querySelector('.footer-big-sign');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        once: true
      }
    });

    if (topTitle) {
      tl.fromTo(topTitle, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }

    if (cols.length) {
      tl.fromTo(cols,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      );
    }
    
    if (bottomElements.length) {
      tl.fromTo(bottomElements,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );
    }

    if (bigSign) {
      tl.fromTo(bigSign,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 0.9, duration: 1, ease: 'power3.out' },
        '-=0.4'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#12201D] text-[#F2F3EE] overflow-hidden relative font-sans pt-24 md:pt-[120px]">
      <div className="max-w-[1440px] mx-auto px-[clamp(24px,6vw,100px)] relative z-10">
        
        {/* 1. STRUCTURE DU FOOTER - TOP ZONE */}
        <div className="footer-top-title flex flex-col md:flex-row justify-between items-start gap-12 mb-24 md:mb-32">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[rgba(242,243,238,0.55)] mb-8 font-mono">
              GOLBY DIOP ARCHITECT
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-[80px] font-bold leading-[0.95] tracking-tight mb-8 text-[#F2F3EE]">
              CONSTRUISONS<br/>
              VOTRE PROCHAIN<br/>
              <span className="text-[#A2CB13]">PROJET.</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-start md:items-end text-left md:text-right max-w-sm mt-0 md:mt-20">
            <p className="text-lg md:text-xl text-[rgba(242,243,238,0.7)] leading-relaxed mb-8">
              Architecture, ingénierie et conception au service d'espaces durables, fonctionnels et remarquables.
            </p>
            <Link 
              href="/contact" 
              className="group flex items-center gap-3 border border-[rgba(255,255,255,0.2)] rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#F2F3EE] hover:bg-[#F2F3EE] hover:text-[#12201D] transition-colors duration-400"
            >
              <span>Démarrer un projet</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. INFORMATIONS DU CABINET - PLEINE LARGEUR FOND CLAIR */}
      <div className="w-full bg-[#F4F3EE] text-[#121514] py-24">
        <div className="max-w-[1440px] mx-auto px-[clamp(24px,6vw,100px)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-base">
          
          {/* COLONNE 1 — GDA */}
          <div className="footer-col flex flex-col gap-6">
            <Link href="/" className="relative w-[180px] h-[70px] block opacity-100 hover:opacity-80 transition-opacity">
              <Image 
                src="/assets/images/logo.png" 
                alt="GDA Golby Diop Architect" 
                fill 
                className="object-contain object-left" 
              />
            </Link>
            <div className="text-[#121514]/70 leading-relaxed max-w-[260px]">
              <p className="mb-4">
                <span className="text-[#121514] font-bold block mb-1 text-lg">Golby Diop Architect</span>
                Cabinet d'architecture, d'ingénierie et de conception.
              </p>
              <p>Dakar, Sénégal</p>
            </div>
          </div>

          {/* COLONNE 2 — NAVIGATION */}
          <div className="footer-col flex flex-col gap-5">
            <h4 className="text-xs text-[#647678] uppercase tracking-widest font-bold mb-2 font-mono">Navigation</h4>
            {['Accueil', 'L\'Agence', 'Services', 'Projets', 'Équipe', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href={item === 'Accueil' ? '/' : `/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-").replace(/'/g, "")}`} 
                className="text-[#121514] font-bold hover:text-[#A2CB13] transition-colors w-fit flex items-center group"
              >
                <span>{item}</span>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-[#A2CB13] text-sm ml-1">→</span>
              </Link>
            ))}
          </div>

          {/* COLONNE 3 — EXPERTISE */}
          <div className="footer-col flex flex-col gap-5">
            <h4 className="text-xs text-[#647678] uppercase tracking-widest font-bold mb-2 font-mono">Expertise</h4>
            {['Architecture', 'Conception architecturale', 'Études techniques', 'Ingénierie', 'Suivi de chantier', 'Aménagement intérieur'].map((item) => (
              <Link 
                key={item} 
                href="/services" 
                className="text-[#121514]/70 font-medium hover:text-[#121514] transition-colors w-fit"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* COLONNE 4 — CONTACT */}
          <div className="footer-col flex flex-col gap-5">
            <h4 className="text-xs text-[#647678] uppercase tracking-widest font-bold mb-2 font-mono">Contact</h4>
            <div className="text-[#121514]/70 mb-2 font-medium">
              <p>Dakar, Sénégal</p>
              <a href="mailto:contact@gda.sn" className="hover:text-[#A2CB13] transition-colors mt-1 block">contact@gda.sn</a>
            </div>
            
            <div className="flex flex-col gap-3 mt-2">
              <a href="https://www.facebook.com/profile.php?id=100064847059581" target="_blank" rel="noopener noreferrer" className="text-[#121514] font-bold hover:text-[#A2CB13] transition-colors w-fit group flex items-center gap-1">
                Facebook <span className="group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform text-xs">↗</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#121514] font-bold hover:text-[#A2CB13] transition-colors w-fit group flex items-center gap-1">
                Instagram <span className="group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform text-xs">↗</span>
              </a>
              <a href="https://www.linkedin.com/company/golby-diop-architect/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-[#121514] font-bold hover:text-[#A2CB13] transition-colors w-fit group flex items-center gap-1">
                LinkedIn <span className="group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform text-xs">↗</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-[clamp(24px,6vw,100px)] relative z-10">
        {/* 3. BAS DU FOOTER */}
        <div className="footer-bottom pt-12 pb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 text-[11px] text-[rgba(242,243,238,0.55)] uppercase tracking-widest font-mono">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <p>© {new Date().getFullYear()} GDA — GOLBY DIOP ARCHITECT. TOUS DROITS RÉSERVÉS.</p>
            <div className="flex gap-6">
              <Link href="/mentions-legales" className="hover:text-[#F2F3EE] transition-colors">Mentions légales</Link>
              <Link href="/confidentialite" className="hover:text-[#F2F3EE] transition-colors">Confidentialité</Link>
            </div>
          </div>
          <div className="text-[#F2F3EE]">
            DAKAR — SÉNÉGAL
          </div>
        </div>
      </div>

      {/* 4. SIGNATURE TYPOGRAPHIQUE */}
      <div className="footer-big-sign w-full overflow-hidden flex flex-col items-center justify-center pb-8 pt-4 px-4 select-none opacity-90">
        <h1 
          className="font-bold text-center text-[rgba(255,255,255,0.03)]"
          style={{ 
            fontSize: 'clamp(60px, 11vw, 220px)', 
            lineHeight: '0.85',
            letterSpacing: '-0.04em',
            WebkitTextStroke: '1px rgba(242,243,238,0.15)'
          }}
        >
          GOLBY DIOP<br/>ARCHITECT
        </h1>
      </div>
      
    </footer>
  );
}
