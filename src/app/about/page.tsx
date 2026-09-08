'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach((el) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true
          }
        }
      );
    });

    // Number Counter Animation for Stats
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      const suffix = counter.getAttribute('data-suffix') || '';
      
      gsap.fromTo(counter, 
        { innerHTML: 0, y: 20, opacity: 0 },
        {
          innerHTML: target,
          y: 0,
          opacity: 1,
          duration: 2.5,
          ease: "power3.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            counter.innerHTML = Math.round(parseFloat(this.targets()[0].innerHTML)) + suffix;
          },
          scrollTrigger: {
            trigger: counter.parentElement?.parentElement,
            start: "top 85%",
            once: true
          }
        }
      );
    });

    // Animate Labels under counters
    gsap.fromTo('.stat-label',
      { y: 15, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out", 
        scrollTrigger: { trigger: '.stat-number', start: "top 85%", once: true } 
      }
    );

    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach((img) => {
      gsap.fromTo(img,
        { scale: 1 },
        {
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-[#111111] font-sans selection:bg-[#111111] selection:text-white">
      
      {/* 1. HERO - Ultra Minimalist avec Photo */}
      <section className="relative w-full pt-48 pb-24 px-6 md:px-12 min-h-[80vh] flex flex-col justify-end overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/hero-villa.jpg" 
            alt="GDA Architecture" 
            fill 
            className="object-cover parallax-img"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F4F3EE]/80 mb-8 fade-up">
            GDA / Qui sommes-nous
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter leading-[1] max-w-5xl uppercase mb-12 text-white fade-up">
            L'architecture comme <br />
            réponse au temps.
          </h1>
          
          <div className="w-full h-[1px] bg-white/30 mt-12 fade-up" />
        </div>
      </section>

      {/* 2. LE CABINET (50/50 Split CAAS Style) */}
      <section className="w-full py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="fade-up">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Le Cabinet
            </h2>
            <div className="text-lg md:text-xl text-[#444444] leading-relaxed font-light space-y-6">
              <p>
                GDA (Golby Diop Architect) est une agence d'architecture basée à Dakar, née de la volonté de concevoir des espaces qui transcendent les modes éphémères.
              </p>
              <p>
                Nous abordons chaque projet avec une rigueur intellectuelle et technique absolue. Notre philosophie repose sur l'équilibre entre la lumière, la matière et l'intégration parfaite de nos bâtiments dans leur environnement climatique et urbain.
              </p>
              <p>
                De la conception à la livraison, notre équipe pluridisciplinaire d'architectes et d'ingénieurs assure une maîtrise totale du processus de construction, garantissant l'excellence à chaque étape.
              </p>
            </div>
            
            <div className="mt-20 grid grid-cols-3 gap-6 lg:gap-12 border-t border-[#111111]/10 pt-12">
              <div className="flex flex-col">
                <div className="text-5xl md:text-6xl font-[800] tracking-tighter mb-2 text-[#111111] stat-number" data-target="10" data-suffix="+">0</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#888888] font-medium stat-label">Années</div>
              </div>
              <div className="flex flex-col">
                <div className="text-5xl md:text-6xl font-[800] tracking-tighter mb-2 text-[#111111] stat-number" data-target="50" data-suffix="+">0</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#888888] font-medium stat-label">Projets</div>
              </div>
              <div className="flex flex-col">
                <div className="text-5xl md:text-6xl font-[800] tracking-tighter mb-2 text-[#111111] stat-number" data-target="100" data-suffix="%">0</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#888888] font-medium stat-label">Sur-mesure</div>
              </div>
            </div>
          </div>
          
          <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden fade-up">
             <Image 
              src="/assets/images/hero-building-gda.jpg" 
              alt="Le Cabinet GDA" 
              fill 
              className="object-cover parallax-img"
            />
          </div>
        </div>
      </section>

      {/* 3. LE FONDATEUR (Inverted 50/50 Split) */}
      <section className="w-full py-24 px-6 md:px-12 max-w-[1400px] mx-auto bg-[#F9F9F9]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden fade-up order-2 lg:order-1">
             <Image 
              src="/assets/images/team-golby-diop.jpg" 
              alt="Golby Diop - Architecte Fondateur" 
              fill 
              className="object-cover object-top parallax-img"
            />
          </div>

          <div className="fade-up order-1 lg:order-2">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666666] mb-8">
              L'Architecte
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Ndeye Mbacké DIOP
            </h2>
            <p className="text-sm uppercase tracking-widest font-semibold text-[#111111] mb-8">
              Architecte Fondatrice
            </p>
            <div className="text-lg md:text-xl text-[#444444] leading-relaxed font-light space-y-6">
              <p>
                Passionnée par le détail et l'impact sociologique de l'architecture, Ndeye Mbacké DIOP dirige l'agence avec une exigence constante d'innovation.
              </p>
              <p>
                "Notre métier n'est pas de créer des objets spectaculaires, mais de concevoir des cadres de vie qui respectent l'homme et subliment la matière. L'architecture est avant tout une histoire de justesse."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NOTRE PHILOSOPHIE (Large Text Block) */}
      <section className="w-full py-32 px-6 md:px-12 bg-[#111111] text-white text-center">
        <div className="max-w-[1000px] mx-auto fade-up">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888] mb-12">
            Notre Philosophie
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-16">
            Concevoir avec précision.<br />
            Construire avec intégrité.<br />
            Traverser le temps.
          </h3>
        </div>
      </section>

      {/* 5. EXPERTISES (Grid Layout) */}
      <section className="w-full py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-16 fade-up">Nos Expertises</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="border-t border-[#111111] pt-6 fade-up">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4">Architecture</h3>
            <p className="text-[#444444] leading-relaxed font-light">
              Conception architecturale complète, du masterplan à la résidence privée, avec une approche esthétique et contextuelle forte.
            </p>
          </div>
          <div className="border-t border-[#111111] pt-6 fade-up">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4">Ingénierie</h3>
            <p className="text-[#444444] leading-relaxed font-light">
              Études techniques poussées (structure, fluides) pour garantir la viabilité et l'excellence d'exécution de nos conceptions.
            </p>
          </div>
          <div className="border-t border-[#111111] pt-6 fade-up">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4">Maîtrise d'œuvre</h3>
            <p className="text-[#444444] leading-relaxed font-light">
              Direction et suivi de chantier rigoureux pour s'assurer que chaque détail correspond parfaitement à la vision initiale.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CTA CAAS Style */}
      <section className="w-full py-32 px-6 md:px-12 bg-[#F9F9F9] border-t border-[#111111]/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center fade-up">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-8 md:mb-0">
            Démarrer<br/>un projet
          </h2>
          
          <Link 
            href="/contact" 
            className="group flex items-center justify-between w-[250px] border border-[#111111] rounded-full px-6 py-4 hover:bg-[#111111] hover:text-white transition-all duration-300"
          >
            <span className="text-sm font-bold uppercase tracking-widest">Contactez-nous</span>
            <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>
      </section>
      
    </div>
  );
}
