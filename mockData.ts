import { InspirationItem, LibraryItem, Project } from '../types';

export const INITIAL_INSPIRATION: InspirationItem[] = [
  {
    id: 'insp-1',
    title: 'Minimalist Japandi Living Sanctuary',
    roomType: 'Living Room',
    style: 'Japandi',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    description: 'A serene blend of Japanese functional minimalism and Scandinavian warmth featuring light oak woodwork and neutral linens.',
    tags: ['Minimalist', 'Wood', 'Natural Light']
  },
  {
    id: 'insp-2',
    title: 'Modern Indian Luxury Parlor',
    roomType: 'Living Room',
    style: 'Modern Indian',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Exquisite Italian marble flooring paired with rich brass inlays, fluted teak wall paneling, and statement brass chandelier.',
    tags: ['Marble', 'Brass', 'Traditional Touch']
  },
  {
    id: 'insp-3',
    title: 'Scandinavian Serenity Master Suite',
    roomType: 'Master Bedroom',
    style: 'Scandinavian',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
    description: 'Clean lines, textured wool throws, matte white walls, and built-in birch wardrobes maximizing light and airflow.',
    tags: ['Cozy', 'Birch Wood', 'Minimal']
  },
  {
    id: 'insp-4',
    title: 'Contemporary Industrial Penthouse Kitchen',
    roomType: 'Kitchen',
    style: 'Industrial',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    description: 'Matte black handleless cabinetry, exposed concrete accent pillar, quartz waterfall island, and warm pendant Edison lighting.',
    tags: ['Quartz', 'Matte Black', 'Chef Kitchen']
  },
  {
    id: 'insp-5',
    title: 'Neo-Classical Royal Dining Lounge',
    roomType: 'Dining Room',
    style: 'Neo-Classical',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1c0c17250?auto=format&fit=crop&w=1200&q=80',
    description: 'Wainscoting wall moldings, velvet upholstered dining chairs, crystal chandelier, and rich walnut dining table.',
    tags: ['Wainscoting', 'Velvet', 'Formal Dining']
  },
  {
    id: 'insp-6',
    title: 'Bohemian Sunshine Balcony Oasis',
    roomType: 'Balcony',
    style: 'Bohemian',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: 'Rattan hanging chair, terracotta potted ferns, patterned floor tiles, and warm fairy lights for evening relaxation.',
    tags: ['Rattan', 'Plants', 'Cozy Balcony']
  }
];

export const INITIAL_LIBRARY: LibraryItem[] = [
  {
    id: 'lib-1',
    name: 'Aethel L-Shaped Sectional Sofa',
    category: 'furniture',
    subCategory: 'Sofas',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    priceEstimate: '₹85,000 / $1,100',
    description: 'Deep-seat luxury sectional upholstered in stain-resistant Belgian linen with high-resilience foam core.',
    tags: ['Sofa', 'Linen', 'Living Room']
  },
  {
    id: 'lib-2',
    name: 'Calacatta Gold Italian Marble Slab',
    category: 'material',
    subCategory: 'Marble',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    priceEstimate: '₹450 / sq.ft',
    description: 'Premium white Italian marble featuring dramatic golden and grey veining, polished finish.',
    tags: ['Marble', 'Flooring', 'Luxury']
  },
  {
    id: 'lib-3',
    name: 'Brushed Brass Halo Chandelier',
    category: 'lighting',
    subCategory: 'Chandeliers',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
    priceEstimate: '₹32,000 / $400',
    description: 'Modern minimalist ring chandelier with integrated dimmable warm LED strips and brushed brass suspension.',
    tags: ['Lighting', 'Brass', 'Statement']
  },
  {
    id: 'lib-4',
    name: 'Fluted Teak Wood Wall Panels',
    category: 'material',
    subCategory: 'Veneers',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    priceEstimate: '₹280 / sq.ft',
    description: 'Precision-milled acoustic teak fluted paneling designed for TV feature walls and bed backdrops.',
    tags: ['Wood', 'Wall Panel', 'Acoustic']
  },
  {
    id: 'lib-5',
    name: 'Havana Velvet King Bed with Storage',
    category: 'furniture',
    subCategory: 'Beds',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    priceEstimate: '₹68,000 / $850',
    description: 'Luxurious tufted velvet headboard with hydraulic hydraulic lift-up storage compartments underneath.',
    tags: ['Bed', 'Velvet', 'Bedroom']
  },
  {
    id: 'lib-6',
    name: 'Fluted Glass Modular Wardrobe',
    category: 'furniture',
    subCategory: 'Wardrobes',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    priceEstimate: '₹1,20,000 / $1,500',
    description: 'Floor-to-ceiling wardrobe with bronze tinted fluted glass sliding doors and motion sensor internal LED racks.',
    tags: ['Wardrobe', 'Glass', 'Storage']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Modern Penthouse Living & Dining',
    roomType: 'Living Room',
    style: 'Luxury Modern',
    originalImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    generatedImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Transformed spacious living area with Italian marble, custom fluted wood paneling, and warm cove lighting.',
    createdAt: '2026-11-18',
    preferences: {
      wallColors: 'Warm Ivory & Charcoal',
      flooring: 'Italian Marble',
      lighting: 'Cove & Warm Spotlights',
      furnitureStyle: 'Luxury Minimalist',
      mood: 'Sophisticated & Welcoming'
    }
  },
  {
    id: 'proj-2',
    name: 'Minimalist Zen Master Bedroom',
    roomType: 'Master Bedroom',
    style: 'Japandi',
    originalImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    generatedImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    description: 'Created an airy minimalist sanctuary with oak wood flooring, soft linen textures, and ambient bedhead lighting.',
    createdAt: '2026-11-17',
    preferences: {
      wallColors: 'Soft Beige',
      flooring: 'Light Oak Wood',
      lighting: 'Warm Ambient',
      furnitureStyle: 'Japandi Organic',
      mood: 'Peaceful & Restful'
    }
  }
];
