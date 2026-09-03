import { getPopularRoutes } from "../data/routes";
import RouteCard from "./RouteCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function PopularRoutes() {
  const popularRoutes = await getPopularRoutes();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
              Popular Taxi Routes From <span className="text-[#E10600]">Indore</span>
            </h2>
            <p className="text-gray-600 max-w-2xl text-lg">
              Book a comfortable ride to top destinations across Madhya Pradesh.
            </p>
          </div>
          <Link
            href="/routes"
            className="hidden md:flex items-center gap-2 font-bold text-black hover:text-[#E10600] transition-colors group pb-2 border-b-2 border-transparent hover:border-[#E10600]"
          >
            View All Routes
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route) => (
            <RouteCard key={route.slug} route={route} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/routes"
            className="inline-flex items-center gap-2 font-bold text-black hover:text-[#E10600] transition-colors group py-3 px-6 rounded-lg border-2 border-gray-200"
          >
            View All Routes
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
