"use client";
import { siteData } from "../data/site";

export default function ContactCTA() {
  const waUrl = `https://wa.me/91${siteData.whatsapp}?text=${encodeURIComponent(
    `Hello ${siteData.name}, I need a taxi from Indore.`
  )}`;

  return (
    <section className="bg-[#0F172A] py-24 text-center text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <span className="text-[#F59E0B] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm bg-white/10 px-4 py-1.5 rounded-full border border-white/15 inline-block mb-4">
          24×7 Available
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Need a Taxi From <span className="text-[#2563EB]">Indore</span>?
        </h2>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Call or WhatsApp {siteData.name} for instant booking, transparent fares, and reliable drivers.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          {siteData.phones.map((phone, idx) => (
            <a
              key={idx}
              href={`tel:${phone}`}
              className="text-3xl md:text-4xl font-extrabold text-white hover:text-[#2563EB] transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[#F59E0B] text-3xl">call</span>
              {phone}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[58px] px-8 bg-[#25D366] text-slate-950 font-extrabold rounded-2xl text-lg flex items-center justify-center gap-3 shadow-2xl shadow-green-500/30 hover:bg-[#1ebc56] transition-all active:scale-95"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.538-2.961-2.654-.087-.116-.708-.943-.708-1.798 0-.855.449-1.275.609-1.449.159-.174.347-.217.463-.217l.333.005c.106.005.246-.04.384.293.144.348.491 1.203.535 1.29.044.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.777 1.394.864.174.087.275.072.376-.044.101-.116.434-.506.549-.68.116-.174.231-.145.39-.087s1.013.477 1.186.564c.174.087.289.13.333.203.044.072.044.419-.1.824z" />
            </svg>
            Instant WhatsApp Quote
          </a>
          <a
            href={`tel:${siteData.phones[0]}`}
            className="w-full sm:w-auto min-h-[58px] px-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold rounded-2xl text-lg flex items-center justify-center gap-3 backdrop-blur-md transition-all"
          >
            <span className="material-symbols-outlined text-2xl">call</span>
            Call Directly
          </a>
        </div>
      </div>
    </section>
  );
}
