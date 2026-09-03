"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function AdminRoutes() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = async () => {
    setLoading(true);
    const { data } = await supabase.from('routes').select('*').order('created_at', { ascending: false });
    if (data) setRoutes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this route?')) return;
    
    // Optimistically update the UI
    setRoutes(prev => prev.filter(r => r.id !== id));
    
    const { error } = await supabase.from('routes').delete().eq('id', id);
    if (error) {
      alert(`Error deleting route: ${error.message}`);
      fetchRoutes();
    } else {
      await fetch('/api/revalidate', {
        method: 'POST',
        body: JSON.stringify({ tag: 'routes' })
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">Manage Routes</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8 p-6">
        <h2 className="text-xl font-bold text-black mb-4">Add New Route</h2>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          await supabase.from('routes').insert([{
            slug: fd.get('from')?.toString().toLowerCase() + '-to-' + fd.get('to')?.toString().toLowerCase(),
            from_city: fd.get('from'),
            to_city: fd.get('to'),
            title: `Taxi from ${fd.get('from')} to ${fd.get('to')}`,
            description: `Book a taxi from ${fd.get('from')} to ${fd.get('to')} at the best price.`,
            price_sedan_one_way: fd.get('sedan'),
            price_suv_one_way: fd.get('suv'),
            price_sedan_round: fd.get('sedanRound'),
            price_suv_round: fd.get('suvRound'),
            popular: fd.get('popular') === 'on',
            return_available: true
          }]);
          
          await fetch('/api/revalidate', {
            method: 'POST',
            body: JSON.stringify({ tag: 'routes' })
          });
          
          (e.target as HTMLFormElement).reset();
          fetchRoutes();
        }} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input name="from" placeholder="From City (e.g. Indore)" required className="border p-2 rounded text-black bg-white" />
          <input name="to" placeholder="To City (e.g. Ujjain)" required className="border p-2 rounded text-black bg-white" />
          <input name="sedan" placeholder="Sedan One-Way ₹" required className="border p-2 rounded text-black bg-white" />
          <input name="suv" placeholder="SUV One-Way ₹" required className="border p-2 rounded text-black bg-white" />
          <input name="sedanRound" placeholder="Sedan Round-Trip ₹" required className="border p-2 rounded text-black bg-white" />
          <input name="suvRound" placeholder="SUV Round-Trip ₹" required className="border p-2 rounded text-black bg-white" />
          <label className="flex items-center gap-2 text-black"><input type="checkbox" name="popular" /> Popular Route?</label>
          <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">Add Route</button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-bold text-gray-700">Route</th>
                <th className="p-4 font-bold text-gray-700">Sedan (One Way)</th>
                <th className="p-4 font-bold text-gray-700">SUV (One Way)</th>
                <th className="p-4 font-bold text-gray-700">Popular</th>
                <th className="p-4 font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map(r => (
                <tr key={r.id} className="border-b border-gray-100">
                  <td className="p-4 text-black font-medium">{r.from_city} to {r.to_city}</td>
                  <td className="p-4 text-black">{r.price_sedan_one_way}</td>
                  <td className="p-4 text-black">{r.price_suv_one_way}</td>
                  <td className="p-4 text-black">{r.popular ? 'Yes' : 'No'}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <p className="p-4 text-gray-500">Loading...</p>}
        </div>
      </div>
    </div>
  );
}