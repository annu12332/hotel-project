import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Loader2, X, Upload, CheckCircle } from 'lucide-react';
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
            console.log("Fetched gallery images:", res.data);  // Log the fetched gallery images
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

            // ২. ImgBB API-তে আপলোড (সরাসরি লিঙ্ক পাওয়ার জন্য)
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                formData
            );

            console.log("ImgBB Response:", response.data);  // Log the ImgBB response

            if (response.data.success) {
                // ImgBB থেকে পাওয়া সরাসরি লিঙ্ক
                const directLink = response.data.data.url;
                console.log("Direct image link:", directLink);  // Log the direct image URL

                // ৩. আপনার নিজের ব্যাকএন্ডে (MongoDB) সেভ করা
                const res = await axios.post('https://hotel-server-qryr.onrender.com/api/gallery', {
                    image: directLink,
                    title: title || "Hotel Moments"
                });

                console.log("Saved image data:", res.data);  // Log the saved image data in MongoDB

                setImages([res.data, ...images]);
                setIsModalOpen(false);
                setTitle("");
                setSelectedFile(null);
                setPreviewUrl("");
                alert("Image successfully uploaded via ImgBB!");
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
                console.log("Image deleted, remaining images:", images.filter(img => img._id !== id));  // Log remaining images after delete
                setImages(images.filter(img => img._id !== id));
            } catch (err) {
                alert("Delete failed!");
            }
        }
    };

    return (
        <div className="p-6 md:p-10 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-slate-800">Hotel Gallery</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg"
                >
                    <Plus size={20} /> Add New Photo
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-indigo-500" size={40} /></div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {images.map((img) => (
                        <div key={img._id} className="relative group bg-white rounded-3xl overflow-hidden h-64 shadow-md border border-slate-100">
                            <img
                                src={img.image} 
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                onError={(e) => {
                                    console.log("Image load failed for:", img.image);  // Log image load failures
                                    e.target.onerror = null; 
                                    e.target.src = "https://placehold.co/600x400?text=Broken+Link";
                                }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-5">
                                <p className="text-white font-semibold truncate mb-2">{img.title}</p>
                                <button
                                    onClick={() => handleDelete(img._id)}
                                    className="bg-red-500 text-white p-2 rounded-xl w-fit hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Upload to ImgBB</h2>
                                <X className="cursor-pointer text-slate-400" onClick={() => setIsModalOpen(false)} />
                            </div>
                            <form onSubmit={handleUpload} className="space-y-5">
                                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50">
                                    {previewUrl ? (
                                        <div className="relative">
                                            <img src={previewUrl} className="h-44 w-full mx-auto rounded-xl object-cover" alt="Preview" />
                                            <button onClick={() => {setPreviewUrl(""); setSelectedFile(null);}} className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md text-red-500"><X size={16}/></button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer block py-10">
                                            <Upload className="mx-auto text-indigo-500 mb-2" />
                                            <p className="text-sm font-medium text-slate-600">Click to upload photo</p>
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
                                    className="w-full p-4 bg-slate-100 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <button 
                                    type="submit" 
                                    disabled={uploading || !selectedFile}
                                    className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold disabled:opacity-50 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                                >
                                    {uploading ? "Uploading to ImgBB..." : "Publish to Gallery"}
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