
import { BookOpen, GlassWater } from "lucide-react"; // Using GlassWater for a more generic beverage/tavern icon
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <GlassWater className="h-8 w-8 text-accent group-hover:scale-110 transition-transform" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary-foreground/90 transition-colors">
            La Taberna de JJ
          </h1>
        </Link>
        <Button variant="outline" asChild className="text-sm bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground hover:text-primary-foreground">
          <Link href="https://tabernajj.notion.site/" target="_blank" rel="noopener noreferrer">
            <BookOpen className="mr-2 h-4 w-4" />
            Ver Documentación
          </Link>
        </Button>
      </div>
    </header>
  );
}
