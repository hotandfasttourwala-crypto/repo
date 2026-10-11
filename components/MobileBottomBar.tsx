"use client";
import { siteData } from "../data/site";

export default function MobileBottomBar() {
  const whatsappUrl = `https://wa.me/91${siteData.whatsapp}?text=${encodeURIComponent(
    `Hello ${siteData.name}, I need a taxi in Indore.`
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-800 flex shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
      <a
        href={`tel:${siteData.phones[0]}`}
        className="flex-1 flex flex-col items-center justify-center py-3 text-white font-bold text-xs bg-[#0F172A] hover:bg-slate-800 transition-colors border-r border-slate-800"
      >
        <span className="material-symbols-outlined text-xl mb-0.5 text-[#2563EB]">call</span>
        Call Now
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-3 text-slate-950 font-bold text-xs bg-[#25D366] hover:bg-[#1ebc56] transition-colors"
      >
        <svg className="w-5 h-5 fill-current mb-0.5" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.538-2.961-2.654-.087-.116-.708-.943-.708-1.798 0-.855.449-1.275.609-1.449.159-.174.347-.217.463-.217l.333.005c.106.005.246-.04.384.293.144.348.491 1.203.535 1.29.044.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.777 1.394.864.174.087.275.072.376-.044.101-.116.434-.506.549-.68.116-.174.231-.145.39-.087s1.013.477 1.186.564c.174.087.289.13.333.203.044.072.044.419-.1.824z" />
        </svg>
        WhatsApp
      </a>
    </div>
  );
}
