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
      <CardHeader className="bg-transparent border-b border-border/50 pb-4 sm:pb-5 group">
        <CardTitle className="flex items-center text-2xl sm:text-3xl font-bold text-primary">
          <Search className="mr-3 sm:mr-3.5 h-6 w-6 sm:h-7 sm:w-7 group-hover:animate-icon-pop" />
          Búsqueda Inteligente de Bebidas
        </CardTitle>
        <CardDescription className="text-base sm:text-lg text-muted-foreground pt-1">Encuentra tus bebidas favoritas con filtros avanzados.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-end"> 
          <div className="lg:col-span-2">
            <label htmlFor="search-term" className="block text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Buscar por Nombre o Marca</label>
            <Input
              id="search-term"
              type="text"
              placeholder="Ej: Stolichnaya, Paceña, Fernet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm sm:text-base p-2.5 sm:p-3 rounded-lg shadow-inner" 
            />
          </div>
          <div>
            <label htmlFor="beverage-type" className="block text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Tipo de Bebida</label>
            <Select 
              value={selectedType} 
              onValueChange={setSelectedType}
            >
              <SelectTrigger id="beverage-type" className="w-full text-sm sm:text-base p-2.5 sm:p-3 rounded-lg h-auto shadow-sm hover:shadow-md transition-shadow">
                <SelectValue placeholder="Todos los Tipos" />
              </SelectTrigger>
              <SelectContent className="text-sm sm:text-base">
                <SelectItem value={ALL_FILTER_VALUE}>Todos los Tipos</SelectItem>
                {beverageTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-5 pt-1 sm:pt-2">
            <div className="w-full sm:w-auto">
                <label htmlFor="sort-by" className="block text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2 sm:inline sm:mr-2">Ordenar por</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="w-full sm:min-w-[200px] text-sm sm:text-base p-2.5 sm:p-3 rounded-lg h-auto shadow-sm hover:shadow-md transition-shadow">
                    <SelectValue placeholder="Ordenar por..." />
                </SelectTrigger>
                <SelectContent className="text-sm sm:text-base">
                    <SelectItem value="name_asc">Nombre (A-Z)</SelectItem>
                    <SelectItem value="name_desc">Nombre (Z-A)</SelectItem>
                    <SelectItem value="price_asc">Precio (Menor a Mayor)</SelectItem>
                    <SelectItem value="price_desc">Precio (Mayor a Menor)</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <Button onClick={clearFilters} variant="outline" size="lg" className="w-full sm:w-auto text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive rounded-lg text-sm sm:text-base shadow-sm hover:shadow-md transition-all group">
                <RotateCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-icon-pop" /> Reiniciar Filtros
            </Button>
        </div>

        {filteredAndSortedBeverages.length > 0 ? (
           <ScrollArea className="flex-grow overflow-auto pr-2 sm:pr-3 -mr-2 sm:-mr-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-5 gap-y-5 sm:gap-y-6">
              {filteredAndSortedBeverages.map((beverage, index) => (
                <BeverageCard 
                  key={beverage.id} 
                  beverage={beverage} 
                  className="animate-fade-in-up opacity-0"
                  style={{animationDelay: `${index * 0.07}s`}}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-12 md:py-16 text-muted-foreground bg-muted/30 rounded-xl border border-border/50 animate-fade-in-up opacity-0" style={{animationDelay: '0.2s'}}>
            <PackageX className="mx-auto h-16 w-16 sm:h-20 sm:w-20 mb-5 sm:mb-6 text-primary/40 animate-icon-pop" />
            <p className="text-lg sm:text-xl font-semibold text-foreground mb-1.5 sm:mb-2">¡Vaya! Parece que tu búsqueda no encontró tesoros esta vez.</p>
            <p className="text-sm sm:text-base mt-1">¿Qué tal si pruebas con otras palabras o ajustas los filtros? ¡La bebida perfecta te espera!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

