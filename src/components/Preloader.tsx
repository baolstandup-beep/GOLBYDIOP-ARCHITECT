'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        onComplete();
      }
    });

    // We use a dummy object to tween a numeric value from 0 to 100
    const counter = { val: 0 };
    
    // 1. Giant Counter goes from 0 to 100%
    tl.to(counter, {
      val: 100,
      duration: 2.5, // 2.5 seconds for dramatic effect
      ease: "power3.inOut",
      onUpdate: () => {
        if (percentRef.current) {
          // Format with leading zero if needed, but simple number is fine
          percentRef.current.textContent = Math.round(counter.val).toString();
        }
      }
    })
    // 2. Hide counter (scales up and fades out)
    .to(percentRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut"
    }, "-=0.2")
    
    // 3. Reveal the logo briefly
    .fromTo(logoWrapperRef.current, 
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    // 4. Hide the logo
    .to(logoWrapperRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power2.in"
    }, "+=0.3")
    
    // 5. Theatrical Panel Reveal (Curtain opens)
    .to(topPanelRef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut"
    }, "-=0.2")
    .to(bottomPanelRef.current, {
      y: "100%",
      duration: 1.2,
      ease: "power4.inOut"
    }, "<"); // Starts at the exact same time as topPanel

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none bg-transparent">
      
      {/* Split Panels */}
      <div ref={topPanelRef} className="absolute top-0 left-0 w-full h-[50vh] bg-[#12201D] origin-top" />
      <div ref={bottomPanelRef} className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#12201D] origin-bottom" />
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        
        {/* Giant Counter */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div 
            ref={percentRef} 
            className="text-[#A2CB13] font-bold tracking-tighter leading-none text-[25vw] md:text-[20vw]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            0
          </div>
        </div>

        {/* Logo Text (Revealed after counter) */}
        <div ref={logoWrapperRef} className="absolute flex flex-col items-center opacity-0">
          <div className="text-[#F4F3EE] font-bold text-4xl md:text-6xl tracking-tighter uppercase mb-2">
            GDA
          </div>
          <div className="text-[#A2CB13] font-mono text-xs md:text-sm tracking-[0.3em] uppercase">
            Golby Diop Architect
          </div>
        </div>
        
      </div>
    </div>
  );
}
