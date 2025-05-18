
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Info } from "lucide-react";
// Removed Google Maps specific imports

// Removed MAP_API_KEY and related logic

export function LocationSelector() {
  // Removed state related to Google Maps (selectedPosition, mapReady, apiKeyMissing, etc.)
  // Removed functions related to Google Maps (handleMapClick, handleConfirmLocation, etc.)

  return (
    <Card className="shadow-xl rounded-lg overflow-hidden border">
      <CardHeader className="bg-card border-b">
        <CardTitle className="flex items-center text-2xl font-semibold text-primary">
          <MapPin className="mr-3 h-7 w-7" />
          Tu Ubicación en Santa Cruz
        </CardTitle>
        <CardDescription className="text-md">
          A continuación se muestra un mapa de referencia. En una versión completa, podrías seleccionar tu ubicación aquí.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center border border-input overflow-hidden">
          <Image
            src="https://placehold.co/800x450.png"
            alt="Mapa de referencia de Santa Cruz de la Sierra"
            width={800}
            height={450}
            className="object-cover w-full h-full"
            data-ai-hint="map city aerial"
            priority
          />
        </div>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-center">
          <Info className="h-5 w-5 inline-block mr-2 text-primary mb-0.5" />
          <span className="text-sm text-primary/90">
            Esta es una representación visual. La selección interactiva de ubicación en el mapa se habilitaría en una futura versión.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
