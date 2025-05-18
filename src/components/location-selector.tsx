
"use client";

import { useEffect, useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const SANTA_CRUZ_CENTER = {
  lat: -17.7832, // Latitud para Santa Cruz de la Sierra
  lng: -63.1821  // Longitud para Santa Cruz de la Sierra
};

const mapContainerStyle = {
  width: '100%',
  height: '400px' // Ajusta la altura según necesites
};

interface Coordinates {
  lat: number;
  lng: number;
}

export function LocationSelector() {
  const { toast } = useToast();
  const [selectedPosition, setSelectedPosition] = useState<Coordinates | null>(null); // Inicia sin posición seleccionada
  const [currentMapCenter, setCurrentMapCenter] = useState<Coordinates>(SANTA_CRUZ_CENTER);
  const [mapReady, setMapReady] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Asegura que el código dependiente de window/env solo se ejecute en el cliente
    if (!MAP_API_KEY) {
      console.error("Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.");
      setApiKeyMissing(true);
      // No mostramos toast aquí aun, se mostrará el componente de error
    }
  }, []);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setSelectedPosition(newPosition);
      toast({
        title: "Ubicación Marcada",
        description: `Lat: ${newPosition.lat.toFixed(4)}, Lng: ${newPosition.lng.toFixed(4)}. Confirma tu selección.`,
      });
    }
  }, [toast]);

  const handleConfirmLocation = () => {
    if (selectedPosition) {
      console.log("Ubicación confirmada:", selectedPosition);
      // Aquí guardarías selectedPosition en el estado de tu aplicación o lo enviarías al backend.
      // Por ahora, simulamos con un toast.
      toast({
        title: "Ubicación Confirmada",
        description: `Has seleccionado: Lat: ${selectedPosition.lat.toFixed(4)}, Lng: ${selectedPosition.lng.toFixed(4)} (simulado).`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Sin Selección",
        description: "Por favor, selecciona una ubicación en el mapa haciendo clic.",
      });
    }
  };
  
  const handleMapLoad = useCallback((map: google.maps.Map) => {
    // Podrías querer hacer algo con la instancia del mapa aquí
    setMapReady(true);
  }, []);

  if (!isClient) {
    return (
      <Card className="shadow-xl rounded-lg overflow-hidden border">
        <CardHeader className="bg-card border-b">
          <CardTitle className="flex items-center text-2xl font-semibold text-primary">
            <MapPin className="mr-3 h-7 w-7" />
            Tu Ubicación en Santa Cruz
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center h-[456px]">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="ml-2 text-muted-foreground">Cargando componente de mapa...</p>
        </CardContent>
      </Card>
    );
  }

  if (apiKeyMissing) {
    return (
      <Card className="shadow-xl rounded-lg overflow-hidden border">
        <CardHeader className="bg-card border-b">
          <CardTitle className="flex items-center text-2xl font-semibold text-primary">
            <MapPin className="mr-3 h-7 w-7" />
            Tu Ubicación en Santa Cruz
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="text-lg font-semibold text-destructive mb-2">Error al Configurar el Mapa</p>
          <p className="text-muted-foreground mb-4">
            La clave API de Google Maps no está configurada correctamente.
          </p>
          <div className="p-4 text-left bg-destructive/10 border border-destructive/30 rounded-md">
            <p className="text-sm text-destructive-foreground font-medium">
              <strong>Instrucciones para el desarrollador:</strong>
            </p>
            <ol className="list-decimal list-inside text-xs text-destructive-foreground/80 mt-2 space-y-1">
              <li>Obtén una clave API de Google Maps Platform (habilita "Maps JavaScript API").</li>
              <li>Crea un archivo <code>.env.local</code> en la raíz del proyecto.</li>
              <li>Añade tu clave API al archivo: <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=TU_CLAVE_API_AQUI</code>.</li>
              <li>Instala el paquete: <code>npm install @react-google-maps/api</code> (o <code>yarn add @react-google-maps/api</code>).</li>
              <li>Reinicia tu servidor de desarrollo.</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl rounded-lg overflow-hidden border">
      <CardHeader className="bg-card border-b">
        <CardTitle className="flex items-center text-2xl font-semibold text-primary">
          <MapPin className="mr-3 h-7 w-7" />
          Selecciona tu Ubicación en el Mapa
        </CardTitle>
        <CardDescription className="text-md">
          Haz clic en el mapa para establecer tu ubicación. Esto nos ayudará a encontrar las tiendas más cercanas.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6 md:pb-4"> {/* Ajuste de padding para móvil y desktop */}
        <LoadScript
          googleMapsApiKey={MAP_API_KEY!} 
          loadingElement={
            <div className="flex flex-col items-center justify-center h-[400px] bg-muted">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-2" /> 
              <p className="text-muted-foreground">Cargando mapa de Santa Cruz...</p>
            </div>
          }
          onError={(error) => {
            console.error("Error loading Google Maps script:", error);
            toast({
              variant: "destructive",
              title: "Error al Cargar Script del Mapa",
              description: "No se pudo cargar Google Maps. Verifica tu conexión o la clave API.",
              duration: 7000,
            });
          }}
          // onLoad no es necesario aquí ya que GoogleMap tiene su propio onLoad
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={currentMapCenter}
            zoom={13}
            onClick={handleMapClick}
            onLoad={handleMapLoad}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP,
              },
            }}
          >
            {selectedPosition && (
              <Marker
                position={selectedPosition}
                animation={google.maps.Animation.DROP} // Añade una pequeña animación al marcador
              />
            )}
          </GoogleMap>
        </LoadScript>
        {mapReady && (
          <div className="flex flex-col items-center p-4 md:pt-4">
            {selectedPosition ? (
              <>
                <p className="text-sm text-muted-foreground mb-3 text-center">
                  Ubicación marcada: Lat: {selectedPosition.lat.toFixed(4)}, Lng: {selectedPosition.lng.toFixed(4)}
                </p>
                <Button onClick={handleConfirmLocation} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                  Confirmar Esta Ubicación
                </Button>
              </>
            ) : (
              <p className="text-sm text-accent font-medium py-2">Haz clic en el mapa para elegir tu ubicación.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
    
