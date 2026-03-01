import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

const AllPhotos = () => {
    const [images, setImages] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch images from API
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch('https://hotel-server-qryr.onrender.com/api/gallery')
            .then(res => res.json())
            .then(data => {
                console.log("Fetched images:", data);
                setImages(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <div className="min-h-screen bg-stone-50 pt-32 pb-20 px-6 lg:px-20">
            {/* Header */}
            <div className="text-center mb-20">
                <span className="text-emerald-700 uppercase tracking-[0.8em] text-[10px] font-bold">Our Gallery</span>
                <h1 className="text-stone-950 text-5xl md:text-7xl font-serif mt-4 italic">Nature's Collection</h1>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="text-emerald-700 animate-spin" size={40} />
                </div>
            ) : (
                /* Masonry Grid */
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {images.map((img) => (
                        <motion.div 
                            key={img._id}
                            layoutId={img._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedImg(img)}
                            // LIGHT THEME: Border updated
                            className="relative cursor-zoom-in group overflow-hidden border border-emerald-100 rounded-sm shadow-sm"
                        >
                            <img 
                                src={img.image}
                                alt={img.title}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    console.log("Image load failed for:", img.image);
                                    e.target.onerror = null; 
                                    e.target.src = "https://placehold.co/600x400?text=Eco+Resort"; // Placeholder
                                }}
                            />
                            {/* Overlay on hover - Eco Theme */}
                            <div className="absolute inset-0 bg-emerald-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                <p className="text-white font-serif italic text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {img.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-10 backdrop-blur-sm"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={() => setSelectedImg(null)}
                            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-all z-[110]"
                        >
                            <X size={40} />
                        </button>

                        <div className="relative flex flex-col items-center max-w-5xl w-full h-full justify-center">
                            <motion.img 
                                layoutId={selectedImg._id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                src={selectedImg.image}
                                alt={selectedImg.title}
                                // LIGHT THEME: Image border
                                className="max-w-full max-h-[80vh] object-contain shadow-2xl border-4 border-white"
                            />
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 text-center"
                            >
                                <p className="text-white font-serif text-2xl md:text-3xl italic tracking-widest">
                                    {selectedImg.title}
                                </p>
                                {selectedImg.category && (
                                    <span className="text-emerald-300 text-[10px] uppercase tracking-[0.4em] mt-2 block">
                                        {selectedImg.category}
                                    </span>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AllPhotos;