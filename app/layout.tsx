import type React from 'react';
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
  const removeGenerator = `
    (function () {
      function removeGeneratorMeta() {
        document.querySelectorAll('meta[name="generator"]').forEach(n => n.remove());
      }
      removeGeneratorMeta();

      // Hook a la cola interna que usa Next para stream/flight data
      var q = self.__next_f || (self.__next_f = []);
      var origPush = q.push;
      q.push = function() {
        try {
          for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];

            // La forma más común es [id, "10:[[ ... ]]"]
            if (Array.isArray(arg) && typeof arg[1] === 'string') {
              arguments[i][1] = arg[1]
                // Elimina ÚNICAMENTE bloques ["$","meta",...{"name":"generator",...}]
                .replace(/\[\\"\\$\\"\,\ \\"meta\\"\,[^]*?\{[^}]*\\"name\\"\:\\"generator\\"[^}]*\}\]/g, '');
            } else if (typeof arg === 'string') {
              arguments[i] = arg.replace(/\[\\"\\$\\"\,\ \\"meta\\"\,[^]*?\{[^}]*\\"name\\"\:\\"generator\\"[^}]*\}\]/g, '');
            }
          }
        } catch (e) {
          // En caso de fallo, no rompemos la app
        }
        var r = origPush.apply(this, arguments);
        try { removeGeneratorMeta(); } catch(e){}
        return r;
      };

      // Observa nuevas metas que puedan aparecer más tarde
      var obs = new MutationObserver(function(muts){
        for (const m of muts) {
          for (const node of m.addedNodes) {
            if (node && node.nodeType === 1) {
              if ((node as Element).matches?.('meta[name="generator"]')) {
                (node as Element).remove();
              } else {
                (node as Element).querySelectorAll?.('meta[name="generator"]').forEach(n => n.remove());
              }
            }
          }
        }
      });
      obs.observe(document.head || document.documentElement, { childList: true, subtree: true });

      // Pequeños barridos por seguridad
      setTimeout(removeGeneratorMeta, 0);
      setTimeout(removeGeneratorMeta, 50);
      setTimeout(removeGeneratorMeta, 150);
    })();
  `;

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: removeGenerator }} />
      </head>
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
