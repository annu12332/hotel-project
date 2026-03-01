import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, MapPin, Clock, Tag } from 'lucide-react'; // Tag added

const PackagesPage = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://hotel-server-qryr.onrender.com/api/packages')
            .then(res => { setPackages(res.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return (
        // LIGHT THEME: bg-stone-50, emerald-700
        <div className="h-screen bg-stone-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-700" size={40} />
        </div>
    );

    return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <div className="min-h-screen bg-stone-50 pt-24 pb-20 px-6 font-sans">
            <div className="text-center mb-16">
                {/* LIGHT THEME: text-emerald-700 */}
                <p className="text-emerald-700 uppercase tracking-[0.4em] text-[10px] mb-2 font-bold">Sustainable Packages</p>
                <h1 className="text-4xl md:text-6xl font-serif italic text-stone-950">Eco-Luxury Escapes</h1>
            </div>

            <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {packages.map((pkg) => (
                    // LIGHT THEME: bg-white, border-stone-100
                    <motion.div key={pkg._id} whileHover={{ y: -5 }} className="bg-white rounded-3xl border border-stone-100 overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="relative h-64">
                            <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={pkg.title} />
                            {/* LIGHT THEME: Emerald Green tag */}
                            <div className="absolute top-4 right-4 bg-emerald-600 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-1">
                                <Tag size={16} /> ${pkg.price}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-stone-950 mb-2 group-hover:text-emerald-700 transition-colors">{pkg.title}</h3>
                            {/* LIGHT THEME: text-stone-500 */}
                            <div className="flex items-center gap-4 text-stone-500 text-[10px] mb-4 uppercase tracking-widest">
                                <span className="flex items-center gap-1"><Clock size={12} className="text-emerald-600"/> {pkg.duration}</span>
                            </div>
                            {/* LIGHT THEME: bg-emerald-700, hover:bg-emerald-800 */}
                            <Link to={`/package/${pkg._id}`} className="block text-center bg-emerald-700 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-800 transition-all">
                                Explore Package
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
export default PackagesPage;