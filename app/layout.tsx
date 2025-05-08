"use client"
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { usePathname } from 'next/navigation';


export default function RootLayout({children,}: { children: React.ReactNode;})

 {
  const path= usePathname().slice(1);
  return (
    <html lang="en">
      <head>
        <title>{`Acme Inc. | ${path}`}</title>
    
      </head>
      <body className={`${inter.className} antialiased `}>{children}</body>
      </html>
  );
}
