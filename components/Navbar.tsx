"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { siteData } from "../data/site";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Routes", href: "/routes" },
    { name: "Our Cars", href: "/fleet" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-md py-3 shadow-lg" : "bg-black/80 py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col text-white font-bold tracking-tight">
            <span className="text-xl md:text-2xl text-[#E10600]">HOT AND FAST</span>
            <span className="text-sm md:text-base">TOUR WALA</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-[#E10600] transition-colors text-sm font-medium uppercase tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/contact"
              className="flex items-center gap-2 text-white font-bold bg-[#111] hover:bg-[#222] border border-white/10 px-4 py-2 rounded-lg transition-all"
            >
              <MessageCircle size={18} className="text-[#F5C400]" />
              Contact
            </a>
            <a
              href={`https://wa.me/91${siteData.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white font-bold bg-[#E10600] hover:bg-red-700 px-4 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(225,6,0,0.4)]"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-t border-white/10 shadow-xl">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-lg font-medium py-2 border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="/contact"
                className="flex items-center justify-center gap-2 w-full text-black font-bold bg-[#F5C400] py-3 rounded-lg"
              >
                <MessageCircle size={20} />
                Contact
              </a>
              <a
                href={`https://wa.me/91${siteData.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full text-white font-bold bg-[#E10600] py-3 rounded-lg"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
