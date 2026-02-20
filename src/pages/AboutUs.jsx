import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Star, ShieldCheck, Award, Coffee } from 'lucide-react';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1200 });
    }, []);

    const stats = [
        { label: "Years of Heritage", value: "25+" },
        { label: "Luxury Suites", value: "120" },
        { label: "Global Awards", value: "15" },
        { label: "Happy Guests", value: "10k+" }
    ];

    return (
        <div className="bg-[#050505] text-white overflow-hidden">
            {/* --- Hero Section: Narrative Style --- */}
            <section className="relative h-[90vh] flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070" 
                        className="w-full h-full object-cover opacity-40 scale-110"
                        alt="Luxury Hotel Exterior"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl" data-aos="zoom-out">
                    <span className="text-[#b59473] uppercase tracking-[0.8em] text-[10px] font-bold block mb-6">Since 1998</span>
                    <h1 className="text-5xl md:text-8xl font-serif leading-tight mb-8">
                        The Art of <br /> <span className="italic font-light opacity-80 text-[#b59473]">Quiet Luxury</span>
                    </h1>
                    <div className="w-20 h-[1px] bg-[#b59473] mx-auto"></div>
                </div>
            </section>

            {/* --- Section 01: The Philosophy --- */}
            <section className="py-24 px-6 lg:px-20 container mx-auto">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2 relative" data-aos="fade-right">
                        <div className="border border-[#b59473]/20 p-4 rounded-t-full">
                            <img 
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" 
                                alt="Philosophy" 
                                className="rounded-t-full grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                        {/* Decorative Badge */}
                        <div className="absolute -bottom-10 -right-10 bg-[#b59473] p-10 rounded-full hidden md:block">
                            <Star className="text-black" size={40} />
                        </div>
                    </div>

                    <div className="lg:w-1/2 space-y-8" data-aos="fade-left">
                        <span className="text-[#b59473] uppercase tracking-[0.4em] text-[11px] font-bold">Our Philosophy</span>
                        <h2 className="text-4xl md:text-5xl font-serif">A Sanctuary for the Soul</h2>
                        <p className="text-gray-400 font-light leading-relaxed text-lg italic">
                            "At Almaris, we believe that luxury is not just about opulence, but about the profound sense of peace that comes from being perfectly cared for."
                        </p>
                        <p className="text-gray-500 font-light leading-relaxed">
                            Nestled in the heart of the French Riviera, Almaris was founded with a single vision: to redefine hospitality through the lens of timeless elegance. Every corner of our estate is designed to whisper sophistication and provide a refuge from the outside world.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Section 02: Stats / Achievements --- */}
            <section className="py-20 bg-white/[0.02] border-y border-white/5">
                <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center group" data-aos="fade-up" data-aos-delay={idx * 100}>
                            <h3 className="text-[#b59473] text-5xl font-serif mb-2 group-hover:scale-110 transition-transform duration-500">{stat.value}</h3>
                            <p className="text-gray-600 uppercase tracking-widest text-[10px] font-bold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Section 03: Values (Production Responsive Grid) --- */}
            <section className="py-24 px-6 lg:px-20 container mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif italic">Our Core Values</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: ShieldCheck, title: "Unrivaled Privacy", desc: "Discretion is our greatest service. Your sanctuary remains yours alone." },
                        { icon: Award, title: "Excellence", desc: "From Michelin-star dining to bespoke concierge, we settle for nothing less." },
                        { icon: Coffee, title: "Authenticity", desc: "Experience the true culture of the Riviera with our local heritage tours." }
                    ].map((val, idx) => (
                        <div key={idx} className="p-12 border border-white/5 bg-[#0a0a0a] hover:border-[#b59473]/30 transition-all duration-500 group">
                            <val.icon className="text-[#b59473] mb-8 group-hover:rotate-12 transition-transform" size={40} />
                            <h4 className="text-white text-xl font-serif mb-4">{val.title}</h4>
                            <p className="text-gray-500 text-sm font-light leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Section 04: The Founder's Note --- */}
            <section className="py-24 bg-[#080808] relative">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#b59473]/30 shrink-0">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974" alt="Founder" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-6" data-aos="fade-up">
                            <p className="text-2xl font-serif italic text-gray-300 leading-snug">
                                "We don't just sell rooms; we curate memories that last a lifetime. Almaris is my heart's work, and it is an honor to welcome you to our family."
                            </p>
                            <div>
                                <h5 className="text-[#b59473] font-bold uppercase tracking-widest text-xs">Julian Almaris</h5>
                                <p className="text-gray-600 text-[10px] uppercase mt-1">Founding Director & CEO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;