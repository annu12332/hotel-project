import React from 'react';
import { motion } from 'framer-motion';
// Icons stay the same, colors will be adjusted
import { Leaf, Droplets, Utensils, Mountain, Wifi, Wind } from 'lucide-react';

const Facilities = () => {
    // Updated facility list to fit Eco-Resort concept
    const facilityList = [
        { icon: <Leaf size={18} />, title: "Eco-Friendly Design", desc: "Sustainable materials used." },
        { icon: <Droplets size={18} />, title: "Rainforest Spa", desc: "Organic treatments & rituals." },
        { icon: <Utensils size={18} />, title: "Farm-to-Table", desc: "Locally sourced organic food." },
        { icon: <Mountain size={18} />, title: "Guided Trekking", desc: "Explore pristine nature trails." },
        { icon: <Wind size={18} />, title: "Yoga Pavilion", desc: "Open-air tranquility sessions." },
        { icon: <Wifi size={18} />, title: "Digital Detox", desc: "Limited Wi-Fi, full immersion." },
    ];

    // Images to reflect jungle/eco vibe
    const images = [
        "https://images.unsplash.com/photo-1542314838-090c377f0a10?q=80&w=800", // Eco resort view
        "https://images.unsplash.com/photo-1596700021077-84a86b0391d1?q=80&w=500", // Tropical plants
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=500", // Zen/Spa
        "https://images.unsplash.com/photo-1519961655386-85fa3c004a25?q=80&w=500", // Cozy interior
    ];

    return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <section className="relative py-24 bg-stone-50 text-stone-900 overflow-hidden px-6">
            {/* Background Glows - Softened for Light Theme */}
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-100 blur-[120px] rounded-full opacity-60" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-stone-200 blur-[100px] rounded-full opacity-60" />
            
            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* --- Header --- */}
                <div className="text-center mb-20">
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        // DARKER GREEN FOR LIGHT THEME
                        className="text-emerald-700 text-[10px] font-bold tracking-[0.5em] uppercase mb-3"
                    >
                        Conscious Living
                    </motion.p>
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        // DARK TEXT FOR HEADLINE
                        className="text-4xl md:text-5xl font-serif text-stone-950 italic"
                    >
                        Resort <span className='text-emerald-700/90'>Amenities</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* LEFT: Compact Bento Gallery */}
                    <div className="lg:col-span-6 grid grid-cols-6 grid-rows-5 gap-3 h-[400px] md:h-[500px]">
                        <div className="col-span-4 row-span-3 rounded-2xl overflow-hidden border border-stone-100 shadow-xl shadow-stone-100">
                            <img src={images[0]} className="w-full h-full object-cover hover:scale-105 transition-all duration-700" alt="Resort" />
                        </div>
                        <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden border border-stone-100 shadow-md">
                            <img src={images[1]} className="w-full h-full object-cover" alt="Tropical plants" />
                        </div>
                        <div className="col-span-2 row-span-3 rounded-2xl overflow-hidden border border-stone-100 shadow-md">
                            <img src={images[2]} className="w-full h-full object-cover" alt="Spa" />
                        </div>
                        {/* Light Cream Placeholder */}
                        <div className="col-span-4 row-span-2 bg-stone-100 rounded-2xl border border-stone-200 flex items-center justify-center">
                            <span className="text-emerald-800/60 font-serif italic text-lg tracking-widest uppercase">Pure Nature</span>
                        </div>
                    </div>

                    {/* RIGHT: List */}
                    <div className="lg:col-span-6 grid grid-cols-2 gap-3 md:gap-4">
                        {facilityList.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                // LIGHT CARDS, SUBTLE BORDERS
                                className="group p-5 bg-white rounded-2xl border border-stone-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-500"
                            >
                                <div className="flex flex-col gap-4">
                                    {/* ICON BG AND COLOR */}
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                        {item.icon}
                                    </div>
                                    <div>
                                        {/* TEXT COLORS */}
                                        <h4 className="text-stone-950 font-serif text-sm md:text-base group-hover:text-emerald-700 transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-stone-600 text-[10px] md:text-xs mt-1 leading-relaxed line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Facilities;