import { RouteData } from "../data/routes";
import { CheckCircle2 } from "lucide-react";

export default function PricingTable({ route }: { route: RouteData }) {
  const renderPrice = (price: number | string | undefined) => {
    if (price === undefined) return "-";
    if (typeof price === "number") return `₹${price.toLocaleString()}`;
    return price;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-8">
      <div className="bg-black text-white p-6">
        <h3 className="text-2xl font-extrabold flex items-center gap-2">
          Taxi Fare: {route.from} to {route.to}
        </h3>
      </div>
      
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 md:p-6 font-bold text-gray-700 w-1/3">Vehicle</th>
              <th className="p-4 md:p-6 font-bold text-gray-700 w-1/3">One Way</th>
              <th className="p-4 md:p-6 font-bold text-gray-700 w-1/3 text-center">Round Trip <span className="block text-xs text-[#E10600] font-normal mt-1 bg-red-50 py-1 rounded inline-block px-2">All Inclusive</span></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="p-4 md:p-6 font-bold text-lg text-black">Sedan</td>
              <td className="p-4 md:p-6 font-extrabold text-[#E10600] text-xl">{renderPrice(route.oneWay.sedan)}</td>
              <td className="p-4 md:p-6 font-extrabold text-black text-xl text-center bg-gray-50/50">{renderPrice(route.roundTrip.sedan)}</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-4 md:p-6 font-bold text-lg text-black">SUV</td>
              <td className="p-4 md:p-6 font-extrabold text-[#E10600] text-xl">{renderPrice(route.oneWay.suv)}</td>
              <td className="p-4 md:p-6 font-extrabold text-black text-xl text-center bg-gray-50/50">
                {renderPrice(route.roundTrip.suv)}
              </td>
            </tr>
            {route.roundTrip.ac && (
              <tr className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 md:p-6 font-bold text-lg text-black">AC</td>
                <td className="p-4 md:p-6 font-extrabold text-[#E10600] text-xl">-</td>
                <td className="p-4 md:p-6 font-extrabold text-black text-xl text-center bg-gray-50/50">
                  {renderPrice(route.roundTrip.ac)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gray-50 p-4 border-t border-gray-200 flex items-center justify-center gap-6 text-sm text-gray-600 font-medium">
        <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> Experienced Drivers</span>
        <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> AC Available</span>
      </div>
    </div>
  );
}
