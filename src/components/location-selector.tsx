
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Building, CheckCircle, Loader2 } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // Import useToast

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
  const { toast } = useToast(); // Initialize toast

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleConfirmLocation = () => {
    console.log("Preferencia de ubicación confirmada:", { zona: selectedZona, anillo: selectedAnillo });
    toast({
      title: "Área de Búsqueda Actualizada",
      description: `Buscando en: ${selectedZona}, ${selectedAnillo}.`,
      duration: 3000, // Toast visible for 3 seconds
    });
  };

  if (!isClient) {
    return (
      <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg">
        <CardHeader className="bg-transparent border-b border-border/50 pb-5">
          <CardTitle className="flex items-center text-3xl font-bold text-primary">
            <MapPin className="mr-3.5 h-8 w-8" />
            Define tu Área de Búsqueda
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-1">
            Ayúdanos a encontrar las mejores opciones para ti en Santa Cruz.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="ml-4 text-lg text-muted-foreground">Cargando opciones de ubicación...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl rounded-xl overflow-hidden border border-border/70 bg-card/80 backdrop-blur-lg">
      <CardHeader className="bg-transparent border-b border-border/50 pb-5">
        <CardTitle className="flex items-center text-3xl font-bold text-primary">
          <MapPin className="mr-3.5 h-8 w-8" />
          Define tu Área de Búsqueda
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground pt-1">
          Selecciona tu zona y anillo de preferencia en Santa Cruz de la Sierra.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-8"> {/* Increased padding and spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8"> {/* Increased gap */}
          <div>
            <label htmlFor="zona-select" className="block text-base font-medium text-muted-foreground mb-2">
              Zona de Preferencia
            </label>
            <Select value={selectedZona} onValueChange={setSelectedZona}>
              <SelectTrigger id="zona-select" className="w-full text-lg p-3 rounded-lg h-auto">
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
            <label htmlFor="anillo-select" className="block text-base font-medium text-muted-foreground mb-2">
              Anillo de Preferencia
            </label>
            <Select value={selectedAnillo} onValueChange={setSelectedAnillo}>
              <SelectTrigger id="anillo-select" className="w-full text-lg p-3 rounded-lg h-auto">
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
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-6">
            <div className="text-base text-muted-foreground text-center sm:text-left flex-grow">
                <p className="flex items-center">
                    <Building className="h-5 w-5 mr-2.5 text-primary/90"/>
                    Mostrando opciones para: 
                    <span className="font-semibold text-foreground ml-1.5">{selectedZona === DEFAULT_ZONA ? "Todas las Zonas" : selectedZona}</span>,
                    <span className="font-semibold text-foreground ml-1.5">{selectedAnillo === DEFAULT_ANILLO ? "Todos los Anillos" : selectedAnillo}</span>.
                </p>
            </div>
            <Button 
              onClick={handleConfirmLocation} 
              size="lg" 
              className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg rounded-lg"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Confirmar Área
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
