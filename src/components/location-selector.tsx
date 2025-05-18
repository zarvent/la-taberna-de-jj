
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Building, CheckCircle, Loader2 } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleConfirmLocation = () => {
    console.log("Preferencia de ubicación confirmada:", { zona: selectedZona, anillo: selectedAnillo });
    toast({
      title: "Área de Búsqueda Actualizada",
      description: `Buscando en: ${selectedZona === DEFAULT_ZONA ? "Todas las Zonas" : selectedZona}, ${selectedAnillo === DEFAULT_ANILLO ? "Todos los Anillos" : selectedAnillo}.`,
      duration: 3000,
    });
  };

  if (!isClient) {
    return (
      <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg">
        <CardHeader className="bg-transparent border-b border-border/50 pb-4 sm:pb-5">
          <CardTitle className="flex items-center text-2xl sm:text-3xl font-bold text-primary">
            <MapPin className="mr-3 sm:mr-3.5 h-7 w-7 sm:h-8 sm:w-8" />
            Define tu Área de Búsqueda
          </CardTitle>
          <CardDescription className="text-base sm:text-lg text-muted-foreground pt-1">
            Ayúdanos a encontrar las mejores opciones para ti en Santa Cruz.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          <div className="flex items-center justify-center py-8 sm:py-10">
            <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 text-primary animate-spin" />
            <p className="ml-3 sm:ml-4 text-base sm:text-lg text-muted-foreground">Cargando opciones...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg">
      <CardHeader className="bg-transparent border-b border-border/50 pb-4 sm:pb-5">
        <CardTitle className="flex items-center text-2xl sm:text-3xl font-bold text-primary">
          <MapPin className="mr-3 sm:mr-3.5 h-7 w-7 sm:h-8 sm:w-8" />
          Define tu Área de Búsqueda
        </CardTitle>
        <CardDescription className="text-base sm:text-lg text-muted-foreground pt-1">
          Selecciona tu zona y anillo de preferencia en Santa Cruz de la Sierra.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 sm:p-6 md:p-8 space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 sm:gap-x-6 gap-y-5 sm:gap-y-6">
          <div>
            <label htmlFor="zona-select" className="block text-sm sm:text-base font-medium text-muted-foreground mb-1.5 sm:mb-2">
              Zona de Preferencia
            </label>
            <Select value={selectedZona} onValueChange={setSelectedZona}>
              <SelectTrigger id="zona-select" className="w-full text-base sm:text-lg p-2.5 sm:p-3 rounded-lg h-auto">
                <SelectValue placeholder="Selecciona una zona" />
              </SelectTrigger>
              <SelectContent className="text-base">
                {ZONAS.map((zona) => (
                  <SelectItem key={zona} value={zona}>
                    {zona}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="anillo-select" className="block text-sm sm:text-base font-medium text-muted-foreground mb-1.5 sm:mb-2">
              Anillo de Preferencia
            </label>
            <Select value={selectedAnillo} onValueChange={setSelectedAnillo}>
              <SelectTrigger id="anillo-select" className="w-full text-base sm:text-lg p-2.5 sm:p-3 rounded-lg h-auto">
                <SelectValue placeholder="Selecciona un anillo" />
              </SelectTrigger>
              <SelectContent className="text-base">
                {ANILLOS.map((anillo) => (
                  <SelectItem key={anillo} value={anillo}>
                    {anillo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-2 sm:pt-4 gap-4 sm:gap-6">
            <div className="text-sm sm:text-base text-muted-foreground text-center sm:text-left flex-grow">
                <p className="flex items-center justify-center sm:justify-start">
                    <Building className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-2.5 text-primary/90"/>
                    Mostrando: 
                    <span className="font-semibold text-foreground ml-1">{selectedZona === DEFAULT_ZONA ? "Todas" : selectedZona}</span>,
                    <span className="font-semibold text-foreground ml-1">{selectedAnillo === DEFAULT_ANILLO ? "Todos" : selectedAnillo}</span>.
                </p>
            </div>
            <Button 
              onClick={handleConfirmLocation} 
              size="lg" 
              className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg rounded-lg text-base"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Confirmar Área
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
