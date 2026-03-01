import React from 'react';
import { motion } from 'framer-motion';
// Updated icons to fit eco-theme
import { CalendarDays, Users, ArrowRight } from 'lucide-react';

const BookingBar = () => {
    return (
        <section className="relative -mt-12 z-40 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    // Invisible theme: very transparent backdrop
                    className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-4 md:p-2 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">

                        {/* Check-In Section */}
                        <div className="w-full md:w-1/4 p-4 md:p-6 flex items-center gap-4 group cursor-pointer border-b md:border-b-0 md:border-r border-white/5">
                            {/* Emerald Icon */}
                            <div className="p-3 rounded-xl bg-emerald-950/40 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                <CalendarDays size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Check-In</span>
                                <input
                                    type="text"
                                    placeholder="24 Feb 2026"
                                    className="bg-transparent text-white font-serif text-sm focus:outline-none placeholder:text-white/70 cursor-pointer w-full"
                                />
                            </div>
                        </div>

                        {/* Check-Out Section */}
                        <div className="w-full md:w-1/4 p-4 md:p-6 flex items-center gap-4 group cursor-pointer border-b md:border-b-0 md:border-r border-white/5">
                            {/* Emerald Icon */}
                            <div className="p-3 rounded-xl bg-emerald-950/40 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                <CalendarDays size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Check-Out</span>
                                <input
                                    type="text"
                                    placeholder="26 Feb 2026"
                                    className="bg-transparent text-white font-serif text-sm focus:outline-none placeholder:text-white/70 cursor-pointer w-full"
                                />
                            </div>
                        </div>

                        {/* Guests Section */}
                        <div className="w-full md:w-1/4 p-4 md:p-6 flex items-center gap-4 group cursor-pointer">
                            {/* Emerald Icon */}
                            <div className="p-3 rounded-xl bg-emerald-950/40 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                <Users size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Guests</span>
                                <select className="bg-transparent text-white font-serif text-sm focus:outline-none cursor-pointer appearance-none w-full">
                                    <option className="bg-stone-900">02 Adults, 01 Child</option>
                                    <option className="bg-stone-900">01 Adult</option>
                                    <option className="bg-stone-900">04 Adults</option>
                                </select>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="w-full md:w-[22%] p-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                // Emerald Button
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all duration-300 group"
                            >
                                <span className="uppercase text-[11px] tracking-tighter">Check Availability</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BookingBar;