import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, PlusCircle, Loader2 } from 'lucide-react';

export default function ManageGallery() {
    const [photos, setPhotos] = useState([]);
    const [formData, setFormData] = useState({ title: '', url: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const res = await axios.get('https://hotel-server-qryr.onrender.com/api/gallery');
            setPhotos(res.data);
        } catch (err) { console.error("Error fetching gallery:", err); }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('https://hotel-server-qryr.onrender.com/api/gallery', formData);
            setFormData({ title: '', url: '' });
            fetchPhotos();
        } catch (err) { alert("ফটো আপলোড ব্যর্থ হয়েছে"); }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("আপনি কি নিশ্চিতভাবে এই ছবিটি ডিলিট করতে চান?")) {
            try {
                await axios.delete(`https://hotel-server-qryr.onrender.com/api/gallery/${id}`);
                setPhotos(photos.filter(p => p._id !== id));
            } catch (err) { alert("ডিলিট করা সম্ভব হয়নি"); }
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-xl font-bold text-slate-800">Manage Hotel Gallery</h2>
            
            {/* ফটো অ্যাড করার ফর্ম */}
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <input 
                    placeholder="ছবির শিরোনাম (Title)" 
                    value={formData.title} required
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-indigo-100"
                />
                <input 
                    placeholder="ছবির লিঙ্ক (Image URL)" 
                    value={formData.url} required
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-indigo-100"
                />
                <button disabled={loading} className="bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
                    {loading ? <Loader2 className="animate-spin" /> : <PlusCircle size={20}/>} Add Photo
                </button>
            </form>

            {/* ফটোর গ্রিড ভিউ */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {photos.map(photo => (
                    <div key={photo._id} className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                            <p className="text-white text-[10px] font-bold mb-2 uppercase">{photo.title}</p>
                            <button onClick={() => handleDelete(photo._id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}