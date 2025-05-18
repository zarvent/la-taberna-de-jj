
"use client";

import { AppHeader } from "@/components/layout/header";
import { LocationSelector } from "@/components/location-selector";
import { BeverageSearch } from "@/components/beverage-search";
import { StoreMap } from "@/components/store-map";
import { StoreList } from "@/components/store-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageSearch, Building, Gift, PartyPopper } from "lucide-react"; 
import Link from "next/link";

export function MainApplication() {
  const rickRollUrl = "https://youtu.be/dQw4w9WgXcQ"; // Classic Rick Roll link

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 md:py-10 space-y-8 md:space-y-10"> 
        
        <div className="animate-fade-in-up opacity-0" style={{animationDelay: '0.1s'}}>
          <LocationSelector />
        </div>

        {/* Rickroll Card Section */}
        <div className="animate-fade-in-up opacity-0" style={{animationDelay: '0.2s'}}>
          <Card className="shadow-2xl rounded-xl overflow-hidden border border-accent/50 bg-gradient-to-tr from-accent/5 via-card to-card group hover:shadow-3xl transition-shadow duration-300">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center">
                <PartyPopper className="h-8 w-8 sm:h-10 sm:w-10 mr-3 sm:mr-4 text-accent group-hover:animate-icon-pop" />
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-primary group-hover:text-accent transition-colors">¡Oferta Especial de La Taberna!</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-muted-foreground pt-1">¿Con sed? ¡Los Discípulos de JJ tienen una sorpresa para ti!</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2 sm:pt-3 pb-4 sm:pb-5 text-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/button w-full sm:w-auto"
              >
                <Link href={rickRollUrl} target="_blank" rel="noopener noreferrer">
                  <Gift className="mr-2 h-5 w-5 group-hover/button:animate-icon-pop" />
                  ¡Reclamar Mi Cerveza GRATIS!
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        {/* End Rickroll Card Section */}

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
