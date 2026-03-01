import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Icons updated for Eco-theme
import { Upload, CheckCircle2, X, Plus, BedDouble, Trees, Users, Leaf, Trees as TreesIcon } from 'lucide-react';
import axios from 'axios';

const AddRoom = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: 'Eco-Cabin', // Updated category
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

    // Amenities হ্যান্ডেল করার লজিক
    const addAmenity = () => {
        if (currentAmenity.trim() && !amenities.includes(currentAmenity)) {
            setAmenities([...amenities, currentAmenity]);
            setCurrentAmenity("");
        }
    };

    const removeAmenity = (index) => {
        setAmenities(amenities.filter((_, i) => i !== index));
    };

    // সাবমিট হ্যান্ডলার
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let imageUrl = "";
            // Cloudinary আপলোড
            if (image) {
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", "hotel presets"); // আপনার Cloudinary preset
                data.append("cloud_name", "hotelproject"); // আপনার Cloudinary cloud name

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
                maxOccupancy: { adults: Number(formData.adults) } 
            };

            const response = await axios.post('https://hotel-server-qryr.onrender.com/api/rooms', finalRoomData);

            if (response.status === 201) {
                setIsSuccess(true);
                // রিসেট ফর্ম
                setFormData({ title: '', price: '', description: '', category: 'Eco-Cabin', size: '', bedType: '', adults: 2 });
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
            // Background updated to stone-50
            className="max-w-5xl mx-auto bg-stone-50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-stone-100 relative overflow-hidden"
        >
            <AnimatePresence>
                {isSuccess && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center">
                        <CheckCircle2 size={80} className="text-emerald-500 mb-4 animate-bounce" />
                        <h3 className="text-3xl font-black text-stone-800">Eco-Cabin Published!</h3>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className="mb-12">
                {/* Text color updated */}
                <h2 className="text-3xl font-black text-stone-800 uppercase tracking-tight flex items-center gap-3">
                    <Leaf className="text-emerald-600" /> Create Natural Sanctuary
                </h2>
                <p className="text-stone-600">Fill in the details to list a new sustainable accommodation.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-stone-500 ml-2">Cabin Title</label>
                        <input required type="text" placeholder="e.g. Bamboo Canopy Cabin" className="w-full px-6 py-4 rounded-full bg-white border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300 transition-all" onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title}/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-stone-500 ml-2">Price Per Night ($)</label>
                        <input required type="number" placeholder="e.g. 150" className="w-full px-6 py-4 rounded-full bg-white border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300 transition-all" onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData.price}/>
                    </div>
                </div>

                {/* Specific Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-stone-500 ml-2 flex items-center gap-1"><TreesIcon size={14} className="text-emerald-600"/> Space Size</label>
                        <input required type="text" placeholder="e.g. 400 sqft" className="w-full px-6 py-4 rounded-full bg-white border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300 transition-all" onChange={(e) => setFormData({...formData, size: e.target.value})} value={formData.size}/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-stone-500 ml-2 flex items-center gap-1"><BedDouble size={14} className="text-emerald-600"/> Bed Type</label>
                        <input required type="text" placeholder="e.g. Queen Size" className="w-full px-6 py-4 rounded-full bg-white border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300 transition-all" onChange={(e) => setFormData({...formData, bedType: e.target.value})} value={formData.bedType}/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-stone-500 ml-2 flex items-center gap-1"><Users size={14} className="text-emerald-600"/> Max Adults</label>
                        <input required type="number" className="w-full px-6 py-4 rounded-full bg-white border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300 transition-all" onChange={(e) => setFormData({...formData, adults: e.target.value})} value={formData.adults}/>
                    </div>
                </div>

                {/* Amenities Tag System */}
                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase text-stone-500 ml-2 flex items-center gap-1"><Leaf size={14} className="text-emerald-600"/> Amenities</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="e.g. Solar Power, River View (+)" 
                            className="flex-1 px-6 py-4 rounded-full bg-white border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300 transition-all"
                            value={currentAmenity}
                            onChange={(e) => setCurrentAmenity(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                        />
                        <button type="button" onClick={addAmenity} className="px-6 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100">
                            <Plus />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {amenities.map((amt, index) => (
                            <span key={index} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-2 border border-emerald-100">
                                {amt}
                                <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeAmenity(index)} />
                            </span>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 ml-2">Description</label>
                    <textarea required rows="4" placeholder="Describe the natural beauty and sustainable features..." className="w-full px-6 py-4 rounded-3xl bg-white border border-stone-100 outline-none focus:ring-2 focus:ring-emerald-300 resize-none transition-all" onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData.description}></textarea>
                </div>

                {/* Image Upload */}
                <div className="relative border-2 border-dashed border-stone-300 rounded-[2rem] p-4 bg-stone-100/50 flex flex-col items-center justify-center min-h-[220px] hover:border-emerald-300 transition-all cursor-pointer">
                    {preview ? (
                        <div className="relative w-full h-64">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-[1.5rem]" />
                            <button type="button" onClick={() => {setImage(null); setPreview(null)}} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm text-red-500 rounded-full shadow-xl hover:bg-red-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                    ) : (
                        <label className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer py-10">
                            <div className="p-4 bg-emerald-50 rounded-full text-emerald-600">
                                <Upload size={32} />
                            </div>
                            <div className="text-center">
                                <span className="text-sm font-bold text-stone-700">Click to upload photo</span>
                                <p className="text-xs text-stone-500 mt-1">High-quality image of the eco-cabin</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                const file = e.target.files[0];
                                if(file) { setImage(file); setPreview(URL.createObjectURL(file)); }
                            }} />
                        </label>
                    )}
                </div>

                {/* Submit Button */}
                <button disabled={isSubmitting} className={`w-full py-6 rounded-full font-black text-lg text-white transition-all uppercase tracking-widest ${isSubmitting ? 'bg-stone-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-2xl hover:shadow-emerald-200 active:scale-[0.98]'}`}>
                    {isSubmitting ? "Processing..." : "Publish Cabin"}
                </button>
            </form>
        </motion.div>
    );
};

export default AddRoom;