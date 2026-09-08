import { TeamSection } from "@/components/home/TeamSection";

export default function TeamPage() {
  return (
    <div className="bg-[#12201D] min-h-screen pt-32">
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto py-20 text-center fade-up">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-[#F4F3EE]">Le Studio</h1>
      </div>
      <TeamSection />
    </div>
  );
}
