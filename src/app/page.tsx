
"use client";

import { MainApplication } from '@/components/main-application';
import { AgeVerificationProvider } from '@/components/age-verification-provider';

export default function HomePage() {
  return (
    <AgeVerificationProvider>
      <MainApplication />
    </AgeVerificationProvider>
  );
}
