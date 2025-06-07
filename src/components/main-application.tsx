"use client";

import { AppHeader } from "@/components/layout/header";
import { BeverageSearch } from "@/components/beverage-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageSearch, Building, Gift, PartyPopper, Loader2, Compass } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import type L from 'leaflet';
import { mockStores } from "@/lib/mock-data"; // Import mockStores

const LocationSelector = dynamic(
  () => import('@/components/location-selector').then(mod => mod.LocationSelector),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center min-h-[480px] animate-fade-in-up p-6 rounded-xl border border-border/30 bg-muted/20">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-lg font-semibold text-muted-foreground">Cargando Explorador de Zonas...</p>
      </div>
    ),
  }
);

const RickRollCard = dynamic(() => import('@/components/rickroll-card').then(mod => mod.RickRollCard), {
  loading: () => (
    <Card className="shadow-2xl rounded-xl overflow-hidden border border-accent/60 hover:border-accent/80 bg-gradient-to-tr from-accent/5 via-card to-card group hover:shadow-3xl transition-all duration-300 hover:scale-[1.01] animate-pulse min-h-[150px]">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center">
          <PartyPopper className="h-8 w-8 sm:h-10 sm:w-10 mr-3 sm:mr-4 text-accent" />
          <div>
            <div className="h-6 bg-muted-foreground/20 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-full"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2 sm:pt-3 pb-4 sm:pb-5 text-center">
        <div className="h-12 bg-muted-foreground/20 rounded w-1/2 mx-auto"></div>
      </CardContent>
    </Card>
  ),
  ssr: false,
});

const StoreMap = dynamic(() => import('@/components/store-map').then(mod => mod.StoreMap), {
  loading: () => <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-xl border"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>,
});

const StoreList = dynamic(() => import('@/components/store-list').then(mod => mod.StoreList), {
  loading: () => <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-xl border"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>,
});


export function MainApplication() {
  const [selectedLocation, setSelectedLocation] = useState<L.LatLngTuple | null>(null);
  const [searchedBeverageId, setSearchedBeverageId] = useState<string | null>(null); // Add state for searched beverage

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 md:py-10 space-y-8 md:space-y-10">

        <div className="animate-fade-in-up opacity-0" style={{animationDelay: '0.1s'}}>
          <LocationSelector selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
        </div>

        <div className="animate-fade-in-up opacity-0" style={{animationDelay: '0.2s'}}>
          <RickRollCard />
        </div>


        <Tabs defaultValue="beverages" className="w-full animate-fade-in-up opacity-0" style={{animationDelay: '0.3s'}}>
          <TabsList className="grid w-full grid-cols-2 md:max-w-md mx-auto h-auto p-1.5 border bg-muted shadow-md rounded-xl">
            <TabsTrigger
              value="beverages"
              className="text-sm sm:text-base py-2.5 sm:py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl data-[state=active]:scale-[1.02] data-[state=active]:font-semibold rounded-lg transition-all duration-300 ease-out group"
            >
              <PackageSearch className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-data-[state=active]:animate-icon-pop" />
              Buscar Bebidas
            </TabsTrigger>
            <TabsTrigger
              value="stores"
              id="stores"
              className="text-sm sm:text-base py-2.5 sm:py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl data-[state=active]:scale-[1.02] data-[state=active]:font-semibold rounded-lg transition-all duration-300 ease-out group"
            >
              <Building className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-data-[state=active]:animate-icon-pop" />
              Buscar Tiendas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="beverages" className="mt-6 sm:mt-8 rounded-xl p-0">
            {/* Update BeverageSearch to accept and call setSearchedBeverageId when a beverage is searched */}
            <BeverageSearch setSearchedBeverageId={setSearchedBeverageId} />
          </TabsContent>

          <TabsContent value="stores" className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
            <StoreMap userLocation={selectedLocation} stores={mockStores} searchedBeverageId={searchedBeverageId} />
            <StoreList />
          </TabsContent>
        </Tabs>

      </main>
      <footer className="bg-primary text-primary-foreground/90 py-6 sm:py-8 text-center border-t-2 border-primary/50 shadow-inner">
        <div className="container mx-auto px-4 space-y-1.5 sm:space-y-2">
          <p className="text-sm sm:text-base font-medium">&copy; {new Date().getFullYear()} La Taberna de JJ. Todos los derechos reservados.</p>
          <p className="text-xs sm:text-sm opacity-80">Creado por Los Discípulos de JJ: Sebastian Zambrana, Adrian Rada, Alain Flores.</p>
          <p className="text-xs sm:text-sm mt-1.5 opacity-80">Por favor, consume con responsabilidad. Debes ser mayor de 18 años para usar este servicio.</p>
        </div>
      </footer>
    </div>
  );
}
