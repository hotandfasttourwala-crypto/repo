import { getAllRoutesData } from "../../data/routes";
import RouteCard from "../../components/RouteCard";
import ContactCTA from "../../components/ContactCTA";

export const metadata = {
  title: "All Taxi Routes | Hot and Fast Tour Wala",
  description: "View all one-way and round-trip taxi routes from Indore to major destinations in Madhya Pradesh.",
};

export default async function RoutesPage() {
  const routesData = await getAllRoutesData();
  const indoreRoutes = routesData.filter(r => r.from === "Indore");
  const otherRoutes = routesData.filter(r => r.from !== "Indore");

  return (
    <>
      <div className="bg-[#0A0A0A] pt-32 pb-16 text-center border-b border-white/10">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">All Routes</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore our available taxi routes across Madhya Pradesh.
        </p>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-2xl font-bold text-black mb-8 border-l-4 border-[#E10600] pl-4">
            Routes From Indore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {indoreRoutes.map(route => (
              <RouteCard key={route.slug} route={route} />
            ))}
          </div>

          <h2 className="text-2xl font-bold text-black mb-8 border-l-4 border-[#F5C400] pl-4">
            Return & Other Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherRoutes.map(route => (
              <RouteCard key={route.slug} route={route} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
