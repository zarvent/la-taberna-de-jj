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
];

export const mockStores: Store[] = [
  {
    id: 'store1',
    name: 'Downtown Spirits',
    address: '123 Main St, Santa Cruz, CA',
    hours: 'Mon-Sat: 10am-9pm, Sun: 12pm-6pm',
    photos: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    latitude: 36.9741,
    longitude: -122.0308,
    inventory: [
      { beverageId: 'bev1', stock: 10 },
      { beverageId: 'bev2', stock: 5 },
      { beverageId: 'bev4', stock: 0 },
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
      { beverageId: 'bev1', stock: 3 },
      { beverageId: 'bev2', stock: 15 },
      { beverageId: 'bev3', stock: 8 },
      { beverageId: 'bev5', stock: 12 },
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
      { beverageId: 'bev3', stock: 20 },
      { beverageId: 'bev4', stock: 7 },
      { beverageId: 'bev5', stock: 2 },
    ],
    rating: 4.8,
  },
];
