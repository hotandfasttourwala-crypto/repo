import { CheckCircle2 } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Comfortable Cars",
      description: "Clean and comfortable vehicles for your journey.",
    },
    {
      title: "Experienced Drivers",
      description: "Professional and experienced drivers.",
    },
    {
      title: "Safe & Reliable",
      description: "Travel with confidence.",
    },
    {
      title: "24/7 Available",
      description: "Service availability around the clock.",
    },
    {
      title: "Local & Outstation",
      description: "Local trips and long-distance journeys.",
    },
  ];

  return (
    <section className="py-20 bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Why Choose Hot and Fast Tour Wala?
          </h2>
          <div className="w-24 h-1 bg-[#E10600] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors shadow-lg"
            >
              <div className="w-12 h-12 bg-[#E10600]/20 text-[#E10600] rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
