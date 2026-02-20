import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import BackgroundAnimator from './BackgroundAnimator';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-transparent overflow-hidden">

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col min-h-screen">
                
                {/* --- 1. Top Informational Bar (Cleaned Up) --- */}
                <div className={`hidden lg:block border-b border-white/10 py-3 transition-all duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="container mx-auto px-6 flex justify-between items-center text-[11px] text-gray-300 tracking-widest uppercase">
                        <div className="flex gap-8">
                            <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-[#b59473]" /> Dhaka, Bangladesh</span>
                            <span className="flex items-center gap-2"><FaPhoneAlt className="text-[#b59473]" /> +123 456 7890</span>
                            <span className="flex items-center gap-2"><FaEnvelope className="text-[#b59473]" /> demo@almaris.com</span>
                        </div>
                        <div className="flex gap-5 items-center">
                            <FaFacebookF className="hover:text-white cursor-pointer transition-colors" />
                            <FaInstagram className="hover:text-white cursor-pointer transition-colors" />
                            <FaTwitter className="hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>

                {/* --- 2. Main Body Content --- */}
                <div className="flex-grow flex items-center py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-12 gap-12 items-center">
                            
                            {/* Left Side: Main Heading & Description */}
                            <div className="lg:col-span-5 text-left order-2 lg:order-1">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-[1px] bg-[#b59473]"></div>
                                        <span className="text-[#b59473] uppercase tracking-[0.4em] text-xs font-bold">Luxury Hotel & Resort</span>
                                    </div>
                                    
                                    <h1 className="text-white text-5xl md:text-7xl font-serif leading-tight">
                                        Welcome To <br /> 
                                        <span className="text-[#b59473] italic">Almaris</span> Hotel
                                    </h1>
                                    
                                    <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-md font-light">
                                        Immerse yourself in the epitome of luxury at Almaris. Our hotel redefines elegance and comfort, offering an exquisite escape for discerning travelers.
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <Link to={"/reservation"}><button className="bg-[#b59473] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#967a5e] transition-all rounded-sm shadow-xl">
                                            Book Your Stay
                                        </button></Link>
                                        <Link to={'/all-rooms'}><button className="border border-white/20 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-sm">
                                            View Rooms
                                        </button></Link>
                                    </div>
                                </div>
                            </div>

                            {/* Center: Hero Image (The Arch) */}
                            <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
                                <div className="relative group">
                                    {/* The Arch Shape */}
                                    <div className="w-[280px] h-[400px] md:w-[350px] md:h-[500px] rounded-t-full overflow-hidden border-[8px] border-white/5 shadow-2xl relative z-10">
                                        <img
                                            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            alt="Lobby"
                                        />
                                    </div>
                                    
                                    {/* Floating Stats Badge */}
                                    <div className="absolute -bottom-6 -right-6 md:-right-10 bg-[#111] p-6 border-l-4 border-[#b59473] shadow-2xl z-20">
                                        <p className="text-white text-3xl font-bold leading-none">120+</p>
                                        <p className="text-[#b59473] text-[9px] uppercase tracking-widest mt-2 font-bold">Rooms Available</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Quote/Subtext */}
                            <div className="lg:col-span-3 lg:flex flex-col items-end text-right hidden order-3">
                                <div className="space-y-8">
                                    <div className="text-[#b59473] text-4xl font-serif opacity-30">“</div>
                                    <p className="text-gray-400 text-sm italic uppercase tracking-[0.2em] leading-loose max-w-[200px]">
                                        Discover the perfect blend of luxury, comfort, and convenience at Almaris.
                                    </p>
                                    <div className="flex justify-end gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-[#b59473] text-[10px]">★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;