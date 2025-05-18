
import { notFound } from "next/navigation";
import Image from "next/image";
import { mockStores, mockBeverages } from "@/lib/mock-data";
import type { Store, Beverage } from "@/lib/types";
import { AppHeader } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Star, ShoppingBag, Image as ImageIcon, PackageSearch, CheckCircle2, XCircle, ArrowLeft, BookOpen, Info } from "lucide-react";
import Link from "next/link";

async function getStoreData(id: string): Promise<Store | null> {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simular carga de datos
  const store = mockStores.find(s => s.id === id);
  return store || null;
}

async function getBeverageData(id: string): Promise<Beverage | null> {
  const beverage = mockBeverages.find(b => b.id === id);
  return beverage || null;
}

interface StorePageParams {
  params: { id: string };
}

export async function generateStaticParams() {
  return mockStores.map(store => ({
    id: store.id,
  }));
}

export default async function StoreDetailsPage({ params }: StorePageParams) {
  const store = await getStoreData(params.id);

  if (!store) {
    notFound();
  }

  const inventoryWithDetails = await Promise.all(
    store.inventory.map(async (item) => {
      const beverageDetails = await getBeverageData(item.beverageId);
      return {
        ...item,
        beverage: beverageDetails,
      };
    })
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/50"> 
      <AppHeader />
      <main className="container mx-auto px-4 py-6 sm:py-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          <div className="animate-fade-in-up opacity-0" style={{animationDelay: '0.1s'}}>
            <Button variant="outline" size="default" asChild className="mb-6 sm:mb-8 group shadow-sm hover:shadow-md transition-shadow rounded-lg">
              <Link href="/#stores" scroll={false} className="flex items-center text-sm">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5 duration-300 ease-out" />
                Volver a Tiendas
              </Link>
            </Button>
          </div>

          <div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border/30 animate-fade-in-up opacity-0" style={{animationDelay: '0.3s'}}>
            {/* Galería de Imágenes Principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-border/30 rounded-t-lg">
              {/* Imagen Principal */}
              <div className="relative aspect-[16/10] md:col-span-1 group overflow-hidden">
                <Image
                  src={store.photos[0] || `https://placehold.co/800x500.png`}
                  alt={`Vista principal de ${store.name}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  priority
                  data-ai-hint="store interior shelves"
                />
              </div>
              {/* Imágenes Secundarias - Layout de escritorio */}
              <div className="hidden md:grid md:grid-cols-2 gap-0.5">
                {store.photos.slice(1, 5).map((photo, index) => (
                  <div key={index} className="relative aspect-square group overflow-hidden">
                    <Image
                      src={photo || `https://placehold.co/400x400.png`}
                      alt={`${store.name} vista ${index + 2}`}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      data-ai-hint="product detail ambiance"
                    />
                  </div>
                ))}
                {Array(Math.max(0, 4 - Math.max(0, store.photos.length - 1))).fill(0).map((_,i) => (
                   <div key={`placeholder-gallery-desktop-${i}`} className="relative aspect-square bg-muted/50 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground/20" />
                   </div>
                ))}
              </div>
            </div>
            {/* Imágenes Secundarias - Layout móvil */}
            <div className="grid grid-cols-2 gap-0.5 bg-border/30 mt-0.5 md:hidden">
              {store.photos.slice(1, Math.min(store.photos.length, 5)).map((photo, index) => ( 
                <div key={`mobile-gallery-${index}`} className="relative aspect-square group overflow-hidden">
                  <Image
                    src={photo || `https://placehold.co/300x300.png`}
                    alt={`${store.name} vista ${index + 2}`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    data-ai-hint="product detail ambiance"
                  />
                </div>
              ))}
               {store.photos.length <= 1 && Array(Math.max(0, 2 - Math.max(0, store.photos.length - 1))).fill(0).map((_,i) => (
                   <div key={`placeholder-gallery-mobile-${i}`} className={`relative aspect-square bg-muted/50 flex items-center justify-center`}>
                      <ImageIcon className="h-10 w-10 text-muted-foreground/20" />
                   </div>
                ))}
            </div>
            
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 sm:mb-6 md:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary mb-2 sm:mb-3 md:mb-0 tracking-tight">{store.name}</h1>
                {store.rating ? (
                  <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-3 py-1 sm:py-1.5 bg-accent text-accent-foreground self-start md:self-center shadow-lg border border-accent-foreground/30 rounded-lg group">
                    <Star className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 sm:mr-1.5 group-hover:animate-icon-pop" /> Calificación: {store.rating.toFixed(1)} / 5.0
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs sm:text-sm px-2 py-1 self-start md:self-center rounded-md group">
                    <Info className="h-3.5 w-3.5 mr-1.5 group-hover:animate-icon-pop"/> Sin calificación
                  </Badge>
                )}
              </div>

              {/* Detalles de Dirección y Horario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-5 mb-5 sm:mb-6 md:mb-8 text-sm sm:text-base">
                <div className="flex items-start group">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 sm:mr-2.5 mt-0.5 text-accent shrink-0 group-hover:animate-icon-pop" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-0.5">Dirección</h4>
                    <span className="text-muted-foreground">{store.address}</span>
                  </div>
                </div>
                <div className="flex items-start group">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 mr-2 sm:mr-2.5 mt-0.5 text-accent shrink-0 group-hover:animate-icon-pop" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-0.5">Horario</h4>
                    <span className="text-muted-foreground">{store.hours}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-5 sm:my-6 md:my-8" />

              {/* Sección de Inventario */}
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6 flex items-center group">
                  <ShoppingBag className="h-5 w-5 md:h-7 md:w-7 mr-2 sm:mr-3 text-primary group-hover:animate-icon-pop" />
                  Bebidas Disponibles
                </h3>
                {inventoryWithDetails.filter(item => item.beverage).length > 0 ? (
                  <div className="space-y-4 sm:space-y-5">
                    {inventoryWithDetails.map((item, index) => item.beverage && (
                      <Card 
                        key={item.beverageId} 
                        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out rounded-xl border border-border/60 transform hover:-translate-y-1 animate-fade-in-up opacity-0"
                        style={{animationDelay: `${0.1 + index * 0.05}s`}}
                      >
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 group/img">
                          <Image
                            src={item.beverage.imageUrl || `https://placehold.co/120x120.png`}
                            alt={item.beverage.name}
                            fill
                            className="rounded-lg object-contain border bg-card group-hover/img:scale-105 transition-transform duration-300" 
                            data-ai-hint="bottle shot"
                          />
                        </div>
                        <div className="flex-grow text-center sm:text-left w-full sm:w-auto">
                          <h4 className="text-base sm:text-lg font-medium text-primary mb-0.5 line-clamp-2">{item.beverage.name}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{item.beverage.brand} - {item.beverage.type}</p>
                        </div>
                        <div className="flex flex-col items-center sm:items-end gap-1 sm:gap-1.5 text-center sm:text-right w-full sm:w-auto sm:min-w-[120px] mt-2 sm:mt-0">
                          <Badge 
                            variant={item.stock > 5 ? "default" : item.stock > 0 ? "secondary" : "destructive"} 
                            className={`px-2 sm:px-2.5 py-1 text-xs shadow-md rounded-md ${
                              item.stock > 5 ? "bg-green-600/20 text-green-700 border-green-500" : 
                              item.stock > 0 ? "bg-yellow-500/20 text-yellow-700 border-yellow-500" : 
                              "bg-red-600/20 text-red-700 border-red-500"
                            }`}
                          >
                            {item.stock > 0 ? <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> : <XCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />}
                            {item.stock > 5 ? 'En Stock' : (item.stock > 0 ? `Poco Stock (${item.stock})` : 'Agotado')}
                          </Badge>
                          <p className="text-base sm:text-lg font-semibold text-foreground flex items-center">
                            {item.beverage.price.toFixed(2)} <span className="text-xs font-normal text-muted-foreground ml-1">Bs.</span>
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 md:py-12 text-muted-foreground bg-muted/30 rounded-xl border border-border/50 animate-fade-in-up opacity-0" style={{animationDelay: '0.2s'}}>
                    <PackageSearch className="mx-auto h-12 w-12 sm:h-14 md:h-16 md:w-16 mb-4 sm:mb-5 text-primary/40" />
                    <p className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-1.5">Inventario no disponible</p>
                    <p className="text-xs sm:text-sm mt-1">No hay información específica de bebidas en este momento.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground/90 py-6 sm:py-8 text-center mt-10 md:mt-12 border-t-2 border-primary/50 shadow-inner">
        <div className="container mx-auto px-4 space-y-1.5 sm:space-y-2">
          <p className="text-sm sm:text-base font-medium">&copy; {new Date().getFullYear()} La Taberna de JJ. Todos los derechos reservados.</p>
          <p className="text-xs sm:text-sm opacity-80">Creado por Los Discípulos de JJ: Sebastian Zambrana, Adrian Rada, Alain Flores.</p>
        </div>
      </footer>
    </div>
  );
}

export const dynamic = 'force-static'; 
export const revalidate = 3600;
