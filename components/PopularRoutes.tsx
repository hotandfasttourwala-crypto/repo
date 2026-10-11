import { siteData } from "../data/site";
import Link from "next/link";

export default function PopularRoutes() {
  const routes = [
    {
      title: "Indore → Ujjain",
      subtitle: "Daily Pilgrimage Service",
      slug: "indore-to-ujjain",
      image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Indore → Omkareshwar",
      subtitle: "Sacred Narmada Journey",
      slug: "indore-to-omkareshwar",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Indore → Maheshwar",
      subtitle: "Historical Ghats Tour",
      slug: "indore-to-maheshwar",
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Indore → Mandav",
      subtitle: "Romance of the Monuments",
      slug: "indore-to-mandav",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Indore → Bhopal",
      subtitle: "Capital Express Journey",
      slug: "indore-to-bhopal",
      image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Indore → Delhi",
      subtitle: "Interstate Luxury Drive",
      slug: "indore-to-delhi",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-24 bg-slate-50" id="routes">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[#2563EB] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              Popular Outstation Routes
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A]">
              Explore Beyond Indore
            </h2>
          </div>
          <p className="text-slate-500 max-w-md italic border-l-4 border-[#2563EB] pl-6 font-medium">
            Our intercity chauffeurs are experts in long-distance travel. Taxi Services Available Across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => {
            const waUrl = `https://wa.me/91${siteData.whatsapp}?text=${encodeURIComponent(
              `Hello ${siteData.name}, I am interested in booking a taxi for the ${route.title} trip. Please share the details and fare.`
            )}`;

            return (
              <div
                key={index}
                className="group relative h-96 rounded-[2.5rem] overflow-hidden premium-shadow cursor-pointer bg-slate-900"
              >
                <img
                  alt={route.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={route.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                  <h3 className="text-2xl font-bold mb-2 text-white">{route.title}</h3>
                  <p className="text-sm text-slate-300 font-medium mb-4">{route.subtitle}</p>
                  <div className="flex items-center gap-3">
                    <a
                      className="inline-flex cursor-pointer bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-md active:scale-95"
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Trip
                    </a>
                    <Link
                      href={`/route/${route.slug}`}
                      className="inline-flex cursor-pointer bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm transition-all"
                    >
                      Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
