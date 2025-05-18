
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

export function LocationSelector() {
  const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates | null>(null);
  const [mapInitializationMessage, setMapInitializationMessage] = useState<string | null>(null);
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true);

  useEffect(() => {
    // Simular el inicio de la inicialización del mapa
    const timer = setTimeout(() => {
      // En una implementación real, aquí se inicializaría la biblioteca del mapa.
      // Por ejemplo, comprobar si la API de Google Maps está cargada.
      // if (window.google && mapRef.current) { ... } 
      
      // Como no tenemos una clave API ni la biblioteca configurada aún:
      setMapInitializationMessage("Mapa interactivo en desarrollo. Se requiere configuración de API y biblioteca de mapas para la funcionalidad completa.");
      setIsLoadingMap(false);
    }, 1500); // Simular un pequeño retraso de carga

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="shadow-xl rounded-lg overflow-hidden border">
      <CardHeader className="bg-card border-b">
        <CardTitle className="flex items-center text-2xl font-semibold text-primary">
          <MapPin className="mr-3 h-7 w-7" />
          Tu Ubicación en Santa Cruz
        </CardTitle>
        <CardDescription className="text-md">
          Estamos trabajando para integrar un mapa interactivo de Santa Cruz de la Sierra aquí. Pronto podrás seleccionar tu ubicación directamente en el mapa para encontrar las tiendas más cercanas.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-input overflow-hidden relative">
          {isLoadingMap && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Cargando mapa...</p>
            </div>
          )}
          <Image
            src="https://placehold.co/800x450.png"
            alt="Mapa de Santa Cruz de la Sierra para selección de ubicación"
            width={800}
            height={450}
            className={`object-cover w-full h-full transition-opacity duration-300 ${isLoadingMap ? 'opacity-50' : 'opacity-100'}`}
            data-ai-hint="map Santa Cruz Bolivia"
            priority
          />
        </div>
        {mapInitializationMessage && !isLoadingMap && (
          <p className="text-sm text-center text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded-md mt-4">
            {mapInitializationMessage}
          </p>
        )}
         {/* Ejemplo de cómo se podrían mostrar las coordenadas (para desarrollo) 
         {selectedCoordinates && (
          <p className="text-xs text-center text-muted-foreground pt-2">
            Coords: {selectedCoordinates.lat}, {selectedCoordinates.lng}
          </p>
        )}
        */}
      </CardContent>
    </Card>
  );
}
