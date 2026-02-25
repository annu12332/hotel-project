import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, PlusCircle, Image as ImageIcon, Loader2, UploadCloud } from 'lucide-react';

const ManageOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false); 
    const [formData, setFormData] = useState({
        title: '', description: '', price: '', validity: '', imageUrl: '', discount: ''
    });

    const IMGBB_API_KEY = '2d6032277c0bc613df8a152349242bef'; 

    useEffect(() => { fetchOffers(); }, []);

    const fetchOffers = async () => {
        try {
            const res = await axios.get('https://hotel-server-qryr.onrender.com/api/offers');
            setOffers(res.data);
            setLoading(false);
        } catch (err) { console.error(err); }
    };

    // ImgBB-তে ছবি আপলোড করার ফাংশন
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const imageData = new FormData();
        imageData.append('image', file);

        try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                imageData
            );
            const url = response.data.data.display_url;
            setFormData({ ...formData, imageUrl: url });
            alert("Image uploaded successfully!");
        } catch (error) {
            console.error("ImgBB Upload Error:", error);
            alert("Failed to upload image.");
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.imageUrl) {
            alert("Please upload an image first!");
            return;
        }
        try {
            await axios.post('https://hotel-server-qryr.onrender.com/api/offers', formData);
            alert("Offer added successfully!");
            setFormData({ title: '', description: '', price: '', validity: '', imageUrl: '', discount: '' });
            fetchOffers();
        } catch (err) { alert("Error adding offer"); }
    };

    const deleteOffer = async (id) => {
        if (window.confirm("Delete this offer?")) {
            await axios.delete(`https://hotel-server-qryr.onrender.com/api/offers/${id}`);
            fetchOffers();
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Add Offer Form */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <PlusCircle className="text-indigo-600" /> Create New Offer
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Image Upload Area */}
                        <div className="md:col-span-2 border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors relative">
                            {formData.imageUrl ? (
                                <div className="relative w-full h-40">
                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                    <button 
                                        type="button" 
                                        onClick={() => setFormData({...formData, imageUrl: ''})}
                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                                    >✕</button>
                                </div>
                            ) : (
                                <>
                                    <UploadCloud size={40} className="text-slate-400 mb-2" />
                                    <p className="text-sm text-slate-500 mb-2">Click to upload offer image</p>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageUpload} 
                                        className="absolute inset-0 opacity-0 cursor-pointer" 
                                    />
                                    {uploading && <Loader2 className="animate-spin text-indigo-600" />}
                                </>
                            )}
                        </div>

                        <input type="text" name="title" placeholder="Offer Title" value={formData.title} onChange={handleChange} className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
                        <input type="text" name="discount" placeholder="Discount Info (e.g. 20% OFF)" value={formData.discount} onChange={handleChange} className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <input type="text" name="price" placeholder="Price (e.g. $199)" value={formData.price} onChange={handleChange} className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
                        <input type="text" name="validity" placeholder="Validity (e.g. Valid until Dec)" value={formData.validity} onChange={handleChange} className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
                        
                        <textarea name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} className="p-3 border rounded-xl md:col-span-2 h-24 focus:ring-2 focus:ring-indigo-500 outline-none" required></textarea>
                        
                        <button 
                            type="submit" 
                            disabled={uploading}
                            className={`md:col-span-2 py-4 rounded-xl font-bold text-white transition-all ${uploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'}`}
                        >
                            {uploading ? 'Uploading Image...' : 'Publish Offer'}
                        </button>
                    </form>
                </div>

                {/* Offer Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? <div className="col-span-full flex justify-center py-10"><Loader2 className="animate-spin text-indigo-600" size={40} /></div> : 
                        offers.map(offer => (
                            <div key={offer._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group relative hover:shadow-md transition-shadow">
                                <div className="h-44 relative overflow-hidden">
                                    <img src={offer.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    {offer.discount && (
                                        <div className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                                            {offer.discount}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-slate-800 line-clamp-1">{offer.title}</h4>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-xs text-slate-500">{offer.validity}</p>
                                        <p className="text-sm font-bold text-indigo-600">{offer.price}</p>
                                    </div>
                                    <button onClick={() => deleteOffer(offer._id)} className="absolute top-2 right-2 p-2 bg-white/90 text-red-500 rounded-full shadow-md hover:bg-red-50 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageOffers;