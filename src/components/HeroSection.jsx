import React, { useState, useEffect } from 'react';
import { FaLeaf, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const images = {
        mainArch: "https://plus.unsplash.com/premium_photo-1685305380695-90e58a33d4e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWNvJTIwcmVzb3J0fGVufDB8fDB8fHww",
        hex1: "https://images.unsplash.com/photo-1758551940959-eacf38206d28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVjbyUyMHJlc29ydHxlbnwwfHwwfHx8MA%3D%3D",
        hex2: "https://plus.unsplash.com/premium_photo-1682285210821-5d1b5a406b97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVjbyUyMHJlc29ydHxlbnwwfHwwfHx8MA%3D%3D",
        hex3: "https://media.istockphoto.com/id/108312274/photo/thailand-bangkok-my-room-of-honeymoon.webp?a=1&b=1&s=612x612&w=0&k=20&c=fqv2RrFtimSEIRjs3hta-HYMsnvkKouKFAnq_gumY1o=",
        hex4: "https://media.istockphoto.com/id/1334118685/photo/computer-generated-image-of-interior-of-bathroom-in-3d-with-houseplant.webp?a=1&b=1&s=612x612&w=0&k=20&c=e8HQ9q8gl7Qf3IczAq9emZHjNcY_Gtb9GghMfe2KgKs=",
    };

    const hexClipPath = { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' };
    const imageClass = "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110";

    return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <div className="relative min-h-screen w-full bg-stone-50 overflow-hidden font-sans text-stone-900">
            {/* Background Layer with Soft Parallax */}
            <div className="absolute inset-0 z-0">
                <img
                    src={images.mainArch}
                    alt="Deep Forest"
                    // Removed heavy opacity, added subtle overlay
                    className="w-full h-full object-cover transform scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/70 to-transparent"></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col min-h-screen">

                {/* --- 1. Top Informational Bar - Light Theme --- */}
                <div className={`hidden lg:block border-b border-stone-200 py-3 transition-all duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'} bg-white/60 backdrop-blur-sm`}>
                    <div className="container mx-auto px-6 flex justify-between items-center text-xs text-stone-600 tracking-widest uppercase font-medium">
                        <div className="flex gap-8">
                            <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-emerald-700" /> Sreemangal</span>
                            <span className="flex items-center gap-2"><FaPhoneAlt className="text-emerald-700" /> +880 123 456 7890</span>
                            <span className="flex items-center gap-2"><FaEnvelope className="text-emerald-700" /> hello@eco.com</span>
                        </div>
                        <div className="flex gap-5 items-center text-emerald-700">
                            <FaFacebookF className="hover:text-emerald-900 cursor-pointer" />
                            <FaInstagram className="hover:text-emerald-900 cursor-pointer" />
                            <FaTwitter className="hover:text-emerald-900 cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* --- 2. Main Body Content --- */}
                <div className="flex-grow flex items-center py-10">
                    <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-10 items-center">

                        {/* Left Side: Content - Dark Text */}
                        <div className="lg:col-span-5 order-2 lg:order-1 space-y-1 text-center mt-[-50px] lg:text-left">
                            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100 backdrop-blur-sm">
                                <FaLeaf size={12} /> Sustainable Luxury
                            </span>
                            <h1 className="text-4xl md:text-7xl font-serif leading-[0.95] tracking-tight text-stone-950">
                                Reconnect with <br />
                                <span className="text-emerald-700 italic font-light">Nature.</span>
                            </h1>
                            <p className="text-stone-700 text-lg max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
                                Reconnect in the heart of the jungle.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                                <Link to={"/booking"}>
                                    {/* LIGHT THEME BUTTONS */}
                                    <button className="bg-emerald-700 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-950 transition-all rounded-full shadow-lg shadow-emerald-500/20">
                                        Book Journey
                                    </button>
                                </Link>
                                <Link to={'/activities'}>
                                    <button className="border border-stone-300 text-stone-900 px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-950 hover:text-white transition-all rounded-full backdrop-blur-sm">
                                        Our Cottages
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Image Complex Layout */}
                        <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center items-center h-[400px] md:h-[550px] lg:h-[650px] relative p-4 md:p-10">

                            {/* Main Arch Image - Light Styling */}
                            <div className="absolute w-[220px] h-[300px] md:w-[280px] md:h-[400px] lg:w-[320px] lg:h-[460px] rounded-t-[100px] overflow-hidden border-[6px] md:border-[8px] border-white shadow-2xl shadow-stone-200 z-20 group backdrop-blur-md bg-white/50">
                                <img src={images.mainArch} className={imageClass} alt="Main Arch" />
                            </div>

                            {/* Floating Hexagons - Light Styling */}
                            <div className="hidden lg:block absolute top-5 right-10 w-36 h-36 z-10 group backdrop-blur-sm border-4 border-white shadow-lg" style={hexClipPath}>
                                <img src={images.hex1} className={imageClass} alt="Hex 1" />
                            </div>

                            <div className="hidden lg:block absolute top-36 left-5 w-40 h-40 z-10 group backdrop-blur-sm border-4 border-white shadow-lg" style={hexClipPath}>
                                <img src={images.hex2} className={imageClass} alt="Hex 2" />
                            </div>

                            <div className="hidden lg:block absolute bottom-20 left-20 w-32 h-32 z-10 group backdrop-blur-sm border-4 border-white shadow-lg" style={hexClipPath}>
                                <img src={images.hex3} className={imageClass} alt="Hex 3" />
                            </div>

                            <div className="hidden lg:block absolute bottom-16 right-10 w-36 h-36 z-10 group backdrop-blur-sm border-4 border-white shadow-lg" style={hexClipPath}>
                                <img src={images.hex4} className={imageClass} alt="Hex 4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;