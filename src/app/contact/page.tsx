'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Simple reveal animation on load
    gsap.fromTo(containerRef.current.children, 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <div className="bg-[#12201D] min-h-screen text-[#F4F3EE] pt-40 pb-32 px-6 md:px-12 flex flex-col justify-center relative overflow-hidden">
      
      {/* Decorative large background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold text-white/[0.02] pointer-events-none whitespace-nowrap z-0">
        GDA
      </div>

      <div ref={containerRef} className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-20">
        
        {/* Left Side: Massive Typography */}
        <div className="xl:w-1/2">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A2CB13] mb-8">
            Démarrer un projet
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-bold uppercase tracking-tighter leading-[0.85] mb-12">
            Créons <br />
            <span className="font-serif italic font-normal text-[#F4F3EE]/50">ensemble</span>
          </h1>
          
          <div className="flex flex-col gap-8 text-[#F4F3EE]/70 font-light text-lg max-w-md">
            <div>
              <p className="text-[#F4F3EE] font-bold mb-2 uppercase tracking-widest text-xs">Le Studio</p>
              <p>123 Rue de l'Architecture<br/>Plateau, Dakar<br/>Sénégal</p>
            </div>
            
            <div>
              <p className="text-[#F4F3EE] font-bold mb-2 uppercase tracking-widest text-xs">Contact Direct</p>
              <a href="mailto:contact@gda.sn" className="block hover:text-[#A2CB13] transition-colors">contact@gda.sn</a>
              <a href="tel:+221770000000" className="block hover:text-[#A2CB13] transition-colors">+221 77 000 00 00</a>
            </div>

            <div>
              <p className="text-[#F4F3EE] font-bold mb-2 uppercase tracking-widest text-xs">Réseaux Sociaux</p>
              <a href="https://www.facebook.com/profile.php?id=100064847059581" target="_blank" rel="noopener noreferrer" className="block hover:text-[#A2CB13] transition-colors mb-1">Facebook ↗</a>
              <a href="https://www.linkedin.com/company/golby-diop-architect/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="block hover:text-[#A2CB13] transition-colors">LinkedIn ↗</a>
            </div>
          </div>
        </div>

        {/* Right Side: Minimalist Form */}
        <div className="w-full xl:w-[40%] xl:pb-4">
          <form className="flex flex-col gap-12 w-full">
            <div className="relative group/input">
              <input 
                type="text" 
                placeholder="VOTRE NOM" 
                className="w-full bg-transparent border-b border-[#F4F3EE]/20 pb-4 outline-none focus:border-[#A2CB13] transition-colors uppercase tracking-widest text-sm text-[#F4F3EE] placeholder:text-[#F4F3EE]/30" 
                required
              />
            </div>
            
            <div className="relative group/input">
              <input 
                type="email" 
                placeholder="VOTRE EMAIL" 
                className="w-full bg-transparent border-b border-[#F4F3EE]/20 pb-4 outline-none focus:border-[#A2CB13] transition-colors uppercase tracking-widest text-sm text-[#F4F3EE] placeholder:text-[#F4F3EE]/30" 
                required
              />
            </div>
            
            <div className="relative group/input">
              <textarea 
                placeholder="PARLEZ-NOUS DE VOTRE PROJET..." 
                rows={4} 
                className="w-full bg-transparent border-b border-[#F4F3EE]/20 pb-4 outline-none focus:border-[#A2CB13] transition-colors uppercase tracking-widest text-sm text-[#F4F3EE] placeholder:text-[#F4F3EE]/30 resize-none"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="group self-start mt-4 flex items-center justify-between gap-6 bg-transparent border border-[#F4F3EE]/30 rounded-full pl-8 pr-2 py-2 text-sm font-bold uppercase tracking-widest hover:border-[#A2CB13] hover:bg-[#A2CB13] hover:text-[#12201D] transition-all duration-500 cursor-hover" 
              data-cursor-text="SEND"
            >
              <span>Envoyer</span>
              <div className="w-10 h-10 rounded-full bg-[#F4F3EE] text-[#12201D] flex items-center justify-center group-hover:bg-[#12201D] group-hover:text-[#A2CB13] transition-colors duration-500">
                →
              </div>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
