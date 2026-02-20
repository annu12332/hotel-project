import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Calendar, Clock } from 'lucide-react';

const SpecialOffers = () => {
    return (
        <section className="py-16 lg:py-24 bg-white overflow-hidden px-4 md:px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

                {/* --- Left Side: Text Content --- */}
                <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-[#b59473] text-xs font-bold tracking-[0.4em] uppercase mb-2">HURRY UP</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">Special Offers</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Feature 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <div className="w-14 h-14 bg-[#b59473] flex items-center justify-center text-white">
                                <Clock size={28} />
                            </div>
                            <h3 className="text-xl font-serif font-semibold text-gray-800">Reception 24h / 7 Days</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Occaecat id ullamco consectetur labore officia eiusmod culpa dolore ut ullamco enim ut veniam nulla laboris id nisi.
                            </p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <div className="w-14 h-14 bg-[#b59473] flex items-center justify-center text-white">
                                <PhoneCall size={28} />
                            </div>
                            <h3 className="text-xl font-serif font-semibold text-gray-800">Reservation Online</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Occaecat id ullamco consectetur labore officia eiusmod culpa dolore ut ullamco enim ut veniam nulla laboris id nisi.
                            </p>
                        </motion.div>
                    </div>

                    {/* Special CTA Box */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="border border-[#b59473]/30 p-6 flex items-center gap-6 group cursor-pointer bg-[#F9F7F2]"
                    >
                        <div className="w-16 h-12 bg-[#b59473] rounded-t-full flex items-center justify-center text-white">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <h4 className="text-lg font-serif font-bold text-gray-900 leading-none">Reservation Online</h4>
                            <p className="text-xs text-gray-500 mt-2">Occaecat id ullamco consectetur labore officia.</p>
                        </div>
                    </motion.div>
                </div>

                {/* --- Right Side: Image Collage --- */}
                <div className="w-full lg:w-1/2 flex items-center justify-center order-1 lg:order-2">
                    <div className="relative flex items-center gap-4 h-[400px] md:h-[500px]">

                        {/* Main Center Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="w-48 md:w-64 h-full overflow-hidden shadow-2xl rounded-sm"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=600"
                                className="w-full h-full object-cover"
                                alt="Receptionist"
                            />
                        </motion.div>

                        {/* Right Side Stacked Images */}
                        <div className="flex flex-col gap-4 h-full">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="w-32 md:w-48 h-1/2 overflow-hidden shadow-xl rounded-sm"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=400"
                                    className="w-full h-full object-cover"
                                    alt="Service"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="w-32 md:w-48 h-1/2 overflow-hidden shadow-xl rounded-sm"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400"
                                    className="w-full h-full object-cover"
                                    alt="Hotel Bell"
                                />
                            </motion.div>
                        </div>

                        {/* Floating Badge (Optional Luxury Touch) */}
                        <div className="absolute -bottom-4 -left-4 bg-[#b59473] text-white p-4 hidden md:block shadow-lg">
                            <p className="text-[10px] tracking-widest uppercase">Since 1994</p>
                            <p className="font-serif text-lg">Almaris Luxury</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SpecialOffers;