
import { Skeleton } from "@/components/ui/skeleton";
import { AppHeader } from "@/components/layout/header";
import { Building2, Clock, DollarSign, Image as ImageIcon, MapPin, ShoppingBag, Star, ArrowLeft, PackageSearch } from "lucide-react";

export default function LoadingStoreDetails() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/50">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          {/* Back Button Skeleton */}
          <Skeleton className="h-10 w-40 mb-10 rounded-lg" />
          
          <div className="bg-card p-0.5 rounded-xl shadow-2xl border border-border/30"> {/* Card container for polish */}
            {/* Image Gallery Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mb-0.5 bg-border/30 rounded-t-lg overflow-hidden">
              <Skeleton className="aspect-[16/10] w-full" />
              <div className="hidden md:grid grid-cols-2 gap-0.5">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square w-full" />
              </div>
            </div>

            <div className="p-6 md:p-10">
              {/* Store Name & Rating Skeleton */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <Skeleton className="h-12 w-3/4 mb-3 md:mb-0 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
              
              {/* Details Skeleton */}
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mb-10 text-lg">
                <div>
                  <div className="flex items-start mb-6">
                    <MapPin className="h-7 w-7 mr-4 mt-1 text-muted shrink-0" />
                    <div>
                      <Skeleton className="h-6 w-32 mb-2 rounded-md" /> 
                      <Skeleton className="h-5 w-full mb-1 rounded-md" />
                      <Skeleton className="h-5 w-4/5 rounded-md" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start">
                    <Clock className="h-7 w-7 mr-4 mt-1 text-muted shrink-0" />
                    <div>
                      <Skeleton className="h-6 w-32 mb-2 rounded-md" />
                      <Skeleton className="h-5 w-full mb-1 rounded-md" />
                      <Skeleton className="h-5 w-3/4 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
              
              <Skeleton className="h-px w-full bg-border my-12" /> {/* Separator Skeleton */}

              {/* Inventory Title Skeleton */}
              <div className="flex items-center mb-10">
                <ShoppingBag className="h-9 w-9 mr-5 text-muted" />
                <Skeleton className="h-9 w-1/2 rounded-md" />
              </div>

              {/* Inventory Skeletons */}
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-5 border border-border/50 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-5 bg-muted/20">
                    <div className="flex items-center gap-5 w-full sm:w-auto">
                      <Skeleton className="h-20 w-20 rounded-md shrink-0" />
                      <div className="flex-grow">
                        <Skeleton className="h-7 w-4/5 mb-2.5 rounded-md" />
                        <Skeleton className="h-5 w-3/5 rounded-md" />
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2.5 min-w-[150px] mt-3 sm:mt-0">
                      <Skeleton className="h-7 w-28 rounded-md" />
                      <Skeleton className="h-6 w-20 rounded-md" />
                    </div>
                  </div>
                ))}
                 <div className="text-center py-12 text-muted-foreground mt-8">
                    <PackageSearch className="mx-auto h-16 w-16 mb-6 text-muted" />
                    <Skeleton className="h-6 w-3/4 mx-auto mb-2 rounded-md" />
                    <Skeleton className="h-5 w-1/2 mx-auto rounded-md" />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground/90 py-8 text-center mt-16 border-t-2 border-primary/50">
        <Skeleton className="h-5 w-1/2 mx-auto mb-2 rounded-md" />
        <Skeleton className="h-4 w-3/4 mx-auto mb-2 rounded-md" />
        <Skeleton className="h-4 w-2/3 mx-auto rounded-md" />
      </footer>
    </div>
  );
}
