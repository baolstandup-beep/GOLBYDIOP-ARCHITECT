'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    location: string;
    type: string;
    images: string[];
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full group/card"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      <div className="overflow-hidden w-full h-[40vh] md:h-[50vh] relative cursor-hover group rounded-sm" data-cursor-text="VOIR">
        {project.images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`${project.title} - ${index + 1}`}
            fill
            className={`object-cover transition-all duration-700 ease-out ${
              index === currentImageIndex 
                ? 'opacity-100 z-10 scale-100 md:group-hover:scale-[1.03]' 
                : 'opacity-0 z-0 scale-105'
            }`}
          />
        ))}
        
        {/* Navigation Arrows (Visible on hover if > 1 image) */}
        {project.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-sm transition-opacity duration-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 active:scale-95`}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={nextImage}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-sm transition-opacity duration-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 active:scale-95`}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-start text-[#121514] gap-4">
        <div>
          <div className="text-[#647678] font-mono text-xs mb-2">{project.id}</div>
          <h3 className="text-xl md:text-2xl font-semibold md:font-bold tracking-tight mb-2 md:mb-0 transition-colors duration-500 group-hover:text-[#3a4d4f]">
            {project.title}
          </h3>
        </div>
        <div className="md:text-right text-xs md:text-sm flex flex-col gap-1">
          <p className="text-[#3a4d4f]">{project.location}</p>
          <p className="text-[#647678] font-light">{project.type}</p>
          <div className="mt-2 text-[10px] md:text-xs font-semibold tracking-widest uppercase text-[#121514] opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 translate-y-2 md:group-hover:translate-y-0">
            Voir le projet &rarr;
          </div>
        </div>
      </div>
    </div>
  );
}
