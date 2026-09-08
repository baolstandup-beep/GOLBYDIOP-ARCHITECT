'use client';

import { useEffect, useState } from 'react';
import { supabase, ProjectRow } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
        
      if (error) throw error;
      if (data) setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la connexion à Supabase.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;
    
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      fetchProjects();
    } catch (err: any) {
      alert('Erreur lors de la suppression: ' + err.message);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projets</h1>
        <Link href="/admin/projets/nouveau" className="bg-[#A2CB13] text-[#12201D] px-6 py-2 rounded-md font-bold hover:bg-[#12201D] hover:text-white transition-colors">
          + Ajouter un projet
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-8">
          <p className="font-bold">Erreur de connexion</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-sm mt-2 font-mono">Assurez-vous que Supabase est configuré dans le fichier .env.local</p>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold text-xs">
            <tr>
              <th className="px-6 py-4">Titre</th>
              <th className="px-6 py-4">Catégorie</th>
              <th className="px-6 py-4">Lieu</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Chargement...</td></tr>
            ) : projects.length === 0 && !error ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Aucun projet trouvé. Cliquez sur Ajouter pour commencer.</td></tr>
            ) : (
              projects.map(project => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{project.title}</td>
                  <td className="px-6 py-4 text-gray-600">{project.category}</td>
                  <td className="px-6 py-4 text-gray-600">{project.location}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700 font-medium text-xs uppercase tracking-widest">Supprimer</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
