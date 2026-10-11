import { siteData } from "../data/site";

export default function About() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-[#2563EB] font-bold tracking-[0.2em] uppercase text-sm">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight">
              Why Thousands of Travelers Choose {siteData.name}
            </h2>
            <div className="text-slate-600 space-y-6 leading-relaxed text-lg">
              <p>
                {siteData.name} is Indore's leading taxi service provider, dedicated to offering safe, reliable, and premium travel experiences. With years of expertise in Central India, we have built a reputation for punctuality and professional hospitality.
              </p>
              <p>
                Whether you need a quick local ride, a timely airport drop, or a comfortable long-distance journey across India, our fleet and experienced chauffeurs are ready to serve you 24/7. We pride ourselves on maintaining a pristine fleet ranging from economy sedans to luxury SUVs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center material-symbols-outlined">
                  verified
                </span>
                <span className="font-bold text-slate-800">GST Registered</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center material-symbols-outlined">
                  shield_person
                </span>
                <span className="font-bold text-slate-800">Safe for Families</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[420px] bg-slate-100 relative">
              <img
                alt={`${siteData.name} Fleet and Chauffeur`}
                className="w-full h-full object-cover"
                src="/images/cars/hot-and-fast-office-crysta.jpeg"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-[#0F172A] p-10 rounded-3xl text-white shadow-2xl hidden lg:block border border-slate-700">
              <div className="text-4xl font-extrabold text-[#F59E0B]">{siteData.experienceYears}</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-widest mt-2">
                Years Excellence
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
