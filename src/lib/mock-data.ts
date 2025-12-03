
import type { Beverage, Store } from './types';

// Nombres de bebidas traducidos o mantenidos según su marca
export const mockBeverages: Beverage[] = [
  {
    id: 'bev1',
    name: 'Stolichnaya Vodka',
    type: 'Vodka',
    brand: 'Stolichnaya',
    price: 150.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Vodka ruso clásico, suave y puro.'
  },
  {
    id: 'bev2',
    name: 'Paceña Pilsener',
    type: 'Beer',
    brand: 'Paceña',
    price: 10.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Cerveza lager boliviana líder, refrescante y con cuerpo.'
  },
  {
    id: 'bev3',
    name: 'Vino Kohlberg Tinto',
    type: 'Wine',
    brand: 'Kohlberg',
    price: 55.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Vino tinto de altura, producido en los valles de Tarija.'
  },
  {
    id: 'bev4',
    name: 'Jameson Irish Whiskey',
    type: 'Whiskey',
    brand: 'Jameson',
    price: 180.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Whiskey irlandés tridestilado, excepcionalmente suave.'
  },
  {
    id: 'bev5',
    name: 'Cerveza Cordillera',
    type: 'Beer',
    brand: 'Cordillera',
    price: 12.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Cerveza artesanal boliviana con un toque especial.'
  },
  {
    id: 'bev6',
    name: 'Four Loko Gold',
    type: 'Other', 
    brand: 'Four Loko',
    price: 25.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Popular bebida de malta saborizada.'
  },
  {
    id: 'bev7',
    name: 'Coca-Cola Clásica',
    type: 'Other', 
    brand: 'Coca-Cola',
    price: 8.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Refresco de cola clásico.'
  },
  {
    id: 'bev8',
    name: 'Jägermeister',
    type: 'Other', 
    brand: 'Jägermeister',
    price: 160.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Licor de hierbas alemán, popular globalmente.'
  },
  {
    id: 'bev9',
    name: 'Fernet Branca',
    type: 'Other', 
    brand: 'Branca',
    price: 130.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Licor de hierbas amargo italiano, a menudo mezclado con cola.'
  },
  {
    id: 'bev10',
    name: 'Huari Tradicional',
    type: 'Beer',
    brand: 'Huari',
    price: 11.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Cerveza boliviana premium con un sabor equilibrado.'
  },
  {
    id: 'bev11',
    name: 'Singani Casa Real Etiqueta Negra',
    type: 'Other', 
    brand: 'Casa Real',
    price: 90.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Singani boliviano premium, destilado de uvas Moscatel de Alejandría.'
  },
  {
    id: 'bev12',
    name: 'Ron Abuelo Añejo',
    type: 'Other', 
    brand: 'Ron Abuelo',
    price: 140.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Ron panameño añejo, suave y rico.'
  },
  {
    id: 'bev13',
    name: 'Sprite',
    type: 'Other', 
    brand: 'Sprite',
    price: 7.00, 
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Refresco de lima-limón.'
  }
];

export const mockStores: Store[] = [
  {
    id: 'store1',
    name: 'Licorería El Gato Negro',
    address: 'Av. Busch #750, Santa Cruz de la Sierra',
    hours: 'Lun-Sáb: 10am-9pm, Dom: 12pm-6pm',
    photos: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    latitude: -17.7832, 
    longitude: -63.1821, 
    inventory: [
      { beverageId: 'bev1', stock: 10 }, 
      { beverageId: 'bev2', stock: 25 },  
      { beverageId: 'bev4', stock: 0 },  
      { beverageId: 'bev9', stock: 7 },  
      { beverageId: 'bev10', stock: 12 }, 
      { beverageId: 'bev7', stock: 30 }, 
      { beverageId: 'bev11', stock: 8 }, 
    ],
    rating: 4.5,
  },
  {
    id: 'store2',
    name: 'Supermercado Fidalga Equipetrol',
    address: 'Av. San Martín, Equipetrol Norte, Santa Cruz de la Sierra',
    hours: 'Lun-Dom: 9am-10pm',
    photos: ['https://placehold.co/600x400.png'],
    latitude: -17.7726, 
    longitude: -63.1948, 
    inventory: [
      { beverageId: 'bev1', stock: 3 },   
      { beverageId: 'bev2', stock: 40 },  
      { beverageId: 'bev3', stock: 15 },   
      { beverageId: 'bev5', stock: 12 },  
      { beverageId: 'bev6', stock: 10 },  
      { beverageId: 'bev7', stock: 50 },  
      { beverageId: 'bev8', stock: 5 },  
      { beverageId: 'bev13', stock: 20 }, 
    ],
    rating: 4.2,
  },
  {
    id: 'store3',
    name: 'Bodega La Sommelier',
    address: 'Calle Rene Moreno #230, Casco Viejo, Santa Cruz de la Sierra',
    hours: 'Lun-Jue: 11am-8pm, Vie-Sáb: 11am-9pm, Dom: Cerrado',
    photos: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    latitude: -17.7863, 
    longitude: -63.1812, 
    inventory: [
      { beverageId: 'bev3', stock: 20 },  
      { beverageId: 'bev4', stock: 7 },   
      { beverageId: 'bev1', stock: 2 },   
      { beverageId: 'bev8', stock: 6 },   
      { beverageId: 'bev12', stock: 9 },  
      { beverageId: 'bev11', stock: 10 }, 
    ],
    rating: 4.8,
  },
  {
    id: 'store4',
    name: 'Licorería 24/7',
    address: 'Av. Cristo Redentor, 4to Anillo',
    hours: '24 Horas',
    photos: ['https://placehold.co/600x400.png'],
    latitude: -17.7500,
    longitude: -63.1700,
    inventory: [
        { beverageId: 'bev2', stock: 50 },
        { beverageId: 'bev5', stock: 20 },
        { beverageId: 'bev7', stock: 100 },
    ],
    rating: 4.0
  },
  {
      id: 'store5',
      name: 'Vinos y Licores El Solar',
      address: 'Av. Las Americas #123',
      hours: 'Lun-Dom: 10am-11pm',
      photos: ['https://placehold.co/600x400.png'],
      latitude: -17.8000,
      longitude: -63.1900,
      inventory: [
          { beverageId: 'bev3', stock: 30 },
          { beverageId: 'bev11', stock: 15 },
      ],
      rating: 4.6
  }
];
