import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Icons updated for Brighter Eco-theme
import { Trash2, PlusCircle, Image as ImageIcon, Loader2, UploadCloud, Tag } from 'lucide-react';

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
        <div className="p-8 bg-stone-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Add Offer Form */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
                    <h2 className="text-2xl font-black text-stone-900 mb-6 flex items-center gap-3">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                            <PlusCircle size={24} />
                        </div>
                        Create New Eco Offer
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Image Upload Area */}
                        <div className="md:col-span-2 border-2 border-dashed border-stone-200 rounded-3xl p-6 flex flex-col items-center justify-center bg-stone-50 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all relative">
                            {formData.imageUrl ? (
                                <div className="relative w-full h-48">
                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                                    <button 
                                        type="button" 
                                        onClick={() => setFormData({...formData, imageUrl: ''})}
                                        className="absolute -top-2 -right-2 bg-white text-red-500 p-2 rounded-full text-xs shadow-lg hover:bg-red-50"
                                    >✕</button>
                                </div>
                            ) : (
                                <>
                                    <UploadCloud size={48} className="text-emerald-500 mb-3" />
                                    <p className="text-sm font-bold text-stone-600 mb-1">Click to upload offer image</p>
                                    <p className="text-xs text-stone-400 mb-4">PNG, JPG or WEBP</p>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageUpload} 
                                        className="absolute inset-0 opacity-0 cursor-pointer" 
                                    />
                                    {uploading && (
                                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                                            <Loader2 className="animate-spin" size={18} /> Uploading...
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <input type="text" name="title" placeholder="Offer Title (e.g. Eco Summer Retreat)" value={formData.title} onChange={handleChange} className="p-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-emerald-200 outline-none text-stone-900" required />
                        <input type="text" name="discount" placeholder="Discount Info (e.g. 20% OFF)" value={formData.discount} onChange={handleChange} className="p-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-emerald-200 outline-none text-stone-900" />
                        <input type="text" name="price" placeholder="Price (e.g. $199)" value={formData.price} onChange={handleChange} className="p-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-emerald-200 outline-none text-stone-900" required />
                        <input type="text" name="validity" placeholder="Validity (e.g. Valid until Dec)" value={formData.validity} onChange={handleChange} className="p-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-emerald-200 outline-none text-stone-900" required />
                        
                        <textarea name="description" placeholder="Short Description of the offer..." value={formData.description} onChange={handleChange} className="p-4 bg-stone-50 border border-stone-100 rounded-2xl md:col-span-2 h-28 focus:ring-2 focus:ring-emerald-200 outline-none text-stone-900 resize-none" required></textarea>
                        
                        <button 
                            type="submit" 
                            disabled={uploading}
                            className={`md:col-span-2 py-4 rounded-2xl font-black text-white transition-all text-sm tracking-wider uppercase ${uploading ? 'bg-stone-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100'}`}
                        >
                            {uploading ? 'Uploading Image...' : 'Publish Offer'}
                        </button>
                    </form>
                </div>

                {/* Offer Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? <div className="col-span-full flex justify-center py-10"><Loader2 className="animate-spin text-emerald-600" size={40} /></div> : 
                        offers.map(offer => (
                            <div key={offer._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 group relative hover:shadow-xl transition-all duration-300">
                                <div className="h-48 relative overflow-hidden">
                                    <img src={offer.imageUrl} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    {offer.discount && (
                                        <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                                            <Tag size={14} /> {offer.discount}
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h4 className="font-black text-stone-900 text-lg mb-2 line-clamp-1">{offer.title}</h4>
                                    <p className="text-sm text-stone-600 mb-4 line-clamp-2">{offer.description}</p>
                                    <div className="flex justify-between items-center mt-2 border-t border-stone-100 pt-4">
                                        <p className="text-xs text-stone-500 font-bold">{offer.validity}</p>
                                        <p className="text-lg font-black text-emerald-700">{offer.price}</p>
                                    </div>
                                    <button onClick={() => deleteOffer(offer._id)} className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm text-red-500 rounded-full shadow-lg hover:bg-red-50 transition-colors">
                                        <Trash2 size={18} />
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