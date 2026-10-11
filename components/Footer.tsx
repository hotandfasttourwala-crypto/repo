import Link from "next/link";
import { siteData } from "../data/site";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white pt-24 pb-12 rounded-t-[4rem] md:rounded-t-[5rem]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link className="inline-block mb-8" href="/">
              <span className="font-extrabold text-2xl tracking-tighter">
                Hot <span className="text-[#2563EB]">&amp;</span> Fast Tour
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-8">
              Trusted by 50,000+ happy travelers. Providing top-tier taxi services across Central India with safety, comfort, and reliability.
            </p>
            <div className="flex gap-4">
              <a
                className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-[#2563EB] transition-all"
                href={`https://wa.me/91${siteData.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a
                className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-[#2563EB] transition-all"
                href={`tel:${siteData.phones[0]}`}
              >
                <span className="material-symbols-outlined text-xl">call</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-8">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li>
                <a className="hover:text-white transition-colors" href="#services">
                  Our Services
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#fleet">
                  Luxury Fleet
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#routes">
                  Outstations
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#about">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-8">Our Services</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li>Airport Transfers</li>
              <li>Corporate Rentals</li>
              <li>City Sightseeing</li>
              <li>Wedding Car Rentals</li>
              <li>Outstation Cabs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-8">Business Info</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#2563EB]">location_on</span>
                <span>{siteData.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#2563EB]">call</span>
                <a href={`tel:${siteData.phones[0]}`} className="hover:text-white transition-colors">
                  +91 {siteData.phones[0]}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#2563EB]">phone_iphone</span>
                <a href={`tel:${siteData.phones[1]}`} className="hover:text-white transition-colors">
                  +91 {siteData.phones[1]}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#2563EB]">history_toggle_off</span>
                <span>Mon - Sun: 24 Hours</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <p>© {siteData.year} {siteData.name}. All rights reserved. Indore's Best Taxi Service.</p>
          <div className="flex gap-8">
            <Link className="hover:text-white transition-colors" href="/about">
              About
            </Link>
            <Link className="hover:text-white transition-colors" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
