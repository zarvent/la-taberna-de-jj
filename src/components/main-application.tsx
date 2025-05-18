
"use client";

import { AppHeader } from "@/components/layout/header";
import { LocationSelector } from "@/components/location-selector";
import { BeverageSearch } from "@/components/beverage-search";
import { StoreMap } from "@/components/store-map";
import { StoreList } from "@/components/store-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageSearch, Building } from "lucide-react"; 

export function MainApplication() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 md:py-10 space-y-8 md:space-y-10"> 
        
        <div className="animate-fade-in-up opacity-0" style={{animationDelay: '0.1s'}}>
          <LocationSelector />
        </div>

        <Tabs defaultValue="beverages" className="w-full animate-fade-in-up opacity-0" style={{animationDelay: '0.3s'}}>
          <TabsList className="grid w-full grid-cols-2 md:max-w-md mx-auto h-auto p-1.5 border bg-muted shadow-md rounded-xl">
            <TabsTrigger 
              value="beverages" 
              className="text-sm sm:text-base py-2.5 sm:py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl rounded-lg transition-all duration-300 ease-out group"
            >
              <PackageSearch className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-data-[state=active]:animate-icon-pop" />
              Buscar Bebidas
            </TabsTrigger>
            <TabsTrigger 
              value="stores" 
              id="stores" 
              className="text-sm sm:text-base py-2.5 sm:py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl rounded-lg transition-all duration-300 ease-out group"
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
