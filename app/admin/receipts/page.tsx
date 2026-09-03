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