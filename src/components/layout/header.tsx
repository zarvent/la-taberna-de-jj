
import { GlassWater } from "lucide-react"; // Using GlassWater for a more generic beverage/tavern icon
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <GlassWater className="h-8 w-8 text-accent group-hover:scale-110 transition-transform" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary-foreground/90 transition-colors">
            La Taberna de JJ
          </h1>
        </Link>
        {/* Future elements like user profile or settings can go here */}
      </div>
    </header>
  );
}
