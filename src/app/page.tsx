"use client";

import { useEffect, useState } from 'react';
import usePersistentState from '@/hooks/use-persistent-state';
import { AgeVerificationModal } from '@/components/age-verification-modal';
import { MainApplication } from '@/components/main-application';
import { Button } from '@/components/ui/button';
import { XCircle, ShieldAlert } from 'lucide-react';

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
      <div className="flex items-center justify-center min-h-screen bg-background">
        {/* Opcional: Añadir un spinner aquí */}
      </div>
    );
  }

  if (showNotOldEnough) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8 text-center">
        <ShieldAlert className="h-24 w-24 text-destructive mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-4">Acceso Denegado</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Debes ser mayor de 18 años para acceder a Moscow Tavern Finder.
        </p>
        <p className="text-sm text-muted-foreground">
          Si crees que esto es un error, por favor borra el almacenamiento local de tu navegador para este sitio e inténtalo de nuevo.
        </p>
      </div>
    );
  }

  if (isAgeVerified === true) {
    return <MainApplication />;
  }

  return (
    <>
      <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40" aria-hidden="true" />
      <AgeVerificationModal isOpen={true} onVerify={handleVerification} />
    </>
  );
}
