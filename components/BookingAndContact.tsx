"use client";
import { useState } from "react";
import { siteData } from "../data/site";

export default function BookingAndContact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    date: "",
    time: "",
    vehicle: "Swift Dzire",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = formData.date
      ? formData.date.split("-").reverse().join("-")
      : "";
    let formattedTime = formData.time;
    if (formData.time) {
      const [hours, minutes] = formData.time.split(":");
      const numHours = Number(hours);
      formattedTime = `${String(numHours % 12 || 12).padStart(2, "0")}:${minutes} ${
        numHours >= 12 ? "PM" : "AM"
      }`;
    }

    const whatsappText = [
      `New Booking Request - ${siteData.name}`,
      "",
      `Full Name: ${formData.name}`,
      `Phone Number: ${formData.phone}`,
      `Pickup From: ${formData.pickup}`,
      `Destination: ${formData.destination}`,
      `Date: ${formattedDate}`,
      `Time: ${formattedTime}`,
      `Preferred Car: ${formData.vehicle}`,
      `Message: ${formData.message || "N/A"}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/91${siteData.whatsapp}?text=${encodeURIComponent(
      whatsappText
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-24 bg-slate-50" id="booking">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form Card */}
          <div className="glass-card p-8 md:p-12 rounded-[3rem] premium-shadow border border-white">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-8">
              Book Your Premium Ride
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
                    Full Name
                  </label>
                  <input
                    className="w-full bg-slate-100/70 border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all font-medium text-slate-900"
                    id="name"
                    placeholder="Rahul Sharma"
                    required
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
                    Phone Number
                  </label>
                  <input
                    className="w-full bg-slate-100/70 border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all font-medium text-slate-900"
                    id="phone"
                    placeholder="80855 92607"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
                    Pickup From
                  </label>
                  <input
                    className="w-full bg-slate-100/70 border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all font-medium text-slate-900"
                    id="pickup"
                    placeholder="Airport, Home, Office"
                    required
                    type="text"
                    value={formData.pickup}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
                    Destination
                  </label>
                  <input
                    className="w-full bg-slate-100/70 border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all font-medium text-slate-900"
                    id="destination"
                    placeholder="Ujjain, Omkareshwar, etc."
                    required
                    type="text"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
                    Date
                  </label>
                  <input
                    className="w-full bg-slate-100/70 border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all font-medium text-slate-900"
                    id="date"
                    required
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
                    Time
                  </label>
                  <input
                    className="w-full bg-slate-100/70 border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all font-medium text-slate-900"
                    id="time"
                    required
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
                    Preferred Car
                  </label>
                  <select
                    className="w-full bg-slate-100/70 border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all font-medium appearance-none text-slate-900"
                    id="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                  >
                    <option>Swift Dzire</option>
                    <option>Hyundai Aura</option>
                    <option>Maruti Ertiga</option>
                    <option>Innova Crysta</option>
                    <option>Tempo Traveller</option>
                    <option>Force Urbania</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
                  Message (Optional)
                </label>
                <textarea
                  className="w-full bg-slate-100/70 border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all font-medium text-slate-900"
                  id="message"
                  placeholder="Any special requests or details?"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                className="w-full bg-[#25D366] text-slate-950 py-5 rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-3 hover:bg-[#1ebc56] transition-all shadow-xl shadow-green-500/20 active:scale-95 cursor-pointer"
                type="submit"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.538-2.961-2.654-.087-.116-.708-.943-.708-1.798 0-.855.449-1.275.609-1.449.159-.174.347-.217.463-.217l.333.005c.106.005.246-.04.384.293.144.348.491 1.203.535 1.29.044.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.777 1.394.864.174.087.275.072.376-.044.101-.116.434-.506.549-.68.116-.174.231-.145.39-.087s1.013.477 1.186.564c.174.087.289.13.333.203.044.072.044.419-.1.824z" />
                </svg>
                Send Booking on WhatsApp
              </button>
            </form>
          </div>

          {/* Map & Contact Info */}
          <div className="space-y-10">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] border border-white bg-slate-200">
              <iframe
                allowFullScreen
                height="100%"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14718.73467611599!2d75.8856!3d22.7533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd36a4455555%3A0x673a388a42b94c8e!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
                style={{ border: 0 }}
                width="100%"
                title="Location Map"
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-lg flex items-center gap-6 min-w-0 group hover:bg-[#2563EB] transition-all hover:text-white">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">call</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">Primary Contact</p>
                  <a className="inline-block text-2xl font-black" href={`tel:${siteData.phones[0]}`}>
                    {siteData.phones[0]}
                  </a>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-lg flex items-center gap-6 min-w-0 group hover:bg-[#2563EB] transition-all hover:text-white">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">phone_iphone</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">Secondary Contact</p>
                  <a className="inline-block text-2xl font-black" href={`tel:${siteData.phones[1]}`}>
                    {siteData.phones[1]}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
