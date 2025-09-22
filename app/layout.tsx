import type React from 'react';
import { useEffect } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cristian Arias - Desarrollador FullStack',
  description:
    'Portfolio de Cristian Arias, desarrollador FullStack especializado en React, Vue.js, Flutter y tecnologías modernas. Más de 3 años de experiencia creando soluciones web y móviles.',
  keywords: [
    'Cristian Arias',
    'Desarrollador FullStack',
    'React',
    'Vue.js',
    'Flutter',
    'JavaScript',
    'TypeScript',
    'Portfolio'
  ],
  authors: [{ name: 'Cristian Arias' }],
  creator: 'Cristian Arias',
  publisher: 'Cristian Arias',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  icons: {
    icon: '/img/logo/logo.webp',
    shortcut: '/img/logo/logo.webp',
    apple: '/img/logo/logo.webp'
  },
  openGraph: {
    title: 'Cristian Arias - Desarrollador FullStack',
    description:
      'Portfolio de Cristian Arias, desarrollador FullStack especializado en React, Vue.js, Flutter y tecnologías modernas.',
    url: 'https://titoworld.dev',
    siteName: 'Cristian Arias Portfolio',
    images: [
      {
        url: '/img/logo/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Cristian Arias - Desarrollador FullStack'
      }
    ],
    locale: 'es_ES',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cristian Arias - Desarrollador FullStack',
    description:
      'Portfolio de Cristian Arias, desarrollador FullStack especializado en React, Vue.js, Flutter y tecnologías modernas.',
    images: ['/img/logo/logo.webp']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
    generator: 'v0.dev'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  useEffect(()=> {
    const meta = document.querySelector('meta[name="generator"]');
    if (meta) meta.remove();
  })

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
