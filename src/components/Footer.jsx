import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-stone-950 pt-20 pb-10 overflow-hidden border-t border-emerald-950/40 text-stone-300">
            {/* Background Decorative Text */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[15vw] font-serif text-emerald-950/[0.04] whitespace-nowrap pointer-events-none select-none">
                ALMARIS
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* --- Column 1: Brand --- */}
                    <div className="space-y-4" data-aos="fade-up">
                        <h3 className="text-white text-3xl font-serif tracking-tighter">ALMARIS<span className="text-emerald-500">.</span></h3>
                        <p className="text-stone-400 text-xs leading-relaxed max-w-xs">
                            A sanctuary of refined sustainability and organic luxury. Experience mindful hospitality.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {[Instagram, Twitter].map((Icon, i) => (
                                <motion.a
                                    key={i} href="#"
                                    whileHover={{ y: -3, borderColor: '#34d399', backgroundColor: '#064e3b33' }}
                                    className="p-3 rounded-full bg-stone-900 border border-emerald-950 text-stone-400 transition-colors"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* --- Column 2: Quick Links --- */}
                    <div data-aos="fade-up" data-aos-delay="100">
                        <h4 className="text-emerald-400 uppercase tracking-[0.2em] text-[11px] font-bold mb-5">Explore</h4>
                        <ul className="space-y-3.5">
                            {['Our Story', 'Accommodations', 'Wellness Spa', 'Organic Dining', 'Experiences'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-stone-400 hover:text-white text-[12px] transition-colors relative group/link inline-block">
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover/link:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- Column 3: Support --- */}
                    <div data-aos="fade-up" data-aos-delay="200">
                        <h4 className="text-emerald-400 uppercase tracking-[0.2em] text-[11px] font-bold mb-5">Support</h4>
                        <ul className="space-y-3.5">
                            {['Booking FAQ', 'Sustainability Policy', 'Terms of Service', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-stone-400 hover:text-white text-[12px] transition-colors relative group/link inline-block">
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover/link:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- Column 4: Contact --- */}
                    <div data-aos="fade-up" data-aos-delay="300">
                        <h4 className="text-emerald-400 uppercase tracking-[0.2em] text-[11px] font-bold mb-5">Contact Us</h4>
                        <ul className="space-y-4 text-[12px] text-stone-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                <span>122 Hidden Valley,<br /> Sylhet, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3 hover:text-white transition-colors">
                                <Phone size={16} className="text-emerald-500 shrink-0" />
                                <a href="tel:+8801234567890">+880 1234-567890</a>
                            </li>
                            <li className="flex items-center gap-3 hover:text-white transition-colors">
                                <Mail size={16} className="text-emerald-500 shrink-0" />
                                <a href="mailto:nature@almaris.com">nature@almaris.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* --- Bottom Bar --- */}
                <div className="mt-16 pt-8 border-t border-emerald-950/30 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-stone-600 text-[10px] uppercase tracking-[0.3em]">
                        © 2026 Almaris Eco-Resort. Nurturing Nature.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-3 text-stone-500 hover:text-emerald-400 transition-all"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em]">Back to Top</span>
                        <div className="w-10 h-10 rounded-full border border-emerald-950 flex items-center justify-center group-hover:border-emerald-500 transition-all group-hover:bg-emerald-950/50">
                            <Leaf size={16} className='group-hover:rotate-12 transition-transform'/>
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;