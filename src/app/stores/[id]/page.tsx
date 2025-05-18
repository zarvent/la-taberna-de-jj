
import { notFound } from "next/navigation";
import Image from "next/image";
import { mockStores, mockBeverages } from "@/lib/mock-data";
import type { Store, Beverage } from "@/lib/types";
import { AppHeader } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Star, ShoppingBag, Image as ImageIcon, DollarSign, PackageSearch, CheckCircle2, XCircle, ArrowLeft, MinusCircle, BookOpen } from "lucide-react";
import Link from "next/link";

async function getStoreData(id: string): Promise<Store | null> {
  await new Promise(resolve => setTimeout(resolve, 500)); 
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
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Button variant="outline" asChild className="mb-8 group">
            <Link href="/#stores" scroll={false} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Volver a Tiendas
            </Link>
          </Button>

          <Card className="overflow-hidden shadow-xl rounded-lg border">
            <CardHeader className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-[16/10] border-b md:border-b-0 md:border-r border-border">
                  <Image
                    src={store.photos[0] || `https://placehold.co/800x500.png`}
                    alt={`Vista principal de ${store.name}`}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint="store interior"
                  />
                </div>
                <div className="hidden md:grid grid-cols-2">
                  {store.photos.slice(1, 3).map((photo, index) => (
                    <div key={index} className={`relative aspect-square ${index % 2 === 0 ? 'border-r' : ''} ${index < 2 ? 'border-b' : ''} border-border`}>
                      <Image
                        src={photo || `https://placehold.co/400x400.png`}
                        alt={`${store.name} vista ${index + 2}`}
                        fill
                        className="object-cover"
                        data-ai-hint="product shelves"
                      />
                    </div>
                  ))}
                  {store.photos.length -1 < 2 && Array(2 - Math.max(0, store.photos.length - 1)).fill(0).map((_,i) => (
                     <div key={`placeholder-${i + store.photos.length -1}`} className={`relative aspect-square bg-muted flex items-center justify-center ${ (store.photos.length -1 + i) % 2 === 0 ? 'border-r' : ''} ${ (store.photos.length -1 + i) < 1 ? 'border-b' : ''} border-border`}>
                        <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                     </div>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <CardTitle className="text-4xl font-bold text-primary mb-3 md:mb-0">{store.name}</CardTitle>
                {store.rating ? (
                  <Badge variant="secondary" className="text-lg px-4 py-2 bg-accent text-accent-foreground self-start md:self-center shadow-sm">
                    <Star className="h-5 w-5 mr-2 fill-current" /> Calificación: {store.rating.toFixed(1)} / 5.0
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-md px-3 py-1.5 self-start md:self-center">
                    Sin calificación
                  </Badge>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 mb-8 text-muted-foreground text-base">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 mt-1 text-accent shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-0.5">Dirección</h4>
                    <span>{store.address}</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-3 mt-1 text-accent shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-0.5">Horario</h4>
                    <span>{store.hours}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-10" />

              <div>
                <h3 className="text-3xl font-semibold text-foreground mb-8 flex items-center">
                  <ShoppingBag className="h-8 w-8 mr-4 text-primary" />
                  Bebidas Disponibles
                </h3>
                {inventoryWithDetails.filter(item => item.beverage).length > 0 ? (
                  <div className="space-y-6">
                    {inventoryWithDetails.map(item => item.beverage && (
                      <Card key={item.beverageId} className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-md hover:shadow-lg transition-shadow rounded-lg border">
                        <div className="relative w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0">
                          <Image
                            src={item.beverage.imageUrl || `https://placehold.co/100x100.png`}
                            alt={item.beverage.name}
                            fill
                            className="rounded-md object-contain border bg-card" 
                            data-ai-hint="bottle label"
                          />
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                          <h4 className="text-xl font-medium text-primary">{item.beverage.name}</h4>
                          <p className="text-base text-muted-foreground">{item.beverage.brand} - {item.beverage.type}</p>
                          {/* Origin removed from here */}
                        </div>
                        <div className="flex flex-col items-center sm:items-end gap-2 text-center sm:text-right min-w-[140px]">
                          <Badge 
                            variant={item.stock > 5 ? "default" : item.stock > 0 ? "secondary" : "destructive"} 
                            className={`px-3 py-1 text-sm shadow-sm ${
                              item.stock > 5 ? "bg-green-100 text-green-700 border-green-400" : 
                              item.stock > 0 ? "bg-yellow-100 text-yellow-700 border-yellow-400" : 
                              "bg-red-100 text-red-700 border-red-400"
                            }`}
                          >
                            {item.stock > 0 ? <CheckCircle2 className="h-4 w-4 mr-1.5" /> : <XCircle className="h-4 w-4 mr-1.5" />}
                            {item.stock > 5 ? 'En Stock' : (item.stock > 0 ? `Poco Stock (${item.stock})` : 'Agotado')}
                          </Badge>
                          <p className="text-xl font-semibold text-foreground flex items-center">
                            <DollarSign className="h-5 w-5 mr-1 text-accent" />
                            {item.beverage.price.toFixed(2)}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <PackageSearch className="mx-auto h-16 w-16 mb-6 text-primary/50" />
                    <p className="text-xl">No hay información específica de bebidas disponible.</p>
                    <p className="text-base mt-1">Por favor, vuelve más tarde o contacta directamente con la tienda.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground/80 py-8 text-center mt-16 border-t border-primary/30">
        <div className="container mx-auto px-4 space-y-3">
          <p className="text-base">&copy; {new Date().getFullYear()} La Taberna de JJ. Todos los derechos reservados.</p>
          <p className="text-sm opacity-80">Creado por Los Discípulos de JJ: Sebastian Zambrana, Adrian Rada, Alain Flores.</p>
          <Button variant="link" asChild className="text-accent hover:text-accent/90 p-0 h-auto">
            <Link href="https://tabernajj.notion.site/" target="_blank" rel="noopener noreferrer">
              <BookOpen className="mr-2 h-4 w-4" />
              Ver Documentación
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}

export const dynamic = 'force-static'; 
export const revalidate = 3600;
