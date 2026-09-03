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
              className={`block px-4 py-2 rounded ${pathname === item.path ? 'bg-white/20 font-bold' : 'hover:bg-white/10'}`}
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