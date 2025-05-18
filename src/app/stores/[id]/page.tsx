
import { notFound } from "next/navigation";
import Image from "next/image";
import { mockStores, mockBeverages } from "@/lib/mock-data";
import type { Store, Beverage } from "@/lib/types";
import { AppHeader } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/50"> {/* Subtle gradient background */}
      <AppHeader />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          <Button variant="outline" size="lg" asChild className="mb-10 group shadow-sm hover:shadow-md transition-shadow rounded-lg">
            <Link href="/#stores" scroll={false} className="flex items-center text-base">
              <ArrowLeft className="mr-2.5 h-5 w-5 transition-transform group-hover:-translate-x-1 duration-300 ease-out" />
              Volver a Tiendas
            </Link>
          </Button>

          <div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border/30"> {/* Card container for polish */}
            {/* Galería de Imágenes Principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-border/30 rounded-t-lg"> {/* No gap for seamless look, bg for tiny lines */}
              <div className="relative aspect-[16/10]">
                <Image
                  src={store.photos[0] || `https://placehold.co/800x500.png`}
                  alt={`Vista principal de ${store.name}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                  priority
                  data-ai-hint="store interior shelves"
                />
              </div>
              <div className="hidden md:grid grid-cols-2 gap-0.5">
                {store.photos.slice(1, 5).map((photo, index) => ( // Show up to 4 more images
                  <div key={index} className={`relative aspect-square`}>
                    <Image
                      src={photo || `https://placehold.co/400x400.png`}
                      alt={`${store.name} vista ${index + 2}`}
                      fill
                      className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                      data-ai-hint="product detail ambiance"
                    />
                  </div>
                ))}
                {/* Placeholders si no hay suficientes fotos */}
                {Array(Math.max(0, 4 - Math.max(0, store.photos.length - 1))).fill(0).map((_,i) => (
                   <div key={`placeholder-gallery-${i}`} className={`relative aspect-square bg-muted/50 flex items-center justify-center`}>
                      <ImageIcon className="h-16 w-16 text-muted-foreground/20" />
                   </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 md:p-10"> {/* Increased padding */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h1 className="text-5xl font-extrabold text-primary mb-3 md:mb-0 tracking-tight">{store.name}</h1> {/* More prominent title */}
                {store.rating ? (
                  <Badge variant="secondary" className="text-xl px-5 py-3 bg-accent text-accent-foreground self-start md:self-center shadow-lg border border-accent-foreground/30 rounded-lg">
                    <Star className="h-6 w-6 mr-2.5 fill-current" /> Calificación: {store.rating.toFixed(1)} / 5.0
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-lg px-4 py-2 self-start md:self-center rounded-md">
                    <Info className="h-5 w-5 mr-2"/> Sin calificación
                  </Badge>
                )}
              </div>

              {/* Detalles de Dirección y Horario */}
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mb-10 text-lg"> {/* Increased gaps and font size */}
                <div className="flex items-start">
                  <MapPin className="h-7 w-7 mr-4 mt-1 text-accent shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Dirección</h4>
                    <span className="text-muted-foreground">{store.address}</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-7 w-7 mr-4 mt-1 text-accent shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horario</h4>
                    <span className="text-muted-foreground">{store.hours}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-12" /> {/* Increased margin */}

              {/* Sección de Inventario */}
              <div>
                <h3 className="text-4xl font-bold text-foreground mb-10 flex items-center"> {/* More prominent title */}
                  <ShoppingBag className="h-9 w-9 mr-5 text-primary" />
                  Bebidas Disponibles
                </h3>
                {inventoryWithDetails.filter(item => item.beverage).length > 0 ? (
                  <div className="space-y-8"> {/* Increased spacing */}
                    {inventoryWithDetails.map(item => item.beverage && (
                      <Card key={item.beverageId} className="flex flex-col sm:flex-row items-center gap-6 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out rounded-xl border border-border/60 transform hover:-translate-y-1">
                        <div className="relative w-28 h-28 sm:w-24 sm:h-24 flex-shrink-0"> {/* Larger image */}
                          <Image
                            src={item.beverage.imageUrl || `https://placehold.co/120x120.png`}
                            alt={item.beverage.name}
                            fill
                            className="rounded-lg object-contain border bg-card group-hover:scale-105 transition-transform duration-300" 
                            data-ai-hint="bottle shot"
                          />
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                          <h4 className="text-2xl font-medium text-primary mb-1">{item.beverage.name}</h4> {/* Larger name */}
                          <p className="text-lg text-muted-foreground">{item.beverage.brand} - {item.beverage.type}</p>
                        </div>
                        <div className="flex flex-col items-center sm:items-end gap-2.5 text-center sm:text-right min-w-[160px]"> {/* Increased min-width */}
                          <Badge 
                            variant={item.stock > 5 ? "default" : item.stock > 0 ? "secondary" : "destructive"} 
                            className={`px-4 py-2 text-base shadow-md rounded-md ${ // Larger badge
                              item.stock > 5 ? "bg-green-600/20 text-green-700 border-green-500" : 
                              item.stock > 0 ? "bg-yellow-500/20 text-yellow-700 border-yellow-500" : 
                              "bg-red-600/20 text-red-700 border-red-500"
                            }`}
                          >
                            {item.stock > 0 ? <CheckCircle2 className="h-5 w-5 mr-2" /> : <XCircle className="h-5 w-5 mr-2" />}
                            {item.stock > 5 ? 'En Stock' : (item.stock > 0 ? `Poco Stock (${item.stock})` : 'Agotado')}
                          </Badge>
                          <p className="text-2xl font-semibold text-foreground flex items-center"> {/* Larger price */}
                            {item.beverage.price.toFixed(2)} <span className="text-sm font-normal text-muted-foreground ml-1.5">Bs.</span>
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-muted-foreground bg-muted/30 rounded-xl border border-border/50">
                    <PackageSearch className="mx-auto h-24 w-24 mb-8 text-primary/40" />
                    <p className="text-2xl font-semibold text-foreground mb-2">Inventario no disponible</p>
                    <p className="text-lg mt-1">No hay información específica de bebidas en este momento. Por favor, contacta directamente con la tienda.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground/90 py-10 text-center mt-20 border-t-2 border-primary/50 shadow-inner">
        <div className="container mx-auto px-4 space-y-3">
          <p className="text-lg font-medium">&copy; {new Date().getFullYear()} La Taberna de JJ. Todos los derechos reservados.</p>
          <p className="text-base opacity-80">Creado por Los Discípulos de JJ: Sebastian Zambrana, Adrian Rada, Alain Flores.</p>
        </div>
      </footer>
    </div>
  );
}

export const dynamic = 'force-static'; 
export const revalidate = 3600;
