
"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Compass, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type L from 'leaflet';

const SANTA_CRUZ_COORDS: L.LatLngTuple = [-17.7833, -63.1821];
const INITIAL_ZOOM = 13;

// Dynamically import the new map component
const LocationSelectorMap = React.lazy(() =>
  import('./location-selector-map').then(module => ({ default: module.LocationSelectorMap }))
);

const LocationSelectorComponent = () => {
  const [selectedPosition, setSelectedPosition] = useState<L.LatLngTuple | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleConfirmLocation = () => {
    if (selectedPosition) {
      toast({
        title: "📍 Área de Búsqueda Actualizada",
        description: `Buscando cerca de: Lat ${selectedPosition[0].toFixed(4)}, Lng ${selectedPosition[1].toFixed(4)}. (Funcionalidad de filtro no implementada)`,
        duration: 4000,
        className: "bg-primary text-primary-foreground",
      });
      console.log("Ubicación confirmada:", { lat: selectedPosition[0], lng: selectedPosition[1] });
    } else {
      toast({
        title: "⚠️ Sin Selección",
        description: "Por favor, haz clic en el mapa para seleccionar una ubicación.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleMapClick = useCallback((latlng: L.LatLngTuple) => {
    setSelectedPosition(latlng);
  }, []);

  const MapLoadingPlaceholder = () => (
    <div style={{ height: "100%", width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }} className="rounded-lg">
      <Loader2 className="h-10 w-10 text-primary animate-spin" />
      <p className="ml-2 text-muted-foreground">Cargando mapa interactivo...</p>
    </div>
  );

  return (
    <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg animate-fade-in-up">
      <CardHeader className="bg-transparent border-b border-border/50 pb-4 sm:pb-5">
        <CardTitle className="flex items-center text-2xl sm:text-3xl font-bold text-primary group">
          <Compass className="mr-3 sm:mr-3.5 h-7 w-7 sm:h-8 sm:w-8 text-primary group-hover:animate-icon-pop" />
          Selecciona tu Área de Interés
        </CardTitle>
        <CardDescription className="text-base sm:text-lg text-muted-foreground pt-1">
          Haz clic en el mapa para definir tu zona de búsqueda.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-5 space-y-5 sm:space-y-6">
        <div className="h-[350px] sm:h-[400px] md:h-[450px] w-full rounded-lg overflow-hidden border border-border shadow-inner relative group bg-muted/30">
          {isClient ? (
            <Suspense fallback={<MapLoadingPlaceholder />}>
              <LocationSelectorMap
                center={SANTA_CRUZ_COORDS}
                zoom={INITIAL_ZOOM}
                selectedPosition={selectedPosition}
                onMapClick={handleMapClick}
                mapPlaceholder={<MapLoadingPlaceholder />}
              />
            </Suspense>
          ) : (
            <MapLoadingPlaceholder />
          )}
           {isClient && (
               <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur-sm p-2 rounded-md shadow-lg text-xs text-muted-foreground border border-border/50 group-hover:opacity-100 opacity-80 transition-opacity z-10 pointer-events-none">
                {selectedPosition
                  ? `Seleccionado: Lat ${selectedPosition[0].toFixed(2)}, Lng ${selectedPosition[1].toFixed(2)}`
                  : "Haz clic en el mapa para elegir"}
            </div>
           )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-center pt-1 sm:pt-2 gap-3 sm:gap-4">
          <Button
            onClick={handleConfirmLocation}
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-lg text-base group"
            disabled={!selectedPosition}
          >
            <CheckCircle className="mr-2 h-5 w-5 group-hover:animate-icon-pop" />
            Confirmar Ubicación
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

LocationSelectorComponent.displayName = 'LocationSelector';
// LocationSelector is dynamically imported by MainApplication, so we memo here.
export const LocationSelector = React.memo(LocationSelectorComponent);
