import React from 'react';
import { motion } from 'framer-motion';

const ExtraFacilities = () => {
    const cards = [
        {
            id: 1,
            tag: "Residency",
            brand: "ALMS.",
            title: "Rooms Available",
            stat: "105+",
            secondaryTitle: "Suites",
            secondaryStat: "24",
            image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800",
            desc: "Luxury redefined in every bespoke suite."
        },
        {
            id: 2,
            tag: "Cuisine",
            brand: "ALMS.",
            title: "Menu Selection",
            stat: "85+",
            secondaryTitle: "Master Chefs",
            secondaryStat: "12",
            image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800",
            desc: "A world-class sensory culinary journey."
        }
    ];

    return (
        <section className="py-24 bg-transparent px-4 overflow-hidden">
            {/* Mobile-e 'gap-20' deya hoyeche jate image floating thakle ekta card arektar sathe na lege jay.
          Small screen-e spacing balance kora hoyeche.
      */}
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-20 md:gap-16 lg:gap-24">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className="relative w-full max-w-[300px] sm:max-w-[320px] group"
                    >
                        {/* --- Floating Image (Top Layer) --- */}
                        {/* Mobile-e ektu choto (px-8) kora hoyeche jate screen theke ber na hoye jay */}
                        <div className="relative z-20 -mb-12 md:-mb-16 px-8 md:px-6">
                            <motion.div
                                whileHover={{ y: -8, rotate: index % 2 === 0 ? -2 : 2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/10"
                            >
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        </div>

                        {/* --- Glass Card Body (Bottom Layer) --- */}
                        <div className="relative z-10 bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-3xl border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 pt-16 md:pt-20 shadow-2xl overflow-hidden group-hover:border-[#b59473]/30 transition-colors duration-500">

                            {/* Header Branding */}
                            <div className="flex justify-between items-center mb-5 md:mb-6">
                                <span className="text-white/40 font-serif text-base md:text-lg tracking-widest">{card.brand}</span>
                                <span className="text-[#b59473] text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold border border-[#b59473]/20 px-2 py-0.5 rounded-full">{card.tag}</span>
                            </div>

                            {/* Stats Grid */}
                            <div className="space-y-5 md:space-y-6">
                                <div className="flex items-end justify-between border-b border-white/5 pb-4">
                                    <div>
                                        <h2 className="text-[#b59473] text-3xl md:text-4xl font-serif font-light leading-none">{card.stat}</h2>
                                        <p className="text-white/80 text-[9px] md:text-[10px] uppercase tracking-wider mt-1">{card.title}</p>
                                    </div>
                                    <div className="text-right">
                                        <h3 className="text-white text-lg md:text-xl font-serif">{card.secondaryStat}</h3>
                                        <p className="text-gray-500 text-[8px] md:text-[9px] uppercase">{card.secondaryTitle}</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-[10px] md:text-[11px] text-gray-400 leading-relaxed font-light italic">
                                    "{card.desc}"
                                </p>
                            </div>

                            {/* Background Glow Effect */}
                            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#b59473]/10 blur-[40px] rounded-full group-hover:bg-[#b59473]/20 transition-all duration-700" />
                        </div>

                        {/* Subtle Shadow under the whole thing */}
                        <div className="absolute inset-x-10 bottom-4 h-6 bg-[#b59473]/5 blur-2xl rounded-full -z-10" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ExtraFacilities;