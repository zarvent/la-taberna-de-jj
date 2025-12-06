
"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldX } from "lucide-react";

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerify: (verified: boolean) => void;
}

export function AgeVerificationModal({ isOpen, onVerify }: AgeVerificationModalProps) {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={() => { /* Controlado por el padre */ }}>
      <AlertDialogContent className="max-w-md shadow-2xl rounded-xl border-border/50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-500">
        <AlertDialogHeader className="pt-4">
          <div className="flex justify-center mb-5">
            <ShieldCheck className="h-20 w-20 sm:h-24 sm:w-24 text-primary drop-shadow-lg animate-icon-pop [animation-delay:200ms]" />
          </div>
          <AlertDialogTitle className="text-2xl sm:text-3xl font-bold text-center text-foreground">
            Verificación de Edad
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground pt-2 text-base sm:text-lg">
            ¡Bienvenido/a a La Taberna de JJ! Antes de empezar la diversión, ¿nos confirmas que eres mayor de 18 años? ¡Salud!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 pb-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => onVerify(false)}
            className="w-full text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ShieldX className="mr-2 h-5 w-5" />
            No, soy menor
          </Button>
          <Button
            size="lg"
            onClick={() => onVerify(true)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground focus-visible:ring-primary transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ShieldCheck className="mr-2 h-5 w-5" />
            Sí, soy mayor de 18
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

