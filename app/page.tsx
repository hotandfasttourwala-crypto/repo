import Hero from "../components/Hero";
import RouteFinder from "../components/RouteFinder";
import PopularRoutes from "../components/PopularRoutes";
import WhyChooseUs from "../components/WhyChooseUs";
import Fleet from "../components/Fleet";
import RouteVisualization from "../components/RouteVisualization";
import FAQ from "../components/FAQ";
import ContactCTA from "../components/ContactCTA";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getFleetData } from "../data/fleet";
import { getAllRoutesData } from "../data/routes";

export default async function Home() {
  const cars = await getFleetData();
  const routes = await getAllRoutesData();

  return (
    <>
      <Hero />
      <RouteFinder routes={routes} />
      <PopularRoutes />
      <WhyChooseUs />
      <Fleet cars={cars} />
      <RouteVisualization />
      
      {/* Round Trip Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
              One Way or <span className="text-[#E10600]">Round Trip</span> — Your Choice
            </h2>
            <p className="text-gray-600 text-lg">
              We also provide reliable return journeys to Indore.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Ujjain", "Omkareshwar", "Bhopal", "Khandwa", 
              "Burhanpur", "Ratlam", "Mandsaur", "Neemuch"
            ].map(city => (
              <Link 
                key={city} 
                href={`/route/${city.toLowerCase()}-to-indore`}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#E10600] hover:shadow-md transition-all flex items-center justify-between group"
              >
                <span className="font-bold text-gray-800">{city} &rarr; Indore</span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-[#E10600]" />
              </Link>
            ))}
            <Link 
                href={`/route/ujjain-to-omkareshwar`}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#F5C400] hover:shadow-md transition-all flex items-center justify-between group"
              >
                <span className="font-bold text-gray-800">Ujjain &rarr; Omkareshwar</span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-[#F5C400]" />
            </Link>
          </div>
        </div>
      </section>

      <FAQ />
      <ContactCTA />
    </>
  );
}
