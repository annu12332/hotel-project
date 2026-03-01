import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Icons updated for Brighter Eco-theme
import { Trash2, PlusCircle, Loader2, X, UploadCloud, Leaf, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

const ManageGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    // ImgBB API Key
    const IMGBB_API_KEY = '2d6032277c0bc613df8a152349242bef'; 

    const fetchGallery = async () => {
        try {
            const res = await axios.get('https://hotel-server-qryr.onrender.com/api/gallery');
            setImages(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchGallery(); 
    }, []);

    // Upload image handler
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        setUploading(true);

        try {
            // ১. ImgBB-তে পাঠানোর জন্য ডাটা তৈরি
            const formData = new FormData();
            formData.append("image", selectedFile);

            // ২. ImgBB API-তে আপলোড (সরাসরি লিঙ্ক পাওয়ার জন্য)
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                formData
            );

            if (response.data.success) {
                // ImgBB থেকে পাওয়া সরাসরি লিঙ্ক
                const directLink = response.data.data.url;

                // ৩. আপনার নিজের ব্যাকএন্ডে (MongoDB) সেভ করা
                const res = await axios.post('https://hotel-server-qryr.onrender.com/api/gallery', {
                    image: directLink,
                    title: title || "Hotel Moments"
                });

                setImages([res.data, ...images]);
                setIsModalOpen(false);
                setTitle("");
                setSelectedFile(null);
                setPreviewUrl("");
                alert("Image successfully uploaded!");
            }
        } catch (err) {
            console.error("Upload error details:", err);
            alert("Upload failed! Check your internet or API key.");
        } finally {
            setUploading(false);
        }
    };

    // Handle image delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this photo?")) {
            try {
                await axios.delete(`https://hotel-server-qryr.onrender.com/api/gallery/${id}`);
                setImages(images.filter(img => img._id !== id));
            } catch (err) {
                alert("Delete failed!");
            }
        }
    };

    return (
        <div className="p-6 md:p-10 bg-stone-50 min-h-screen font-sans">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                        <ImageIcon size={24} />
                    </div>
                    <h1 className="text-3xl font-black text-stone-900 tracking-tight">Hotel Gallery</h1>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 font-semibold"
                >
                    <PlusCircle size={20} /> Add New Photo
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-emerald-500" size={40} /></div>
            ) : images.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-stone-200">
                    <Leaf size={40} className="mx-auto text-stone-300 mb-4" />
                    <p className="text-stone-400 font-bold uppercase tracking-widest text-sm">No images in gallery</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {images.map((img) => (
                        <div key={img._id} className="relative group bg-white rounded-3xl overflow-hidden h-72 shadow-sm border border-stone-100">
                            <img
                                src={img.image} 
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = "https://placehold.co/600x400?text=Broken+Link";
                                }}
                            />
                            <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-5">
                                <p className="text-white font-bold truncate mb-3">{img.title}</p>
                                <button
                                    onClick={() => handleDelete(img._id)}
                                    className="bg-red-500 text-white p-3 rounded-full w-fit hover:bg-red-600 transition-colors shadow-lg"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-black text-stone-900">Upload to Gallery</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-red-500 p-2">
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleUpload} className="space-y-5">
                                <div className="border-2 border-dashed border-stone-200 rounded-3xl p-4 text-center bg-stone-50 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
                                    {previewUrl ? (
                                        <div className="relative">
                                            <img src={previewUrl} className="h-48 w-full mx-auto rounded-2xl object-cover" alt="Preview" />
                                            <button onClick={() => {setPreviewUrl(""); setSelectedFile(null);}} className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg text-red-500 hover:bg-red-50">
                                                <X size={18}/>
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer block py-10">
                                            <UploadCloud className="mx-auto text-emerald-500 mb-3" size={32} />
                                            <p className="text-sm font-bold text-stone-600">Click to upload photo</p>
                                            <p className="text-xs text-stone-400 mt-1">PNG, JPG or WEBP</p>
                                            <input type="file" className="hidden" onChange={(e) => {
                                                const file = e.target.files[0];
                                                if(file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); }
                                            }} accept="image/*" />
                                        </label>
                                    )}
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Photo Title" 
                                    className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-200 focus:bg-white transition-all"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <button 
                                    type="submit" 
                                    disabled={uploading || !selectedFile}
                                    className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-bold disabled:opacity-50 hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all text-lg"
                                >
                                    {uploading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Uploading...</span>
                                        </div>
                                    ) : "Publish to Gallery"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageGallery;