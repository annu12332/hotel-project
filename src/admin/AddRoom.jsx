import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, X, Plus, BedDouble, Maximize, Users, Tag } from 'lucide-react';
import axios from 'axios';

const AddRoom = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: 'Deluxe',
        size: '',
        bedType: '',
        adults: 2
    });

    const [amenities, setAmenities] = useState([]);
    const [currentAmenity, setCurrentAmenity] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // ১. Amenities হ্যান্ডেল করার লজিক
    const addAmenity = () => {
        if (currentAmenity.trim() && !amenities.includes(currentAmenity)) {
            setAmenities([...amenities, currentAmenity]);
            setCurrentAmenity("");
        }
    };

    const removeAmenity = (index) => {
        setAmenities(amenities.filter((_, i) => i !== index));
    };

    // ২. সাবমিট হ্যান্ডলার
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let imageUrl = "";
            // Cloudinary আপলোড
            if (image) {
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", "hotel presets");
                data.append("cloud_name", "hotelproject");

                const cloudinaryRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/hotelproject/image/upload",
                    data
                );
                imageUrl = cloudinaryRes.data.secure_url;
            }

            // সার্ভারে পাঠানোর জন্য ফাইনাল ডেটা অবজেক্ট
            const finalRoomData = { 
                ...formData, 
                image: imageUrl, 
                amenities,
                maxOccupancy: { adults: Number(formData.adults) } // নেস্টেড অবজেক্ট ফরম্যাট
            };

            const response = await axios.post('https://hotel-server-qryr.onrender.com/api/rooms', finalRoomData);

            if (response.status === 201) {
                setIsSuccess(true);
                // রিসেট ফর্ম
                setFormData({ title: '', price: '', description: '', category: 'Deluxe', size: '', bedType: '', adults: 2 });
                setAmenities([]);
                setImage(null); 
                setPreview(null);
                setTimeout(() => setIsSuccess(false), 3000);
            }
        } catch (err) {
            console.error("Submission Error:", err);
            alert("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden"
        >
            <AnimatePresence>
                {isSuccess && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center">
                        <CheckCircle2 size={80} className="text-green-500 mb-4 animate-bounce" />
                        <h3 className="text-3xl font-black text-slate-800">Room Published Successfully!</h3>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className="mb-12">
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Create New Sanctuary</h2>
                <p className="text-slate-500">Fill in the details to list a new luxury room.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400 ml-2">Room Title</label>
                        <input required type="text" placeholder="e.g. Royal Penthouse" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-400 transition-all" onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title}/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400 ml-2">Price Per Night ($)</label>
                        <input required type="number" placeholder="e.g. 250" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-400 transition-all" onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData.price}/>
                    </div>
                </div>

                {/* Specific Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400 ml-2 flex items-center gap-1"><Maximize size={12}/> Room Size</label>
                        <input required type="text" placeholder="e.g. 550 sqft" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-400 transition-all" onChange={(e) => setFormData({...formData, size: e.target.value})} value={formData.size}/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400 ml-2 flex items-center gap-1"><BedDouble size={12}/> Bed Type</label>
                        <input required type="text" placeholder="e.g. King Size" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-400 transition-all" onChange={(e) => setFormData({...formData, bedType: e.target.value})} value={formData.bedType}/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400 ml-2 flex items-center gap-1"><Users size={12}/> Max Adults</label>
                        <input required type="number" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-400 transition-all" onChange={(e) => setFormData({...formData, adults: e.target.value})} value={formData.adults}/>
                    </div>
                </div>

                {/* Amenities Tag System */}
                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase text-slate-400 ml-2 flex items-center gap-1"><Tag size={12}/> Room Amenities</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Type an amenity and click +" 
                            className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            value={currentAmenity}
                            onChange={(e) => setCurrentAmenity(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                        />
                        <button type="button" onClick={addAmenity} className="px-6 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
                            <Plus />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {amenities.map((amt, index) => (
                            <span key={index} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold flex items-center gap-2 border border-blue-100">
                                {amt}
                                <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeAmenity(index)} />
                            </span>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 ml-2">Description</label>
                    <textarea required rows="4" placeholder="Describe the luxury and comfort..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-all" onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData.description}></textarea>
                </div>

                {/* Image Upload */}
                <div className="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-4 bg-slate-50/50 flex flex-col items-center justify-center min-h-[220px] hover:bg-slate-50 transition-all cursor-pointer">
                    {preview ? (
                        <div className="relative w-full h-64">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-[1.5rem]" />
                            <button type="button" onClick={() => {setImage(null); setPreview(null)}} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-xl hover:bg-red-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                    ) : (
                        <label className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer py-10">
                            <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                                <Upload size={32} />
                            </div>
                            <div className="text-center">
                                <span className="text-sm font-bold text-slate-700">Click to upload cover photo</span>
                                <p className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                const file = e.target.files[0];
                                if(file) { setImage(file); setPreview(URL.createObjectURL(file)); }
                            }} />
                        </label>
                    )}
                </div>

                <button disabled={isSubmitting} className={`w-full py-6 rounded-2xl font-black text-lg text-white transition-all uppercase tracking-widest ${isSubmitting ? 'bg-slate-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-black shadow-2xl hover:shadow-slate-300 active:scale-[0.98]'}`}>
                    {isSubmitting ? "Uploading Sanctuary Details..." : "Publish Room to Collection"}
                </button>
            </form>
        </motion.div>
    );
};

export default AddRoom;