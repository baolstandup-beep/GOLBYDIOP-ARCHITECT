import { ServicesSection } from "@/components/home/ServicesSection";

export default function ServicesPage() {
  return (
    <div className="bg-[#F4F3EE] min-h-screen text-[#111111]">
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto pt-48 pb-24">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666666] mb-8">
          GDA / DOMAINES D'EXPERTISE
        </div>
        <h1 className="font-[800] tracking-tighter leading-[0.9] uppercase text-[#111111] max-w-5xl" style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}>
          Construire des <br />
          solutions durables.
        </h1>
        <div className="w-full h-[1px] bg-[#111111]/10 mt-16" />
      </div>
      <ServicesSection />
    </div>
  );
}
