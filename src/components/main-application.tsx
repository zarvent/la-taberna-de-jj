"use client";

import { AppHeader } from "@/components/layout/header";
import { LocationSelector } from "@/components/location-selector";
import { BeverageSearch } from "@/components/beverage-search";
import { StoreMap } from "@/components/store-map";
import { StoreList } from "@/components/store-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageSearch, MapPinned, Building } from "lucide-react";

export function MainApplication() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-10">
        
        <LocationSelector />

        <Tabs defaultValue="beverages" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:max-w-md mx-auto h-14 border bg-muted">
            <TabsTrigger value="beverages" className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md">
              <PackageSearch className="mr-2 h-5 w-5" />
              Buscar Bebidas
            </TabsTrigger>
            <TabsTrigger value="stores" id="stores" className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md">
              <Building className="mr-2 h-5 w-5" />
              Buscar Tiendas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="beverages" className="mt-8 rounded-xl">
            <BeverageSearch />
          </TabsContent>
          
          <TabsContent value="stores" className="mt-8 space-y-8">
            <StoreMap />
            <StoreList />
          </TabsContent>
        </Tabs>

      </main>
      <footer className="bg-primary text-primary-foreground/90 py-8 text-center border-t-2 border-primary/50">
        <div className="container mx-auto px-4">
          <p className="font-medium">&copy; {new Date().getFullYear()} Moscow Tavern Finder. Todos los derechos reservados.</p>
          <p className="text-sm mt-1.5 opacity-80">Por favor, consume con responsabilidad. Debes ser mayor de 18 años para usar este servicio.</p>
        </div>
      </footer>
    </div>
  );
}
