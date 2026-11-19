export interface Project {
  id: string;
  name: string;
  roomType: string;
  style: string;
  originalImage: string;
  generatedImage: string;
  description: string;
  createdAt: string;
  preferences: {
    wallColors: string;
    flooring: string;
    lighting: string;
    furnitureStyle: string;
    mood: string;
  };
  history?: string[];
}

export interface InspirationItem {
  id: string;
  title: string;
  roomType: string;
  style: string;
  image: string;
  description: string;
  tags: string[];
}

export interface LibraryItem {
  id: string;
  name: string;
  category: 'furniture' | 'material' | 'lighting';
  subCategory: string;
  image: string;
  priceEstimate: string;
  description: string;
  tags: string[];
}
