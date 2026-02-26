import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BackgroundAnimator from './BackgroundAnimator'; 

const Accommodation = () => {
    const [displayRooms, setDisplayRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 1200, once: true, offset: 150 });

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

    return (
        <section className="relative py-20 md:py-32 overflow-hidden bg-[#050505]">
            <BackgroundAnimator />
            
            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
                {/* --- Section Header --- */}
                <div className="text-center mb-20" data-aos="fade-up">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="h-[1px] w-8 md:w-12 bg-[#b59473]/40"></span>
                        <span className="text-[#b59473] uppercase tracking-[0.6em] text-[10px] md:text-xs font-bold italic">The Sanctuary</span>
                        <span className="h-[1px] w-8 md:w-12 bg-[#b59473]/40"></span>
                    </div>
                    <h2 className="text-white text-5xl md:text-7xl font-serif tracking-tight leading-tight">
                        Exquisite <span className="italic font-light text-[#b59473]/90">Living</span>
                    </h2>
                </div>

                {/* --- Luxury List --- */}
                <div className="flex flex-col gap-16 md:gap-0">
                    {loading ? (
                        // Simple Skeleton Loader
                        <div className="h-64 flex items-center justify-center text-[#b59473] font-serif italic animate-pulse">
                            Loading Sanctuary...
                        </div>
                    ) : (
                        displayRooms.map((room, index) => (
                            <motion.div 
                                key={room._id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`group flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                                min-h-[450px] relative items-stretch mb-0 md:mb-12`}
                            >
                                {/* --- Image Section --- */}
                                <div className="relative w-full md:w-[55%] overflow-hidden aspect-[4/3] md:aspect-auto shadow-2xl z-20">
                                    <motion.img 
                                        loading="lazy"
                                        src={room.thumbnail || room.image} 
                                        alt={room.type} 
                                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ duration: 1.5 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:opacity-40 transition-opacity duration-700"></div>
                                    
                                    {/* Price Badge */}
                                    <div className="absolute top-8 left-8 md:left-auto md:right-8 bg-black/60 backdrop-blur-md border border-[#b59473]/30 px-5 py-3 flex flex-col items-center">
                                        <span className="text-[#b59473] text-[9px] font-bold tracking-[0.3em]">STARTING AT</span>
                                        <span className="text-white text-xl font-serif">${room.price}</span>
                                    </div>
                                </div>

                                {/* --- Content Section --- */}
                                <div className={`flex-1 flex flex-col justify-center p-10 md:p-16 lg:p-20 
                                    bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 relative z-30
                                    ${index % 2 === 0 ? 'md:-ml-12' : 'md:-mr-12'} 
                                    my-auto shadow-2xl transition-transform duration-700 group-hover:-translate-y-2`}>
                                    
                                    <div className="space-y-4 mb-8">
                                        <div className={`flex items-center gap-3 text-[#b59473] text-[10px] uppercase tracking-[0.3em] font-medium
                                            ${index % 2 !== 0 && 'md:flex-row-reverse'}`}>
                                            <span className="bg-[#b59473]/10 px-2 py-0.5">{room.size}</span>
                                            <span className="w-4 h-[1px] bg-[#b59473]/50"></span>
                                            <span>{room.maxOccupancy?.adults || room.adults || 2} Adults</span>
                                        </div>
                                        <h3 className="text-white text-3xl md:text-5xl font-serif tracking-wide group-hover:text-[#b59473] transition-colors duration-500">
                                            {room.type}
                                        </h3>
                                    </div>

                                    <p className={`text-gray-400 text-sm md:text-base leading-relaxed font-light italic mb-10
                                        ${index % 2 !== 0 && 'md:text-right'}`}>
                                        "{room.description}"
                                    </p>

                                    {/* Interactive Button */}
                                    <div className={index % 2 !== 0 ? 'md:ml-auto' : ''}>
                                        <Link 
                                            to={`/room/${room.slug || room._id}`}
                                            className="inline-flex items-center gap-6 group/btn"
                                        >
                                            <span className="text-white text-[11px] uppercase tracking-[0.5em] font-bold group-hover/btn:text-[#b59473] transition-all duration-300">
                                                Explore Suite
                                            </span>
                                            <div className="relative w-16 h-[1px] bg-white/20 overflow-hidden">
                                                <div className="absolute inset-0 bg-[#b59473] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                {/* Decorative Index */}
                                <span className={`hidden lg:block absolute -bottom-6 text-[150px] font-serif text-white/[0.02] pointer-events-none leading-none
                                    ${index % 2 === 0 ? 'right-0' : 'left-0'}`}>
                                    0{index + 1}
                                </span>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* --- Footer CTA --- */}
                <div className="mt-32 text-center" data-aos="fade-up">
                    <Link 
                        to="/all-rooms" 
                        className="group relative inline-flex items-center justify-center px-16 py-6 overflow-hidden border border-[#b59473]/40"
                    >
                        <span className="absolute inset-0 bg-[#b59473] transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0"></span>
                        <span className="relative z-10 text-white group-hover:text-black text-[12px] font-bold uppercase tracking-[0.5em] transition-colors duration-500">
                            Discover All Suites
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Accommodation;