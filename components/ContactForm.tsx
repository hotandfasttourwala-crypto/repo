"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const message = formData.get("message");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });

      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit form");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-500/20 text-green-100 p-6 rounded-lg text-center border border-green-500/30">
        <h4 className="text-xl font-bold mb-2">Thank You!</h4>
        <p>Your request has been received. We will call you back shortly.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-4 text-sm underline text-green-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
      {error && <div className="text-red-400 bg-red-900/20 p-3 rounded">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
        <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600]" placeholder="Enter your name" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
        <input name="phone" required type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600]" placeholder="Your 10-digit number" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Message (Optional)</label>
        <textarea name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600]" placeholder="Route details, date, etc."></textarea>
      </div>
      
      <button disabled={loading} type="submit" className="w-full bg-[#E10600] hover:bg-red-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition-colors text-lg mt-4 shadow-[0_0_15px_rgba(225,6,0,0.3)]">
        {loading ? "Sending..." : "Request Call Back"}
      </button>
    </form>
  );
}
