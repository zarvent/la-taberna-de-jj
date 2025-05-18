
import Image from "next/image";
import type { Beverage } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, ShoppingCart, Star, Martini, Beer as BeerIcon, Wine, Bot, Package as PackageIcon } from "lucide-react";

interface BeverageCardProps {
  beverage: Beverage;
}

// Helper for thematic icons using lucide-react
const TypeIcon = ({ type }: { type: Beverage['type'] }) => {
  const iconProps = { className: "h-5 w-5 text-muted-foreground" };
  switch (type) {
    case 'Vodka': return <Martini {...iconProps} aria-label="Vodka" />;
    case 'Beer': return <BeerIcon {...iconProps} aria-label="Beer" />;
    case 'Wine': return <Wine {...iconProps} aria-label="Wine" />;
    case 'Whiskey': return <Bot {...iconProps} aria-label="Whiskey" />; // Using Bot as a generic bottle/spirit icon
    case 'Other': return <PackageIcon {...iconProps} aria-label="Other Beverage Type" />;
    default: return <Star {...iconProps} aria-label="Beverage" />;
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
        <div className="flex items-start justify-between mb-2 min-h-[2.5rem]"> {/* Ensure consistent height for this row */}
          <CardTitle className="text-lg font-semibold text-primary mr-2" title={beverage.name}>
            {/* Apply truncation if necessary, but allow wrapping for slightly longer names if space permits */}
            {beverage.name} 
          </CardTitle>
          <TypeIcon type={beverage.type} />
        </div>
        <CardDescription className="text-sm text-muted-foreground mb-1">{beverage.brand}</CardDescription>
        <CardDescription className="text-xs text-muted-foreground/80 h-10 overflow-hidden">
          {/* Using a fixed height and overflow for description consistency */}
          {beverage.description || "No description available."}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 border-t bg-card flex items-center justify-between"> 
        {/* Changed bg-secondary/10 to bg-card for a cleaner look, or could be bg-muted/50 */}
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
