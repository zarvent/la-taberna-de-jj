
import type { Beverage, Store } from './types';

// Nombres de bebidas traducidos o mantenidos según su marca
export const mockBeverages: Beverage[] = [
  {
    id: 'bev1',
    name: 'Stolichnaya Vodka', // Marca conocida, se mantiene
    type: 'Vodka',
    brand: 'Stolichnaya',
    origin: 'Rusia',
    price: 150.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Vodka ruso clásico, suave y puro.'
  },
  {
    id: 'bev2',
    name: 'Paceña Pilsener', // Marca local
    type: 'Beer',
    brand: 'Paceña',
    origin: 'Bolivia',
    price: 10.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Cerveza lager boliviana líder, refrescante y con cuerpo.'
  },
  {
    id: 'bev3',
    name: 'Vino Kohlberg Tinto', // Marca local
    type: 'Wine',
    brand: 'Kohlberg',
    origin: 'Bolivia',
    price: 55.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Vino tinto de altura, producido en los valles de Tarija.'
  },
  {
    id: 'bev4',
    name: 'Jameson Irish Whiskey', // Marca conocida
    type: 'Whiskey',
    brand: 'Jameson',
    origin: 'Irlanda',
    price: 180.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Whiskey irlandés tridestilado, excepcionalmente suave.'
  },
  {
    id: 'bev5',
    name: 'Cerveza Cordillera', // Marca local
    type: 'Beer',
    brand: 'Cordillera',
    origin: 'Bolivia',
    price: 12.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Cerveza artesanal boliviana con un toque especial.'
  },
  {
    id: 'bev6',
    name: 'Four Loko Gold', // Marca conocida
    type: 'Other', // Bebida de malta saborizada
    brand: 'Four Loko',
    origin: 'EE.UU.',
    price: 25.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Popular bebida de malta saborizada.'
  },
  {
    id: 'bev7',
    name: 'Coca-Cola Clásica', // Marca conocida
    type: 'Other', // Refresco
    brand: 'Coca-Cola',
    origin: 'Global',
    price: 8.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Refresco de cola clásico.'
  },
  {
    id: 'bev8',
    name: 'Jägermeister', // Marca conocida
    type: 'Other', // Licor
    brand: 'Jägermeister',
    origin: 'Alemania',
    price: 160.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Licor de hierbas alemán, popular globalmente.'
  },
  {
    id: 'bev9',
    name: 'Fernet Branca', // Marca conocida
    type: 'Other', // Amaro/Licor
    brand: 'Branca',
    origin: 'Italia',
    price: 130.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Licor de hierbas amargo italiano, a menudo mezclado con cola.'
  },
  {
    id: 'bev10',
    name: 'Huari Tradicional', // Marca local
    type: 'Beer',
    brand: 'Huari',
    origin: 'Bolivia',
    price: 11.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Cerveza boliviana premium con un sabor equilibrado.'
  },
  {
    id: 'bev11',
    name: 'Singani Casa Real Etiqueta Negra', // Marca local
    type: 'Other', // Singani (Aguardiente)
    brand: 'Casa Real',
    origin: 'Bolivia',
    price: 90.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Singani boliviano premium, destilado de uvas Moscatel de Alejandría.'
  },
  {
    id: 'bev12',
    name: 'Ron Abuelo Añejo', // Marca importada popular
    type: 'Other', // Ron
    brand: 'Ron Abuelo',
    origin: 'Panamá',
    price: 140.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Ron panameño añejo, suave y rico.'
  },
  {
    id: 'bev13',
    name: 'Sprite', // Marca conocida
    type: 'Other', // Refresco
    brand: 'Sprite',
    origin: 'Global',
    price: 7.00, // Precio ejemplo en Bs.
    imageUrl: 'https://placehold.co/300x400.png',
    description: 'Refresco de lima-limón.'
  }
];

export const mockStores: Store[] = [
  {
    id: 'store1',
    name: 'Licorería El Gato Negro', // Nombre ejemplo
    address: 'Av. Busch #750, Santa Cruz de la Sierra', // Dirección ejemplo SCZ
    hours: 'Lun-Sáb: 10am-9pm, Dom: 12pm-6pm',
    photos: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    latitude: -17.7832, // Latitud ejemplo SCZ
    longitude: -63.1821, // Longitud ejemplo SCZ
    inventory: [
      { beverageId: 'bev1', stock: 10 }, // Stolichnaya
      { beverageId: 'bev2', stock: 25 },  // Paceña
      { beverageId: 'bev4', stock: 0 },  // Jameson (Agotado)
      { beverageId: 'bev9', stock: 7 },  // Fernet Branca
      { beverageId: 'bev10', stock: 12 }, // Huari
      { beverageId: 'bev7', stock: 30 }, // Coca-Cola
      { beverageId: 'bev11', stock: 8 }, // Singani
    ],
    rating: 4.5,
  },
  {
    id: 'store2',
    name: 'Supermercado Fidalga Equipetrol', // Nombre ejemplo
    address: 'Av. San Martín, Equipetrol Norte, Santa Cruz de la Sierra', // Dirección ejemplo SCZ
    hours: 'Lun-Dom: 9am-10pm',
    photos: ['https://placehold.co/600x400.png'],
    latitude: -17.7726, // Latitud ejemplo SCZ
    longitude: -63.1948, // Longitud ejemplo SCZ
    inventory: [
      { beverageId: 'bev1', stock: 3 },   // Stolichnaya
      { beverageId: 'bev2', stock: 40 },  // Paceña
      { beverageId: 'bev3', stock: 15 },   // Vino Kohlberg
      { beverageId: 'bev5', stock: 12 },  // Cerveza Cordillera
      { beverageId: 'bev6', stock: 10 },  // Four Loko
      { beverageId: 'bev7', stock: 50 },  // Coca-Cola
      { beverageId: 'bev8', stock: 5 },  // Jägermeister
      { beverageId: 'bev13', stock: 20 }, // Sprite
    ],
    rating: 4.2,
  },
  {
    id: 'store3',
    name: 'Bodega La Sommelier', // Nombre ejemplo
    address: 'Calle Rene Moreno #230, Casco Viejo, Santa Cruz de la Sierra', // Dirección ejemplo SCZ
    hours: 'Lun-Jue: 11am-8pm, Vie-Sáb: 11am-9pm, Dom: Cerrado',
    photos: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    latitude: -17.7863, // Latitud ejemplo SCZ
    longitude: -63.1812, // Longitud ejemplo SCZ
    inventory: [
      { beverageId: 'bev3', stock: 20 },  // Vino Kohlberg
      { beverageId: 'bev4', stock: 7 },   // Jameson
      { beverageId: 'bev1', stock: 2 },   // Stolichnaya (Poco stock)
      { beverageId: 'bev8', stock: 6 },   // Jägermeister
      { beverageId: 'bev12', stock: 9 },  // Ron Abuelo
      { beverageId: 'bev11', stock: 10 }, // Singani Casa Real
    ],
    rating: 4.8,
  },
];
