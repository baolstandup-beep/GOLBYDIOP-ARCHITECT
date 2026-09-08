'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    location: '',
    year: new Date().getFullYear().toString(),
    category: '',
    surface: '',
    client: '',
    cover_image: '/assets/images/project-commercial.jpg', // Default fallback
    description: '',
    display_order: 10
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === 'title' && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.from('projects').insert([{
        ...formData,
        images: [formData.cover_image] // Start with just the cover image in the array for simplicity
      }]);
      
      if (error) throw error;
      
      alert('Projet créé avec succès!');
      router.push('/admin');
    } catch (error: any) {
      alert('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Nouveau Projet</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre du projet *</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL) *</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 bg-gray-50" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="ex: Résidentiel" className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="ex: Dakar, Sénégal" className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Année</label>
            <input type="text" name="year" value={formData.year} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
            <input type="text" name="client" value={formData.client} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Surface</label>
            <input type="text" name="surface" value={formData.surface} onChange={handleChange} placeholder="ex: 450 m²" className="w-full border border-gray-300 rounded-md p-2" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Chemin de l'image de couverture</label>
          <input type="text" name="cover_image" value={formData.cover_image} onChange={handleChange} placeholder="/assets/images/..." className="w-full border border-gray-300 rounded-md p-2" />
          <p className="text-xs text-gray-500 mt-1">Exemple: /assets/images/hero-architecture.jpg (Pour l'instant, on utilise des chemins locaux)</p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description complète</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full border border-gray-300 rounded-md p-2 resize-none"></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => router.push('/admin')} className="px-6 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-[#12201D] text-white rounded-md font-medium hover:bg-[#273E36] transition-colors disabled:opacity-50">
            {loading ? 'Création...' : 'Créer le projet'}
          </button>
        </div>
      </form>
    </div>
  );
}
