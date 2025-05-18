
"use client";

import { useEffect, useState } from 'react';
import usePersistentState from '@/hooks/use-persistent-state';
import { AgeVerificationModal } from '@/components/age-verification-modal';
import { MainApplication } from '@/components/main-application';
import { Button } from '@/components/ui/button';
import { ShieldX, ShieldAlert, Loader2, GlassWater } from 'lucide-react';

export default function HomePage() {
  const [isAgeVerified, setIsAgeVerified] = usePersistentState<boolean | null>('isAgeVerified', null);
  const [showNotOldEnough, setShowNotOldEnough] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVerification = (verified: boolean) => {
    setIsAgeVerified(verified);
    if (!verified) {
      setShowNotOldEnough(true);
    } else {
      setShowNotOldEnough(false);
    }
  };

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-muted/20 p-8 text-center">
        <GlassWater className="h-24 w-24 sm:h-32 sm:w-32 text-primary animate-pulse-alt mb-8 drop-shadow-lg" />
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3 tracking-tight">La Taberna de JJ</h1>
        <p className="text-lg sm:text-xl text-muted-foreground">Un momento, estamos preparando tu experiencia en La Taberna de JJ...</p>
      </div>
    );
  }

  if (showNotOldEnough) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-destructive/10 via-background to-background p-8 text-center">
        <div className="bg-card p-8 sm:p-10 rounded-xl shadow-2xl border border-destructive/30 max-w-md w-full transform transition-all hover:scale-105 duration-300">
          <ShieldAlert className="h-20 w-20 sm:h-24 sm:w-24 text-destructive mx-auto mb-6 animate-icon-pop" />
          <h1 className="text-2xl sm:text-3xl font-bold text-destructive mb-4">Acceso Denegado</h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            ¡Uy! Para entrar a La Taberna de JJ, necesitas ser mayor de edad. Es por tu seguridad y para cumplir con las normas.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            ¡Esperamos verte cuando tengas la edad permitida!
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground/80">
            Si crees que esto es un error, por favor borra el almacenamiento local de tu navegador para este sitio e inténtalo de nuevo.
          </p>
        </div>
      </div>
    );
  }

  if (isAgeVerified === true) {
    return <MainApplication />;
  }

  // Age verification modal is triggered
  return (
    <>
      {/* Subtle background for the modal backdrop */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-lg z-40 transition-opacity duration-500 ease-out animate-fade-in-up" aria-hidden="true" />
      <AgeVerificationModal isOpen={true} onVerify={handleVerification} />
    </>
  );
}

