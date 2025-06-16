import Image from "next/image";
import type { Beverage } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Martini, Beer as BeerIcon, Wine, Package as PackageIcon, GlassWater } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BeverageCardProps {
  beverage: Beverage;
  className?: string;
  style?: React.CSSProperties;
}

const TypeIcon = ({ type }: { type: Beverage['type'] }) => {
  const iconProps = { 
    className: "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:animate-icon-pop group-hover:rotate-12" 
  };
  switch (type) {
    case 'Vodka': return <Martini {...iconProps} aria-label="Vodka" />;
    case 'Beer': return <BeerIcon {...iconProps} aria-label="Cerveza" />;
    case 'Wine': return <Wine {...iconProps} aria-label="Vino" />;
    case 'Whiskey': return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...iconProps} aria-label="Whiskey"><path d="M15.05 8.05 17 6l2-2"></path><path d="M15.05 8.05C13.53 9.58 13 11.63 13 13.13V19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5.87c0-1.5.53-3.55 2-5.08l2-1.51M12.5 6.5l1.51-1.51"></path><path d="M7.95 8.05 6 6l-2-2"></path></svg>; 
    case 'Other': return <GlassWater {...iconProps} aria-label="Otro Tipo de Bebida" />;
    default: return <PackageIcon {...iconProps} aria-label="Bebida" />;
  }
};

export function BeverageCard({ beverage, className, style }: BeverageCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => setModalOpen(!isModalOpen);

  return (
    <Card 
      className={`group flex flex-col h-full overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-out border border-border/70 hover:border-primary/50 transform hover:-translate-y-1.5 hover:scale-[1.03] card-shimmer ${className}`}
      style={style}
    >
      <CardHeader className="p-0 relative">
        <div className="aspect-[4/3] w-full overflow-hidden bg-muted/30">
          <Image
            src={beverage.imageUrl || `https://placehold.co/400x300.png`}
            alt={beverage.name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            data-ai-hint="botella elegante bebida"
          />
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 flex-grow">
        <div className="flex items-start justify-between mb-1 sm:mb-1.5 min-h-[2.25rem] sm:min-h-[2.5rem]">
          <CardTitle className="text-base sm:text-lg font-semibold text-primary group-hover:text-primary/90 transition-colors duration-300 mr-2 leading-tight line-clamp-2" title={beverage.name}>
            {beverage.name} 
          </CardTitle>
          <TypeIcon type={beverage.type} />
        </div>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-1.5 line-clamp-1">{beverage.brand}</CardDescription>
        <CardDescription className="text-xs text-muted-foreground/80 h-10 overflow-hidden line-clamp-2">
          {beverage.description || "No hay descripción disponible."}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 border-t bg-card/95 backdrop-blur-sm flex items-center justify-between"> 
        <div className="flex items-center text-sm sm:text-base font-bold text-foreground">
          {beverage.price.toFixed(2)} <span className="text-xs font-normal text-muted-foreground ml-1">Bs.</span>
        </div>
        <Button 
          size="sm" 
          variant="default" 
          className="bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg text-xs px-2.5 py-1.5 h-8 sm:text-sm sm:px-3 sm:py-2 sm:h-9 group/button"
          onClick={handleModalToggle}
        >
          Ver Disponibilidad
        </Button>
      </CardFooter>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{beverage.name}</DialogTitle>
          </DialogHeader>
          <div>
            {/* Replace this with actual store data */}
            <p>Lista de tiendas con disponibilidad:</p>
            <ul>
              <li>Licorería El Gato Negro - En Stock (10)</li>
              <li>Licorería La Esquina - Poco Stock (3)</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

