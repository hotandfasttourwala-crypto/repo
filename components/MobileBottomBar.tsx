"use client";
import { siteData } from "../data/site";
import { Phone, MessageCircle } from "lucide-react";

export default function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md border-t border-white/10 flex shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
      <a
        href="/contact"
        className="flex-1 flex flex-col items-center justify-center py-3 text-white font-bold text-sm bg-black hover:bg-gray-900 transition-colors border-r border-white/10"
      >
        <MessageCircle size={20} className="mb-1 text-[#F5C400]" />
        Contact
      </a>
      <a
        href={`https://wa.me/91${siteData.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-3 text-white font-bold text-sm bg-[#E10600] hover:bg-red-700 transition-colors"
      >
        <MessageCircle size={20} className="mb-1" />
        WhatsApp
      </a>
    </div>
  );
}
