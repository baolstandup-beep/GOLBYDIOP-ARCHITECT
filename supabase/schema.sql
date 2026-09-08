-- Création de la table projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  location TEXT,
  year TEXT,
  category TEXT,
  surface TEXT,
  client TEXT,
  cover_image TEXT,
  images TEXT[] DEFAULT '{}',
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activation de RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Politique pour autoriser la lecture publique
CREATE POLICY "Les projets sont publics pour tout le monde" 
  ON projects FOR SELECT 
  USING (true);

-- Politique pour autoriser toutes les opérations (INSERT, UPDATE, DELETE) pour les utilisateurs authentifiés
-- ATTENTION: Cette politique est basique. Pour une vraie prod, ajoutez une vérification sur le rôle de l'utilisateur.
CREATE POLICY "Les utilisateurs authentifiés peuvent tout faire" 
  ON projects FOR ALL 
  USING (auth.role() = 'authenticated');
  
-- Insertion de données de test (optionnel)
INSERT INTO projects (slug, title, location, year, category, surface, client, cover_image, images, description, display_order)
VALUES 
('villa-horizon', 'Villa Horizon', 'Touba, Sénégal', '2026', 'Résidentiel', '450 m²', 'Privé', '/assets/images/hero-architecture.jpg', ARRAY['/assets/images/hero-architecture.jpg', '/assets/images/villa-cantilever-luxe.jpg'], 'Une villa contemporaine luxueuse intégrant des matériaux locaux et une conception bioclimatique avancée pour maximiser la ventilation naturelle.', 1),
('complexe-diourbel', 'Complexe Diourbel', 'Diourbel, Sénégal', '2025', 'Commercial', '2500 m²', 'Investissement Immobilier SN', '/assets/images/project-commercial.jpg', ARRAY['/assets/images/project-commercial.jpg', '/assets/images/hero-building-gda.jpg'], 'Centre commercial et espaces de bureaux avec une façade cinétique protégeant du rayonnement solaire.', 2)
ON CONFLICT (slug) DO NOTHING;
