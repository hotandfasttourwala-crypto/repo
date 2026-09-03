import Link from "next/link";
import { siteData } from "../data/site";
import { getPopularRoutes } from "../data/routes";

export default async function Footer() {
  const routes = await getPopularRoutes();
  const popularRoutes = routes.slice(0, 8); // Take top 8

  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-24 md:pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-black mb-6 tracking-tight">
              <span className="text-[#E10600]">HOT AND FAST</span><br />
              TOUR WALA
            </h3>
            <p className="text-gray-400 mb-6">
              Taxi & Tour Service From Indore. Clean cars, experienced drivers, and reliable service.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/routes" className="text-gray-400 hover:text-white transition-colors">Routes</Link></li>
              <li><Link href="/fleet" className="text-gray-400 hover:text-white transition-colors">Our Cars</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Popular Routes</h4>
            <ul className="space-y-3">
              {popularRoutes.slice(0, 4).map((route) => (
                <li key={route.slug}>
                  <Link href={`/route/${route.slug}`} className="text-gray-400 hover:text-white transition-colors">
                    {route.from} → {route.to}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Contact</h4>
            <ul className="space-y-4">
              {siteData.phones.map((phone, idx) => (
                <li key={idx}>
                  <a href={`tel:+91${phone}`} className="text-2xl font-bold text-[#F5C400] hover:text-white transition-colors">
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {siteData.year} {siteData.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
