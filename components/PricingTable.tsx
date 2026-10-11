import { RouteData } from "../data/routes";
import { siteData } from "../data/site";

export default function PricingTable({ route }: { route?: RouteData }) {
  if (route) {
    const sedanOneWayNum = Number(route.oneWay?.sedan) || 0;
    const sedanRoundNum = Number(route.roundTrip?.sedan) || 0;

    const routePricing = [
      {
        vehicle: "Swift Dzire / Sedan",
        seating: "4+1",
        oneWay: route.oneWay?.sedan ? `₹${route.oneWay.sedan}` : "Contact for Fare",
        roundTrip: route.roundTrip?.sedan ? `₹${route.roundTrip.sedan}` : "Contact for Fare",
        amenities: "AC, Professional Driver, Luggage Space",
      },
      {
        vehicle: "Maruti Ertiga / SUV",
        seating: "6+1",
        oneWay: route.oneWay?.suv ? `₹${route.oneWay.suv}` : "Contact for Fare",
        roundTrip: route.roundTrip?.suv ? `₹${route.roundTrip.suv}` : "Contact for Fare",
        amenities: "Family SUV, Dual AC, Spacious",
      },
      {
        vehicle: "Innova Crysta",
        seating: "7+1",
        oneWay: sedanOneWayNum ? `₹${Math.round(sedanOneWayNum * 1.6)}` : "Contact for Fare",
        roundTrip: sedanRoundNum ? `₹${Math.round(sedanRoundNum * 1.6)}` : "Contact for Fare",
        amenities: "Luxury SUV, Captain Seats, Top Comfort",
      },
      {
        vehicle: "Tempo Traveller",
        seating: "12-26",
        oneWay: sedanOneWayNum ? `₹${Math.round(sedanOneWayNum * 2.2)}` : "Contact for Fare",
        roundTrip: sedanRoundNum ? `₹${Math.round(sedanRoundNum * 2.2)}` : "Contact for Fare",
        amenities: "Group Travel, Pushback Seats, High Audio",
      },
    ];

    return (
      <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-xl bg-white">
        <table className="w-full text-left">
          <thead className="bg-[#0F172A] text-white">
            <tr>
              <th className="px-6 py-5 font-bold uppercase tracking-widest text-xs">Vehicle</th>
              <th className="px-6 py-5 font-bold uppercase tracking-widest text-xs">Seating</th>
              <th className="px-6 py-5 font-bold uppercase tracking-widest text-xs">One Way Fare</th>
              <th className="px-6 py-5 font-bold uppercase tracking-widest text-xs">Round Trip</th>
              <th className="px-6 py-5 font-bold uppercase tracking-widest text-xs">Book</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {routePricing.map((item, index) => {
              const waUrl = `https://wa.me/91${siteData.whatsapp}?text=${encodeURIComponent(
                `Hello ${siteData.name}, I want to book ${item.vehicle} for ${route.from} to ${route.to}.`
              )}`;

              return (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5 font-bold text-[#0F172A]">{item.vehicle}</td>
                  <td className="px-6 py-5 text-slate-600">{item.seating}</td>
                  <td className="px-6 py-5 font-extrabold text-[#2563EB] text-lg">{item.oneWay}</td>
                  <td className="px-6 py-5 font-bold text-slate-800">{item.roundTrip}</td>
                  <td className="px-6 py-5">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-[#25D366] hover:bg-[#1ebc56] text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-sm"
                    >
                      Book Cab
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  const pricingData = [
    {
      vehicle: "Swift Dzire",
      seating: "4+1",
      rate: "₹11/km",
      amenities: "Fully AC, Verified Driver",
    },
    {
      vehicle: "Hyundai Aura",
      seating: "4+1",
      rate: "₹11/km",
      amenities: "Premium Sedan, Music System",
    },
    {
      vehicle: "Maruti Ertiga",
      seating: "6+1",
      rate: "₹14/km",
      amenities: "Family SUV, Multi-zone AC",
    },
    {
      vehicle: "Innova Crysta",
      seating: "7+1",
      rate: "₹18/km",
      amenities: "Luxury SUV, Captain Seats",
    },
    {
      vehicle: "Tempo Traveller",
      seating: "12-26",
      rate: "₹24/km",
      amenities: "Tourist Special, High-End Audio",
    },
    {
      vehicle: "Force Urbania",
      seating: "13-17",
      rate: "₹36/km",
      amenities: "Executive Coach, Premium Berths",
    },
  ];

  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">Local Pricing Overview</h2>
          <p className="text-slate-500 font-medium italic">
            Pricing applies for Local, Airport, and Corporate rides.
          </p>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-[#0F172A] text-white">
              <tr>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-xs">Vehicle Name</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-xs">Seating</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-xs">Base Rate</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-xs">Amenities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pricingData.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6 font-bold text-[#0F172A]">{item.vehicle}</td>
                  <td className="px-8 py-6 text-slate-600 font-medium">{item.seating}</td>
                  <td className="px-8 py-6 font-extrabold text-[#2563EB] text-lg">{item.rate}</td>
                  <td className="px-8 py-6 text-slate-500 text-sm font-medium">{item.amenities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
