import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('/gallery.json')
            .then(res => res.json())
            .then(data => setImages(data));
    }, []);

    // Double the images array for infinite loop effect
    const duplicatedImages = [...images, ...images];

    return (
        <section className="py-24 bg-[#050505] overflow-hidden">
            {/* --- Header Section --- */}
            <div className="container mx-auto px-6 mb-12 text-center md:text-left">
                <div data-aos="fade-right">
                    <span className="text-[#b59473] uppercase tracking-[0.5em] text-[10px] font-bold">Visual Journey</span>
                    <h2 className="text-white text-4xl md:text-5xl font-serif mt-3 italic">Capturing Elegance</h2>
                </div>
            </div>

            {/* --- Infinite Scroll Row --- */}
            <div className="relative flex overflow-hidden group mb-16">
                <motion.div 
                    className="flex gap-4 pr-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                        ease: "linear", 
                        duration: 30, 
                        repeat: Infinity 
                    }}
                >
                    {duplicatedImages.map((img, idx) => (
                        <div 
                            key={idx} 
                            className="relative w-[300px] md:w-[450px] h-[250px] md:h-[350px] shrink-0 overflow-hidden rounded-sm"
                        >
                            <img 
                                src={img.url} 
                                alt={img.title} 
                                // Grayscale remove kora hoyeche, ekhon chobi colorful hobe
                                className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 p-2 backdrop-blur-sm">
                                <span className="text-white text-[10px] uppercase tracking-[0.3em] font-serif">{img.title}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* --- See All Photos Button (At the bottom) --- */}
            <div className="flex justify-center" data-aos="fade-up">
                <Link 
                    to="/gallery" 
                    className="group flex items-center gap-4 text-white hover:text-[#b59473] transition-all border border-white/10 px-8 py-4 rounded-full hover:border-[#b59473]"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">See All Photos</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all">
                        <ArrowRight size={16} />
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default Gallery;