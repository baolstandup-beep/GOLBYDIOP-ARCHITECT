import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects as mockProjects } from '@/lib/data';
import { supabase } from '@/lib/supabase';

// Map database row to our UI format
function mapRowToProject(row: any) {
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

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  let project = null;
  let allProjects = mockProjects;
  
  try {
    // Try to fetch specific project from Supabase
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', params.slug)
      .single();
      
    if (projectData && !projectError) {
      project = mapRowToProject(projectData);
      
      // Also fetch all projects for navigation
      const { data: allData } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
        
      if (allData && allData.length > 0) {
        allProjects = allData.map(mapRowToProject);
      }
    }
  } catch (err) {
    console.error("Supabase fetch failed", err);
  }

  // Fallback to mock data if not found in DB
  if (!project) {
    project = getProjectBySlug(params.slug);
  }
  
  if (!project) {
    notFound();
  }

  const currentIndex = allProjects.findIndex((p: any) => p.slug === project.slug);
  const nextProject = allProjects[currentIndex + 1] || allProjects[0];
  const prevProject = allProjects[currentIndex - 1] || allProjects[allProjects.length - 1];

  return (
    <div className="bg-[#F4F3EE] min-h-screen">
      {/* Project Hero */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <Image 
          src={project.coverImage} 
          alt={project.title} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-24 max-w-[1400px] mx-auto w-full">
          <div className="text-[#A2CB13] font-mono text-xl mb-4 text-xs tracking-widest uppercase">PROJET</div>
          <h1 className="text-4xl md:text-6xl lg:text-5xl font-bold text-white uppercase tracking-tighter leading-[0.9] mb-8">
            {project.title}
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-sm border-t border-white/30 pt-8 mt-12">
            <div>
              <div className="text-white/60 uppercase tracking-widest text-[10px] mb-2 font-bold">Localisation</div>
              <div>{project.location}</div>
            </div>
            <div>
              <div className="text-white/60 uppercase tracking-widest text-[10px] mb-2 font-bold">Année</div>
              <div>{project.year}</div>
            </div>
            <div>
              <div className="text-white/60 uppercase tracking-widest text-[10px] mb-2 font-bold">Surface</div>
              <div>{project.surface}</div>
            </div>
            <div>
              <div className="text-white/60 uppercase tracking-widest text-[10px] mb-2 font-bold">Client</div>
              <div>{project.client}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-4">
          <h2 className="text-sm font-mono tracking-widest uppercase text-[#647678]">À Propos du Projet</h2>
        </div>
        <div className="md:col-span-8 text-2xl md:text-4xl font-medium leading-relaxed tracking-tight text-[#121514]">
          {project.description}
        </div>
      </section>

      {/* Editorial Gallery */}
      <section className="pb-32">
        <div className="flex flex-col gap-12 md:gap-32">
          {project.images.map((img: string, idx: number) => {
            // Create asymmetrical layouts based on index
            if (idx === 0) {
              return (
                <div key={idx} className="relative w-full h-[70vh] md:h-[100vh] px-0 md:px-12 max-w-[1600px] mx-auto">
                  <Image src={img} alt={`${project.title} vue ${idx + 1}`} fill className="object-cover md:rounded-lg" />
                </div>
              );
            }
            if (idx === 1) {
              return (
                <div key={idx} className="relative w-[90vw] md:w-[60vw] h-[60vh] md:h-[80vh] ml-auto mr-6 md:mr-12">
                  <Image src={img} alt={`${project.title} vue ${idx + 1}`} fill className="object-cover rounded-lg" />
                </div>
              );
            }
            return (
              <div key={idx} className="relative w-[85vw] md:w-[70vw] h-[50vh] md:h-[70vh] mx-auto">
                <Image src={img} alt={`${project.title} vue ${idx + 1}`} fill className="object-cover rounded-lg" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Project Navigation */}
      <section className="w-full bg-[#12201D] text-[#F4F3EE] py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <Link 
            href={`/projets/${prevProject.slug}`}
            className="group flex flex-col items-start cursor-hover"
            data-cursor-text="PREC"
          >
            <span className="text-[#647678] text-sm uppercase tracking-widest mb-4">← Projet précédent</span>
            <span className="text-3xl md:text-3xl font-bold uppercase tracking-tight group-hover:text-[#A2CB13] transition-colors">
              {prevProject.title}
            </span>
          </Link>
          
          <div className="h-[1px] w-full md:w-[1px] md:h-32 bg-[#647678]/30" />

          <Link 
            href={`/projets/${nextProject.slug}`}
            className="group flex flex-col items-end text-right cursor-hover"
            data-cursor-text="SUIV"
          >
            <span className="text-[#647678] text-sm uppercase tracking-widest mb-4">Projet suivant →</span>
            <span className="text-3xl md:text-3xl font-bold uppercase tracking-tight group-hover:text-[#A2CB13] transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
