import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { siteData } from "../data/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${siteData.name} | Taxi Service From Indore`,
  description: siteData.description,
};

import LayoutWrapper from "./LayoutWrapper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomBar from "../components/MobileBottomBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-gray-900 pb-16 md:pb-0`}>
        <LayoutWrapper
          header={<Navbar />}
          footer={<Footer />}
          mobileBar={<MobileBottomBar />}
        >
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
