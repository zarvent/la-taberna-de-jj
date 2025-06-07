"use client";

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import Leaflet's default icon images
import iconRetinaUrlAsset from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrlAsset from 'leaflet/dist/images/marker-icon.png';
import shadowUrlAsset from 'leaflet/dist/images/marker-shadow.png';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinned, Info, AlertTriangle } from "lucide-react";
import { Store } from "@/lib/types";
import RouteCalculator from './RouteCalculator'; // This is our RouteManager
import { Loader2 } from "lucide-react";

interface StoreMapProps {
  userLocation: LatLngTuple | null;
  stores: Store[];
  searchedBeverageId?: string | null;
}

const calculateDistance = (loc1: LatLngTuple, loc2: LatLngTuple): number => {
  const dx = loc1[0] - loc2[0];
  const dy = loc1[1] - loc2[1];
  return Math.sqrt(dx * dx + dy * dy);
};

const findNearestStore = (
  userLocation: LatLngTuple,
  stores: Store[],
  searchedBeverageId?: string | null
): Store | null => {
  if (!stores || stores.length === 0) return null;
  let availableStores = stores;
  if (searchedBeverageId) {
    availableStores = stores.filter(store =>
      store.inventory.some(item => item.beverageId === searchedBeverageId && item.stock > 0)
    );
  }
  if (availableStores.length === 0) return null;
  let nearestStore: Store | null = null;
  let minDistance = Infinity;
  for (const store of availableStores) {
    const distance = calculateDistance(userLocation, [store.latitude, store.longitude]);
    if (distance < minDistance) {
      minDistance = distance;
      nearestStore = store;
    }
  }
  return nearestStore;
};

export function StoreMap({ userLocation, stores, searchedBeverageId }: StoreMapProps) {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Configure Leaflet's default icon paths
    // The @ts-ignore might be necessary if TypeScript complains about deleting a readonly property.
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl; // Crucial for Next.js/Webpack

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetinaUrlAsset.src,
      iconUrl: iconUrlAsset.src,
      shadowUrl: shadowUrlAsset.src,
    });

    setMapReady(true);
  }, []);

  const [nearestStore, setNearestStore] = useState<Store | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const availableStoresAfterFilter = (currentStores: Store[], beverageId?: string | null) => {
    if (!beverageId) return currentStores;
    return currentStores.filter(store =>
      store.inventory.some(item => item.beverageId === beverageId && item.stock > 0)
    );
  };

  useEffect(() => {
    if (userLocation && stores.length > 0) {
      const foundStore = findNearestStore(userLocation, stores, searchedBeverageId);
      setNearestStore(foundStore);

      if (searchedBeverageId && !foundStore && availableStoresAfterFilter(stores, searchedBeverageId).length === 0) {
        setInfoMessage("Ninguna tienda cercana tiene esa bebida en stock.");
      } else if (searchedBeverageId && !foundStore && availableStoresAfterFilter(stores, searchedBeverageId).length > 0) {
        setInfoMessage("Bebida disponible, pero no se pudo calcular la ruta a la tienda más cercana con stock.");
      } else if (!foundStore && stores.length > 0 && searchedBeverageId) { // Added searchedBeverageId condition for more specificity
        setInfoMessage("No se pudo determinar la tienda más cercana con la bebida buscada.");
      } else if (!foundStore && stores.length > 0 && !searchedBeverageId) {
        setInfoMessage("No se pudo determinar la tienda más cercana.");
      } else {
        setInfoMessage(null);
      }
    } else {
      setNearestStore(null);
      // Retain info message if user deselects location after a search with no results
      if (!userLocation && !infoMessage?.includes("Ninguna tienda cercana tiene esa bebida en stock")){
        setInfoMessage(null);
      }
    }
  }, [userLocation, stores, searchedBeverageId]);

  if (!userLocation) {
    return (
      <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg">
        <CardHeader className="bg-transparent border-b border-border/50 pb-5">
          <CardTitle className="flex items-center text-3xl font-bold text-primary">
            <MapPinned className="mr-3.5 h-8 w-8" />
            Localizador de Tiendas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[300px]">
          {infoMessage ? (
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-amber-500 mb-4 mx-auto" />
              <p className="text-xl font-semibold text-amber-600 dark:text-amber-500">
                {infoMessage}
              </p>
              <p className="text-base text-muted-foreground mt-2">
                Por favor, selecciona una ubicación en el mapa de arriba para continuar.
              </p>
            </div>
          ) : (
            <>
              <Info className="h-12 w-12 text-primary mb-4" />
              <p className="text-xl font-semibold text-center text-muted-foreground">
                Seleccione una ubicación en el mapa de arriba para ver las tiendas cercanas.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  // Display a loader or nothing until map resources are ready
  if (!mapReady) {
    return (
      <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg">
        <CardHeader className="bg-transparent border-b border-border/50 pb-5">
          <CardTitle className="flex items-center text-3xl font-bold text-primary">
            <MapPinned className="mr-3.5 h-8 w-8" />
            Localizador de Tiendas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-xl font-semibold text-center text-muted-foreground">
            Cargando recursos del mapa...
          </p>
        </CardContent>
      </Card>
    );
  }

  const mapCenter = userLocation;

  return (
    <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg">
      <CardHeader className="bg-transparent border-b border-border/50 pb-5">
        <CardTitle className="flex items-center text-3xl font-bold text-primary">
          <MapPinned className="mr-3.5 h-8 w-8" />
          Localizador de Tiendas
        </CardTitle>
        {infoMessage && (
          <CardDescription className="text-base text-amber-600 dark:text-amber-500 pt-2 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            {infoMessage}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-5">
        <div className="h-[400px] sm:h-[450px] md:h-[500px] w-full rounded-lg overflow-hidden border border-input shadow-inner bg-muted/30">
          <MapContainer center={mapCenter} zoom={14} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={userLocation} >
              <Popup>Tu ubicación seleccionada</Popup>
            </Marker>

            {stores.map(store => (
              <Marker key={store.id} position={[store.latitude, store.longitude]}>
                <Popup>
                  <b>{store.name}</b><br />
                  {store.address}
                </Popup>
              </Marker>
            ))}

            {userLocation && nearestStore && (
              <RouteCalculator
                userLocation={userLocation}
                storeLocation={[nearestStore.latitude, nearestStore.longitude]}
              />
            )}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Example of how to use it in another component (e.g. a page or MainApplication)
// const SomePageComponent = () => {
//   const userLocation: LatLngTuple | null = [-17.7833, -63.1821]; // This would come from state
//   const beverageId = "some-beverage-uuid"; // This could come from search state
//   return <StoreMap userLocation={userLocation} stores={mockStores} searchedBeverageId={beverageId} />
// }
