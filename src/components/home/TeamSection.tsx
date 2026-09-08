'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const team = [
  { name: 'Golby Diop', role: 'Architecte DPLG / Fondateur', image: '/assets/images/team/member1.jpg' },
  { name: 'Khady Ndiaye', role: 'Ingénieur Structure', image: '/assets/images/team/member2.jpg' },
  { name: 'Ousmane Sow', role: 'Chef de Projet', image: '/assets/images/team/member3.jpg' },
  { name: 'Awa Tall', role: 'Architecte d\'Intérieur', image: '/assets/images/team/member4.jpg' },
  { name: 'Moussa Faye', role: 'Dessinateur Projeteur', image: '/assets/images/team/member5.jpg' },
  { name: 'Fatou Kane', role: 'Responsable Administrative', image: '/assets/images/team/member6.jpg' },
];

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLinesRef = useRef<HTMLDivElement[]>([]);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const overlaysRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true
      }
    });

    // 1. Title animation (line by line)
    if (titleLinesRef.current.length) {
      tl.fromTo(titleLinesRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out' }
      );
    }

    // 2. Cards entrance & Image Reveal
    if (cardsRef.current.length && overlaysRef.current.length) {
      // Move cards up
      tl.fromTo(cardsRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' },
        '-=0.6'
      );
      
      // Reveal mask slides down
      tl.to(overlaysRef.current,
        { scaleY: 0, transformOrigin: 'top', duration: 1.2, stagger: 0.1, ease: 'expo.inOut' },
        '-=0.8'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-32 md:py-48 px-6 md:px-12 bg-[#12201D] relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* En-tête de section (Typographie spectaculaire) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 lg:mb-40">
          <h2 className="text-6xl md:text-8xl lg:text-[110px] font-bold tracking-tighter leading-[0.85] uppercase text-[#F4F3EE]">
            <div className="overflow-hidden pb-2"><div ref={el => { if (el) titleLinesRef.current[0] = el; }}>NOTRE</div></div>
            <div className="overflow-hidden pb-2"><div ref={el => { if (el) titleLinesRef.current[1] = el; }} className="text-[#A2CB13]">ÉQUIPE</div></div>
          </h2>
          
          <div className="mt-8 md:mt-0 text-[10px] md:text-xs uppercase tracking-[0.3em] font-mono text-[#F4F3EE]/50 font-bold border-l border-[#F4F3EE]/20 pl-6 py-2">
            GDA — PEOPLE <br/>
            <span className="text-[#A2CB13]">/ {team.length.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Group to control opacity of sibling cards on hover */}
        <div className="group/team grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-32">
          {team.map((member, index) => {
            // Asymmetric rhythm on desktop: middle column is lower, right column is slightly lower
            const marginTopClass = index % 3 === 1 ? 'lg:mt-32' : index % 3 === 2 ? 'lg:mt-16' : 'lg:mt-0';
            
            return (
              <div 
                key={index} 
                ref={el => { if (el) cardsRef.current[index] = el; }}
                className={`group/card flex flex-col cursor-hover w-full transition-opacity duration-500 hover:!opacity-100 group-hover/team:opacity-50 ${marginTopClass}`} 
                data-cursor-text="VOIR →"
              >
                {/* 4:5 Portrait Image Container */}
                <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-[#0c1513]">
                  
                  {/* Image */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:scale-[1.05]"
                  />
                  
                  {/* Subtle Darkening Veil */}
                  <div className="absolute inset-0 bg-[#12201D] opacity-10 mix-blend-overlay transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:opacity-0" />

                  {/* Corner Arrow Symbol */}
                  <div className="absolute top-4 right-4 text-[#A2CB13] opacity-0 -translate-y-4 transition-all duration-500 ease-out group-hover/card:opacity-100 group-hover/card:translate-y-0 text-2xl font-light">
                    ↗
                  </div>

                  {/* Reveal Overlay Mask (slides away on scroll) */}
                  <div 
                    ref={el => { if (el) overlaysRef.current[index] = el; }}
                    className="absolute inset-0 bg-[#12201D] z-10"
                  />
                </div>
                
                {/* Typography Block */}
                <div className="flex justify-between items-start w-full px-1">
                  <div className="flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:-translate-y-[4px]">
                    <h3 className="text-xl md:text-[22px] font-bold tracking-tight uppercase text-[#F4F3EE] mb-2">
                      {member.name}
                    </h3>
                    <p className="text-[10px] md:text-xs font-mono tracking-[0.1em] uppercase text-[#F4F3EE]/50 group-hover/card:opacity-100 group-hover/card:text-[#A2CB13] transition-colors duration-500">
                      {member.role}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#A2CB13] opacity-30 mt-2">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
