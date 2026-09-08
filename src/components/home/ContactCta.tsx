'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

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
      className="relative shrink-0 flex items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full bg-white text-[#12201D] hover:bg-[#A2CB13] transition-colors duration-500 group/btn z-10 shadow-[0_0_40px_rgba(162,203,19,0.15)] cursor-hover"
      data-cursor-text="START"
    >
       {children}
    </Link>
  )
}

export function ContactCta() {
  return (
    <div className="w-full relative bg-[#12201D] overflow-hidden rounded-none p-12 md:p-32 flex flex-col items-center justify-center text-[#F4F3EE] min-h-[80vh]">
      
      {/* Décoration architecturale asymétrique */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[#182a26] transform -skew-x-12 translate-x-20 hidden md:block z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F4F3EE]/40 mb-10">Prochaine Étape</div>
        
        <h3 className="text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tighter mb-12 leading-[0.85] uppercase">
          Prêt à bâtir <br />
          <span className="text-[#F4F3EE]/50 font-serif italic font-normal">l'avenir ?</span>
        </h3>
        
        <div className="mt-8">
          <MagneticButton href="/contact">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-center">Contact</span>
              <span className="transform group-hover/btn:translate-y-2 transition-transform duration-500 text-lg">↓</span>
            </div>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
