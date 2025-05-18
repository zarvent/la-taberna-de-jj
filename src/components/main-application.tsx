
"use client";

import { AppHeader } from "@/components/layout/header";
import { LocationSelector } from "@/components/location-selector";
import { BeverageSearch } from "@/components/beverage-search";
import { StoreMap } from "@/components/store-map";
import { StoreList } from "@/components/store-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageSearch, Building } from "lucide-react"; // Removed MapPinned, BookOpen

export function MainApplication() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-muted/30 to-background"> {/* Subtle gradient background */}
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-10 md:py-12 space-y-12"> {/* Increased padding and spacing */}
        
        <LocationSelector />

        <Tabs defaultValue="beverages" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:max-w-lg mx-auto h-auto p-1.5 border bg-muted shadow-md rounded-xl">
            <TabsTrigger 
              value="beverages" 
              className="text-lg py-3.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl rounded-lg transition-all duration-300 ease-out"
            >
              <PackageSearch className="mr-2.5 h-6 w-6" />
              Buscar Bebidas
            </TabsTrigger>
            <TabsTrigger 
              value="stores" 
              id="stores" 
              className="text-lg py-3.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl rounded-lg transition-all duration-300 ease-out"
            >
              <Building className="mr-2.5 h-6 w-6" />
              Buscar Tiendas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="beverages" className="mt-10 rounded-xl p-0.5"> {/* Added small padding for child card border visibility */}
            <BeverageSearch />
          </TabsContent>
          
          <TabsContent value="stores" className="mt-10 space-y-10"> {/* Increased spacing */}
            <StoreMap />
            <StoreList />
          </TabsContent>
        </Tabs>

      </main>
      <footer className="bg-primary text-primary-foreground/90 py-10 text-center border-t-2 border-primary/50 shadow-inner">
        <div className="container mx-auto px-4 space-y-3">
          <p className="text-lg font-medium">&copy; {new Date().getFullYear()} La Taberna de JJ. Todos los derechos reservados.</p>
          <p className="text-base opacity-80">Creado por Los Discípulos de JJ: Sebastian Zambrana, Adrian Rada, Alain Flores.</p>
          <p className="text-base mt-2 opacity-80">Por favor, consume con responsabilidad. Debes ser mayor de 18 años para usar este servicio.</p>
        </div>
      </footer>
    </div>
  );
}
