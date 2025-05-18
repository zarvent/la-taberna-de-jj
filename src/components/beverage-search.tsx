
"use client";

import { useState, useMemo, useEffect } from "react";
import type { Beverage } from "@/lib/types";
import { mockBeverages } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BeverageCard } from "./beverage-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ListFilter, RotateCcw } from "lucide-react"; // X icon removed as it's not used
import { ScrollArea } from "@/components/ui/scroll-area";

const ALL_FILTER_VALUE = "_ALL_"; 

export function BeverageSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>(ALL_FILTER_VALUE);
  // selectedOrigin and origins state removed
  const [sortBy, setSortBy] = useState<string>("name_asc"); 
  
  const [beverageTypes, setBeverageTypes] = useState<Beverage['type'][]>([]);
  // origins state removed

  useEffect(() => {
    const uniqueTypes = Array.from(new Set(mockBeverages.map(b => b.type))).sort() as Beverage['type'][];
    setBeverageTypes(uniqueTypes);
    setSelectedType(ALL_FILTER_VALUE); // Ensure default "All" is set after types are loaded
  }, []);


  const filteredAndSortedBeverages = useMemo(() => {
    let beverages = mockBeverages.filter(beverage =>
      beverage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beverage.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedType && selectedType !== ALL_FILTER_VALUE) {
      beverages = beverages.filter(beverage => beverage.type === selectedType);
    }
    // Filter by origin removed

    switch (sortBy) {
      case 'name_asc':
        beverages.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        beverages.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price_asc':
        beverages.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        beverages.sort((a, b) => b.price - a.price);
        break;
    }

    return beverages;
  }, [searchTerm, selectedType, sortBy]); // selectedOrigin removed from dependencies

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType(ALL_FILTER_VALUE);
    // setSelectedOrigin(ALL_FILTER_VALUE) removed;
    setSortBy("name_asc");
  };
  

  return (
    <Card className="shadow-xl rounded-lg overflow-hidden border">
      <CardHeader className="bg-card border-b">
        <CardTitle className="flex items-center text-2xl font-semibold text-primary">
          <Search className="mr-3 h-7 w-7" />
          Búsqueda Inteligente de Bebidas
        </CardTitle>
        <CardDescription className="text-md">Encuentra tus bebidas favoritas con filtros avanzados.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end"> {/* Adjusted lg:grid-cols-3 */}
          <div className="lg:col-span-2"> {/* Search input spans 2 cols on lg */}
            <label htmlFor="search-term" className="block text-sm font-medium text-muted-foreground mb-1.5">Buscar por Nombre o Marca</label>
            <Input
              id="search-term"
              type="text"
              placeholder="Ej: Stolichnaya, Paceña, Fernet"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-base"
            />
          </div>
          <div>
            <label htmlFor="beverage-type" className="block text-sm font-medium text-muted-foreground mb-1.5">Tipo</label>
            <Select 
              value={selectedType} 
              onValueChange={setSelectedType}
            >
              <SelectTrigger id="beverage-type" className="text-base">
                <SelectValue placeholder="Todos los Tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_FILTER_VALUE}>Todos los Tipos</SelectItem>
                {beverageTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Origin Select removed */}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
            <div>
                <label htmlFor="sort-by" className="block text-sm font-medium text-muted-foreground mb-1.5 sm:inline sm:mr-2">Ordenar por</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="w-full sm:w-auto min-w-[180px] text-base">
                    <SelectValue placeholder="Ordenar por..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="name_asc">Nombre (A-Z)</SelectItem>
                    <SelectItem value="name_desc">Nombre (Z-A)</SelectItem>
                    <SelectItem value="price_asc">Precio (Menor-Mayor)</SelectItem>
                    <SelectItem value="price_desc">Precio (Mayor-Menor)</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <Button onClick={clearFilters} variant="outline" className="w-full sm:w-auto text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive">
                <RotateCcw className="mr-2 h-4 w-4" /> Reiniciar Filtros
            </Button>
        </div>

        {filteredAndSortedBeverages.length > 0 ? (
           <ScrollArea className="h-[600px] lg:h-auto lg:max-h-[calc(3*25rem+2*1.5rem)] pr-3 -mr-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedBeverages.map(beverage => (
                <BeverageCard key={beverage.id} beverage={beverage} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <ListFilter className="mx-auto h-16 w-16 mb-6 text-primary/50" />
            <p className="text-xl">No se encontraron bebidas que coincidan.</p>
            <p className="mt-1">Intenta ajustar tu búsqueda o filtros.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
