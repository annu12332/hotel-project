import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaLeaf, FaArrowRight, FaWind, FaUsers } from 'react-icons/fa';

const Accommodation = () => {
    const [displayRooms, setDisplayRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);

    useEffect(() => {
        AOS.init({ duration: 800, once: true }); // Faster AOS animation

        const fetchRooms = async () => {
            try {
                const response = await fetch('https://hotel-server-qryr.onrender.com/api/rooms');
                if (!response.ok) throw new Error('Failed to fetch from DB');
                const data = await response.json();
                setDisplayRooms(data.slice(0, 4));
            } catch (error) {
                console.error("Error fetching rooms:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    // Animation variants for cards
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        // NATURAL THEME BACKGROUND
        <section className="relative py-16 md:py-24 overflow-hidden bg-stone-50 text-stone-900">
            {/* --- Organic Decorative Background --- */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 via-stone-50 to-stone-50"></div>
                {/* Soft Abstract Shapes - More subtle */}
                <div className="absolute -top-40 -left-20 w-[400px] h-[400px] bg-emerald-100 rounded-full blur-[100px] opacity-40"></div>
                <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-stone-200 rounded-full blur-[100px] opacity-40"></div>
            </motion.div>
            
            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
                
                {/* --- Section Header - Compact --- */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="h-px w-8 bg-emerald-700/30"></span>
                        <span className="text-emerald-800 uppercase tracking-[0.2em] text-[10px] font-semibold flex items-center gap-2">
                            <FaLeaf size={10} /> Benttuury Awaits
                        </span>
                        <span className="h-px w-8 bg-emerald-700/30"></span>
                    </div>
                    
                    <h2 className="text-stone-950 text-4xl md:text-6xl font-serif tracking-tight leading-tight mb-4">
                        Your <span className="italic font-light text-emerald-700">Private</span> Oasis
                    </h2>
                    
                    <p className="text-stone-700 max-w-lg mx-auto text-base font-light leading-relaxed">
                        Thoughtfully designed to blend with the surrounding rainforest.
                    </p>
                </div>

                {/* --- Room Grid (Bento Style) - Compact --- */}
                {loading ? (
                    <div className="text-center text-emerald-700 font-serif italic text-lg animate-pulse py-16">
                        Preparing your sanctuary...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {displayRooms.map((room, index) => (
                            <motion.div 
                                key={room._id || index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={cardVariants}
                                whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
                                className={`group relative bg-white rounded-3xl p-5 shadow-lg shadow-stone-200/40 border border-stone-100 flex flex-col transition-all duration-300`}
                            >
                                {/* --- Card Top: Image --- */}
                                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-6">
                                    <img 
                                        src={room.thumbnail || room.image} 
                                        alt={room.type} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    
                                    {/* Price Badge */}
                                    <div className="absolute top-4 left-4 bg-white/50 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl shadow-inner">
                                        <div className="text-stone-950 text-xl font-serif">
                                            ${room.price}<span className="text-xs font-sans text-stone-600">/night</span>
                                        </div>
                                    </div>
                                </div>

                                {/* --- Card Bottom: Info --- */}
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className={`bg-emerald-50 text-emerald-800 text-[9px] uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full`}>
                                            {room.category || 'Luxury Suite'}
                                        </div>
                                        <div className="flex gap-2 text-stone-400 text-sm">
                                            <FaWind /> <FaUsers />
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-stone-950 text-2xl font-serif tracking-tight mb-2 group-hover:text-emerald-700 transition-colors">
                                        {room.type}
                                    </h3>
                                    
                                    <p className="text-stone-600 text-xs leading-relaxed font-light mb-6 flex-1 line-clamp-2">
                                        {room.description}
                                    </p>
                                    
                                    <Link 
                                        to={`/room/${room.slug || room._id}`}
                                        className="group/btn inline-flex items-center gap-2 text-emerald-800 font-semibold text-xs mt-auto"
                                    >
                                        Explore Sanctuary
                                        <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        <span className="absolute bottom-5 left-5 w-0 h-px bg-emerald-700 transition-all group-hover/btn:w-20"></span>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* --- Footer CTA - Compact --- */}
                <div className="mt-20 text-center" data-aos="fade-up">
                    <Link 
                        to="/all-rooms" 
                        className="group inline-flex items-center gap-3 bg-emerald-700 text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-500/10"
                    >
                        View All Escapes
                        <FaArrowRight size={10} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Accommodation;