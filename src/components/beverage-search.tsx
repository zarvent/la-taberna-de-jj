"use client";

import { useState, useMemo } from "react";
import type { Beverage } from "@/lib/types";
import { mockBeverages } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BeverageCard } from "./beverage-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ListFilter, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const beverageTypes: Beverage['type'][] = ['Vodka', 'Beer', 'Wine', 'Whiskey', 'Other'];
const origins = Array.from(new Set(mockBeverages.map(b => b.origin))); // Dynamic origins from mock data

export function BeverageSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedOrigin, setSelectedOrigin] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name_asc"); // 'name_asc', 'name_desc', 'price_asc', 'price_desc'

  const filteredAndSortedBeverages = useMemo(() => {
    let beverages = mockBeverages.filter(beverage =>
      beverage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beverage.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedType) {
      beverages = beverages.filter(beverage => beverage.type === selectedType);
    }
    if (selectedOrigin) {
      beverages = beverages.filter(beverage => beverage.origin === selectedOrigin);
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
  }, [searchTerm, selectedType, selectedOrigin, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedOrigin("");
    setSortBy("name_asc");
  };

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-secondary/30">
        <CardTitle className="flex items-center text-xl font-semibold text-primary">
          <Search className="mr-3 h-6 w-6" />
          Smart Beverage Search
        </CardTitle>
        <CardDescription>Find your favorite beverages with advanced filters.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="search-term" className="block text-sm font-medium text-muted-foreground mb-1">Search by Name or Brand</label>
            <Input
              id="search-term"
              type="text"
              placeholder="e.g., Stolichnaya, Craft IPA"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="beverage-type" className="block text-sm font-medium text-muted-foreground mb-1">Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="beverage-type">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {beverageTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="beverage-origin" className="block text-sm font-medium text-muted-foreground mb-1">Origin</label>
            <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
              <SelectTrigger id="beverage-origin">
                <SelectValue placeholder="All Origins" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Origins</SelectItem>
                {origins.map(origin => (
                  <SelectItem key={origin} value={origin}>{origin}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
                <label htmlFor="sort-by" className="block text-sm font-medium text-muted-foreground mb-1 sm:inline sm:mr-2">Sort by</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="w-full sm:w-auto">
                    <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                    <SelectItem value="price_asc">Price (Low-High)</SelectItem>
                    <SelectItem value="price_desc">Price (High-Low)</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <Button onClick={clearFilters} variant="outline" className="w-full sm:w-auto text-destructive border-destructive hover:bg-destructive/10">
                <X className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
        </div>

        {filteredAndSortedBeverages.length > 0 ? (
          <ScrollArea className="h-[500px] lg:h-auto lg:max-h-[calc(3*24rem+2*1rem)] pr-3"> {/* Approximate height for 3 rows of cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedBeverages.map(beverage => (
                <BeverageCard key={beverage.id} beverage={beverage} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <ListFilter className="mx-auto h-12 w-12 mb-4" />
            <p className="text-lg">No beverages match your criteria.</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
