import { siteData } from "../data/site";

export default function WhyChooseUs() {
  const advantages = [
    { title: "24/7 Service", icon: "schedule" },
    { title: "Professional", icon: "badge" },
    { title: "Sanitized", icon: "sanitizer" },
    { title: "Family Safe", icon: "security" },
    { title: "Best Price", icon: "payments" },
    { title: "GPS Tracked", icon: "my_location" },
    { title: "Punctual", icon: "verified" },
    { title: "Elite Fleet", icon: "stars" },
    { title: "Dedicated Help", icon: "headset_mic" },
    { title: "Tourist Permit", icon: "directions_car" },
  ];

  return (
    <section className="py-24 bg-white" id="advantage">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A]">
            The Hot &amp; Fast Tour Wala Advantage
          </h2>
          <p className="text-slate-500 mt-4 text-lg">
            Indore's most trusted travel network with {siteData.experienceYears} years of excellence
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {advantages.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-4xl">{item.icon}</span>
              </div>
              <h4 className="font-bold text-[#0F172A] text-base group-hover:text-[#2563EB] transition-colors">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
