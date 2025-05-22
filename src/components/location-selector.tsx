
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react"; // Import React and useRef
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Compass, Loader2, CheckCircle }
from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Leaflet specific imports - ensure these are only used client-side
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import L for type usage and map instance

// Fix Leaflet's default icon path issue with bundlers
// This ensures marker icons are loaded correctly.
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

const SANTA_CRUZ_COORDS: L.LatLngTuple = [-17.7833, -63.1821]; // Coordinates for Santa Cruz de la Sierra
const INITIAL_ZOOM = 13;

const LocationSelectorComponent = () => {
  const [selectedPosition, setSelectedPosition] = useState<L.LatLngTuple | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const mapRef = useRef<L.Map | null>(null); // Ref to store the map instance

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Effect for manual map cleanup
  useEffect(() => {
    // Cleanup function to remove the map instance if the component unmounts
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null; // Clear the ref
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

  const handleConfirmLocation = () => {
    if (selectedPosition) {
      console.log("Ubicación confirmada por el mapa:", { lat: selectedPosition[0], lng: selectedPosition[1] });
      toast({
        title: "📍 Área de Búsqueda Actualizada",
        description: `Buscando cerca de: Lat ${selectedPosition[0].toFixed(4)}, Lng ${selectedPosition[1].toFixed(4)}.`,
        duration: 4000,
      });
    } else {
      toast({
        title: "⚠️ Sin Selección",
        description: "Por favor, haz clic en el mapa para seleccionar una ubicación.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Component to handle map click events
  function LocationClickHandler() {
    const map = useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom()); // Optionally fly to the clicked location
      },
    });
    return null; // This component does not render anything itself
  }

  if (!isClient) {
    return (
      <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg animate-fade-in-up">
        <CardHeader className="bg-transparent border-b border-border/50 pb-4 sm:pb-5">
          <CardTitle className="flex items-center text-2xl sm:text-3xl font-bold text-primary">
            <Compass className="mr-3 sm:mr-3.5 h-7 w-7 sm:h-8 sm:w-8 animate-pulse-alt" />
            Explorador de Zonas
          </CardTitle>
          <CardDescription className="text-base sm:text-lg text-muted-foreground pt-1">
            Prepara el mapa para encontrar tu próxima aventura...
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 sm:p-6 md:p-8">
          <div className="h-[400px] flex flex-col items-center justify-center bg-muted/50 rounded-lg border border-dashed border-border/70">
            <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 text-primary animate-spin mb-4" />
            <p className="text-lg sm:text-xl text-muted-foreground font-medium">Cargando mapa interactivo...</p>
            <p className="text-sm text-muted-foreground/80">Un momento, por favor.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg animate-fade-in-up">
      <CardHeader className="bg-transparent border-b border-border/50 pb-4 sm:pb-5">
        <CardTitle className="flex items-center text-2xl sm:text-3xl font-bold text-primary">
          <Compass className="mr-3 sm:mr-3.5 h-7 w-7 sm:h-8 sm:w-8 text-primary group-hover:animate-icon-pop" />
          Explorador Interactivo de Santa Cruz
        </CardTitle>
        <CardDescription className="text-base sm:text-lg text-muted-foreground pt-1">
          Haz clic en el mapa para seleccionar tu ubicación de interés. ¡Explora y encuentra!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-5 space-y-5 sm:space-y-6">
        <div className="h-[350px] sm:h-[400px] md:h-[450px] w-full rounded-lg overflow-hidden border border-border shadow-inner relative group">
          <MapContainer
            center={SANTA_CRUZ_COORDS}
            zoom={INITIAL_ZOOM}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg z-0"
            whenCreated={instance => { mapRef.current = instance; }} // Store map instance
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {selectedPosition && (
              <Marker position={selectedPosition}>
                <Popup>
                  Ubicación seleccionada: <br /> Lat: {selectedPosition[0].toFixed(4)}, Lng: {selectedPosition[1].toFixed(4)}
                </Popup>
              </Marker>
            )}
            <LocationClickHandler />
          </MapContainer>
           <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur-sm p-2 rounded-md shadow-lg text-xs text-muted-foreground border border-border/50 group-hover:opacity-100 opacity-80 transition-opacity">
              {selectedPosition
                ? `Seleccionado: Lat ${selectedPosition[0].toFixed(2)}, Lng ${selectedPosition[1].toFixed(2)}`
                : "Haz clic en el mapa para elegir"}
          </div>
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

export const LocationSelector = React.memo(LocationSelectorComponent);
