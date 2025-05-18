
"use client";

import { mockStores } from "@/lib/mock-data";
import { StoreCard } from "./store-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, ListChecks, SearchX } from "lucide-react"; // Added SearchX

export function StoreList() {
  const stores = mockStores; // In a real app, this would be dynamic based on location filters

  return (
    <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg">
      <CardHeader className="bg-transparent border-b border-border/50 pb-5">
        <CardTitle className="flex items-center text-3xl font-bold text-primary">
          <ListChecks className="mr-3.5 h-8 w-8" />
          Tiendas Disponibles
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground pt-1">Explora las licorerías y tiendas en el área seleccionada de Santa Cruz.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-8"> {/* Increased padding */}
        {stores.length > 0 ? (
          <ScrollArea className="h-[550px] lg:h-auto lg:max-h-[calc(2*29rem+1*2rem)] pr-3 -mr-3"> {/* Adjusted height and spacing for taller cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8"> {/* Increased gap */}
              {stores.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-16 text-muted-foreground bg-muted/30 rounded-xl border border-border/50">
            <SearchX className="mx-auto h-24 w-24 mb-8 text-primary/40" /> {/* Changed icon */}
            <p className="text-2xl font-semibold text-foreground mb-2">No hay tiendas por aquí</p>
            <p className="text-lg mt-1">Prueba a ampliar tu área de búsqueda o vuelve más tarde.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
