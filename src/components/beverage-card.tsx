
import Image from "next/image";
import type { Beverage } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, ShoppingCart, Martini, Beer as BeerIcon, Wine, Package as PackageIcon, GlassWater } from "lucide-react";

interface BeverageCardProps {
  beverage: Beverage;
}

const TypeIcon = ({ type }: { type: Beverage['type'] }) => {
  const iconProps = { className: "h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" };
  switch (type) {
    case 'Vodka': return <Martini {...iconProps} aria-label="Vodka" />;
    case 'Beer': return <BeerIcon {...iconProps} aria-label="Cerveza" />;
    case 'Wine': return <Wine {...iconProps} aria-label="Vino" />;
    case 'Whiskey': return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...iconProps}><path d="M15 3h6v6h-6zM9 3h6v6H9zM9 9h6v6H9zM3 9h6v6H3zM3 3h6v6H3zM19 15l-3 6H8l-3-6V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6zM7 12h10" /></svg>; 
    case 'Other': return <GlassWater {...iconProps} aria-label="Otro Tipo de Bebida" />;
    default: return <PackageIcon {...iconProps} aria-label="Bebida" />;
  }
};


export function BeverageCard({ beverage }: BeverageCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border">
      <CardHeader className="p-0 relative">
        <div className="aspect-[3/2] w-full overflow-hidden">
          <Image
            src={beverage.imageUrl || `https://placehold.co/300x200.png`}
            alt={beverage.name}
            width={300}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="beverage bottle"
          />
        </div>
        {/* Origin Badge removed */}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start justify-between mb-2 min-h-[2.5rem]">
          <CardTitle className="text-lg font-semibold text-primary group-hover:text-primary/90 transition-colors mr-2" title={beverage.name}>
            {beverage.name} 
          </CardTitle>
          <TypeIcon type={beverage.type} />
        </div>
        <CardDescription className="text-sm text-muted-foreground mb-1">{beverage.brand}</CardDescription>
        <CardDescription className="text-xs text-muted-foreground/80 h-10 overflow-hidden">
          {beverage.description || "No hay descripción disponible."}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 border-t bg-card flex items-center justify-between"> 
        <div className="flex items-center text-lg font-bold text-primary">
          <DollarSign className="h-5 w-5 mr-1 text-accent" />
          {beverage.price.toFixed(2)}
        </div>
        <Button size="sm" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </CardFooter>
    </Card>
  );
}
