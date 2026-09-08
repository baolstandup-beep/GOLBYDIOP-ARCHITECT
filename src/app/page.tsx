'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ServicesSummary } from '@/components/home/ServicesSummary';
import { AboutSection } from '@/components/home/AboutSection';
import { TeamSection } from '@/components/home/TeamSection';
import { ContactCta } from '@/components/home/ContactCta';
import { ProjectCard } from '@/components/home/ProjectCard';

const PROJECTS = [
  {
    id: '01',
    title: 'RÉSIDENCE DIOP',
    location: 'Dakar, Sénégal',
    type: 'Architecture résidentielle — 2026',
    images: [
      '/assets/images/projects/villa-diop-1.jpg', 
      '/assets/images/projects/villa-diop-2.jpg',
      '/assets/images/projects/villa-diop-3.jpg',
      '/assets/images/projects/villa-diop-4.jpg'
    ]
  },
  {
    id: '02',
    title: 'RÉSIDENCE TERRACOTTA',
    location: 'Dakar, Sénégal',
    type: 'Villa urbaine contemporaine — 2026',
    images: [
      '/assets/images/projects/villa-diop-persp-1.jpg',
      '/assets/images/projects/villa-diop-persp-2.jpg',
      '/assets/images/projects/villa-diop-persp-3.jpg',
      '/assets/images/projects/villa-diop-persp-4.jpg'
    ]
  },
  {
    id: '03',
    title: 'LES TERRASSES DE DAKAR',
    location: 'Dakar, Sénégal',
    type: 'Immeuble résidentiel R+4 — 2025',
    images: ['/assets/images/immeuble-angle-gda-r4.jpg', '/assets/images/immeuble-nuit-led.jpg', '/assets/images/immeuble-moderne-angle.jpg']
  },
  {
    id: '04',
    title: 'VILLA PALMERAIE',
    location: 'Saly, Sénégal',
    type: 'Résidence contemporaine — 2024',
    images: ['/assets/images/villa-palmeraie-blanche.jpg', '/assets/images/villa-blanche-moderne.jpg']
  },
  {
    id: '05',
    title: 'RÉSIDENCE OASIS',
    location: 'Almadies, Dakar',
    type: 'Villa avec piscine — 2024',
    images: ['/assets/images/residence-briques-piscine.jpg', '/assets/images/residence-briques-escalier.jpg']
  },
  {
    id: '06',
    title: 'VILLA ÉBÈNE',
    location: "Abidjan, Côte d'Ivoire",
    type: 'Résidence haut de gamme — 2023',
    images: ['/assets/images/villa-luxe-aerienne.jpg', '/assets/images/villa-cantilever-luxe.jpg']
  }
];


export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const textLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const manifestoWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  
  useEffect(() => {
    // Basic Hero Animation
    if (textLinesRef.current.length > 0) {
      gsap.fromTo(textLinesRef.current, 
        { y: "110%", opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 2.2 } // Wait for preloader
      );
    }

    if (heroImageRef.current) {
      // Cinematic zoom auto
      gsap.to(heroImageRef.current, {
        scale: 1.06,
        duration: 12,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

      // Scroll shrink effect
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        width: "86vw",
        borderRadius: "24px",
        y: "50px",
        ease: "none"
      });
    }

    // Manifesto words reveal
    if (manifestoRef.current && manifestoWordsRef.current.length > 0) {
      gsap.fromTo(manifestoWordsRef.current,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: true
          }
        }
      );
    }
  }, []);

  const manifestoText = "Nous concevons des espaces où architecture, fonctionnalité et identité se rencontrent.";

  return (
    <div className="bg-[#F4F3EE] flex flex-col items-center">
      
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative w-full h-[100vh] overflow-hidden flex items-center justify-center mx-auto transform-gpu origin-top">
        <div className="absolute inset-0 z-0">
          <Image 
            ref={heroImageRef}
            src="/assets/images/hero-villa.jpg" 
            alt="GDA Architecture" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 flex flex-col justify-between h-full py-32">
          <div className="flex-1 flex items-center">
            <h1 className="text-4xl md:text-3xl lg:text-5xl font-bold text-[#F4F3EE] uppercase tracking-tighter leading-[0.9]">
              <div className="overflow-hidden"><div ref={el => { textLinesRef.current[0] = el; }}>NOUS IMAGINONS</div></div>
              <div className="overflow-hidden"><div ref={el => { textLinesRef.current[1] = el; }}>LES ESPACES</div></div>
              <div className="overflow-hidden text-[#A2CB13]"><div ref={el => { textLinesRef.current[2] = el; }}>DE DEMAIN.</div></div>
            </h1>
          </div>
          
          <div className="flex justify-between items-end text-[#F4F3EE]">
            <div className="text-sm font-mono tracking-widest uppercase">
              <span className="text-[#A2CB13] mr-2">01</span> Architecture • Ingénierie • Construction
            </div>
            <div className="text-xs tracking-widest uppercase animate-bounce flex flex-col items-center gap-2">
              SCROLL TO EXPLORE
              <span>↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO SECTION */}
      <section ref={manifestoRef} className="w-full py-40 md:py-64 px-6 md:px-12 max-w-[1200px] mx-auto text-center">
        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#273E36] mb-12">Notre Vision</div>
        <h2 className="text-4xl md:text-4xl lg:text-4xl font-bold text-[#121514] leading-tight tracking-tight">
          {manifestoText.split(' ').map((word, i) => (
            <span key={i} ref={el => { manifestoWordsRef.current[i] = el; }} className="inline-block mr-3 lg:mr-5">
              {word}
            </span>
          ))}
        </h2>
      </section>

      {/* PROJECTS SECTION */}
      <section className="w-full px-6 md:px-12 pb-40">
        <div className="text-sm uppercase tracking-widest font-bold text-[#121514] mb-20 flex justify-between items-end border-b border-[#121514] pb-6">
          <h2 className="text-4xl md:text-3xl tracking-tighter">PROJETS<br/>SÉLECTIONNÉS</h2>
          <span className="hidden md:block">02</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* PHILOSOPHY (Dark Section) */}
      <section className="w-full bg-[#12201D] py-40 px-6 md:px-12 text-center text-[#F4F3EE] flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="text-3xl md:text-3xl font-bold tracking-tighter uppercase leading-[1.1]">
          L'Architecture<br/>
          N'est pas<br/>
          Seulement<br/>
          Ce que l'on voit.
        </h2>
        <div className="mt-20 text-[#A2CB13] font-mono uppercase tracking-widest text-xl md:text-3xl">
          C'est ce que l'on ressent.
        </div>
      </section>
      
      <ServicesSummary />
      <AboutSection />
      <TeamSection />
      <ContactCta />
      
    </div>
  );
}
