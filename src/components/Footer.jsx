import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[#050505] pt-24 pb-12 overflow-hidden border-t border-white/5">
            {/* Background Decorative Text */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[15vw] font-serif text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
                ALMARIS ELITE
            </div>

            <div className="container mx-auto px-6 lg:px-20 relative z-10">
                {/* --- Top Section: Newsletter --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-20 border-b border-white/5">
                    <div data-aos="fade-right">
                        <span className="text-[#b59473] uppercase tracking-[0.5em] text-[10px] font-bold">Newsletter</span>
                        <h2 className="text-white text-3xl md:text-4xl font-serif mt-3 italic">Join the Elite Circle</h2>
                        <p className="text-gray-500 text-sm mt-4 max-w-md">Subscribe to receive exclusive offers and seasonal updates from our sanctuary.</p>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <form className="flex border-b border-[#b59473]/30 focus-within:border-[#b59473] transition-all py-2">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="w-full bg-transparent text-white text-sm outline-none px-2 placeholder:text-gray-700"
                            />
                            <button className="text-[#b59473] uppercase text-[10px] tracking-widest font-bold hover:text-white transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- Middle Section: Links --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <h3 className="text-white text-2xl font-serif tracking-tighter">ALMARIS<span className="text-[#b59473]">.</span></h3>
                        <p className="text-gray-500 text-xs leading-relaxed tracking-wide uppercase">
                            A sanctuary of refined elegance and timeless luxury. Experience the pinnacle of hospitality.
                        </p>
                        <div className="flex gap-5">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <motion.a
                                    key={i} href="#"
                                    whileHover={{ y: -3, color: '#b59473' }}
                                    className="text-white/40 transition-colors"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6 md:pl-10">
                        <h4 className="text-[#b59473] uppercase tracking-[0.3em] text-[10px] font-bold">Navigation</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Accommodations', 'Wellness', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-gray-400 hover:text-white text-[11px] uppercase tracking-widest transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Essential Links */}
                    <div className="space-y-6">
                        <h4 className="text-[#b59473] uppercase tracking-[0.3em] text-[10px] font-bold">Inquiries</h4>
                        <ul className="space-y-4">
                            {['Privacy Policy', 'Terms of Service', 'Booking Policy', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-gray-400 hover:text-white text-[11px] uppercase tracking-widest transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-[#b59473] uppercase tracking-[0.3em] text-[10px] font-bold">Address</h4>
                        <div className="space-y-4 text-gray-400 text-[11px] tracking-widest leading-loose">
                            <div className="flex items-start gap-3">
                                <MapPin size={14} className="text-[#b59473] shrink-0" />
                                <span>122 Luxury Row, <br /> Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={14} className="text-[#b59473] shrink-0" />
                                <span>+8801234567890</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={14} className="text-[#b59473] shrink-0" />
                                <span>demo@almaris.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Bottom Section: Copyright --- */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-600 text-[9px] uppercase tracking-[0.4em]">
                        © 2026 Almaris Luxury Hotel. All Rights Reserved.
                    </p>

                    {/* Back to Top */}
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-3 text-white/40 hover:text-[#b59473] transition-all"
                    >
                        <span className="text-[9px] uppercase tracking-[0.4em]">Back to Top</span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#b59473] transition-all">
                            <ArrowUp size={14} />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;