
import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'La Taberna de JJ - Tu Guía de Bebidas',
  description: 'Encuentra tus bebidas favoritas y las tabernas cercanas. Creado por Los Discípulos de JJ.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gradient-to-br from-background via-muted/10 to-background/30 min-h-screen flex flex-col`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
