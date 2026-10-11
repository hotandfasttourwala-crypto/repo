"use client";
import { siteData } from "../data/site";

export default function Hero() {
  const whatsappUrl = `https://wa.me/91${siteData.whatsapp}?text=${encodeURIComponent(
    `Hello ${siteData.name}, I need an instant taxi quote.`
  )}`;

  return (
    <section className="relative isolate pt-16 md:pt-20 overflow-hidden" id="hero">
      {/* Background: night city road, blue graded, cinematic */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <img
          alt="Professional chauffeur with premium taxi at an airport"
          className="w-full h-full object-cover object-center"
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=2000&q=80"
          style={{ filter: "brightness(0.65) contrast(1.1)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(4,9,22,0.96) 0%, rgba(4,9,22,0.88) 36%, rgba(4,9,22,0.45) 70%, rgba(4,9,22,0.65) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 78% 45%, rgba(37,99,235,0.28), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(2,5,14,0.98))",
          }}
        />
      </div>

      {/* Vehicle layer */}
      <div className="hidden lg:flex absolute inset-0 z-[5] justify-center items-end md:items-end md:justify-end max-w-7xl mx-auto px-5 md:px-10 pointer-events-none">
        <div className="hero-fade hero-fade-2 w-full flex justify-end">
          <div className="hero-car-float w-[230px] sm:w-[300px] md:w-[440px] lg:w-[520px] opacity-[0.2] md:opacity-100 translate-y-2 md:translate-y-8 md:-mr-2 lg:mr-2">
            <svg fill="none" viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient cx="50%" cy="50%" id="carShadow" r="50%">
                  <stop offset="0%" stopColor="#000814" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#000814" stopOpacity="0" />
                </radialGradient>
                <radialGradient cx="50%" cy="50%" id="carGlow" r="50%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="bodyGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#f4f7fb" />
                  <stop offset="45%" stopColor="#dbe1e8" />
                  <stop offset="100%" stopColor="#aab3c0" />
                </linearGradient>
                <linearGradient id="glassGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#22345c" />
                  <stop offset="100%" stopColor="#0c1526" />
                </linearGradient>
                <linearGradient id="rimGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#eef1f5" />
                  <stop offset="100%" stopColor="#8b93a1" />
                </linearGradient>
              </defs>
              <ellipse cx="380" cy="300" fill="url(#carGlow)" rx="320" ry="55" />
              <ellipse cx="380" cy="308" fill="url(#carShadow)" rx="260" ry="30" />
              <rect fill="#12151c" height="10" rx="5" width="640" x="60" y="255" />
              <circle cx="185" cy="272" fill="#14161c" r="46" />
              <circle cx="185" cy="272" fill="url(#rimGrad)" r="26" />
              <circle cx="185" cy="272" fill="#2563EB" r="7" />
              <circle cx="575" cy="272" fill="#14161c" r="46" />
              <circle cx="575" cy="272" fill="url(#rimGrad)" r="26" />
              <circle cx="575" cy="272" fill="#2563EB" r="7" />
              <path
                d="M50 262 C48 232 62 214 92 208 L150 197 C182 138 246 100 322 96 L468 96 C536 96 588 118 622 164 L648 200 C690 205 712 218 712 240 C712 254 700 262 682 262 Z"
                fill="url(#bodyGrad)"
              />
              <path
                d="M175 200 C205 150 258 120 322 116 L462 116 C512 116 550 132 578 162 L596 198 Z"
                fill="url(#glassGrad)"
              />
              <path d="M330 118 L330 196" stroke="#3a4a6e" strokeWidth="4" />
              <path d="M456 118 L456 198" stroke="#3a4a6e" strokeWidth="4" />
              <path d="M186 128 L232 172" opacity="0.35" stroke="#dfe7ff" strokeWidth="10" />
              <rect fill="#c7ccd4" height="8" rx="4" width="230" x="322" y="90" />
              <rect fill="#0a1020" height="46" rx="10" width="16" x="60" y="212" />
              <rect fill="#eaf1ff" height="18" rx="7" width="46" x="66" y="222" />
              <rect fill="#f59e0b" height="10" rx="5" width="26" x="672" y="222" />
              <rect fill="#d7dbe2" height="30" rx="6" width="70" x="70" y="180" />
              <rect fill="#9aa3b2" height="10" rx="5" width="60" x="248" y="222" />
              <rect fill="#9aa3b2" height="10" rx="5" width="60" x="428" y="222" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 pt-10 pb-12 md:py-20 min-h-[calc(100svh-4rem)] md:min-h-[700px] flex items-center">
        <div className="w-full md:max-w-[760px] text-white">
          <div className="hero-fade inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-4 md:mb-6">
            <span className="text-[#F59E0B] text-sm leading-none">★</span>
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.14em] text-white/90">
              Trusted Taxi Service in Indore
            </span>
          </div>
          <h1 className="hero-fade hero-fade-1 font-extrabold leading-[1.05] tracking-tight text-[42px] sm:text-5xl md:text-6xl lg:text-7xl mb-5 md:mb-6">
            Book Taxi Service<br />
            <span className="text-[#2563EB]">in Indore</span>
          </h1>
          <p className="hero-fade hero-fade-2 text-white text-[15px] sm:text-base md:text-lg font-bold leading-relaxed mb-2 max-w-2xl">
            24×7 Local Taxi • Airport Transfers • Outstation Cabs • Hourly Rentals • Tempo Traveller • Corporate Travel
          </p>
          <p className="hero-fade hero-fade-2 text-slate-300 text-sm md:text-base font-medium leading-relaxed mb-8 md:mb-10 max-w-2xl">
            Professional Drivers • Transparent Pricing • Instant Booking • Available Across India
          </p>

          <div className="hero-fade hero-fade-3 flex flex-col sm:flex-row gap-4 mb-8 md:mb-10">
            <a
              className="hero-cta min-h-[60px] px-7 bg-[#25D366] text-[#0F172A] rounded-2xl font-extrabold text-base md:text-lg flex items-center justify-center gap-3 shadow-2xl shadow-black/40"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.538-2.961-2.654-.087-.116-.708-.943-.708-1.798 0-.855.449-1.275.609-1.449.159-.174.347-.217.463-.217l.333.005c.106.005.246-.04.384.293.144.348.491 1.203.535 1.29.044.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.777 1.394.864.174.087.275.072.376-.044.101-.116.434-.506.549-.68.116-.174.231-.145.39-.087s1.013.477 1.186.564c.174.087.289.13.333.203.044.072.044.419-.1.824z" />
              </svg>
              Get Instant Quote on WhatsApp
            </a>
            <a
              className="hero-cta min-h-[60px] px-8 bg-[#0F172A]/85 border border-white/20 rounded-2xl font-extrabold text-base md:text-lg flex items-center justify-center gap-3 shadow-2xl shadow-black/40 text-white"
              href={`tel:${siteData.phones[0]}`}
            >
              <span className="material-symbols-outlined text-[20px]">call</span> Call Now
            </a>
          </div>

          {/* Equal-size, responsive trust cards */}
          <div className="hero-fade hero-fade-4 grid w-full grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-[760px]">
            <div className="hero-trust-card h-[88px] sm:h-[92px] min-w-0 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-lg">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-base shrink-0">
                🟢
              </span>
              <div>
                <p className="text-white text-xs md:text-sm font-bold leading-tight">24×7 Service</p>
                <p className="text-slate-300 text-[10px] md:text-xs font-medium">Always Available</p>
              </div>
            </div>
            <div className="hero-trust-card h-[88px] sm:h-[92px] min-w-0 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-lg">
              <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-base shrink-0">
                ⭐
              </span>
              <div className="min-w-0">
                <p className="text-white text-xs md:text-sm font-bold leading-tight">Google Reviews</p>
                <p className="text-slate-300 text-[10px] md:text-xs font-medium">4.8 ★ Rated</p>
              </div>
            </div>
            <div className="hero-trust-card h-[88px] sm:h-[92px] min-w-0 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-lg">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-base shrink-0">
                🛡
              </span>
              <div className="min-w-0">
                <p className="text-white text-xs md:text-sm font-bold leading-tight">Professional Drivers</p>
                <p className="text-slate-300 text-[10px] md:text-xs font-medium">Professional &amp; Safe</p>
              </div>
            </div>
            <div className="hero-trust-card h-[88px] sm:h-[92px] min-w-0 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-lg">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-base shrink-0">
                🧾
              </span>
              <div className="min-w-0">
                <p className="text-white text-xs md:text-sm font-bold leading-tight">No Hidden Charges</p>
                <p className="text-slate-300 text-[10px] md:text-xs font-medium">Transparent Pricing</p>
              </div>
            </div>
          </div>

          <div className="hero-fade hero-fade-5 mt-8 md:mt-10 pt-6 border-t border-white/15 max-w-[760px] text-white">
            <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs sm:text-sm font-bold text-slate-200 mb-5">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#F59E0B] text-base">star</span> Google Reviews
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#2563EB] text-base">local_taxi</span> Thousands of Safe Trips
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-400 text-base">schedule</span> 24×7 Service
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-400 text-base">cleaning_services</span> Safe &amp; Clean Cars
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300 mb-2">Popular Routes</p>
            <div className="flex flex-wrap gap-2.5">
              <a href="#routes" className="rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 text-xs font-semibold transition-colors">Indore &rarr; Ujjain</a>
              <a href="#routes" className="rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 text-xs font-semibold transition-colors">Indore &rarr; Omkareshwar</a>
              <a href="#routes" className="rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 text-xs font-semibold transition-colors">Indore &rarr; Maheshwar</a>
              <a href="#routes" className="rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 text-xs font-semibold transition-colors">Indore &rarr; Mandu</a>
              <a href="#routes" className="rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 text-xs font-semibold transition-colors">Indore &rarr; Bhopal</a>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <a
        href="#about"
        className="hero-fade hero-fade-5 absolute bottom-5 right-6 hidden xl:flex flex-col items-center gap-0.5 text-slate-300 hover:text-white transition-colors cursor-pointer z-20 group"
      >
        <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase opacity-80 group-hover:opacity-100">
          Scroll to Explore
        </span>
        <span className="material-symbols-outlined text-2xl animate-bounce leading-none">expand_more</span>
      </a>
    </section>
  );
}
