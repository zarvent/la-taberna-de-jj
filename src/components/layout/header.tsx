
import { BookOpen, GlassWater } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50 border-b-2 border-primary/70">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group transform transition-transform hover:scale-105">
          <GlassWater className="h-10 w-10 text-accent drop-shadow-md group-hover:animate-icon-tilt transition-transform duration-300 ease-out" />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight group-hover:text-primary-foreground/90 transition-colors">
            La Taberna de JJ
          </h1>
        </Link>
        <Button 
          variant="outline" 
          asChild 
          className="text-base bg-primary-foreground/10 hover:bg-primary-foreground/25 border-primary-foreground/40 text-primary-foreground hover:text-primary-foreground px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <Link href="https://tabernajj.notion.site/" target="_blank" rel="noopener noreferrer">
            <BookOpen className="mr-2 h-5 w-5 group-hover:animate-icon-pop" />
            Ver Documentación
          </Link>
        </Button>
      </div>
    </header>
  );
}
