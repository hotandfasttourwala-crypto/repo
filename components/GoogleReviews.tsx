import { siteData } from "../data/site";

export default function GoogleReviews() {
  const waUrl = `https://wa.me/91${siteData.whatsapp}?text=${encodeURIComponent(
    `Hello ${siteData.name}, I want to check reviews and book a taxi.`
  )}`;

  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden" id="reviews">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-3xl font-black tracking-tight text-white flex items-center gap-1.5">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </span>
        </div>
        <h2 className="text-4xl font-extrabold text-white mb-6">Customer Love on Google</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-[#F59E0B] material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span className="text-[#F59E0B] material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span className="text-[#F59E0B] material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span className="text-[#F59E0B] material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span className="text-[#F59E0B] material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
        </div>
        <p className="text-xl text-slate-300 font-medium mb-12">
          {siteData.reviewCount} Verified Reviews • {siteData.rating} Google Rating
        </p>
        <a
          className="inline-flex items-center gap-3 bg-white text-[#0F172A] px-10 py-4 rounded-2xl font-bold hover:bg-[#2563EB] hover:text-white transition-all shadow-xl active:scale-95"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Read All Reviews &amp; Book</span>
          <span className="material-symbols-outlined">open_in_new</span>
        </a>
      </div>
    </section>
  );
}
