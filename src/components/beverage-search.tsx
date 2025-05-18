
"use client";

import { useState, useMemo, useEffect } from "react";
import type { Beverage } from "@/lib/types";
import { mockBeverages } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BeverageCard } from "./beverage-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ListFilter, RotateCcw, PackageX } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ALL_FILTER_VALUE = "_ALL_"; 

export function BeverageSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>(ALL_FILTER_VALUE);
  const [sortBy, setSortBy] = useState<string>("name_asc"); 
  
  const [beverageTypes, setBeverageTypes] = useState<Beverage['type'][]>([]);

  useEffect(() => {
    const uniqueTypes = Array.from(new Set(mockBeverages.map(b => b.type))).sort() as Beverage['type'][];
    setBeverageTypes(uniqueTypes);
    setSelectedType(ALL_FILTER_VALUE);
  }, []);

  const filteredAndSortedBeverages = useMemo(() => {
    let beverages = mockBeverages.filter(beverage =>
      beverage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beverage.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedType && selectedType !== ALL_FILTER_VALUE) {
      beverages = beverages.filter(beverage => beverage.type === selectedType);
    }

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
  }, [searchTerm, selectedType, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType(ALL_FILTER_VALUE);
    setSortBy("name_asc");
  };
  
  return (
    <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg">
      <CardHeader className="bg-transparent border-b border-border/50 pb-5">
        <CardTitle className="flex items-center text-3xl font-bold text-primary">
          <Search className="mr-3.5 h-8 w-8" />
          Búsqueda Inteligente de Bebidas
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground pt-1">Encuentra tus bebidas favoritas con filtros avanzados.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-8"> {/* Increased padding and spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end"> 
          <div className="lg:col-span-2">
            <label htmlFor="search-term" className="block text-base font-medium text-muted-foreground mb-2">Buscar por Nombre o Marca</label>
            <Input
              id="search-term"
              type="text"
              placeholder="Ej: Stolichnaya, Paceña, Fernet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-lg p-3 rounded-lg" 
            />
          </div>
          <div>
            <label htmlFor="beverage-type" className="block text-base font-medium text-muted-foreground mb-2">Tipo de Bebida</label>
            <Select 
              value={selectedType} 
              onValueChange={setSelectedType}
            >
              <SelectTrigger id="beverage-type" className="text-lg p-3 rounded-lg h-auto">
                <SelectValue placeholder="Todos los Tipos" />
              </SelectTrigger>
              <SelectContent className="text-base">
                <SelectItem value={ALL_FILTER_VALUE}>Todos los Tipos</SelectItem>
                {beverageTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-2">
            <div>
                <label htmlFor="sort-by" className="block text-base font-medium text-muted-foreground mb-2 sm:inline sm:mr-2">Ordenar por</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="w-full sm:w-auto min-w-[200px] text-lg p-3 rounded-lg h-auto">
                    <SelectValue placeholder="Ordenar por..." />
                </SelectTrigger>
                <SelectContent className="text-base">
                    <SelectItem value="name_asc">Nombre (A-Z)</SelectItem>
                    <SelectItem value="name_desc">Nombre (Z-A)</SelectItem>
                    <SelectItem value="price_asc">Precio (Menor a Mayor)</SelectItem>
                    <SelectItem value="price_desc">Precio (Mayor a Menor)</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <Button onClick={clearFilters} variant="outline" size="lg" className="w-full sm:w-auto text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive rounded-lg">
                <RotateCcw className="mr-2 h-5 w-5" /> Reiniciar Filtros
            </Button>
        </div>

        {filteredAndSortedBeverages.length > 0 ? (
           <ScrollArea className="h-[600px] lg:h-auto lg:max-h-[calc(3*28rem+2*1.5rem)] pr-3 -mr-3"> {/* Adjusted for potentially taller cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8"> {/* Increased gap */}
              {filteredAndSortedBeverages.map(beverage => (
                <BeverageCard key={beverage.id} beverage={beverage} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-16 text-muted-foreground bg-muted/30 rounded-xl border border-border/50">
            <PackageX className="mx-auto h-24 w-24 mb-8 text-primary/40" /> {/* Changed icon to PackageX */}
            <p className="text-2xl font-semibold text-foreground mb-2">¡Oops! No hay resultados</p>
            <p className="text-lg mt-1">Intenta ajustar tu búsqueda o filtros para encontrar la bebida perfecta.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
