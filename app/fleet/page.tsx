import Fleet from "../../components/Fleet";
import ContactCTA from "../../components/ContactCTA";
import { getFleetData } from "../../data/fleet";

export const metadata = {
  title: "Our Fleet - Cars Available | Hot and Fast Tour Wala",
  description: "Explore our fleet of comfortable and well-maintained Sedans and SUVs available for taxi service in Indore.",
};

export default async function FleetPage() {
  const cars = await getFleetData();

  return (
    <main>
      <div className="bg-[#0A0A0A] pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Our <span className="text-[#F5C400]">Fleet</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the perfect vehicle for your journey. We offer well-maintained Sedans and SUVs for all your travel needs.
          </p>
        </div>
      </div>
      
      <Fleet cars={cars} />
      
      <ContactCTA />
    </main>
  );
}
