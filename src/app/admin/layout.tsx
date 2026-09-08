import { ReactNode } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex text-[#121514]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#12201D] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-tighter">GDA <span className="font-light text-[#A2CB13]">Admin</span></h1>
        </div>
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          <Link href="/admin" className="px-4 py-3 rounded-lg bg-white/10 font-medium text-sm">
            Tableau de bord
          </Link>
          <Link href="/admin/projets/nouveau" className="px-4 py-3 rounded-lg hover:bg-white/5 font-medium text-sm transition-colors text-white/70">
            Nouveau Projet
          </Link>
          <a href="/" target="_blank" className="px-4 py-3 rounded-lg hover:bg-white/5 font-medium text-sm transition-colors text-white/70 mt-auto">
            Voir le site ↗
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <header className="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center">
          <h2 className="font-medium text-gray-800">Gestion des Projets</h2>
          <div className="text-sm text-gray-500">Mode Développement Local</div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
