"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, MessageCircle, Trash2, Clock, RefreshCw, Volume2, VolumeX, CheckCircle, Search } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Lead {
  id: string;
  name: string;
  phone: string;
  message?: string;
  created_at: string;
  status?: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const previousCountRef = useRef<number>(0);

  // Play audio chime for new leads
  const playChime = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      
      gain1.gain.setValueAtTime(0.15, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      
      osc1.start();
      osc1.stop(ctx.currentTime + 0.5);
    } catch {
      // Audio fallback
    }
  };

  const fetchLeads = async (isManual = false) => {
    if (isManual) setLoading(true);
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const incoming: Lead[] = data.leads || [];
        
        if (previousCountRef.current > 0 && incoming.length > previousCountRef.current) {
          playChime();
        }
        previousCountRef.current = incoming.length;
        setLeads(incoming);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(true);

    const pollInterval = setInterval(() => {
      fetchLeads(false);
    }, 3000);

    let channel: any = null;
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        channel = supabase
          .channel('contact_submissions_realtime')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'contact_submissions' },
            () => {
              fetchLeads(false);
            }
          )
          .subscribe();
      }
    } catch (e) {
      console.error("Realtime subscription notice:", e);
    }

    return () => {
      clearInterval(pollInterval);
      if (channel) supabase.removeChannel(channel);
    };
  }, [soundEnabled]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this lead?")) return;
    
    setLeads(prev => prev.filter(l => l.id !== id));
    previousCountRef.current = Math.max(0, previousCountRef.current - 1);

    try {
      await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
    } catch (err) {
      console.error("Failed to delete lead:", err);
      fetchLeads(false);
    }
  };

  const filteredLeads = leads.filter(l => 
    l.name?.toLowerCase().includes(search.toLowerCase()) ||
    l.phone?.includes(search) ||
    (l.message && l.message.toLowerCase().includes(search.toLowerCase()))
  );

  const today = new Date().toDateString();
  const todayCount = leads.filter(l => new Date(l.created_at).toDateString() === today).length;

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-black">Live Callback Requests</h1>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              LIVE STREAM
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            New contact form submissions & callback requests appear here in real time.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border transition-all ${
              soundEnabled ? 'bg-gray-100 border-gray-300 text-gray-800' : 'bg-gray-50 border-gray-200 text-gray-400'
            }`}
            title={soundEnabled ? 'Sound alert active on new leads' : 'Sound alert muted'}
          >
            {soundEnabled ? <Volume2 size={16} className="text-[#E10600]" /> : <VolumeX size={16} />}
            {soundEnabled ? 'Sound Alert: ON' : 'Sound: OFF'}
          </button>

          <button
            onClick={() => fetchLeads(true)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-sm font-bold transition-all disabled:opacity-50 shadow-sm"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Callback Leads</p>
            <p className="text-3xl font-black text-black mt-1">{leads.length}</p>
          </div>
          <div className="w-12 h-12 bg-red-50 text-[#E10600] rounded-xl flex items-center justify-center font-bold">
            📞
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Today's Inquiries</p>
            <p className="text-3xl font-black text-[#E10600] mt-1">{todayCount}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center font-bold">
            ⚡
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Live Status</p>
            <p className="text-sm font-bold text-gray-800 mt-1 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
              Auto-sync active ({lastUpdated.toLocaleTimeString()})
            </p>
          </div>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center font-bold">
            <CheckCircle size={22} />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer name, phone number, or message..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E10600]"
        />
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-lg font-bold text-gray-700">No callback requests found</p>
            <p className="text-sm mt-1">When users submit the form on the website, they will instantly show up here.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredLeads.map((lead, idx) => {
              const cleanPhone = (lead.phone || "").replace(/[^0-9]/g, "");
              const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone.slice(2) : cleanPhone;
              const waLink = `https://wa.me/91${formattedPhone}?text=${encodeURIComponent(`Hello ${lead.name || ''}, we received your callback request from Hot and Fast Tour Wala.`)}`;
              const callLink = `tel:${lead.phone}`;

              return (
                <div key={lead.id || idx} className="p-5 hover:bg-gray-50/80 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-extrabold text-lg text-black">{lead.name}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-100 text-[#E10600] font-bold">
                        {lead.phone}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(lead.created_at).toLocaleString()}
                      </span>
                    </div>

                    {lead.message && (
                      <p className="text-sm text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mt-2">
                        💬 <span className="italic">{lead.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <a
                      href={callLink}
                      className="flex items-center gap-1.5 bg-[#E10600] hover:bg-red-700 text-white font-bold px-3.5 py-2 rounded-lg text-sm shadow-sm transition-all"
                    >
                      <Phone size={15} />
                      Call
                    </a>

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-3.5 py-2 rounded-lg text-sm shadow-sm transition-all"
                    >
                      <MessageCircle size={15} />
                      WhatsApp
                    </a>

                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete inquiry"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

