
"use client";

import { useEffect, useState } from 'react';
import usePersistentState from '@/hooks/use-persistent-state';
import { AgeVerificationModal } from '@/components/age-verification-modal';
import { MainApplication } from '@/components/main-application';
import { Button } from '@/components/ui/button';
import { ShieldX, ShieldAlert, Loader2 } from 'lucide-react'; // Changed XCircle to ShieldX for thematic consistency

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/50 p-8 text-center">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
        <h1 className="text-2xl font-semibold text-foreground">Cargando La Taberna de JJ...</h1>
        <p className="text-muted-foreground">Un momento por favor.</p>
      </div>
    );
  }

  if (showNotOldEnough) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-destructive/10 via-background to-background p-8 text-center">
        <div className="bg-card p-8 rounded-xl shadow-2xl border border-destructive/30 max-w-md w-full">
          <ShieldAlert className="h-20 w-20 text-destructive mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-destructive mb-4">Acceso Denegado</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Debes ser mayor de 18 años para acceder a La Taberna de JJ.
          </p>
          <p className="text-sm text-muted-foreground/80">
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
      <div className="fixed inset-0 bg-background/70 backdrop-blur-md z-40 transition-opacity duration-300 ease-out" aria-hidden="true" />
      <AgeVerificationModal isOpen={true} onVerify={handleVerification} />
    </>
  );
}
