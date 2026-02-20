import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays,ArrowRight, Tag, DollarSign } from 'lucide-react';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/offers.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setOffers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <p className="text-[#b59473] text-lg">Loading offers...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <p className="text-red-500 text-lg">Error loading offers: {error.message}</p>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <section className="bg-[#050505] py-20 px-4 min-h-screen">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#b59473] uppercase tracking-[0.5em] text-sm font-bold">Exclusive Deals</span>
                    <h1 className="text-white text-5xl md:text-6xl font-serif italic mt-4 leading-tight">
                        Our Special Offers
                    </h1>
                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                        Discover the best experiences at our hotel with these limited-time offers.
                        Perfect for every occasion, from romantic getaways to family vacations.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {offers.map(offer => (
                        <motion.div
                            key={offer.id}
                            variants={itemVariants}
                            className="bg-[#1a1a1a] rounded-lg shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src={offer.imageUrl}
                                    alt={offer.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                <span className="absolute top-4 right-4 bg-[#b59473] text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                    Special Offer
                                </span>
                            </div>
                            <div className="p-6 flex flex-col justify-between flex-grow">
                                <div>
                                    <h3 className="text-white text-2xl font-serif italic mb-3 group-hover:text-[#b59473] transition-colors duration-300">
                                        {offer.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                        {offer.description}
                                    </p>
                                    <div className="flex items-center text-gray-400 text-sm mb-2">
                                        <DollarSign size={16} className="mr-2 text-[#b59473]" />
                                        <span>{offer.price}</span>
                                    </div>
                                    <div className="flex items-center text-gray-400 text-sm mb-4">
                                        <CalendarDays size={16} className="mr-2 text-[#b59473]" />
                                        <span>{offer.validity}</span>
                                    </div>
                                </div>
                                <Link
                                    to={`/offers/${offer.id}`}
                                    className="mt-6 inline-flex items-center justify-center gap-3 bg-[#b59473] text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-[#a07c5b] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#b59473]/50"
                                >
                                    {offer.buttonText}
                                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Offers;