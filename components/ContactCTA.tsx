"use client";
import { siteData } from "../data/site";
import { Phone, MessageCircle } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="bg-black py-24 text-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Need a Taxi From <span className="text-[#E10600]">Indore</span>?
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Call or WhatsApp Hot and Fast Tour Wala for route availability and booking.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          {siteData.phones.map((phone, idx) => (
            <a
              key={idx}
              href={`tel:+91${phone}`}
              className="text-4xl md:text-5xl font-black text-[#F5C400] hover:text-white transition-colors"
            >
              {phone}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-bold py-5 px-8 rounded-xl text-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <MessageCircle size={24} />
            Contact Now
          </a>
          <a
            href={`https://wa.me/91${siteData.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-5 px-8 rounded-xl text-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
          >
            <MessageCircle size={24} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
