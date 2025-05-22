
"use client";

import { AppHeader } from "@/components/layout/header";
// import { LocationSelector } from "@/components/location-selector"; // Original static import
import { BeverageSearch } from "@/components/beverage-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageSearch, Building, Gift, PartyPopper, Loader2, Compass } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const LocationSelector = dynamic(
  () => import('@/components/location-selector').then(mod => mod.LocationSelector),
  {
    ssr: false, // Ensure it's client-side only
    loading: () => (
      // Consistent loading state with the one inside LocationSelector
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
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 md:py-10 space-y-8 md:space-y-10">

        <div className="animate-fade-in-up opacity-0" style={{animationDelay: '0.1s'}}>
          <LocationSelector />
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
            <BeverageSearch />
          </TabsContent>

          <TabsContent value="stores" className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
            <StoreMap />
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
