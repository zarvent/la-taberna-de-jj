import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinned } from "lucide-react";

export function StoreMap() {
  return (
    <Card className="shadow-xl rounded-lg overflow-hidden border">
      <CardHeader className="bg-card border-b">
        <CardTitle className="flex items-center text-2xl font-semibold text-primary">
          <MapPinned className="mr-3 h-7 w-7" />
          Localizador de Tiendas
        </CardTitle>
        <CardDescription className="text-md">Encuentra tiendas cercanas en el mapa. (Funcionalidad de mapa es un marcador de posición)</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-input overflow-hidden">
          <Image 
            src="https://placehold.co/800x450.png" 
            alt="Marcador de posición del mapa de tiendas" 
            width={800} 
            height={450} 
            className="object-cover w-full h-full"
            data-ai-hint="map city street"
          />
        </div>
      </CardContent>
    </Card>
  );
}
