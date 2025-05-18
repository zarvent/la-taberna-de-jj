import Image from "next/image";
import type { Beverage } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, ShoppingCart, Star } from "lucide-react";

interface BeverageCardProps {
  beverage: Beverage;
}

// Helper for thematic icons (placeholders for now)
const TypeIcon = ({ type }: { type: Beverage['type'] }) => {
  switch (type) {
    case 'Vodka': return <span title="Vodka" role="img" aria-label="Vodka">🍸</span>; // Using emoji as placeholder
    case 'Beer': return <span title="Beer" role="img" aria-label="Beer">🍺</span>;
    case 'Wine': return <span title="Wine" role="img" aria-label="Wine">🍷</span>;
    case 'Whiskey': return <span title="Whiskey" role="img" aria-label="Whiskey">🥃</span>;
    default: return <Star className="h-4 w-4 text-muted-foreground" />; // Generic icon
  }
};


export function BeverageCard({ beverage }: BeverageCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Image
          src={beverage.imageUrl || `https://placehold.co/300x200.png`}
          alt={beverage.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
          data-ai-hint="beverage bottle"
        />
        <Badge variant="secondary" className="absolute top-2 right-2 bg-accent text-accent-foreground">
          {beverage.origin}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg font-semibold text-primary truncate" title={beverage.name}>{beverage.name}</CardTitle>
          <TypeIcon type={beverage.type} />
        </div>
        <CardDescription className="text-sm text-muted-foreground mb-1">{beverage.brand}</CardDescription>
        <CardDescription className="text-xs text-muted-foreground/80 h-10 overflow-hidden">
          {beverage.description || "No description available."}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 border-t bg-secondary/10 flex items-center justify-between">
        <div className="flex items-center text-lg font-bold text-primary">
          <DollarSign className="h-5 w-5 mr-1 text-accent" />
          {beverage.price.toFixed(2)}
        </div>
        <Button size="sm" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
