"use client";

import { siteData } from "../data/site";

export default function ActionButtons({ routeStr }: { routeStr?: string }) {
  const whatsappMsg = routeStr 
    ? `Hi, I want to book a taxi from ${routeStr}` 
    : 'Hi, I want to book a taxi';

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
      <a
        href="/contact"
        className="w-full sm:w-auto bg-[#E10600] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg text-center"
      >
        Contact Now
      </a>
      <a
        href={`https://wa.me/91${siteData.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`}
        target="_blank"
        rel="noreferrer"
        className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg text-center"
      >
        WhatsApp Us
      </a>
    </div>
  );
}
