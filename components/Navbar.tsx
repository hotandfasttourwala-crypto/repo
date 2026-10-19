"use client";
import { useState } from "react";
import Link from "next/link";
import { siteData } from "../data/site";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-[#0F172A]">
            Hot <span className="text-[#2563EB]">&amp;</span> Fast Tour Wala
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a
            className="nav-link font-medium text-sm text-slate-600 hover:text-[#2563EB]"
            href="#services"
          >
            Services
          </a>
          <a
            className="nav-link font-medium text-sm text-slate-600 hover:text-[#2563EB]"
            href="#fleet"
          >
            Fleet
          </a>
          <a
            className="nav-link font-medium text-sm text-slate-600 hover:text-[#2563EB]"
            href="#routes"
          >
            Routes
          </a>
          <a
            className="nav-link font-medium text-sm text-slate-600 hover:text-[#2563EB]"
            href="#about"
          >
            About
          </a>
          <a
            className="bg-[#0F172A] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#1E293B] transition-all flex items-center gap-2 shadow-sm"
            href={`tel:${siteData.phones[0]}`}
          >
            <span className="material-symbols-outlined text-[18px]">call</span> {siteData.phones[0]}
          </a>
        </div>
        <button
          id="mobileMenuBtn"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
          className="md:hidden material-symbols-outlined text-slate-900 text-3xl focus:outline-none p-2 cursor-pointer select-none"
        >
          {mobileMenuOpen ? "close" : "menu"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          id="mobileMenu"
          className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-5 shadow-2xl transition-all"
        >
          <div className="flex flex-col gap-3">
            <a
              className="font-bold text-base text-slate-800 hover:text-[#2563EB] py-3 border-b border-slate-100 flex items-center justify-between"
              href="#services"
              onClick={closeMobileMenu}
            >
              <span>Services</span>
              <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
            </a>
            <a
              className="font-bold text-base text-slate-800 hover:text-[#2563EB] py-3 border-b border-slate-100 flex items-center justify-between"
              href="#fleet"
              onClick={closeMobileMenu}
            >
              <span>Luxury Fleet</span>
              <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
            </a>
            <a
              className="font-bold text-base text-slate-800 hover:text-[#2563EB] py-3 border-b border-slate-100 flex items-center justify-between"
              href="#routes"
              onClick={closeMobileMenu}
            >
              <span>Outstation Routes</span>
              <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
            </a>
            <a
              className="font-bold text-base text-slate-800 hover:text-[#2563EB] py-3 border-b border-slate-100 flex items-center justify-between"
              href="#about"
              onClick={closeMobileMenu}
            >
              <span>About Us</span>
              <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
            </a>
            <a
              className="bg-[#0F172A] text-white px-5 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-2 shadow-lg"
              href={`tel:${siteData.phones[0]}`}
              onClick={closeMobileMenu}
            >
              <span className="material-symbols-outlined text-[18px]">call</span> Call {siteData.phones[0]}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
