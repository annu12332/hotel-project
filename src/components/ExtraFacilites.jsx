import React from 'react';
import { motion } from 'framer-motion';

const ExtraFacilities = () => {
    const cards = [
        {
            id: 1,
            tag: "Residency",
            brand: "ALMS.",
            title: "Private Bungalows",
            stat: "45+",
            secondaryTitle: "Treehouses",
            secondaryStat: "12",
            image: "https://images.unsplash.com/photo-1596700021077-84a86b0391d1?q=80&w=800",
            desc: "Immerse in nature without compromising comfort."
        },
        {
            id: 2,
            tag: "Cuisine",
            brand: "ALMS.",
            title: "Organic Harvest",
            stat: "90%",
            secondaryTitle: "Local Sourced",
            secondaryStat: "Daily",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800",
            desc: "Fresh, sustainable dining from garden to table."
        }
    ];

    return (
        <section className="py-24 bg-transparent px-4 overflow-hidden">
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
                        <div className="relative z-20 -mb-12 md:-mb-16 px-8 md:px-6">
                            <motion.div
                                whileHover={{ y: -8, rotate: index % 2 === 0 ? -2 : 2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/10"
                            >
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        </div>

                        {/* --- Glass Card Body (Bottom Layer) --- */}
                        {/* More transparent background for "invisible" feel */}
                        <div className="relative z-10 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 pt-16 md:pt-20 shadow-2xl overflow-hidden group-hover:border-emerald-500/20 transition-colors duration-500">

                            {/* Header Branding */}
                            <div className="flex justify-between items-center mb-5 md:mb-6">
                                <span className="text-white/30 font-serif text-base md:text-lg tracking-widest">{card.brand}</span>
                                {/* Softer green tag */}
                                <span className="text-emerald-300/80 text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold border border-emerald-500/10 px-3 py-1 rounded-full">
                                    {card.tag}
                                </span>
                            </div>

                            {/* Stats Grid */}
                            <div className="space-y-5 md:space-y-6">
                                <div className="flex items-end justify-between border-b border-white/5 pb-4">
                                    <div>
                                        {/* Softer emerald stats */}
                                        <h2 className="text-emerald-300 text-3xl md:text-4xl font-serif font-light leading-none">{card.stat}</h2>
                                        <p className="text-white/70 text-[9px] md:text-[10px] uppercase tracking-wider mt-1">{card.title}</p>
                                    </div>
                                    <div className="text-right">
                                        <h3 className="text-white/90 text-lg md:text-xl font-serif">{card.secondaryStat}</h3>
                                        <p className="text-white/40 text-[8px] md:text-[9px] uppercase">{card.secondaryTitle}</p>
                                    </div>
                                </div>

                                {/* Description - Lighter text for organic feel */}
                                <p className="text-[10px] md:text-[11px] text-white/60 leading-relaxed font-light italic">
                                    "{card.desc}"
                                </p>
                            </div>

                            {/* Background Glow Effect - Softer, more organic blend */}
                            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-emerald-500/5 blur-[40px] rounded-full group-hover:bg-emerald-500/10 transition-all duration-700" />
                        </div>

                        {/* Subtle Shadow under the whole thing */}
                        <div className="absolute inset-x-10 bottom-4 h-6 bg-emerald-950/5 blur-2xl rounded-full -z-10" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ExtraFacilities;