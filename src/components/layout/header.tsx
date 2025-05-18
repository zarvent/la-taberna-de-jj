import { MapPin } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Placeholder for a thematic icon (e.g., Kremlin Star, Matryoshka) */}
          {/* For now, using MapPin as related to "Finder" */}
          <MapPin className="h-8 w-8 text-accent" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Moscow Tavern Finder
          </h1>
        </Link>
        {/* Future elements like user profile or settings can go here */}
        {/* <UserNav /> */}
      </div>
    </header>
  );
}
