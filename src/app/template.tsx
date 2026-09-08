'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const getPathName = (path: string) => {
    if (path === '/') return 'ACCUEIL';
    return path.substring(1).toUpperCase();
  };
  
  // Cinematic Awwwards transition: Lime Green followed by Dark Green
  return (
    <>
      <motion.div
        key={`overlay-1-${pathname}`}
        initial={{ top: '100%', height: '100vh' }}
        animate={{ top: '-100%', height: '100vh' }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[9000] bg-[#A2CB13] pointer-events-none"
      />
      
      <motion.div
        key={`overlay-2-${pathname}`}
        initial={{ top: '100%', height: '100vh' }}
        animate={{ top: '-100%', height: '100vh' }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[9001] bg-[#12201D] pointer-events-none flex items-center justify-center"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 0], y: [20, 0, -20] }}
          transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          className="text-[#F4F3EE] font-sans font-bold tracking-widest uppercase text-3xl"
        >
          {getPathName(pathname)}
        </motion.div>
      </motion.div>
      
      <motion.div
        key={`page-${pathname}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
