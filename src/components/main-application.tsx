"use client";

import { AppHeader } from "@/components/layout/header";
import { LocationSelector } from "@/components/location-selector";
import { BeverageSearch } from "@/components/beverage-search";
import { StoreMap } from "@/components/store-map";
import { StoreList } from "@/components/store-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageSearch, MapPinned } from "lucide-react"; // Icons for tabs

export function MainApplication() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-8">
        
        <LocationSelector />

        <Tabs defaultValue="beverages" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto bg-primary/10">
            <TabsTrigger value="beverages" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <PackageSearch className="mr-2 h-5 w-5" />
              Find Beverages
            </TabsTrigger>
            <TabsTrigger value="stores" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MapPinned className="mr-2 h-5 w-5" />
              Find Stores
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="beverages" className="mt-6">
            <BeverageSearch />
          </TabsContent>
          
          <TabsContent value="stores" className="mt-6">
            <StoreMap />
            <StoreList />
          </TabsContent>
        </Tabs>

      </main>
      <footer className="bg-primary text-primary-foreground/80 py-6 text-center">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Moscow Tavern Finder. All rights reserved.</p>
          <p className="text-sm mt-1">Please drink responsibly. Must be 18+ to use this service.</p>
        </div>
      </footer>
    </div>
  );
}
