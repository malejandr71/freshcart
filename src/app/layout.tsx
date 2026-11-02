import type { Metadata } from "next";
import { Exo, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/Providers";
import Footer from "./_components/Footer/Footer";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart E-commerce App",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${exo.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-800">

        <Providers>
          <Toaster />
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

        </Providers>
      </body>
    </html>
  );
}
