'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { projects as mockProjects } from '@/lib/data';
import { supabase, ProjectRow } from '@/lib/supabase';

// Helper function to map Supabase row to Project type
function mapRowToProject(row: ProjectRow) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    year: row.year,
    category: row.category,
    surface: row.surface,
    client: row.client,
    coverImage: row.cover_image,
    images: row.images,
    description: row.description
  };
}

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState<any[]>(mockProjects);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch from Supabase
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (data && data.length > 0 && !error) {
          setProjectsData(data.map(mapRowToProject));
        }
      } catch (err) {
        console.error("Supabase fetch failed, using mock data", err);
      }
    }
    
    fetchProjects();

    // Only run horizontal scroll logic on desktop
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    
    if (isDesktop && containerRef.current && scrollWrapperRef.current) {
      const pinWrap = scrollWrapperRef.current;
      const pinWrapWidth = pinWrap.scrollWidth;

      const horizontalScroll = gsap.to(pinWrap, {
        x: () => -(pinWrapWidth - window.innerWidth + 200), // Account for padding
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrub
          end: () => "+=" + pinWrapWidth,
          invalidateOnRefresh: true,
        }
      });

      return () => {
        horizontalScroll.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, []);

  return (
    <div className="bg-[#12201D] min-h-screen text-[#F4F3EE]">
      {/* Intro section */}
      <section className="pt-48 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <h1 className="text-4xl md:text-3xl lg:text-5xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
          Nos<br/>Réalisations
        </h1>
        <p className="text-xl md:text-2xl text-[#647678] max-w-2xl">
          Une sélection de nos projets les plus emblématiques, allant de résidences privées luxueuses aux complexes commerciaux innovants.
        </p>
      </section>

      {/* Horizontal Scroll Section (Desktop) / Vertical Stack (Mobile) */}
      <section ref={containerRef} className="w-full overflow-hidden pb-40">
        <div 
          ref={scrollWrapperRef} 
          className="flex flex-col md:flex-row px-6 md:px-12 gap-20 md:gap-32 w-max"
        >
          {projectsData.map((project, idx) => (
            <Link 
              href={`/projets/${project.slug}`} 
              key={project.id}
              className="group block w-full md:w-[60vw] shrink-0 cursor-hover"
              data-cursor-text="VOIR"
            >
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden mb-8">
                <Image 
                  src={project.coverImage} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white border border-white rounded-full px-6 py-3 tracking-widest text-sm uppercase">Découvrir le projet</span>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[#A2CB13] font-mono text-lg mb-2">{project.id}</div>
                  <h3 className="text-3xl md:text-3xl font-bold uppercase tracking-tight mb-2">{project.title}</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm md:text-base">{project.location}</p>
                  <p className="text-[#647678] text-sm md:text-base">{project.category} — {project.year}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
