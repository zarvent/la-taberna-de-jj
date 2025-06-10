
import { BookOpen, GlassWater } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50 border-b-2 border-primary/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group transform transition-transform hover:scale-105">
          <GlassWater className="h-8 w-8 sm:h-10 sm:w-10 text-accent drop-shadow-md group-hover:animate-icon-tilt transition-transform duration-300 ease-out" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--accent) / 0.5))' }} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight group-hover:text-primary-foreground/90 transition-colors font-serif">
            La Taberna de JJ
          </h1>
        </Link>
        <Button 
          variant="outline" 
          asChild 
          className="text-xs sm:text-sm bg-primary-foreground/10 hover:bg-primary-foreground/25 border-primary-foreground/40 text-primary-foreground hover:text-primary-foreground px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group hover:scale-105 active:scale-95"
        >
          <Link href="https://tabernajj.notion.site/" target="_blank" rel="noopener noreferrer">
            <BookOpen className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-icon-pop" />
            <span className="hidden sm:inline">Ver Documentación</span>
            <span className="sm:hidden">Docs</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}

