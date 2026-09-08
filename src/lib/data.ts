export type Project = {
  id: string;
  slug: string;
  title: string;
  location: string;
  year: string;
  category: string;
  surface: string;
  client: string;
  coverImage: string;
  images: string[];
  description: string;
};

export const projects: Project[] = [
  {
    id: '01',
    slug: 'villa-horizon',
    title: 'Villa Horizon',
    location: 'Touba, Sénégal',
    year: '2026',
    category: 'Résidentiel',
    surface: '450 m²',
    client: 'Privé',
    coverImage: '/assets/images/projet-gda-1.jpg',
    images: ['/assets/images/projet-gda-1.jpg', '/assets/images/projet-gda-2.jpg', '/assets/images/projet-gda-3.jpg'],
    description: 'Une villa contemporaine luxueuse intégrant des matériaux locaux et une conception bioclimatique avancée pour maximiser la ventilation naturelle.'
  },
  {
    id: '02',
    slug: 'complexe-diourbel',
    title: 'Complexe Diourbel',
    location: 'Diourbel, Sénégal',
    year: '2025',
    category: 'Commercial',
    surface: '2500 m²',
    client: 'Investissement Immobilier SN',
    coverImage: '/assets/images/projet-gda-2.jpg',
    images: ['/assets/images/projet-gda-2.jpg', '/assets/images/projet-gda-1.jpg'],
    description: 'Centre commercial et espaces de bureaux avec une façade cinétique protégeant du rayonnement solaire.'
  },
  {
    id: '03',
    slug: 'residence-les-alizes',
    title: 'Résidence Les Alizés',
    location: 'Dakar, Sénégal',
    year: '2024',
    category: 'Résidentiel',
    surface: '1200 m²',
    client: 'Privé',
    coverImage: '/assets/images/projet-gda-3.jpg',
    images: ['/assets/images/projet-gda-3.jpg'],
    description: 'Un ensemble résidentiel haut de gamme surplombant l\'océan, avec une attention particulière aux espaces extérieurs.'
  },
  {
    id: '04',
    slug: 'siege-social-atrium',
    title: 'Siège Social Atrium',
    location: 'Diamniadio, Sénégal',
    year: '2023',
    category: 'Tertiaire',
    surface: '4000 m²',
    client: 'Groupe Atrium',
    coverImage: '/assets/images/projet-gda-hero.jpg',
    images: ['/assets/images/projet-gda-hero.jpg'],
    description: 'Nouveau siège social intégrant les principes de durabilité et favorisant le bien-être au travail à travers des espaces de coworking végétalisés.'
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
