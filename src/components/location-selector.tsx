"use client";

import type { LocationPreference } from "@/lib/types";
import usePersistentState from "@/hooks/use-persistent-state";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, LocateFixed } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LocationSelector() {
  const [location, setLocation] = usePersistentState<LocationPreference>("userLocation", null);
  const { toast } = useToast();

  const handleLocationChange = (value: string) => {
    setLocation(value as LocationPreference);
    toast({
      title: "Location Updated",
      description: `Your location is set to ${value}.`,
    });
  };

  const handleGpsLocate = () => {
    // Mock GPS functionality
    toast({
      title: "GPS Location",
      description: "GPS location functionality is not yet implemented. Please select manually.",
      variant: "default",
    });
    // In a real app:
    // navigator.geolocation.getCurrentPosition(success, error, options);
    // For now, we can set it to a mock GPS value or prompt for manual
    // setLocation('GPS'); 
  };

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-secondary/30">
        <CardTitle className="flex items-center text-xl font-semibold text-primary">
          <MapPin className="mr-3 h-6 w-6" />
          Select Your Location
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <RadioGroup
          value={location || ""}
          onValueChange={handleLocationChange}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-3 border rounded-md hover:bg-accent/10 transition-colors">
            <RadioGroupItem value="North Santa Cruz" id="north_sc" />
            <Label htmlFor="north_sc" className="text-base cursor-pointer flex-grow">
              North Santa Cruz
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 border rounded-md hover:bg-accent/10 transition-colors">
            <RadioGroupItem value="South Santa Cruz" id="south_sc" />
            <Label htmlFor="south_sc" className="text-base cursor-pointer flex-grow">
              South Santa Cruz
            </Label>
          </div>
        </RadioGroup>
        <Button
          onClick={handleGpsLocate}
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary/10"
        >
          <LocateFixed className="mr-2 h-5 w-5" />
          Use My Current Location (GPS)
        </Button>
        {location && (
          <p className="text-sm text-center text-muted-foreground pt-2">
            Current preference: <span className="font-semibold text-primary">{location}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
