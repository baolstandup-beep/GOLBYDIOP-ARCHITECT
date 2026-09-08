'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // High-performance spring for "fluid" feel
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveElement = target.closest('a, button, .cursor-hover');
      if (interactiveElement) {
        setIsHovering(true);
        const text = interactiveElement.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  const size = isHovering ? 80 : 16;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        width: size,
        height: size,
      }}
      animate={{
        backgroundColor: isHovering ? '#A2CB13' : 'transparent',
        borderColor: '#A2CB13',
        borderWidth: isHovering ? '0px' : '2px',
        borderStyle: 'solid',
      }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
    >
      {isHovering && cursorText && (
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[10px] uppercase font-bold tracking-widest text-[#111111]"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
