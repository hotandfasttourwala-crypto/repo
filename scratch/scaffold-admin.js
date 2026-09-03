const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, '..', filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim());
};

// 1. Middleware
write('middleware.ts', `
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    if (token !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
`);

// 2. Auth APIs
write('app/api/admin/login/route.ts', `
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  const validPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (password === validPassword) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return response;
  }
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
`);

write('app/api/admin/logout/route.ts', `
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_token');
  return response;
}
`);

// 3. Login Page
write('app/admin/login/page.tsx', `
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    
    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Admin Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
              autoFocus
            />
          </div>
          <button type="submit" className="w-full bg-black text-white font-bold py-2 rounded hover:bg-gray-800">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
`);

// 4. Admin Layout
write('app/admin/layout.tsx', `
"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const nav = [
    { name: 'Dashboard (Leads)', path: '/admin' },
    { name: 'Routes', path: '/admin/routes' },
    { name: 'Fleet', path: '/admin/fleet' },
    { name: 'Receipts', path: '/admin/receipts' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-black text-white p-6 flex flex-col hidden md:flex">
        <h2 className="text-xl font-bold mb-8 text-[#E10600]">Admin Panel</h2>
        <nav className="flex-1 space-y-2">
          {nav.map(item => (
            <Link 
              key={item.path} 
              href={item.path}
              className={\`block px-4 py-2 rounded \${pathname === item.path ? 'bg-white/20 font-bold' : 'hover:bg-white/10'}\`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className="mt-auto px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-left font-bold">
          Logout
        </button>
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
`);

// 5. Admin Dashboard (Leads)
write('app/admin/page.tsx', `
"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [inqRes, msgRes] = await Promise.all([
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(50)
      ]);
      if (inqRes.data) setInquiries(inqRes.data);
      if (msgRes.data) setMessages(msgRes.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-black">Lead Transcripts</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-black">Call & WhatsApp Clicks</h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {inquiries.map(inq => (
              <div key={inq.id} className="p-3 bg-gray-50 rounded border border-gray-100 text-sm">
                <span className={\`font-bold \${inq.type === 'WHATSAPP' ? 'text-green-600' : 'text-blue-600'}\`}>{inq.type}</span>
                <span className="text-gray-500 ml-2">{new Date(inq.created_at).toLocaleString()}</span>
                <p className="mt-1 text-black font-medium">Page: {inq.source_url}</p>
              </div>
            ))}
            {inquiries.length === 0 && <p className="text-gray-500">No clicks yet.</p>}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-black">Contact Form Messages</h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
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
`);

// 6. Admin Routes
write('app/admin/routes/page.tsx', \`
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
    await supabase.from('routes').delete().eq('id', id);
    fetchRoutes();
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
            title: \\\`Taxi from \${fd.get('from')} to \${fd.get('to')}\\\`,
            description: \\\`Book a taxi from \${fd.get('from')} to \${fd.get('to')} at the best price.\\\`,
            price_sedan_one_way: fd.get('sedan'),
            price_suv_one_way: fd.get('suv'),
            price_sedan_round: fd.get('sedanRound'),
            price_suv_round: fd.get('suvRound'),
            popular: fd.get('popular') === 'on',
            return_available: true
          }]);
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
\`);

// 7. Admin Fleet
write('app/admin/fleet/page.tsx', `
"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function AdminFleet() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFleet = async () => {
    setLoading(true);
    const { data } = await supabase.from('fleet').select('*').order('created_at', { ascending: false });
    if (data) setCars(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFleet();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this car?')) return;
    await supabase.from('fleet').delete().eq('id', id);
    fetchFleet();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">Manage Fleet</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg text-black mb-1">{car.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{car.type}</p>
              <button onClick={() => handleDelete(car.id)} className="text-red-500 hover:underline text-sm font-medium">Delete Vehicle</button>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="text-gray-500 mt-4">Loading...</p>}
    </div>
  );
}
`);

// 8. Admin Receipts
write('app/admin/receipts/page.tsx', `
"use client";
import { useState } from 'react';

export default function Receipts() {
  const [data, setData] = useState({
    name: '',
    phone: '',
    from: '',
    to: '',
    date: '',
    amount: '',
    car: 'Sedan',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-black print:hidden">Generate Booking Receipt</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 print:hidden">
          <h2 className="text-xl font-bold mb-4 text-black">Receipt Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input type="text" className="w-full border p-2 rounded text-black bg-white" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" className="w-full border p-2 rounded text-black bg-white" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input type="text" className="w-full border p-2 rounded text-black bg-white" value={data.from} onChange={e => setData({...data, from: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input type="text" className="w-full border p-2 rounded text-black bg-white" value={data.to} onChange={e => setData({...data, to: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" className="w-full border p-2 rounded text-black bg-white" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                <select className="w-full border p-2 rounded text-black bg-white" value={data.car} onChange={e => setData({...data, car: e.target.value})}>
                  <option>Sedan</option>
                  <option>SUV / Ertiga</option>
                  <option>Innova Crysta</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (₹)</label>
              <input type="number" className="w-full border p-2 rounded text-black bg-white" value={data.amount} onChange={e => setData({...data, amount: e.target.value})} />
            </div>
            
            <button onClick={handlePrint} className="w-full bg-[#E10600] text-white font-bold py-3 rounded mt-4">
              Print Receipt
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="bg-white p-8 border border-gray-300 rounded shadow-sm relative print:shadow-none print:border-none print:m-0 print:p-0">
          <div className="text-center mb-8 border-b pb-6">
            <h1 className="text-3xl font-black text-black">HOT AND FAST TOUR WALA</h1>
            <p className="text-gray-600 mt-1">Indore, Madhya Pradesh</p>
            <p className="text-gray-600">Phone: +91 9174092789</p>
            <h2 className="text-xl font-bold mt-4 border border-black inline-block px-4 py-1">BOOKING RECEIPT</h2>
          </div>
          
          <div className="space-y-4 text-black text-lg">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Date:</span>
              <span className="font-medium">{data.date || '---'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Customer Name:</span>
              <span className="font-bold">{data.name || '---'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Phone Number:</span>
              <span className="font-medium">{data.phone || '---'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Journey:</span>
              <span className="font-bold">{data.from || '---'} to {data.to || '---'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Vehicle:</span>
              <span className="font-medium">{data.car}</span>
            </div>
            <div className="flex justify-between border-b-2 border-black pb-2 pt-4">
              <span className="font-bold text-xl">Total Amount:</span>
              <span className="font-black text-2xl">₹{data.amount || '0'}</span>
            </div>
          </div>
          
          <div className="mt-16 text-center text-sm text-gray-500">
            <p>Thank you for choosing Hot and Fast Tour Wala!</p>
            <p>This is a computer-generated receipt.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

console.log('Admin scaffold generated successfully.');
