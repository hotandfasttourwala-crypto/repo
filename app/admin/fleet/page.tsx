"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function AdminFleet() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [features, setFeatures] = useState('');

  const fetchFleet = async () => {
    setLoading(true);
    const { data } = await supabase.from('fleet').select('*').order('created_at', { ascending: false });
    if (data) setCars(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFleet();
  }, []);

  const handleDelete = async (carId: string) => {
    if (!confirm('Delete this car?')) return;
    
    // Optimistically update the UI
    setCars(prev => prev.filter(c => c.id !== carId));
    
    const { error } = await supabase.from('fleet').delete().eq('id', carId);
    if (error) {
      alert(`Error deleting car: ${error.message}`);
      fetchFleet(); // Revert if failed
    } else {
      await fetch('/api/revalidate', {
        method: 'POST',
        body: JSON.stringify({ tag: 'fleet' })
      });
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      alert('Please select at least one image.');
      return;
    }
    
    setUploading(true);
    
    try {
      const uploadedUrls: string[] = [];

      // Upload all selected files concurrently
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('cars')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('cars')
          .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
      });

      const urls = await Promise.all(uploadPromises);
      uploadedUrls.push(...urls);

      // The first image acts as the main thumbnail
      const mainImageUrl = uploadedUrls[0];
      const featuresArray = features.split(',').map(f => f.trim()).filter(Boolean);

      const { error: insertError } = await supabase.from('fleet').insert([{
        id: id || name.toLowerCase().replace(/\s+/g, '-'),
        name,
        type,
        image: mainImageUrl,
        gallery: uploadedUrls,
        features: featuresArray
      }]);

      if (insertError) throw insertError;

      // Revalidate cache for the main website
      await fetch('/api/revalidate', {
        method: 'POST',
        body: JSON.stringify({ tag: 'fleet' })
      });

      setShowAddForm(false);
      setId('');
      setName('');
      setType('');
      setFiles(null);
      setFeatures('');
      fetchFleet();
    } catch (err: any) {
      alert(`Error during upload/save: ${err.message}. Make sure you created the 'cars' bucket!`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">Manage Fleet</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#E10600] text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add New Car'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-bold mb-4 text-black">Add New Vehicle</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black" placeholder="e.g. Innova Crysta" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID (Slug)</label>
                <input type="text" value={id} onChange={e => setId(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black" placeholder="e.g. innova (Optional)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <input required type="text" value={type} onChange={e => setType(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black" placeholder="e.g. SUV" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images (Select multiple)</label>
                <input 
                  required 
                  type="file" 
                  accept="image/*"
                  multiple
                  onChange={e => setFiles(e.target.files)} 
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-black bg-white" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                <input required type="text" value={features} onChange={e => setFeatures(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black" placeholder="AC Available, 6 Seats, Comfortable" />
              </div>
            </div>
            <button disabled={uploading} type="submit" className="bg-[#111] disabled:opacity-50 text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors">
              {uploading ? 'Uploading & Saving...' : 'Save Car'}
            </button>
          </form>
        </div>
      )}

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
      {loading && <p className="text-gray-500 mt-4">Loading fleet data...</p>}
      {!loading && cars.length === 0 && <p className="text-gray-500 mt-4">No cars found in database.</p>}
    </div>
  );
}