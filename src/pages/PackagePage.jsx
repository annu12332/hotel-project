import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, MapPin, Clock } from 'lucide-react';

const PackagesPage = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://hotel-server-qryr.onrender.com/api/packages')
            .then(res => { setPackages(res.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="h-screen bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="animate-spin text-[#c5a059]" size={40} /></div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-6">
            <div className="text-center mb-16">
                <p className="text-[#c5a059] uppercase tracking-[0.4em] text-[10px] mb-2">Exclusive Offers</p>
                <h1 className="text-4xl md:text-6xl font-serif italic text-white">Luxury Packages</h1>
            </div>

            <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {packages.map((pkg) => (
                    <motion.div key={pkg._id} whileHover={{ y: -10 }} className="bg-[#111] rounded-3xl border border-white/5 overflow-hidden group">
                        <div className="relative h-64">
                            <img src={pkg.image} className="w-full h-full object-cover" alt={pkg.title} />
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[#c5a059] px-4 py-2 rounded-xl font-bold text-sm">
                                ${pkg.price}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
                            <div className="flex items-center gap-4 text-white/40 text-[10px] mb-4 uppercase tracking-widest">
                                <span className="flex items-center gap-1"><Clock size={12}/> {pkg.duration}</span>
                            </div>
                            <Link to={`/package/${pkg._id}`} className="block text-center bg-[#c5a059] text-black py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#b08d4a] transition-all">
                                View Details
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
export default PackagesPage;