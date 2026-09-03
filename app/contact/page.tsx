import { siteData } from "../../data/site";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";
import ContactCTA from "../../components/ContactCTA";
import ContactForm from "../../components/ContactForm";

export const metadata = {
  title: "Contact Us | Hot and Fast Tour Wala",
  description: "Contact Hot and Fast Tour Wala for taxi bookings, route inquiries, and fares. Call or WhatsApp us directly.",
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-[#0A0A0A] pt-32 pb-16 text-center border-b border-white/10">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Contact Us</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          We are available 24/7 for bookings and inquiries.
        </p>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="space-y-8">
              <h2 className="text-3xl font-extrabold text-black mb-6">Get in Touch</h2>
              
              <div className="bg-gray-50 p-6 rounded-2xl flex items-start gap-4 border border-gray-100">
                <div className="bg-[#E10600]/10 p-3 rounded-full text-[#E10600]">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Phone Numbers</h3>
                  <div className="space-y-2">
                    {siteData.phones.map((phone, idx) => (
                      <a key={idx} href={`tel:+91${phone}`} className="block text-xl font-bold text-black hover:text-[#E10600] transition-colors">
                        +91 {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl flex items-start gap-4 border border-gray-100">
                <div className="bg-[#25D366]/10 p-3 rounded-full text-[#25D366]">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">WhatsApp</h3>
                  <a href={`https://wa.me/91${siteData.whatsapp}`} target="_blank" rel="noreferrer" className="block text-xl font-bold text-black hover:text-[#25D366] transition-colors">
                    +91 {siteData.whatsapp}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Available for quick booking</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl flex items-start gap-4 border border-gray-100">
                <div className="bg-gray-200 p-3 rounded-full text-gray-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Location</h3>
                  <p className="text-lg text-black font-medium">{siteData.address}</p>
                </div>
              </div>

            </div>

            <div className="bg-black text-white p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E10600] rounded-full blur-[80px] opacity-50"></div>
              
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              
              <ContactForm />
            </div>
            
          </div>
        </div>
      </section>
      
      <ContactCTA />
    </>
  );
}
