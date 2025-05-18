
"use client";

import { mockStores } from "@/lib/mock-data";
import { StoreCard } from "./store-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, ListChecks, SearchX } from "lucide-react";

export function StoreList() {
  const stores = mockStores; // In a real app, this would be dynamic based on location filters

  return (
    <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg">
      <CardHeader className="bg-transparent border-b border-border/50 pb-4 sm:pb-5 group">
        <CardTitle className="flex items-center text-2xl sm:text-3xl font-bold text-primary">
          <ListChecks className="mr-3 sm:mr-3.5 h-6 w-6 sm:h-7 sm:w-7 group-hover:animate-icon-pop" />
          Tiendas Disponibles
        </CardTitle>
        <CardDescription className="text-base sm:text-lg text-muted-foreground pt-1">Explora las licorerías y tiendas en el área seleccionada de Santa Cruz.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 md:p-8">
        {stores.length > 0 ? (
          <ScrollArea className="h-[550px] lg:h-auto lg:max-h-[calc(2*29rem+1*2rem)] pr-2 sm:pr-3 -mr-2 sm:-mr-3"> 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-5 gap-y-5 sm:gap-y-6"> 
              {stores.map((store, index) => (
                <StoreCard 
                  key={store.id} 
                  store={store} 
                  className="animate-fade-in-up opacity-0"
                  style={{animationDelay: `${index * 0.07}s`}}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-12 md:py-16 text-muted-foreground bg-muted/30 rounded-xl border border-border/50 animate-fade-in-up opacity-0" style={{animationDelay: '0.2s'}}>
            <SearchX className="mx-auto h-16 w-16 sm:h-20 sm:w-20 mb-5 sm:mb-6 text-primary/40 animate-icon-pop" /> 
            <p className="text-lg sm:text-xl font-semibold text-foreground mb-1.5 sm:mb-2">¡Ups! No hay tiendas por aquí todavía.</p>
            <p className="text-sm sm:text-base mt-1">Prueba a ampliar tu área de búsqueda o vuelve más tarde. ¡Seguro pronto tendremos opciones!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

