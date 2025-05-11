import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';


import { Metadata } from 'next';
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};



export default function RootLayout({children,}: { children: React.ReactNode;})

 {
  return (
    <html lang="en">
      <head>
    
      </head>
      <body className={`${inter.className} antialiased transition-colors duration-200 
        bg-gray-50 text-gray-900 
        dark:bg-gray-900 dark:text-gray-50`}>
          {children}
      </body>
      </html>
  );
}
