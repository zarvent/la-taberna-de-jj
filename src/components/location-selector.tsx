"use client";

import type { LocationPreference } from "@/lib/types";
import usePersistentState from "@/hooks/use-persistent-state";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, LocateFixed } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LocationSelector() {
  const [location, setLocation] = usePersistentState<LocationPreference>("userLocation", null);
  const { toast } = useToast();

  const handleLocationChange = (value: string) => {
    setLocation(value as LocationPreference);
    toast({
      title: "Ubicación Actualizada",
      description: `Tu ubicación se ha establecido en ${value}.`,
      variant: "default",
      duration: 3000,
    });
  };

  const handleGpsLocate = () => {
    toast({
      title: "Localización GPS",
      description: "La funcionalidad de localización GPS aún no está implementada. Por favor, selecciona manualmente.",
      variant: "default",
      duration: 5000,
    });
  };

  return (
    <Card className="shadow-xl rounded-lg overflow-hidden border">
      <CardHeader className="bg-card border-b">
        <CardTitle className="flex items-center text-2xl font-semibold text-primary">
          <MapPin className="mr-3 h-7 w-7" />
          Selecciona Tu Ubicación
        </CardTitle>
        <CardDescription className="text-md">Esto nos ayudará a mostrarte las tiendas más cercanas.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <RadioGroup
          value={location || ""}
          onValueChange={handleLocationChange}
          className="space-y-3"
        >
          <Label htmlFor="north_sc" className="flex items-center space-x-3 p-4 border rounded-md hover:bg-accent/10 hover:border-accent transition-colors cursor-pointer has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary has-[input:checked]:text-primary">
            <RadioGroupItem value="North Santa Cruz" id="north_sc" />
            <span className="text-base font-medium">
              North Santa Cruz
            </span>
          </Label>
          <Label htmlFor="south_sc" className="flex items-center space-x-3 p-4 border rounded-md hover:bg-accent/10 hover:border-accent transition-colors cursor-pointer has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary has-[input:checked]:text-primary">
            <RadioGroupItem value="South Santa Cruz" id="south_sc" />
            <span className="text-base font-medium">
              South Santa Cruz
            </span>
          </Label>
        </RadioGroup>
        <Button
          onClick={handleGpsLocate}
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary text-base py-6"
        >
          <LocateFixed className="mr-2.5 h-5 w-5" />
          Usar Mi Ubicación Actual (GPS)
        </Button>
        {location && (
          <p className="text-sm text-center text-muted-foreground pt-2">
            Preferencia actual: <span className="font-semibold text-primary">{location}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
