"use client";

import { mockStores } from "@/lib/mock-data";
import { StoreCard } from "./store-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, ListChecks } from "lucide-react";

export function StoreList() {
  const stores = mockStores;

  return (
    <Card className="shadow-xl rounded-lg overflow-hidden border">
      <CardHeader className="bg-card border-b">
        <CardTitle className="flex items-center text-2xl font-semibold text-primary">
          <ListChecks className="mr-3 h-7 w-7" /> {/* Changed icon to ListChecks for better semantics */}
          Tiendas Disponibles
        </CardTitle>
        <CardDescription className="text-md">Explora las licorerías y tiendas en el área de Santa Cruz.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {stores.length > 0 ? (
          <ScrollArea className="h-[550px] lg:h-auto lg:max-h-[calc(2*27rem+1*1.5rem)] pr-3 -mr-3"> {/* Adjusted height and spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
             <Building2 className="mx-auto h-16 w-16 mb-6 text-primary/50" />
            <p className="text-xl">No hay tiendas disponibles por el momento.</p>
            <p className="mt-1">Por favor, intenta de nuevo más tarde.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
