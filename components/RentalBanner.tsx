import { siteData } from "../data/site";

export default function RentalBanner() {
  const waUrl = `https://wa.me/91${siteData.whatsapp}?text=${encodeURIComponent(
    `Hello ${siteData.name},\n\nI am interested in your Rental Package.\n\nPickup Location:\nDate:\nTime:\nVehicle Preference:\nApproximate Duration:\nExpected Running (KM):\n\nPlease share the complete quotation and availability.`
  )}`;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-[#0F172A] to-[#2563EB] rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 text-white max-w-xl">
            <span className="text-[#F59E0B] font-bold uppercase tracking-widest text-xs mb-4 block">
              Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Special Rental Packages - <span className="text-[#F59E0B]">Starting From ₹3000</span>
            </h2>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 text-sm font-medium">
                <span className="material-symbols-outlined text-[#F59E0B] text-lg">distance</span> 100 KM Included
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 text-sm font-medium">
                <span className="material-symbols-outlined text-[#F59E0B] text-lg">badge</span> Driver Included
              </div>
            </div>
            <p className="text-slate-300 text-lg">
              Perfect for Corporate events, Weddings, Family Trips &amp; Local Sightseeing.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <a
              className="bg-[#F59E0B] text-[#0F172A] px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-[#F59E0B]/20 inline-block text-center"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Rental
            </a>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 flex items-center justify-end pointer-events-none">
            <span className="material-symbols-outlined text-[300px]">car_rental</span>
          </div>
        </div>
      </div>
    </section>
  );
}
