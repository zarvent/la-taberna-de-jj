
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinned, Info } from "lucide-react";

export function StoreMap() {
  return (
    <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg">
      <CardHeader className="bg-transparent border-b border-border/50 pb-5">
        <CardTitle className="flex items-center text-3xl font-bold text-primary">
          <MapPinned className="mr-3.5 h-8 w-8" />
          Localizador de Tiendas
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground pt-1 flex items-center">
            <Info className="h-5 w-5 mr-2 text-accent"/> 
            Vista de mapa (marcador de posición). Usa el selector de área para filtrar tiendas.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-8"> {/* Increased padding */}
        <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center border border-input overflow-hidden shadow-inner"> {/* Changed aspect ratio */}
          <Image 
            src="https://placehold.co/1280x720.png" 
            alt="Marcador de posición del mapa de tiendas en Santa Cruz" 
            width={1280} 
            height={720} 
            className="object-cover w-full h-full opacity-70"
            data-ai-hint="map bolivia city"
            priority // LCP Candidate if this component is visible on initial load for a specific route/tab
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-2xl font-semibold text-foreground/80 bg-background/50 p-4 rounded-lg backdrop-blur-sm">
              Mapa Interactivo Próximamente
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
