"use client";

import { useState } from "react";
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
import { ShieldCheck, Loader2 } from "lucide-react";

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerify: (verified: boolean) => void;
}

export function AgeVerificationModal({ isOpen, onVerify }: AgeVerificationModalProps) {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate API call with enhanced feedback
    await new Promise(resolve => setTimeout(resolve, 1200));
    onVerify(true);
    setIsVerifying(false);
  };

  const handleCancel = () => {
    onVerify(false);
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={() => { /* Controlado por el padre */ }}>
      <AlertDialogContent 
        className="bg-card border-2 border-accent/50 shadow-xl shadow-accent/20 rounded-lg animate-fade-in-up opacity-0"
        style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
      >
        <AlertDialogHeader className="text-center">
          <div className="mx-auto mb-4">
            {/* Enhanced thematic icon with golden glow effect */}
            <ShieldCheck 
              className="h-16 w-16 text-accent animate-icon-pop mx-auto" 
              style={{
                animationDelay: '0.3s',
                filter: 'drop-shadow(0 0 8px hsl(var(--accent) / 0.5))'
              }} 
            />
          </div>
          <AlertDialogTitle className="font-serif text-2xl text-primary">
            Verificación de Edad Requerida
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-base pt-2">
            Debes ser mayor de 18 años para ingresar a La Taberna de JJ.
            Por favor, confirma tu edad para continuar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 gap-3 sm:gap-4">
          <AlertDialogCancel 
            onClick={handleCancel}
            className="w-full sm:w-auto border-muted-foreground/50 hover:bg-muted/80 transition-colors duration-300"
            disabled={isVerifying}
          >
            Salir
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-out focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            style={{
              boxShadow: isVerifying ? '0 0 15px hsl(var(--accent))' : undefined,
              background: isVerifying ? 'hsl(var(--accent))' : undefined
            }}
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                Verificando...
              </>
            ) : (
              'Sí, soy mayor de 18'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

