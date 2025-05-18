export interface Beverage {
  id: string;
  name: string;
  type: 'Vodka' | 'Beer' | 'Wine' | 'Whiskey' | 'Other';
  brand: string;
  origin: string; // e.g., 'Russia', 'Scotland', 'Local'
  price: number;
  imageUrl?: string;
  description?: string;
}

export interface StoreInventory {
  beverageId: string;
  stock: number; // 0: out of stock, 1-5: low stock, >5: in stock
}

export interface Store {
  id: string;
  name: string;
  address: string;
  hours: string; // e.g., "Mon-Fri: 9am-10pm, Sat-Sun: 10am-11pm"
  photos: string[]; // URLs to images
  latitude: number;
  longitude: number;
  inventory: StoreInventory[];
  rating?: number; // Optional rating 1-5
}

export type LocationPreference = 'North Santa Cruz' | 'South Santa Cruz' | 'GPS' | null;
