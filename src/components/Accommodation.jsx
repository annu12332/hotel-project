import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BackgroundAnimator from './BackgroundAnimator'; 

const Accommodation = () => {
    const [displayRooms, setDisplayRooms] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1200, once: true, offset: 150 });

        const fetchRooms = async () => {
            try {
                const response = await fetch('/rooms.json');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setDisplayRooms(data.slice(0, 5));
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchRooms();
    }, []);

    return (
        <section className="relative py-24 overflow-hidden bg-[#050505]">
            <BackgroundAnimator />
            
            <div className="relative z-10 container mx-auto px-4 md:px-12">
                {/* --- Section Header --- */}
                <div className="text-center mb-16 md:mb-24" data-aos="fade-up">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="h-[1px] w-10 bg-[#b59473]/40"></span>
                        <span className="text-[#b59473] uppercase tracking-[0.8em] text-[10px] font-bold">The Sanctuary</span>
                        <span className="h-[1px] w-10 bg-[#b59473]/40"></span>
                    </div>
                    <h2 className="text-white text-4xl md:text-6xl font-serif mt-2 tracking-tight">
                        Exquisite <span className="italic font-light opacity-80 text-[#b59473]">Living</span>
                    </h2>
                </div>

                {/* --- Luxury Slim List --- */}
                <div className="flex flex-col space-y-12 md:space-y-0">
                    {displayRooms.map((room, index) => (
                        <motion.div 
                            key={room.id || index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className={`group flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                            min-h-fit md:min-h-[400px] relative`}
                        >
                            {/* --- Image Section (Golden Frame Effect) --- */}
                            <div className="relative w-full md:w-1/2 overflow-hidden h-[300px] md:h-[450px] shadow-2xl">
                                <motion.div 
                                    className="w-full h-full"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 1.5 }}
                                >
                                    <img 
                                        src={room.thumbnail} 
                                        alt={room.type} 
                                        className="w-full h-full object-cover" 
                                    />
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-black/20 group-hover:bg-transparent transition-all duration-1000"></div>
                                
                                {/* Luxury Price Badge (Mobile & Desktop) */}
                                <div className="absolute top-6 left-6 md:left-auto md:right-6 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2">
                                    <span className="text-[#b59473] text-[11px] font-bold tracking-widest leading-none block">FROM</span>
                                    <span className="text-white text-lg font-serif italic">${room.price}</span>
                                </div>
                            </div>

                            {/* --- Content Section (Floating Glass Effect for Mobile) --- */}
                            <div className={`flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 
                                bg-white/[0.02] backdrop-blur-sm border-x border-b md:border-none border-white/5
                                ${index % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                
                                <div className="space-y-3 mb-6">
                                    <div className={`flex items-center gap-4 text-[#b59473] text-[9px] uppercase tracking-[0.4em] font-semibold
                                        ${index % 2 !== 0 && 'md:flex-row-reverse'}`}>
                                        <span>{room.size}</span>
                                        <span className="w-1.5 h-[1px] bg-[#b59473]"></span>
                                        <span>{room.maxOccupancy.adults} Adults</span>
                                    </div>
                                    <h3 className="text-white text-3xl md:text-5xl font-serif leading-tight">
                                        {room.type}
                                    </h3>
                                </div>

                                <p className={`text-gray-400 text-sm md:text-base leading-relaxed font-light italic mb-8 max-w-sm
                                    ${index % 2 !== 0 && 'md:ml-auto md:text-right'}`}>
                                    "{room.description}"
                                </p>

                                {/* Interactive Button */}
                                <Link 
                                    to={`/room/${room.slug}`}
                                    className="inline-flex items-center group/btn relative"
                                >
                                    <span className="text-white text-[10px] uppercase tracking-[0.6em] font-bold mr-4 group-hover/btn:text-[#b59473] transition-colors duration-500">
                                        View Detail
                                    </span>
                                    <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[#b59473] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700"></div>
                                    </div>
                                </Link>
                            </div>

                            {/* Decorative Numbering (Desktop Only) */}
                            <span className={`hidden md:block absolute bottom-0 text-[120px] font-serif text-white/[0.03] pointer-events-none select-none
                                ${index % 2 === 0 ? 'right-0' : 'left-0'}`}>
                                0{index + 1}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* --- Elegant Footer CTA --- */}
                <div className="mt-24 text-center">
                    <Link 
                        to="/all-rooms" 
                        className="relative px-12 py-5 group inline-block"
                    >
                        <span className="absolute inset-0 border border-[#b59473]/30 group-hover:border-[#b59473] transition-all duration-700"></span>
                        <span className="absolute inset-0 bg-[#b59473] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></span>
                        <span className="relative z-10 text-white group-hover:text-black text-[11px] font-bold uppercase tracking-[0.6em] transition-colors duration-500">
                            Discover All Suites
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Accommodation;