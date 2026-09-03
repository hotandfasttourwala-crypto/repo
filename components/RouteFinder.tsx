"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { RouteData } from "../data/routes";
import { MapPin, ArrowRight } from "lucide-react";

export default function RouteFinder({ routes }: { routes: RouteData[] }) {
  const router = useRouter();
  
  const origins = useMemo(() => {
    return Array.from(new Set(routes.map(r => r.from)));
  }, [routes]);
  
  const [from, setFrom] = useState(origins[0] || "Indore");

  const destinations = useMemo(() => {
    return routes.filter(r => r.from === from).map(r => r.to);
  }, [routes, from]);

  const [to, setTo] = useState(destinations[0] || "Ujjain");

  const handleFromChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFrom = e.target.value;
    setFrom(newFrom);
    const newDestinations = routes.filter(r => r.from === newFrom).map(r => r.to);
    if (newDestinations.length > 0) {
      setTo(newDestinations[0]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const route = routes.find((r) => r.from === from && r.to === to);
    if (route?.slug) {
      router.push(`/route/${route.slug}`);
    } else {
      alert("Route not found. Please try another combination.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto -mt-16 md:-mt-24 relative z-20 border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-black">
        Where Do You Want To Go?
      </h2>
      
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-end gap-4">
        <div className="w-full md:flex-1">
          <label className="block text-sm font-semibold text-gray-600 mb-2">From</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={from}
              onChange={handleFromChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-[#E10600] bg-gray-50 text-black font-medium appearance-none"
            >
              {origins.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full md:flex-1">
          <label className="block text-sm font-semibold text-gray-600 mb-2">To</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-[#E10600]" />
            </div>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E10600] focus:border-[#E10600] bg-gray-50 text-black font-medium appearance-none"
            >
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <button
            type="submit"
            className="w-full md:w-auto bg-[#E10600] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            View Route
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
      
      <div className="mt-6 flex justify-center gap-4 text-sm font-medium text-gray-500">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#E10600]"></span> One Way</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F5C400]"></span> Round Trip</span>
      </div>
    </div>
  );
}
