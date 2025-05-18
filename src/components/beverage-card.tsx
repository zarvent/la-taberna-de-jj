
import Image from "next/image";
import type { Beverage } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Martini, Beer as BeerIcon, Wine, Package as PackageIcon, GlassWater } from "lucide-react";

interface BeverageCardProps {
  beverage: Beverage;
}

const TypeIcon = ({ type }: { type: Beverage['type'] }) => {
  const iconProps = { className: "h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" };
  switch (type) {
    case 'Vodka': return <Martini {...iconProps} aria-label="Vodka" />;
    case 'Beer': return <BeerIcon {...iconProps} aria-label="Cerveza" />;
    case 'Wine': return <Wine {...iconProps} aria-label="Vino" />;
    case 'Whiskey': return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...iconProps} aria-label="Whiskey"><path d="M15.05 8.05 17 6l2-2"></path><path d="M15.05 8.05C13.53 9.58 13 11.63 13 13.13V19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5.87c0-1.5.53-3.55 2-5.08l2-1.51M12.5 6.5l1.51-1.51"></path><path d="M7.95 8.05 6 6l-2-2"></path></svg>; 
    case 'Other': return <GlassWater {...iconProps} aria-label="Otro Tipo de Bebida" />;
    default: return <PackageIcon {...iconProps} aria-label="Bebida" />;
  }
};


export function BeverageCard({ beverage }: BeverageCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border hover:border-primary/50">
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
      <CardFooter className="p-4 border-t bg-card/80 backdrop-blur-sm flex items-center justify-between"> 
        <div className="flex items-center text-lg font-bold text-primary">
          {/* DollarSign icon removed */}
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
