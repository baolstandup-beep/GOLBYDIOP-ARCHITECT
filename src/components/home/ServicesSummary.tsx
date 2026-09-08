'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { id: '01', title: 'Architecture', image: '/assets/images/hero-architecture.jpg' },
  { id: '02', title: 'Génie civil', image: '/assets/images/project-chantier.jpg' },
  { id: '03', title: 'Études techniques', image: '/assets/images/suivi-terrain-ingenieur.jpg' },
  { id: '04', title: 'Design intérieur', image: '/assets/images/interieur-salon-courbe.jpg' },
  { id: '05', title: 'Suivi de chantier', image: '/assets/images/operations-villa-cantilever.jpg' },
  { id: '06', title: 'Construction', image: '/assets/images/project-commercial.jpg' },
];

export function ServicesSummary() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-32 px-6 md:px-12 bg-[#F4F3EE]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Summary text & Link */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest font-bold text-[#647678] mb-8">
              Notre Expertise
            </div>
            <h2 className="text-4xl md:text-5xl tracking-tighter font-bold mb-8 uppercase text-[#121514]">
              Des solutions complètes pour bâtir l'avenir.
            </h2>
            <p className="text-lg text-[#121514]/70 mb-12">
              Nous accompagnons chaque étape de votre projet, de l'esquisse architecturale à la livraison finale du chantier.
            </p>
          </div>
          
          <Link 
            href="/services" 
            className="group flex items-center gap-4 text-[#121514] font-bold uppercase tracking-widest text-sm"
          >
            <span className="border-b border-[#121514] pb-1 group-hover:border-transparent transition-colors">Découvrir tous nos services</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Right Side: Interactive List with Images */}
        <div className="lg:col-span-8 flex flex-col md:flex-row gap-12 relative">
          
          {/* The List */}
          <div className="flex flex-col w-full md:w-[55%] relative z-20">
            {services.map((service, index) => (
              <Link 
                href="/services"
                key={service.id}
                className="group border-b border-[#121514]/20 py-6 md:py-8 flex items-center justify-between cursor-hover relative transition-colors hover:border-[#121514]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-cursor-text="VOIR"
              >
                <div className="flex items-center transition-transform duration-500 group-hover:translate-x-4">
                  <span className="font-mono text-xs mr-6 text-[#647678]">{service.id}</span>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#121514]">{service.title}</h3>
                </div>
                
                {/* Mobile arrow */}
                <div className="md:hidden opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#A2CB13]">→</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Images container (hidden on mobile, visible on desktop) */}
          <div className="hidden md:block w-[45%] h-[450px] relative rounded-lg overflow-hidden shadow-2xl sticky top-32">
            <AnimatePresence mode="wait">
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={services[hoveredIndex].image}
                    alt={services[hoveredIndex].title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Default state when nothing is hovered */}
            {hoveredIndex === null && (
              <div className="absolute inset-0 bg-[#121514]/5 flex items-center justify-center">
                <span className="text-[#121514]/30 font-mono text-xs uppercase tracking-widest text-center px-4">Survolez un service<br/>pour voir l'image</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
