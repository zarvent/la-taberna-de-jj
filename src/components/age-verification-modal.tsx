"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, XCircle } from "lucide-react";

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerify: (verified: boolean) => void;
}

export function AgeVerificationModal({ isOpen, onVerify }: AgeVerificationModalProps) {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={() => { /* Controlado por el padre */ }}>
      <AlertDialogContent className="max-w-md shadow-xl rounded-lg border">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <ShieldCheck className="h-16 w-16 text-primary" />
          </div>
          <AlertDialogTitle className="text-2xl font-bold text-center text-foreground">
            Verificación de Edad
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground pt-2">
            ¡Bienvenido a Moscow Tavern Finder! Para continuar, por favor confirma que eres mayor de 18 años.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onVerify(false)}
            className="w-full text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <XCircle className="mr-2 h-5 w-5" />
            No, no soy mayor de 18
          </Button>
          <Button
            onClick={() => onVerify(true)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <ShieldCheck className="mr-2 h-5 w-5" />
            Sí, soy mayor de 18
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
