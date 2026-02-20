import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const AllPhotos = () => {
    const [images, setImages] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch('/gallery.json')
            .then(res => res.json())
            .then(data => setImages(data));
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6 lg:px-20">
            {/* Header */}
            <div className="text-center mb-20">
                <span className="text-[#b59473] uppercase tracking-[0.8em] text-[10px] font-bold">Gallery</span>
                <h1 className="text-white text-5xl md:text-7xl font-serif mt-4">The Collection</h1>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {images.map((img) => (
                    <motion.div 
                        key={img.id}
                        layoutId={img.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => setSelectedImg(img)}
                        className="relative cursor-zoom-in group overflow-hidden border border-white/5"
                    >
                        <img 
                            src={img.url} 
                            alt={img.title} 
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-[#b59473]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                ))}
            </div>

            {/* Lightbox / Modal */}
            {selectedImg && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10">
                    <button 
                        onClick={() => setSelectedImg(null)}
                        className="absolute top-10 right-10 text-white/50 hover:text-white transition-all"
                    >
                        <X size={40} />
                    </button>
                    <motion.img 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        src={selectedImg.url} 
                        className="max-w-full max-h-full object-contain shadow-2xl"
                    />
                    <p className="absolute bottom-10 text-[#b59473] font-serif text-2xl italic tracking-widest">{selectedImg.title}</p>
                </div>
            )}
        </div>
    );
};

export default AllPhotos;