
import type { Beverage, Store } from './types';

export const mockBeverages: Beverage[] = [
  {
    id: 'bev1',
    name: 'Stolichnaya Vodka',
    type: 'Vodka',
    brand: 'Stolichnaya',
    origin: 'Russia',
    price: 22.99,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Classic Russian vodka, smooth and pure.'
  },
  {
    id: 'bev2',
    name: 'Baltika No. 7',
    type: 'Beer',
    brand: 'Baltika',
    origin: 'Russia',
    price: 3.49,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'A popular Russian lager with a crisp taste.'
  },
  {
    id: 'bev3',
    name: 'Kindzmarauli Wine',
    type: 'Wine',
    brand: 'Georgian Valleys',
    origin: 'Georgia',
    price: 18.75,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Semi-sweet red wine with rich berry notes.'
  },
  {
    id: 'bev4',
    name: 'Jameson Irish Whiskey',
    type: 'Whiskey',
    brand: 'Jameson',
    origin: 'Ireland',
    price: 28.50,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Triple-distilled Irish whiskey, exceptionally smooth.'
  },
  {
    id: 'bev5',
    name: 'Local Craft IPA',
    type: 'Beer',
    brand: 'Santa Cruz Brews',
    origin: 'Local',
    price: 4.99,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'A hoppy IPA from a local brewery.'
  },
  {
    id: 'bev6',
    name: 'Four Loko Gold',
    type: 'Other', // Flavored Malt Beverage
    brand: 'Four Loko',
    origin: 'USA',
    price: 4.50,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Popular flavored malt beverage.'
  },
  {
    id: 'bev7',
    name: 'Coca-Cola Classic',
    type: 'Other', // Soft Drink
    brand: 'Coca-Cola',
    origin: 'Global',
    price: 1.50,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Classic cola soft drink.'
  },
  {
    id: 'bev8',
    name: 'Jägermeister',
    type: 'Other', // Liqueur
    brand: 'Jägermeister',
    origin: 'Germany',
    price: 25.00,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Herbal liqueur from Germany, popular globally.'
  },
  {
    id: 'bev9',
    name: 'Fernet Branca',
    type: 'Other', // Amaro/Liqueur
    brand: 'Branca',
    origin: 'Italy',
    price: 20.00,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Italian bitter herbal liqueur, often mixed with cola.'
  },
  {
    id: 'bev10',
    name: 'Paceña Pilsener',
    type: 'Beer',
    brand: 'Paceña',
    origin: 'Bolivia',
    price: 2.50,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'A leading brand of beer in Bolivia, crisp and refreshing.'
  },
  {
    id: 'bev11',
    name: 'Singani Casa Real',
    type: 'Other', // Brandy/Spirit
    brand: 'Casa Real',
    origin: 'Bolivia',
    price: 15.00,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Bolivian brandy made from Muscat of Alexandria grapes.'
  },
  {
    id: 'bev12',
    name: 'Huari Tradicional',
    type: 'Beer',
    brand: 'Huari',
    origin: 'Bolivia',
    price: 2.75,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Premium Bolivian beer with a balanced flavor.'
  },
  {
    id: 'bev13',
    name: 'Ron Abuelo Añejo',
    type: 'Other', // Rum
    brand: 'Ron Abuelo',
    origin: 'Panama', // Popular imported rum
    price: 19.50,
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Aged Panamanian rum, smooth and rich.'
  }
];

export const mockStores: Store[] = [
  {
    id: 'store1',
    name: 'Downtown Spirits',
    address: '123 Main St, Santa Cruz, CA', // Keeping generic US address for now
    hours: 'Mon-Sat: 10am-9pm, Sun: 12pm-6pm',
    photos: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    latitude: 36.9741,
    longitude: -122.0308,
    inventory: [
      { beverageId: 'bev1', stock: 10 }, // Stolichnaya
      { beverageId: 'bev2', stock: 5 },  // Baltika
      { beverageId: 'bev4', stock: 0 },  // Jameson (Out of stock)
      { beverageId: 'bev9', stock: 7 },  // Fernet Branca
      { beverageId: 'bev10', stock: 12 }, // Paceña
      { beverageId: 'bev7', stock: 25 }, // Coca-Cola
    ],
    rating: 4.5,
  },
  {
    id: 'store2',
    name: 'Seabright Liquors',
    address: '456 Seabright Ave, Santa Cruz, CA',
    hours: 'Mon-Sun: 9am-10pm',
    photos: ['https://placehold.co/600x400.png'],
    latitude: 36.9658,
    longitude: -122.0039,
    inventory: [
      { beverageId: 'bev1', stock: 3 },   // Stolichnaya
      { beverageId: 'bev2', stock: 15 },  // Baltika
      { beverageId: 'bev3', stock: 8 },   // Kindzmarauli Wine
      { beverageId: 'bev5', stock: 12 },  // Local Craft IPA
      { beverageId: 'bev6', stock: 10 },  // Four Loko
      { beverageId: 'bev7', stock: 20 },  // Coca-Cola
      { beverageId: 'bev11', stock: 5 }, // Singani
      { beverageId: 'bev12', stock: 18 }, // Huari
    ],
    rating: 4.2,
  },
  {
    id: 'store3',
    name: 'Westside Wine & More',
    address: '789 Mission St, Santa Cruz, CA',
    hours: 'Mon-Thu: 11am-8pm, Fri-Sat: 11am-9pm, Sun: Closed',
    photos: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    latitude: 36.9700,
    longitude: -122.0470,
    inventory: [
      { beverageId: 'bev3', stock: 20 },  // Kindzmarauli Wine
      { beverageId: 'bev4', stock: 7 },   // Jameson
      { beverageId: 'bev5', stock: 2 },   // Local Craft IPA (Low stock)
      { beverageId: 'bev8', stock: 6 },   // Jägermeister
      { beverageId: 'bev13', stock: 9 },  // Ron Abuelo
    ],
    rating: 4.8,
  },
];
