'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const services = [
  {
    id: '01',
    title: 'Architecture',
    description: 'Nous concevons des projets architecturaux modernes, fonctionnels et adaptés au contexte.',
    prestations: [
      'Étude de faisabilité',
      'Conception architecturale',
      'Esquisses et avant-projets',
      'Modélisation 3D',
      'Permis de construire',
    ],
    image: '/assets/images/hero-architecture.jpg',
  },
  {
    id: '02',
    title: 'Génie Civil',
    description: 'Expertise technique pour garantir la stabilité, la sécurité et la conformité des ouvrages.',
    prestations: [
      'Études structurelles',
      'Dimensionnement',
      'Béton armé',
      'Notes de calcul',
    ],
    image: '/assets/images/project-chantier.jpg',
  },
  {
    id: '03',
    title: 'Études Techniques',
    description: 'Des études précises pour anticiper les contraintes techniques et sécuriser les décisions.',
    prestations: [
      'Topographie',
      'Géotechnique',
      'Assainissement',
      'Réseaux fluides',
    ],
    image: '/assets/images/suivi-terrain-ingenieur.jpg',
  },
  {
    id: '04',
    title: 'Design Intérieur',
    description: 'Transformation des espaces intérieurs en environnements élégants et fonctionnels.',
    prestations: [
      'Aménagement intérieur',
      'Optimisation d\'espace',
      'Mobilier sur mesure',
      'Décoration',
    ],
    image: '/assets/images/interieur-salon-courbe.jpg',
  },
  {
    id: '05',
    title: 'Suivi de Chantier',
    description: 'Accompagnement rigoureux sur le terrain afin de garantir la qualité d\'exécution.',
    prestations: [
      'Planification',
      'Coordination',
      'Contrôle qualité',
      'Réception des travaux',
    ],
    image: '/assets/images/operations-villa-cantilever.jpg',
  },
  {
    id: '06',
    title: 'Construction',
    description: 'De l\'étude à la livraison, avec une exigence élevée en matière de qualité et de sécurité.',
    prestations: [
      'Gros œuvre',
      'Second œuvre',
      'Gestion des matériaux',
      'Livraison clé en main',
    ],
    image: '/assets/images/project-commercial.jpg',
  }
];

function MagneticButton({ children, href }: { children: React.ReactNode, href: string }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - w;

      gsap.to(button, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Link 
      ref={buttonRef} 
      href={href} 
      className="relative shrink-0 flex items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full bg-white text-[#12201D] hover:bg-[#A2CB13] transition-colors duration-500 group/btn z-10 shadow-[0_0_40px_rgba(162,203,19,0.15)]"
    >
       {children}
    </Link>
  )
}

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade up intro elements
    const fadeElements = document.querySelectorAll('.service-fade-up');
    fadeElements.forEach((el) => {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
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

    // Stagger service rows on initial load
    const rows = gsap.utils.toArray<HTMLElement>('.service-row');
    gsap.fromTo(rows, 
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-container',
          start: 'top 80%',
          once: true
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full pb-32 bg-[#F4F3EE] text-[#111111]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* INTRODUCTION */}
        <div className="mb-20 md:mb-32 pt-12 max-w-3xl">
          <p className="text-xl md:text-2xl text-[#111111]/80 leading-relaxed font-light service-fade-up">
            De la conception à la réalisation, GDA accompagne particuliers, entreprises et institutions avec des solutions architecturales et techniques sur mesure, fondées sur l'excellence et la durabilité.
          </p>
        </div>

        {/* SPLIT SCREEN LAYOUT */}
        <div className="services-container flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Left Side: Interactive List */}
          <div className="w-full lg:w-1/2 flex flex-col border-t border-[#111111]/10">
            {services.map((service, index) => {
              const isActive = activeService === index;
              return (
                <div 
                  key={service.id} 
                  className="service-row border-b border-[#111111]/10 group"
                >
                  <button
                    onClick={() => setActiveService(index)}
                    className="w-full py-8 text-left flex flex-col md:flex-row md:items-center gap-6 md:gap-12 transition-colors duration-300 hover:bg-[#111111]/[0.02] px-4 -mx-4 rounded-lg"
                  >
                    <span className={`font-mono text-sm tracking-widest transition-opacity duration-300 ${isActive ? 'opacity-100 text-[#111111]' : 'opacity-40'}`}>
                      {service.id}
                    </span>
                    <h2 className={`font-sans text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase transition-all duration-300 ${isActive ? 'text-[#111111] translate-x-2' : 'text-[#111111]/50'}`}>
                      {service.title}
                    </h2>
                  </button>

                  {/* Expandable Content (Accordion) */}
                  <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="pl-4 md:pl-20 pr-4">
                        <p className="text-lg font-light leading-relaxed text-[#555555] mb-8">
                          {service.description}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                          {service.prestations.map((prestation, idx) => (
                            <div key={idx} className="flex items-center text-sm font-medium text-[#111111]/80">
                              <span className="w-1.5 h-1.5 bg-[#111111] rounded-full mr-3 opacity-30"></span>
                              {prestation}
                            </div>
                          ))}
                        </div>

                        {/* Mobile Image (Visible only on small screens) */}
                        <div className="block lg:hidden w-full h-[300px] relative rounded-xl overflow-hidden mb-8">
                          <Image src={service.image} alt={service.title} fill className="object-cover" />
                        </div>

                        <Link 
                          href="/contact" 
                          className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] group/link"
                        >
                          <span className="border-b border-[#111111] pb-1">Discuter de ce service</span>
                          <span className="ml-3 transform group-hover/link:translate-x-2 transition-transform duration-300">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Sticky Image Gallery (Desktop Only) */}
          <div className="hidden lg:block w-1/2 relative h-[70vh] sticky top-32 rounded-2xl overflow-hidden bg-[#111111]/5 shadow-2xl service-fade-up">
            {services.map((service, index) => {
              const isActive = activeService === index;
              return (
                <div 
                  key={service.id}
                  className={`absolute inset-0 transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'}`}
                >
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                  
                  {/* Image Title */}
                  <div className={`absolute bottom-8 left-8 right-8 transition-all duration-700 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <h3 className="text-white text-3xl font-bold tracking-tight uppercase">
                      {service.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* BLOC FINAL: Premium Architectural CTA */}
        <div className="border-t border-[#12201D]/10 pt-24 mt-32">
          <div className="relative bg-[#12201D] overflow-hidden rounded-none p-12 md:p-24 flex flex-col md:flex-row items-center justify-between text-[#F4F3EE] gap-16 service-fade-up">
            
            {/* Décoration architecturale asymétrique */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-[#182a26] transform -skew-x-12 translate-x-20 hidden md:block z-0 pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl text-center md:text-left">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F4F3EE]/40 mb-6">Prochaine Étape</div>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[0.9] uppercase">
                Prêt à bâtir <br />
                <span className="text-[#F4F3EE]/50 font-serif italic font-normal">l'avenir ?</span>
              </h3>
              <p className="text-lg md:text-xl text-[#F4F3EE]/70 font-light max-w-xl">
                Échangeons sur vos besoins et construisons ensemble une solution sur-mesure adaptée à vos ambitions.
              </p>
            </div>
            
            <MagneticButton href="/contact">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-center">Contact</span>
                <span className="transform group-hover/btn:translate-x-2 transition-transform duration-500 text-lg">→</span>
              </div>
            </MagneticButton>

          </div>
        </div>

      </div>
    </section>
  );
}
