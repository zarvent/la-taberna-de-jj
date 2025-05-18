"use client";

import { useEffect, useState } from 'react';
import usePersistentState from '@/hooks/use-persistent-state';
import { AgeVerificationModal } from '@/components/age-verification-modal';
import { MainApplication } from '@/components/main-application';
import { Button } from '@/components/ui/button'; // For the "You are not old enough" screen
import { XCircle } from 'lucide-react'; // For the "You are not old enough" screen

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
    // Render nothing or a loading spinner on the server/first client render to avoid hydration mismatch
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        {/* Optional: Add a spinner here */}
      </div>
    );
  }

  if (showNotOldEnough) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8 text-center">
        <XCircle className="h-24 w-24 text-destructive mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-4">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-8">
          You must be 18 years or older to access Moscow Tavern Finder.
        </p>
        <p className="text-sm text-muted-foreground">
          If you believe this is an error, please clear your browser's local storage for this site and try again.
        </p>
      </div>
    );
  }

  if (isAgeVerified === true) {
    return <MainApplication />;
  }

  // isAgeVerified is null or false, and not showing "not old enough" screen yet
  return (
    <>
      {/* Render a minimal background or placeholder while modal might be preparing */}
      <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40" aria-hidden="true" />
      <AgeVerificationModal isOpen={true} onVerify={handleVerification} />
    </>
  );
}
