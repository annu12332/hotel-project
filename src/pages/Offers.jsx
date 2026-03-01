import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight, DollarSign, Loader2, Tag } from 'lucide-react'; // Tag added
import axios from 'axios';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await axios.get('https://hotel-server-qryr.onrender.com/api/offers');
                setOffers(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    if (loading) return (
        // LIGHT THEME: bg-stone-50, emerald-700
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center text-emerald-700">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="text-lg tracking-widest uppercase italic text-stone-700">Loading Eco Deals...</p>
        </div>
    );

    return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <section className="bg-stone-50 py-20 px-4 min-h-screen">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <span className="text-emerald-700 uppercase tracking-[0.5em] text-sm font-bold">Sustainable Escapes</span>
                    <h1 className="text-stone-950 text-5xl md:text-6xl font-serif italic mt-4">Special Eco Offers</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {offers.map(offer => (
                        // LIGHT THEME: bg-white, border-stone-100
                        <div key={offer._id} className="bg-white rounded-lg overflow-hidden group border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-500">
                            <div className="relative h-60 overflow-hidden">
                                <img src={offer.imageUrl} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                {/* LIGHT THEME: Emerald Green tag */}
                                <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                                    <Tag size={12} /> {offer.discount || 'Special'}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-stone-950 text-2xl font-serif italic mb-3 group-hover:text-emerald-700 transition-colors">{offer.title}</h3>
                                <p className="text-stone-600 text-sm mb-4 line-clamp-2">{offer.description}</p>
                                <div className="flex items-center text-stone-500 text-sm mb-4 gap-4">
                                    {/* LIGHT THEME: emerald-600 icons */}
                                    <div className="flex items-center"><DollarSign size={14} className="text-emerald-600 mr-1" /> {offer.price}</div>
                                    <div className="flex items-center"><CalendarDays size={14} className="text-emerald-600 mr-1" /> {offer.validity}</div>
                                </div>
                                {/* LIGHT THEME: Emerald button */}
                                <Link to={`/offers/${offer._id}`} className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 text-white py-3 rounded-md hover:bg-emerald-800 transition-all">
                                    View Details <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Offers;