import { notFound } from "next/navigation";
import Image from "next/image";
import { mockStores, mockBeverages } from "@/lib/mock-data";
import type { Store, Beverage } from "@/lib/types";
import { AppHeader } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Star, ShoppingBag, Image as ImageIcon, DollarSign, PackageSearch, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

// Helper to simulate fetching data
async function getStoreData(id: string): Promise<Store | null> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
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
          <Button variant="outline" asChild className="mb-6">
            <Link href="/#stores" scroll={false}>
              &larr; Back to Stores
            </Link>
          </Button>

          <Card className="overflow-hidden shadow-xl rounded-lg">
            <CardHeader className="p-0">
              {/* Image Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={store.photos[0] || `https://placehold.co/800x500.png`}
                    alt={`${store.name} main view`}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint="store interior"
                  />
                </div>
                <div className="hidden md:grid grid-cols-2 gap-0">
                  {store.photos.slice(1, 3).map((photo, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={photo || `https://placehold.co/400x400.png`}
                        alt={`${store.name} view ${index + 2}`}
                        fill
                        className="object-cover"
                        data-ai-hint="product shelves"
                      />
                    </div>
                  ))}
                  {store.photos.length < 3 && Array(2 - (store.photos.length-1 > 0 ? store.photos.length-1 : 0)).fill(0).map((_,i) => (
                     <div key={`placeholder-${i}`} className="relative aspect-square bg-muted flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                     </div>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <CardTitle className="text-3xl font-bold text-primary mb-2 md:mb-0">{store.name}</CardTitle>
                {store.rating && (
                  <Badge variant="secondary" className="text-base px-3 py-1.5 bg-accent text-accent-foreground self-start md:self-center">
                    <Star className="h-5 w-5 mr-2 fill-current" /> Rating: {store.rating.toFixed(1)} / 5.0
                  </Badge>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6 text-muted-foreground">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1 text-accent shrink-0" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-1 text-accent shrink-0" />
                  <span>{store.hours}</span>
                </div>
              </div>
              
              <Separator className="my-8" />

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                  <ShoppingBag className="h-7 w-7 mr-3 text-primary" />
                  Available Beverages
                </h3>
                {inventoryWithDetails.length > 0 ? (
                  <div className="space-y-6">
                    {inventoryWithDetails.map(item => item.beverage && (
                      <Card key={item.beverageId} className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-sm hover:shadow-md transition-shadow rounded-md">
                        <Image
                          src={item.beverage.imageUrl || `https://placehold.co/100x100.png`}
                          alt={item.beverage.name}
                          width={80}
                          height={80}
                          className="rounded-md object-contain w-20 h-20 border"
                          data-ai-hint="bottle label"
                        />
                        <div className="flex-grow text-center sm:text-left">
                          <h4 className="text-lg font-medium text-primary">{item.beverage.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.beverage.brand} - {item.beverage.type}</p>
                          <p className="text-xs text-muted-foreground/80">{item.beverage.origin}</p>
                        </div>
                        <div className="flex flex-col items-center sm:items-end gap-2 text-center sm:text-right">
                          <Badge variant={item.stock > 0 ? "default" : "destructive"} className={item.stock > 0 ? "bg-green-500/20 text-green-700 border-green-500" : ""}>
                            {item.stock > 5 ? <CheckCircle2 className="h-4 w-4 mr-1.5" /> : (item.stock > 0 ? <CheckCircle2 className="h-4 w-4 mr-1.5" /> : <XCircle className="h-4 w-4 mr-1.5" />)}
                            {item.stock > 0 ? (item.stock > 5 ? 'In Stock' : `Low Stock (${item.stock})`) : 'Out of Stock'}
                          </Badge>
                          <p className="text-lg font-semibold text-foreground flex items-center">
                            <DollarSign className="h-5 w-5 mr-1 text-accent" />
                            {item.beverage.price.toFixed(2)}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <PackageSearch className="mx-auto h-12 w-12 mb-4" />
                    <p>No specific beverage information available for this store at the moment.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground/80 py-6 text-center mt-12">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Moscow Tavern Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export const dynamic = 'force-static'; // Or 'auto' if data can change frequently
export const revalidate = 3600; // Revalidate data every hour if dynamic='auto'
