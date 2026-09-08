'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (countersRef.current.length > 0 && sectionRef.current) {
      const counters = countersRef.current.map(el => {
        if (!el) return null;
        return {
          el,
          val: 0,
          target: parseInt(el.getAttribute('data-target') || '0', 10)
        };
      }).filter(Boolean);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          counters.forEach(counter => {
            if (counter) {
              gsap.to(counter, {
                val: counter.target,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  counter.el.innerText = Math.round(counter.val) + "+";
                }
              });
            }
          });
        },
        once: true
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-40 px-6 md:px-12 bg-[#F4F3EE] text-[#12201D]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="relative h-[60vh] lg:h-[90vh] w-full overflow-hidden group">
          <Image 
            src="/assets/images/hero-building-gda.jpg" 
            alt="GDA Agency" 
            fill 
            className="object-cover transition-transform duration-[2s] group-hover:scale-105" 
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#12201D]/50 mb-8">
            GDA / LE CABINET
          </h2>
          <div className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tighter mb-20 text-[#12201D]">
            Un cabinet d'architecture et d'ingénierie sénégalais d'excellence. 
            Nous concevons et bâtissons des environnements remarquables qui allient design contemporain et rigueur structurelle.
          </div>

          <div className="grid grid-cols-2 gap-y-16 gap-x-8">
            <div>
              <div ref={el => { countersRef.current[0] = el; }} data-target="10" className="text-5xl md:text-6xl font-[800] tracking-tighter mb-2 text-[#A2CB13]">0+</div>
              <div className="text-xs uppercase tracking-widest text-[#12201D]/60 font-bold">Années d'expérience</div>
            </div>
            <div>
              <div ref={el => { countersRef.current[1] = el; }} data-target="50" className="text-5xl md:text-6xl font-[800] tracking-tighter mb-2 text-[#A2CB13]">0+</div>
              <div className="text-xs uppercase tracking-widest text-[#12201D]/60 font-bold">Projets étudiés</div>
            </div>
            <div>
              <div ref={el => { countersRef.current[2] = el; }} data-target="30" className="text-5xl md:text-6xl font-[800] tracking-tighter mb-2 text-[#A2CB13]">0+</div>
              <div className="text-xs uppercase tracking-widest text-[#12201D]/60 font-bold">Projets réalisés</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-[800] tracking-tighter mb-2 text-[#A2CB13]">06</div>
              <div className="text-xs uppercase tracking-widest text-[#12201D]/60 font-bold">Experts dédiés</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
