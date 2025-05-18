import { Skeleton } from "@/components/ui/skeleton";
import { AppHeader } from "@/components/layout/header"; // Re-use header for consistent layout
import { Building2, Clock, DollarSign, Image as ImageIcon, MapPin, ShoppingBag, Star } from "lucide-react";

export default function LoadingStoreDetails() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Store Name Skeleton */}
          <Skeleton className="h-10 w-3/4 mb-4 rounded-md" />
          
          {/* Image Gallery Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="hidden md:grid grid-cols-2 gap-2">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="aspect-square w-full rounded-lg" />
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <Skeleton className="h-6 w-1/2 mb-3 rounded-md" /> {/* Address title */}
              <Skeleton className="h-5 w-full mb-1 rounded-md" />
              <Skeleton className="h-5 w-3/4 rounded-md" />
              
              <Skeleton className="h-6 w-1/2 mt-4 mb-3 rounded-md" /> {/* Hours title */}
              <Skeleton className="h-5 w-full mb-1 rounded-md" />
              <Skeleton className="h-5 w-2/3 rounded-md" />
            </div>
            <div>
              {/* Rating Skeleton */}
              <div className="flex items-center mb-4">
                <Star className="h-6 w-6 text-muted mr-2" />
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>
              {/* Map Placeholder Skeleton */}
              <Skeleton className="h-40 w-full rounded-lg bg-muted" />
            </div>
          </div>

          {/* Inventory Title Skeleton */}
          <Skeleton className="h-8 w-1/3 mb-6 rounded-md" />

          {/* Inventory Skeletons */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border rounded-lg flex justify-between items-center">
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/5 mb-2 rounded-md" />
                  <Skeleton className="h-4 w-2/5 rounded-md" />
                </div>
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
