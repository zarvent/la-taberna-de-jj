"use client";

import { mockStores } from "@/lib/mock-data";
import { StoreCard } from "./store-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2 } from "lucide-react"; // Using Building2 as a thematic "Kremlin" like icon

export function StoreList() {
  // In a real app, stores might be filtered by location preference
  const stores = mockStores;

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden mt-8">
      <CardHeader className="bg-secondary/30">
        <CardTitle className="flex items-center text-xl font-semibold text-primary">
          <Building2 className="mr-3 h-6 w-6" /> {/* Thematic icon for stores */}
          Available Stores
        </CardTitle>
        <CardDescription>Browse stores in the Santa Cruz area.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {stores.length > 0 ? (
          <ScrollArea className="h-[500px] lg:h-auto lg:max-h-[calc(2*26rem+1*1.5rem)] pr-3"> {/* Approx height for 2 rows of cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-center py-10 text-muted-foreground">No stores available at the moment.</p>
        )}
      </CardContent>
    </Card>
  );
}
