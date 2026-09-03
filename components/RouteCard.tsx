import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { RouteData } from "../data/routes";
import { siteData } from "../data/site";

export default function RouteCard({ route }: { route: RouteData }) {
  const startingPrice = typeof route.oneWay.sedan === "number" ? route.oneWay.sedan : 0;
  const priceDisplay = startingPrice > 0 ? `₹${startingPrice.toLocaleString()}` : "Contact for fare";

  return (
    <div className="bg-white rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
      <div className="p-6 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-[#E10600]" size={20} />
            <h3 className="font-bold text-lg text-black">{route.from}</h3>
          </div>
          <ArrowRight className="text-gray-300 group-hover:text-[#F5C400] transition-colors" size={20} />
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-black">{route.to}</h3>
            <MapPin className="text-[#E10600]" size={20} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded">One Way</span>
          {route.returnAvailable && (
            <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded">Round Trip</span>
          )}
        </div>

        <div className="mt-auto">
          <p className="text-sm text-gray-500 font-medium">Starting from:</p>
          <p className="text-3xl font-extrabold text-[#E10600]">{priceDisplay}</p>
        </div>
      </div>

      <div className="flex border-t border-gray-100">
        <Link
          href={`/route/${route.slug}`}
          className="flex-1 py-4 text-center font-bold text-black hover:bg-gray-50 transition-colors"
        >
          View Details
        </Link>
        <a
          href={`https://wa.me/91${siteData.whatsapp}?text=Hi, I want to book a taxi from ${route.from} to ${route.to}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-4 text-center font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-colors"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
