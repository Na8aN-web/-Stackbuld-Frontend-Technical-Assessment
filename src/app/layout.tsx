import "../styles/globals.css";
import { ReactNode } from "react";
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>E-commerce Platform</title>
        <meta name="description" content="A simple e-commerce platform" />
      </head>
      <body className={poppins.className}>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
