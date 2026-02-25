import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight, DollarSign, Loader2 } from 'lucide-react';
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
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-[#b59473]">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="text-lg tracking-widest uppercase italic">Loading Luxury Deals...</p>
        </div>
    );

    // ... (বাকি UI কোড আগের মতোই থাকবে, শুধু ডাটাবেসের ফিল্ড অনুযায়ী ম্যাপিং ঠিক করে নিন)
    return (
        <section className="bg-[#050505] py-20 px-4 min-h-screen">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <span className="text-[#b59473] uppercase tracking-[0.5em] text-sm font-bold">Exclusive Deals</span>
                    <h1 className="text-white text-5xl md:text-6xl font-serif italic mt-4">Our Special Offers</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {offers.map(offer => (
                        <div key={offer._id} className="bg-[#1a1a1a] rounded-lg overflow-hidden group border border-white/5">
                            <div className="relative h-60 overflow-hidden">
                                <img src={offer.imageUrl} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 right-4 bg-[#b59473] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                    {offer.discount || 'Special'}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-white text-2xl font-serif italic mb-3 group-hover:text-[#b59473] transition-colors">{offer.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{offer.description}</p>
                                <div className="flex items-center text-gray-400 text-sm mb-4 gap-4">
                                    <div className="flex items-center"><DollarSign size={14} className="text-[#b59473] mr-1" /> {offer.price}</div>
                                    <div className="flex items-center"><CalendarDays size={14} className="text-[#b59473] mr-1" /> {offer.validity}</div>
                                </div>
                                <Link to={`/offers/${offer._id}`} className="w-full inline-flex items-center justify-center gap-2 bg-[#b59473] text-white py-3 rounded-md hover:bg-[#a07c5b] transition-all">
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