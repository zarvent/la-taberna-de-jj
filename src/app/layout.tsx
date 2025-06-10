import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import ClientLayoutEffects from '@/components/layout/client-layout-effects';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Initialize Playfair Display font
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display', // CSS variable for Playfair Display
  display: 'swap',
  weight: ['400', '700'] // Specify weights you intend to use
});

// Static metadata
export const metadata: Metadata = {
  title: 'La Taberna de JJ - Tu Guía de Bebidas',
  description: 'Encuentra tus bebidas favoritas y las tabernas cercanas. Creado por Los Discípulos de JJ.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export const viewport: Viewport = {
  // ...existing code...
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.variable,
          geistMono.variable,
          playfairDisplay.variable // Add Playfair Display variable to body
        )}
      >
        <ClientLayoutEffects />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
