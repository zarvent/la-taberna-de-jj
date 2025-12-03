
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinned, Info, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { mockStores } from "@/lib/mock-data";

const StoreMapInteractive = dynamic(
  () => import('./store-map-interactive'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-muted/50 rounded-lg">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Cargando mapa...</span>
      </div>
    ),
  }
);

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
            Encuentra las tiendas más cercanas a ti. Haz clic en un marcador para más información.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <div className="h-[400px] w-full bg-muted rounded-lg overflow-hidden border border-input shadow-inner relative z-0">
          <StoreMapInteractive stores={mockStores} />
        </div>
      </CardContent>
    </Card>
  );
}
