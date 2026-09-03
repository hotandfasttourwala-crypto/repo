import WhyChooseUs from "../../components/WhyChooseUs";
import ContactCTA from "../../components/ContactCTA";
import { siteData } from "../../data/site";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Us | Hot and Fast Tour Wala",
  description: "Learn more about Hot and Fast Tour Wala, your trusted taxi and tour service provider in Indore, Madhya Pradesh.",
};

export default function AboutPage() {
  return (
    <>
      <div className="bg-[#0A0A0A] pt-32 pb-16 text-center border-b border-white/10">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">About Us</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Your trusted travel partner in Madhya Pradesh.
        </p>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-black mb-6">
                Welcome to Hot and Fast Tour Wala
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Based in Indore, we are a premium taxi and tour service dedicated to providing safe, comfortable, and reliable transportation across major destinations in Madhya Pradesh.
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Whether you need a quick one-way drop or a round-trip outstation journey, our well-maintained fleet and professional drivers ensure you reach your destination with ease.
              </p>
              
              <div className="space-y-4">
                {[
                  "Experienced & verified drivers",
                  "Well-maintained AC cars",
                  "Transparent pricing with no hidden charges",
                  "24/7 availability for all your travel needs"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#E10600]" size={24} />
                    <span className="text-black font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-100 rounded-3xl h-[400px] w-full flex items-center justify-center border-8 border-gray-50 shadow-xl overflow-hidden relative">
                <Image 
                  src="/images/cars/ertiga-2.jpeg" 
                  alt="Hot and Fast Tour Wala Fleet" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <ContactCTA />
    </>
  );
}
