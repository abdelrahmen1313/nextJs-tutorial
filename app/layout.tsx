"use client"
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { usePathname } from 'next/navigation';

import { ThemeProvider } from './contexts/ThemeProvider';



export default function RootLayout({children,}: { children: React.ReactNode;})

 {
  const path= usePathname().slice(1);
  return (
    <html lang="en">
      <head>
        <title>{`Acme Inc. | ${path}`}</title>
    
      </head>
      <body className={`${inter.className} antialiased transition-colors duration-200 
        bg-gray-50 text-gray-900 
        dark:bg-gray-900 dark:text-gray-50`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
      </html>
  );
}
