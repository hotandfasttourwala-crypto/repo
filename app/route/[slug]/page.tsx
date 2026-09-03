import { notFound } from "next/navigation";
import { getRouteBySlug, getAllRoutesData } from "../../../data/routes";
import { getFleetData } from "../../../data/fleet";
import { Metadata } from "next";
import PricingTable from "../../../components/PricingTable";
import WhyChooseUs from "../../../components/WhyChooseUs";
import Fleet from "../../../components/Fleet";
import FAQ from "../../../components/FAQ";
import ContactCTA from "../../../components/ContactCTA";
import Link from "next/link";
import { ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { siteData } from "../../../data/site";
import ActionButtons from "../../../components/ActionButtons";

export async function generateStaticParams() {
  const routes = await getAllRoutesData();
  return routes.map((route) => ({
    slug: route.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const route = await getRouteBySlug(params.slug);
  if (!route) {
    return { title: "Route Not Found" };
  }
  return {
    title: route.title,
    description: route.description,
    openGraph: {
      title: route.title,
      description: route.description,
      type: "website",
    },
  };
}

export default async function RoutePage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const route = await getRouteBySlug(params.slug);
  const cars = await getFleetData();

  if (!route) {
    notFound();
  }

  // Generate structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": siteData.name,
      "telephone": siteData.phones[0],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "addressCountry": "IN"
      }
    },
    "name": `Taxi Service from ${route.from} to ${route.to}`,
    "description": route.description,
    "areaServed": [route.from, route.to],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="bg-[#0A0A0A] pt-32 pb-16 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#E10600] rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2 shrink-0" />
            <Link href="/routes" className="hover:text-white transition-colors">Routes</Link>
            <ChevronRight size={14} className="mx-2 shrink-0" />
            <span className="text-white font-medium">{route.from} to {route.to}</span>
          </nav>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              {route.from} to {route.to} <span className="text-[#F5C400]">Taxi Service</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg font-bold">One Way</span>
              {route.returnAvailable && (
                <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg font-bold">Round Trip</span>
              )}
              <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-lg font-bold">AC Available</span>
              <span className="bg-[#E10600]/20 text-[#E10600] border border-[#E10600]/30 px-4 py-2 rounded-lg font-bold">Experienced Drivers</span>
            </div>
            
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Book a premium and comfortable ride from {route.from} to {route.to}. We offer well-maintained Sedans and SUVs for local and outstation travel.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
              Transparent Pricing
            </h2>
            <div className="w-24 h-1 bg-[#F5C400] mx-auto rounded-full"></div>
          </div>
          
          <PricingTable route={route} />
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6 text-lg">
              Ready to book your {route.from} to {route.to} cab?
            </p>
            <ActionButtons routeStr={`${route.from} to ${route.to}`} />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Fleet */}
      <Fleet cars={cars} />

      {/* Related / Return Routes */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          {route.returnAvailable && (
            <div className="mb-16 bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#E10600]"></div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-black mb-4">
                Return Journey Available
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Planning to come back? We also provide reliable taxi services from <span className="font-bold text-black">{route.to} to {route.from}</span>.
              </p>
              <Link
                href={`/route/${route.to.toLowerCase()}-to-${route.from.toLowerCase()}`}
                className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                View Return Route <ArrowRight size={18} />
              </Link>
            </div>
          )}

          {route.relatedRoutes && route.relatedRoutes.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-black mb-8 border-l-4 border-[#F5C400] pl-4">
                Related Routes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(await Promise.all(
                  route.relatedRoutes.map(async (relatedSlug) => {
                    const relatedRoute = await getRouteBySlug(relatedSlug);
                    if (!relatedRoute) return null;
                    return (
                      <Link
                        key={relatedSlug}
                        href={`/route/${relatedSlug}`}
                        className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-[#E10600] hover:shadow-md transition-all flex items-center justify-between group"
                      >
                        <div>
                          <p className="font-bold text-black group-hover:text-[#E10600] transition-colors">
                            {relatedRoute.from} &rarr; {relatedRoute.to}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            From ₹{relatedRoute.oneWay.sedan}
                          </p>
                        </div>
                        <ChevronRight className="text-gray-300 group-hover:text-[#E10600]" />
                      </Link>
                    );
                  })
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Contact CTA */}
      <ContactCTA />
    </>
  );
}
