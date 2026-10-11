import { siteData } from "../data/site";

export default function Services() {
  const services = [
    {
      title: "Local Taxi",
      badge: "Point To Point",
      image: "/images/cars/dzire-malhar.jpeg",
      description: "Punctual point-to-point city cabs across Indore for all your daily travel, shopping, and commute needs.",
      features: ["24×7 Service", "Pro Driver", "Clean Car", "GPS Tracked"],
      whatsappText: `Hello ${siteData.name},\n\nI would like to book a Local Taxi.\n\nPickup Location:\nDrop Location:\nDate:\nTime:\nPassengers:\n\nPlease share the fare and availability.`,
    },
    {
      title: "Airport Transfer",
      badge: "Indore Airport",
      image: "/images/cars/force-urbania-hotel.jpeg",
      description: "Guaranteed 24/7 pickup and drop-off for Indore Airport with flight tracking and zero wait time.",
      features: ["24×7 Service", "Pro Driver", "Clean Car", "GPS Tracked"],
      whatsappText: `Hello ${siteData.name},\n\nI would like to book an Airport Transfer.\n\nPickup Address:\nFlight Number:\nDate:\nTime:\nPassengers:\n\nPlease confirm availability.`,
    },
    {
      title: "Corporate Travel",
      badge: "Executive Class",
      image: "/images/cars/ertiga-highway.jpeg",
      description: "Executive luxury cars and customized rental solutions for business meetings and corporate events.",
      features: ["24×7 Service", "Pro Driver", "Clean Car", "GPS Tracked"],
      whatsappText: `Hello ${siteData.name},\n\nI need a Corporate Taxi service.\n\nPickup Location:\nDestination:\nDate:\nTime:\nCompany Name:\n\nPlease share the quotation.`,
    },
    {
      title: "Rental Packages",
      badge: "Hourly & Daily",
      image: "/images/cars/wedding-dzire.jpeg",
      description: "Flexible hourly & daily rental packages with private chauffeurs for city tours, weddings, and family events.",
      features: ["24×7 Service", "Pro Driver", "Clean Car", "GPS Tracked"],
      whatsappText: `Hello ${siteData.name},\n\nI want to book a Rental Taxi.\n\nVehicle Preference:\nPickup Location:\nDate:\nDuration:\n\nPlease share the package details.`,
    },
    {
      title: "Outstation Taxi",
      badge: "Intercity Drive",
      image: "/images/cars/hot-and-fast-office-crysta.jpeg",
      description: "Safe, comfortable intercity trips with experienced highway drivers for round-trips or one-way drops.",
      features: ["24×7 Service", "Pro Driver", "Clean Car", "GPS Tracked"],
      whatsappText: `Hello ${siteData.name},\n\nI would like to book an Outstation Taxi.\n\nDestination:\nPickup Location:\nDate:\nPassengers:\n\nPlease share the best quotation.`,
    },
    {
      title: "All India Taxi",
      badge: "Pan India Permit",
      image: "/images/cars/tempo-traveller-mountains.jpeg",
      description: "Seamless nationwide travel covering major cities and tourist destinations with All India Tourist Permits.",
      features: ["24×7 Service", "Pro Driver", "Clean Car", "GPS Tracked"],
      whatsappText: `Hello ${siteData.name},\n\nI need a Taxi for travel across India.\n\nPickup City:\nDestination:\nTravel Date:\nPassengers:\n\nPlease share the fare and availability.`,
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-[#F8FAFC] border-y border-slate-200/60 relative" id="services">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16 hero-fade">
          <span className="text-[#2563EB] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block mb-3">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Elite Travel Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Reliable taxi solutions for local travel, airport transfers, corporate trips, rentals and outstation journeys across India.
          </p>
        </div>

        {/* Service Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => {
            const waUrl = `https://wa.me/91${siteData.whatsapp}?text=${encodeURIComponent(
              service.whatsappText
            )}`;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border-t-4 border-[#2563EB] border-x border-b border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="h-48 -mx-6 -mt-6 mb-6 overflow-hidden relative bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-bold text-white uppercase tracking-wider bg-[#0F172A]/80 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-2.5 group-hover:text-[#2563EB] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* Feature Row Badges */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-700 mb-6">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-500 font-bold">⚡</span> {service.features[0]}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-blue-500 font-bold">👨‍✈️</span> {service.features[1]}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-500 font-bold">✨</span> {service.features[2]}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-indigo-500 font-bold">📍</span> {service.features[3]}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    className="w-full h-12 bg-[#2563EB] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Book Service</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
