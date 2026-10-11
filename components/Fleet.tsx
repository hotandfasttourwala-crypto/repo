import { siteData } from "../data/site";
import { FleetCar } from "../data/fleet";

export default function Fleet({ cars }: { cars?: FleetCar[] }) {
  const defaultCars = [
    {
      name: "Swift Dzire",
      badgeText: "Best for City Travel",
      badgeColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      rate: "₹11/km",
      icon: "✨",
      seats: "4+1 Seater",
      image: "/images/cars/dzire-malhar.jpeg",
      isHighlighted: false,
    },
    {
      name: "Hyundai Aura",
      badgeText: "Budget Friendly",
      badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      rate: "₹11/km",
      icon: "💡",
      seats: "4+1 Seater",
      image: "/images/cars/wedding-dzire.jpeg",
      isHighlighted: false,
    },
    {
      name: "Maruti Ertiga",
      badgeText: "Perfect for Families",
      badgeColor: "bg-purple-500/10 border-purple-500/20 text-purple-300",
      rate: "₹14/km",
      icon: "👨‍👩‍👧‍👦",
      seats: "6+1 Seater",
      image: "/images/cars/ertiga-highway.jpeg",
      isHighlighted: false,
    },
    {
      name: "Innova Crysta",
      badgeText: "Most Booked Premium SUV",
      badgeColor: "bg-amber-500/15 border-amber-500/30 text-amber-400",
      rate: "₹18/km",
      icon: "👑",
      seats: "7+1 Seater",
      image: "/images/cars/innova-crysta-hotel.jpeg",
      isHighlighted: true,
    },
    {
      name: "Tempo Traveller",
      badgeText: "Ideal for Group Travel",
      badgeColor: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
      rate: "₹24/km",
      icon: "🚌",
      seats: "12-26 Seater",
      image: "/images/cars/tempo-traveller-mountains.jpeg",
      isHighlighted: false,
    },
    {
      name: "Force Urbania",
      badgeText: "Luxury Group Travel",
      badgeColor: "bg-amber-500/10 border-amber-500/20 text-amber-300",
      rate: "₹36/km",
      icon: "✨",
      seats: "13-17 Seater",
      image: "/images/cars/force-urbania-hotel.jpeg",
      isHighlighted: false,
    },
  ];

  return (
    <section className="py-24 bg-[#0F172A] text-white" id="fleet">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#F59E0B] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            Our Luxury Fleet
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Choose Your Comfort</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultCars.map((car, index) => {
            const waUrl = `https://wa.me/91${siteData.whatsapp}?text=${encodeURIComponent(
              `Hello ${siteData.name},\n\nI would like to book the ${car.name}.\n\nPickup Location:\nDrop Location:\nDate:\nTime:\nPassengers:\n\nPlease share the fare and availability.`
            )}`;

            if (car.isHighlighted) {
              return (
                <div
                  key={index}
                  className="bg-slate-900 rounded-[2rem] overflow-hidden border-2 border-[#F59E0B]/80 shadow-xl shadow-amber-500/10 hover:border-[#F59E0B] transition-all group flex flex-col justify-between relative"
                >
                  <div className="h-56 relative overflow-hidden bg-slate-950">
                    <img
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      src={car.image}
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#F59E0B] to-amber-600 text-slate-950 px-3 py-1 rounded-full text-xs font-extrabold tracking-wide flex items-center gap-1 shadow-md">
                      <span>⭐</span> Most Booked
                    </div>
                    <div className="absolute top-4 right-4 bg-[#2563EB] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                      {car.rate}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-white">{car.name}</h3>
                      </div>
                      <div className={`inline-flex items-center gap-1.5 border px-3 py-1 rounded-full mb-4 text-xs font-bold ${car.badgeColor}`}>
                        <span>{car.icon}</span> {car.badgeText}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#F59E0B] text-lg">ac_unit</span> Fully AC
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#F59E0B] text-lg">verified_user</span> Professional Driver
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#F59E0B] text-lg">cleaning_services</span> Clean Vehicle
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#F59E0B] text-lg">groups</span> {car.seats}
                        </div>
                      </div>
                    </div>
                    <a
                      className="w-full bg-gradient-to-r from-[#F59E0B] to-amber-500 text-slate-950 py-4 rounded-xl font-black hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all group flex flex-col justify-between"
              >
                <div className="h-56 relative overflow-hidden bg-slate-950">
                  <img
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={car.image}
                  />
                  <div className="absolute top-4 right-4 bg-[#2563EB] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                    {car.rate}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold">{car.name}</h3>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 border px-3 py-1 rounded-full mb-4 text-xs font-semibold ${car.badgeColor}`}>
                      <span>{car.icon}</span> {car.badgeText}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#F59E0B] text-lg">ac_unit</span> Fully AC
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#F59E0B] text-lg">verified_user</span> Professional Driver
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#F59E0B] text-lg">cleaning_services</span> Clean Vehicle
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#F59E0B] text-lg">groups</span> {car.seats}
                      </div>
                    </div>
                  </div>
                  <a
                    className="w-full bg-white text-[#0F172A] py-4 rounded-xl font-bold hover:bg-[#2563EB] hover:text-white transition-all flex items-center justify-center gap-2"
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Now
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
