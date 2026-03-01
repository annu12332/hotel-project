import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Icons updated for Brighter Eco-theme
import { Trash2, PlusCircle, Loader2, Leaf, Image as ImageIcon } from 'lucide-react';

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
        } catch (err) { alert("Photo upload failed"); }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            try {
                await axios.delete(`https://hotel-server-qryr.onrender.com/api/gallery/${id}`);
                setPhotos(photos.filter(p => p._id !== id));
            } catch (err) { alert("Deletion failed"); }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                    <ImageIcon size={24} />
                </div>
                <h2 className="text-3xl font-black text-stone-900 tracking-tight">Gallery Management</h2>
            </div>
            
            {/* ফটো অ্যাড করার ফর্ম */}
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-stone-50 p-6 rounded-3xl border border-stone-100">
                <input 
                    placeholder="Image Title" 
                    value={formData.title} required
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="bg-white border border-stone-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-emerald-100 transition-all"
                />
                <input 
                    placeholder="Image URL" 
                    value={formData.url} required
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    className="bg-white border border-stone-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-emerald-100 transition-all"
                />
                <button disabled={loading} className="bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all py-3 shadow-lg shadow-emerald-100">
                    {loading ? <Loader2 className="animate-spin" /> : <PlusCircle size={20}/>} Add Photo
                </button>
            </form>

            {/* ফটোর গ্রিড ভিউ */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {photos.map(photo => (
                    <div key={photo._id} className="group relative aspect-square rounded-3xl overflow-hidden shadow-sm border border-stone-100">
                        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                            <p className="text-white text-xs font-bold mb-3 uppercase tracking-wider">{photo.title}</p>
                            <button onClick={() => handleDelete(photo._id)} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Empty State */}
            {photos.length === 0 && (
                <div className="py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-stone-200">
                    <Leaf size={40} className="mx-auto text-stone-300 mb-4" />
                    <p className="text-stone-400 font-bold uppercase tracking-widest text-sm">No images in gallery</p>
                </div>
            )}
        </div>
    );
}