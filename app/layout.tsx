import type { Metadata } from "next";
import "./globals.css";
import { siteData } from "../data/site";
import LayoutWrapper from "./LayoutWrapper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomBar from "../components/MobileBottomBar";
import FloatingActions from "../components/FloatingActions";

export const metadata: Metadata = {
  title: `${siteData.name} | Premium Taxi Service in Indore | 24/7 Cab Service`,
  description: siteData.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8FAFC] text-[#1E293B] overflow-x-hidden">
        <LayoutWrapper
          header={<Navbar />}
          footer={<Footer />}
          mobileBar={<MobileBottomBar />}
        >
          {children}
        </LayoutWrapper>
        <FloatingActions />
      </body>
    </html>
  );
}
