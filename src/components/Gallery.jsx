import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios'; 

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await axios.get('https://hotel-server-qryr.onrender.com/api/gallery');
                setImages(res.data);
            } catch (err) {
                console.error("Gallery Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    if (loading && images.length === 0) {
        return (
            // LIGHT THEME LOADING
            <div className="py-24 bg-stone-50 flex justify-center items-center">
                <Loader2 className="animate-spin text-emerald-600" size={30} />
            </div>
        );
    }

    const duplicatedImages = [...images, ...images];

    return (
        // LIGHT THEME BACKGROUND
        <section className="py-24 bg-stone-50 overflow-hidden text-stone-900">
            {/* --- Header Section --- */}
            <div className="container mx-auto px-6 mb-12 text-center md:text-left">
                <div data-aos="fade-right">
                    {/* DARKER GREEN TEXT */}
                    <span className="text-emerald-700 uppercase tracking-[0.5em] text-[10px] font-bold">
                        Nature's Gallery
                    </span>
                    {/* DARK TEXT */}
                    <h2 className="text-stone-950 text-4xl md:text-5xl font-serif mt-3 italic">
                        Visual Sanctuary
                    </h2>
                </div>
            </div>

            {/* --- Infinite Scroll Row --- */}
            <div className="relative flex overflow-hidden group mb-16">
                {images.length > 0 ? (
                    <motion.div 
                        className="flex gap-4 pr-4"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ 
                            ease: "linear", 
                            duration: images.length * 8, 
                            repeat: Infinity 
                        }}
                    >
                        {duplicatedImages.map((img, idx) => (
                            <div 
                                key={idx} 
                                // LIGHT THEME CARD STYLE
                                className="relative w-[300px] md:w-[450px] h-[250px] md:h-[350px] shrink-0 overflow-hidden rounded-2xl border border-stone-100 shadow-lg shadow-stone-100"
                            >
                                <img 
                                    src={img.image} 
                                    alt={img.title || "Gallery Image"} 
                                    className="w-full h-full object-cover transition-all duration-1000 hover:scale-110 grayscale-[5%]"
                                />
                                {/* Light Overlay */}
                                <div className="absolute inset-0 bg-stone-950/5"></div>
                                
                                {/* Light Hover Label */}
                                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/70 p-3 backdrop-blur-sm rounded-lg shadow-md">
                                    <span className="text-stone-950 text-[10px] uppercase tracking-[0.3em] font-serif font-bold">
                                        {img.title || 'Resort Haven'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="w-full text-center text-stone-500 py-10">No photos found in gallery.</div>
                )}
            </div>

            {/* --- See All Photos Button --- */}
            <div className="flex justify-center" data-aos="fade-up">
                <Link 
                    to="/gallery" 
                    // LIGHT THEME BUTTON STYLE
                    className="group flex items-center gap-4 text-stone-950 hover:text-emerald-700 transition-all border border-stone-200 px-8 py-4 rounded-full hover:border-emerald-300 hover:bg-emerald-50"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Explore All</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:bg-emerald-100">
                        <ArrowRight size={16} />
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default Gallery;