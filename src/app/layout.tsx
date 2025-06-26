
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from '@/components/section/Navigation'
import Footer from "@/components/section/Footer";
import AuthProvider from "./AuthProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEA-Catering",
  description: "Healthy Meals, Anytime, Anywhere",
  viewport: {
    width: 'device-width',
    initialScale: 1,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      ><AuthProvider>
          <Navigation/>
          <main>
            {children}
          </main>
          <Footer/>
      </AuthProvider>
      </body>
    </html>
  );
}
