
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
import { ShieldCheck, ShieldX } from "lucide-react"; // Changed XCircle to ShieldX

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerify: (verified: boolean) => void;
}

export function AgeVerificationModal({ isOpen, onVerify }: AgeVerificationModalProps) {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={() => { /* Controlado por el padre */ }}>
      <AlertDialogContent className="max-w-md shadow-2xl rounded-xl border-border/50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90 data-[state=open]:duration-500">
        <AlertDialogHeader className="pt-4">
          <div className="flex justify-center mb-5">
            <ShieldCheck className="h-20 w-20 text-primary drop-shadow-lg" />
          </div>
          <AlertDialogTitle className="text-3xl font-bold text-center text-foreground">
            Verificación de Edad
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground pt-2 text-base">
            ¡Bienvenido a La Taberna de JJ! Para continuar, por favor confirma que eres mayor de 18 años.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 pb-2">
          <Button
            variant="outline"
            size="lg"
            onClick={() => onVerify(false)}
            className="w-full text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive"
          >
            <ShieldX className="mr-2 h-5 w-5" />
            No, soy menor
          </Button>
          <Button
            size="lg"
            onClick={() => onVerify(true)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground focus-visible:ring-primary"
          >
            <ShieldCheck className="mr-2 h-5 w-5" />
            Sí, soy mayor de 18
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
