
/**
 * Representa una bebida disponible en el catálogo.
 */
export interface Beverage {
  /** Identificador único de la bebida. */
  id: string;
  /** Nombre comercial de la bebida. */
  name: string;
  /** Categoría de la bebida. */
  type: 'Vodka' | 'Beer' | 'Wine' | 'Whiskey' | 'Other';
  /** Marca del fabricante. */
  brand: string;
  /** Precio unitario en la moneda local. */
  price: number;
  /** URL de la imagen del producto (opcional). */
  imageUrl?: string;
  /** Descripción detallada del producto (opcional). */
  description?: string;
}

/**
 * Representa el estado del inventario de una bebida en una tienda específica.
 */
export interface StoreInventory {
  /** ID de la bebida asociada. */
  beverageId: string;
  /** Nivel de stock: 0 (agotado), 1-5 (bajo), >5 (disponible). */
  stock: number;
}

/**
 * Representa una tienda o licorería física.
 */
export interface Store {
  /** Identificador único de la tienda. */
  id: string;
  /** Nombre del establecimiento. */
  name: string;
  /** Dirección física completa. */
  address: string;
  /** Horarios de atención (texto libre). */
  hours: string;
  /** Lista de URLs de fotos de la tienda. */
  photos: string[];
  /** Latitud geográfica para el mapa. */
  latitude: number;
  /** Longitud geográfica para el mapa. */
  longitude: number;
  /** Inventario de productos disponibles en esta tienda. */
  inventory: StoreInventory[];
  /** Calificación promedio de la tienda (1-5, opcional). */
  rating?: number;
}

/**
 * Preferencia de ubicación del usuario para filtrar resultados.
 */
export type LocationPreference = 'North Santa Cruz' | 'South Santa Cruz' | 'GPS' | null;
