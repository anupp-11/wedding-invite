/**
 * Root Layout
 * Wedding invitation app layout with custom fonts
 */

import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

// Elegant serif font for headings
const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

// Clean sans-serif for body text
const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Raju & Devi - Wedding Invitation',
  description: 'You are cordially invited to celebrate the wedding of Raju & Devi on February 20, 2026. Two souls, one shared path, a lifetime ahead.',
  openGraph: {
    title: 'Raju & Devi - Wedding Invitation',
    description: 'Join us in celebrating our special day! ❤️🥂🍾',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
