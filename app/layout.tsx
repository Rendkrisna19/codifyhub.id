import type { Metadata } from "next";
import FloatingWA from "@/components/ui/FloatingWA";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodifyHub - Jasa Pembuatan Website Profesional",
  description: "CodifyHub menyediakan jasa pembuatan website, web app, dan sistem digital premium untuk bisnis Anda.",
  icons: {
    icon: '/images/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased flex flex-col">
        {children}
        <FloatingWA />
      </body>
    </html>
  );
}
