import { createClient } from '@supabase/supabase-js';

// Initialize a Supabase client with the Service Role Key to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export default async function AdminDashboard() {
  // Fetch data on the server side using the admin client
  const [msgRes] = await Promise.all([
    supabaseAdmin.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(50)
  ]);

  const messages = msgRes.data || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-black">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-black">Contact Form Submissions</h2>
          <div className="space-y-3 max-h-[800px] overflow-y-auto">
            {messages.map(msg => (
              <div key={msg.id} className="p-4 bg-gray-50 rounded border border-gray-100 text-sm">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-black">{msg.name}</span>
                  <span className="text-gray-500">{new Date(msg.created_at).toLocaleString()}</span>
                </div>
                <p className="text-[#E10600] font-bold mb-2">{msg.phone}</p>
                <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
              </div>
            ))}
            {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}