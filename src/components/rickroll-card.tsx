
// src/components/rickroll-card.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, PartyPopper } from "lucide-react";

const rickRollUrl = "https://youtu.be/2AxEECOIGAE";

export function RickRollCard() {
  return (
    <Card className="shadow-2xl rounded-xl overflow-hidden border border-accent/60 hover:border-accent/80 bg-gradient-to-tr from-accent/5 via-card to-card group hover:shadow-3xl transition-all duration-300 hover:scale-[1.01]">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center">
          <PartyPopper className="h-8 w-8 sm:h-10 sm:w-10 mr-3 sm:mr-4 text-accent group-hover:animate-icon-pop" />
          <div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-primary group-hover:text-accent transition-colors">
              ¡Reclama una cerveza GRATIS!
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground pt-1">
              ¿Listo para algo que te alegrará el día? ¡Tenemos una cerveza gratis esperándote!
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2 sm:pt-3 pb-4 sm:pb-5 text-center">
        <Button 
          asChild 
          size="lg" 
          className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group/button w-full sm:w-auto"
        >
          <Link href={rickRollUrl} target="_blank" rel="noopener noreferrer">
            <Gift className="mr-2 h-5 w-5 group-hover/button:animate-icon-pop" />
            ¡Reclamar Mi Cerveza!
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
