
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Building, CheckCircle } from "lucide-react"; // Added Building and CheckCircle for visual feedback
import { Button } from "@/components/ui/button";

const ZONAS = ["Cualquier Zona", "Zona Norte", "Zona Sur", "Zona Este", "Zona Oeste", "Zona Central"];
const ANILLOS = [
  "Cualquier Anillo", 
  "Primer Anillo", 
  "Segundo Anillo", 
  "Tercer Anillo", 
  "Cuarto Anillo", 
  "Quinto Anillo", 
  "Sexto Anillo", 
  "Séptimo Anillo", 
  "Octavo Anillo"
];

const DEFAULT_ZONA = ZONAS[0];
const DEFAULT_ANILLO = ANILLOS[0];

export function LocationSelector() {
  const [selectedZona, setSelectedZona] = useState<string>(DEFAULT_ZONA);
  const [selectedAnillo, setSelectedAnillo] = useState<string>(DEFAULT_ANILLO);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // En una implementación futura, esta función podría guardar la preferencia
  // y/o disparar una actualización de las tiendas mostradas.
  const handleConfirmLocation = () => {
    console.log("Preferencia de ubicación confirmada:", { zona: selectedZona, anillo: selectedAnillo });
    // Aquí se podría usar el hook `toast` si se quisiera dar feedback visual.
  };

  if (!isClient) {
    // Muestra un esqueleto o un loader simple mientras se monta en el cliente
    // para evitar errores de hidratación con los Selects.
    return (
      <Card className="shadow-xl rounded-lg overflow-hidden border">
        <CardHeader className="bg-card border-b">
          <CardTitle className="flex items-center text-2xl font-semibold text-primary">
            <MapPin className="mr-3 h-7 w-7" />
            Define tu Área de Búsqueda
          </CardTitle>
          <CardDescription className="text-md">
            Ayúdanos a encontrar las mejores opciones para ti en Santa Cruz.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="h-10 bg-muted rounded-md animate-pulse"></div>
          <div className="h-10 bg-muted rounded-md animate-pulse"></div>
          <div className="h-10 bg-muted rounded-md animate-pulse w-1/2 self-end"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl rounded-lg overflow-hidden border">
      <CardHeader className="bg-card border-b">
        <CardTitle className="flex items-center text-2xl font-semibold text-primary">
          <MapPin className="mr-3 h-7 w-7" />
          Define tu Área de Búsqueda
        </CardTitle>
        <CardDescription className="text-md">
          Selecciona tu zona y anillo de preferencia en Santa Cruz de la Sierra.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="zona-select" className="block text-sm font-medium text-muted-foreground mb-1.5">
              Zona de Preferencia
            </label>
            <Select value={selectedZona} onValueChange={setSelectedZona}>
              <SelectTrigger id="zona-select" className="w-full text-base">
                <SelectValue placeholder="Selecciona una zona" />
              </SelectTrigger>
              <SelectContent>
                {ZONAS.map((zona) => (
                  <SelectItem key={zona} value={zona}>
                    {zona}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="anillo-select" className="block text-sm font-medium text-muted-foreground mb-1.5">
              Anillo de Preferencia
            </label>
            <Select value={selectedAnillo} onValueChange={setSelectedAnillo}>
              <SelectTrigger id="anillo-select" className="w-full text-base">
                <SelectValue placeholder="Selecciona un anillo" />
              </SelectTrigger>
              <SelectContent>
                {ANILLOS.map((anillo) => (
                  <SelectItem key={anillo} value={anillo}>
                    {anillo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4">
            <div className="text-sm text-muted-foreground text-center sm:text-left">
                <p className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-primary/80"/>
                    Mostrando opciones para: 
                    <span className="font-semibold text-foreground ml-1">{selectedZona === DEFAULT_ZONA ? "Todas las Zonas" : selectedZona}</span>,
                    <span className="font-semibold text-foreground ml-1">{selectedAnillo === DEFAULT_ANILLO ? "Todos los Anillos" : selectedAnillo}</span>.
                </p>
            </div>
            <Button onClick={handleConfirmLocation} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
              <CheckCircle className="mr-2 h-5 w-5" />
              Confirmar Área
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
