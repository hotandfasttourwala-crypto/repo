import { faqsData } from "../data/faqs";

export default function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-[#E10600] mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          {faqsData.map((faq, index) => (
            <div key={index} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-black mb-3">{faq.question}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
