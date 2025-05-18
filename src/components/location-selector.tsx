
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin } from "lucide-react";
// Removed: usePersistentState, Button, RadioGroup, Label, LocateFixed, useToast

export function LocationSelector() {
  // Removed: location state, handleLocationChange, handleGpsLocate logic

  return (
    <Card className="shadow-xl rounded-lg overflow-hidden border">
      <CardHeader className="bg-card border-b">
        <CardTitle className="flex items-center text-2xl font-semibold text-primary">
          <MapPin className="mr-3 h-7 w-7" />
          Tu Ubicación en Santa Cruz
        </CardTitle>
        <CardDescription className="text-md">
          Visualiza el mapa de Santa Cruz de la Sierra. La selección interactiva de ubicación y funcionalidades GPS se implementarán pronto.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-input overflow-hidden">
          <Image
            src="https://placehold.co/800x450.png"
            alt="Mapa de Santa Cruz de la Sierra para selección de ubicación"
            width={800}
            height={450}
            className="object-cover w-full h-full"
            data-ai-hint="map Santa Cruz Bolivia"
            priority
          />
        </div>
        {/* 
          Aquí podríamos añadir un mensaje como:
          <p className="text-sm text-center text-muted-foreground pt-4">
            Funcionalidad de selección de ubicación en el mapa próximamente.
          </p> 
        */}
      </CardContent>
    </Card>
  );
}
