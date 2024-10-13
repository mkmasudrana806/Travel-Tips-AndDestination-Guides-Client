import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/lib/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Travel Tips And Destination Guides",
  description:
    "Travel Tips And Destination Guides is a travel guide for traveller to get insights about any destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1200px] mx-auto px-4`}
          >
            <Navbar />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </Providers>
  );
}
