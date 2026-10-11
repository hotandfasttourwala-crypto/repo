import { faqsData } from "../data/faqs";

export default function FAQ() {
  return (
    <section className="py-24 bg-white border-t border-slate-100" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#2563EB] font-bold tracking-[0.2em] uppercase text-sm mb-3 block">
            Got Questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 font-medium">
            Everything you need to know about our taxi service, bookings, and pricing.
          </p>
        </div>

        <div className="space-y-6">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className="bg-[#F8FAFC] p-6 md:p-8 rounded-3xl border border-slate-200/70 hover:border-[#2563EB]/40 transition-all shadow-sm"
            >
              <h3 className="text-xl font-bold text-[#0F172A] mb-3 flex items-center gap-3">
                <span className="text-[#2563EB] material-symbols-outlined text-2xl">help</span>
                {faq.question}
              </h3>
              <p className="text-slate-600 leading-relaxed font-normal pl-9">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
