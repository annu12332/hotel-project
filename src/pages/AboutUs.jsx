import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Leaf, ShieldCheck, Award, Coffee } from 'lucide-react'; // Star -> Leaf

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1200 });
    }, []);

    // ইকো রিসোর্টের সাথে সামঞ্জস্যপূর্ণ পরিসংখ্যান
    const stats = [
        { label: "Eco Conscious", value: "100%" },
        { label: "Acres of Jungle", value: "50+" },
        { label: "Local Species", value: "200+" },
        { label: "Happy Guests", value: "10k+" }
    ];

    return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <div className="bg-stone-50 text-stone-900 overflow-hidden">
            {/* --- Hero Section: Narrative Style --- */}
            <section className="relative h-[90vh] flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070" 
                        // LIGHT THEME: Removed heavy opacity
                        className="w-full h-full object-cover opacity-80 scale-105"
                        alt="Luxury Hotel Exterior"
                    />
                    {/* LIGHT THEME: Gradient updated to match light background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/50 to-stone-50"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl" data-aos="zoom-out">
                    <span className="text-emerald-700 uppercase tracking-[0.8em] text-[10px] font-bold block mb-6">Sustainable Paradise</span>
                    <h1 className="text-5xl md:text-8xl font-serif leading-tight mb-8 text-stone-950">
                        The Art of <br /> <span className="italic font-light opacity-90 text-emerald-700">Eco Luxury</span>
                    </h1>
                    <div className="w-20 h-[1px] bg-emerald-700 mx-auto"></div>
                </div>
            </section>

            {/* --- Section 01: The Philosophy --- */}
            <section className="py-24 px-6 lg:px-20 container mx-auto">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2 relative" data-aos="fade-right">
                        {/* LIGHT THEME: Border and Shadow Update */}
                        <div className="border border-emerald-100 p-4 rounded-t-full shadow-lg shadow-stone-200">
                            <img 
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" 
                                alt="Philosophy" 
                                className="rounded-t-full grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                        {/* Decorative Badge - Emerald Green */}
                        <div className="absolute -bottom-10 -right-10 bg-emerald-700 p-10 rounded-full hidden md:block">
                            <Leaf className="text-white" size={40} />
                        </div>
                    </div>

                    <div className="lg:w-1/2 space-y-8" data-aos="fade-left">
                        <span className="text-emerald-700 uppercase tracking-[0.4em] text-[11px] font-bold">Our Philosophy</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-stone-950">A Sanctuary for the Soul</h2>
                        <p className="text-stone-700 font-light leading-relaxed text-lg italic">
                            "At Almaris Eco, we believe that luxury is not just about opulence, but about the profound sense of peace that comes from being in harmony with nature."
                        </p>
                        <p className="text-stone-600 font-light leading-relaxed">
                            Nestled in the heart of lush green landscapes, Almaris Eco was founded with a single vision: to redefine hospitality through the lens of sustainable elegance. Every corner of our estate is designed to whisper sophistication and provide a refuge from the outside world.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Section 02: Stats / Achievements --- */}
            <section className="py-20 bg-stone-100 border-y border-stone-200">
                <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center group" data-aos="fade-up" data-aos-delay={idx * 100}>
                            <h3 className="text-emerald-700 text-5xl font-serif mb-2 group-hover:scale-110 transition-transform duration-500">{stat.value}</h3>
                            <p className="text-stone-600 uppercase tracking-widest text-[10px] font-bold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Section 03: Values (Production Responsive Grid) --- */}
            <section className="py-24 px-6 lg:px-20 container mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif italic text-stone-950">Our Core Values</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: ShieldCheck, title: "Unrivaled Privacy", desc: "Discretion is our greatest service. Your sanctuary remains yours alone." },
                        { icon: Award, title: "Sustainable Excellence", desc: "From organic dining to bespoke experiences, we settle for nothing less." },
                        { icon: Coffee, title: "Authenticity", desc: "Experience the true culture of nature with our local heritage tours." }
                    ].map((val, idx) => (
                        // LIGHT THEME: Card Style
                        <div key={idx} className="p-12 border border-stone-200 bg-white hover:border-emerald-200 hover:shadow-lg transition-all duration-500 group">
                            <val.icon className="text-emerald-700 mb-8 group-hover:rotate-12 transition-transform" size={40} />
                            <h4 className="text-stone-950 text-xl font-serif mb-4">{val.title}</h4>
                            <p className="text-stone-600 text-sm font-light leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Section 04: The Founder's Note --- */}
            <section className="py-24 bg-stone-100 relative">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl shrink-0">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974" alt="Founder" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-6" data-aos="fade-up">
                            <p className="text-2xl font-serif italic text-stone-700 leading-snug">
                                "We don't just sell rooms; we curate memories that last a lifetime. Almaris Eco is my heart's work, and it is an honor to welcome you to our family."
                            </p>
                            <div>
                                <h5 className="text-emerald-700 font-bold uppercase tracking-widest text-xs">Julian Almaris</h5>
                                <p className="text-stone-600 text-[10px] uppercase mt-1">Founding Director & CEO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;