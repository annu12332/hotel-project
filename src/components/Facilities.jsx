import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Monitor, Wifi, Lock, Mountain, Building2 } from 'lucide-react';

const Facilities = () => {
    const facilityList = [
        { icon: <Tv size={18} />, title: "Premium TV", desc: "4K Ultra HD experience." },
        { icon: <Monitor size={18} />, title: "Workspace", desc: "Ergonomic business setup." },
        { icon: <Wifi size={18} />, title: "Free Wi-Fi", desc: "High-speed connectivity." },
        { icon: <Lock size={18} />, title: "Private Safe", desc: "Secure your valuables." },
        { icon: <Mountain size={18} />, title: "Mountain", desc: "Breathtaking peak views." },
        { icon: <Building2 size={18} />, title: "City View", desc: "Urban skyline scenery." },
    ];

    const images = [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=500",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=500",
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=500",
    ];

    return (
        <section className="relative py-24 bg-[#050505] overflow-hidden px-6">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#b59473]/10 blur-[100px] rounded-full" />
            
            {/* max-w-6xl use kora hoyeche jate boro screen-e duipashe khali jayga thake (centered look) 
            */}
            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* --- Header --- */}
                <div className="text-center mb-16">
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[#b59473] text-[10px] font-bold tracking-[0.5em] uppercase mb-3"
                    >
                        Luxury Amenities
                    </motion.p>
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-white italic"
                    >
                        Our Facilities
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* LEFT: Compact Bento Gallery (Hidden on very small mobile if needed, or scaled) */}
                    <div className="lg:col-span-6 grid grid-cols-6 grid-rows-5 gap-3 h-[400px] md:h-[500px]">
                        <div className="col-span-4 row-span-3 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                            <img src={images[0]} className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-700" alt="Resort" />
                        </div>
                        <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden border border-white/5">
                            <img src={images[1]} className="w-full h-full object-cover grayscale-[40%]" alt="Bed" />
                        </div>
                        <div className="col-span-2 row-span-3 rounded-2xl overflow-hidden border border-white/5">
                            <img src={images[2]} className="w-full h-full object-cover grayscale-[40%]" alt="Decor" />
                        </div>
                        <div className="col-span-4 row-span-2 bg-[#111] rounded-2xl border border-[#b59473]/20 flex items-center justify-center">
                            <span className="text-white/40 font-serif italic text-lg tracking-widest uppercase">Almaris</span>
                        </div>
                    </div>

                    {/* RIGHT: List - 2 Columns on Small Screen, 2 Columns on Desktop */}
                    <div className="lg:col-span-6 grid grid-cols-2 gap-3 md:gap-4">
                        {facilityList.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                // bg-black/60 and backdrop-blur-xl for Dark Blur effect
                                className="group p-4 md:p-5 bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl hover:border-[#b59473]/40 transition-all duration-500"
                            >
                                <div className="flex flex-col gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#b59473]/10 flex items-center justify-center text-[#b59473] group-hover:bg-[#b59473] group-hover:text-black transition-all">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-serif text-sm md:text-base group-hover:text-[#b59473] transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 text-[9px] md:text-[10px] mt-1 leading-tight line-clamp-2">
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