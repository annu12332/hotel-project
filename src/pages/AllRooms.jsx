import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, MapPin, ArrowRight, Loader2 } from 'lucide-react'; // Maximize -> MapPin, Star -> Removed
import AOS from 'aos';
import axios from 'axios';

const AllRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    // ক্যাটাগরিগুলো ইকো রিসোর্টের সাথে সামঞ্জস্যপূর্ণ করা হয়েছে
    const categories = ["All", "Jungle View", "River Side", "Treehouse", "Family Cottage"];

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1000 });

        const fetchAllRooms = async () => {
            try {
                const res = await axios.get('https://hotel-server-qryr.onrender.com/api/rooms');
                setRooms(res.data);
                setFilteredRooms(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching rooms:", err);
                setLoading(false);
            }
        };
        fetchAllRooms();
    }, []);

    // Filter Logic
    useEffect(() => {
        let results = rooms.filter(room => 
            room.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (activeCategory !== "All") {
            results = results.filter(room => room.category === activeCategory);
        }
        setFilteredRooms(results);
    }, [searchQuery, activeCategory, rooms]);

    return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <div className="min-h-screen bg-stone-50 pt-32 pb-20 px-6 lg:px-20 text-stone-900">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-16" data-aos="fade-down">
                <span className="text-emerald-700 uppercase tracking-[0.5em] text-[10px] font-bold">Discover Your Sanctuary</span>
                <h1 className="text-stone-950 text-5xl md:text-7xl font-serif mt-4 mb-8">Eco-Friendly <br/>Accommodations</h1>
                
                {/* Search & Filter Bar - LIGHT THEME */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white backdrop-blur-md p-4 rounded-2xl border border-stone-100 shadow-sm">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name..." 
                            className="w-full bg-stone-100 border border-stone-200 rounded-xl py-3 pl-12 pr-4 text-stone-900 focus:border-emerald-300 outline-none transition-all"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border whitespace-nowrap ${
                                    activeCategory === cat 
                                    ? "bg-emerald-700 text-white border-emerald-700" 
                                    : "bg-white text-stone-600 border-stone-200 hover:border-emerald-300"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Rooms Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <div className="col-span-full flex justify-center py-20">
                        <Loader2 className="animate-spin text-emerald-700" size={40} />
                    </div>
                ) : (
                    filteredRooms.map((room) => (
                        <div 
                            key={room._id} 
                            data-aos="fade-up"
                            // LIGHT THEME: Card Style Updated
                            className="group bg-white border border-stone-100 rounded-[2rem] overflow-hidden hover:border-emerald-100 hover:shadow-lg transition-all duration-500"
                        >
                            {/* Image Wrapper */}
                            <div className="relative h-72 overflow-hidden">
                                <img 
                                    src={room.image || "https://placehold.co/400x300?text=Eco+Room"} 
                                    alt={room.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                                />
                                {/* LIGHT THEME: Price Tag */}
                                <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-md text-emerald-800 text-[10px] font-bold px-4 py-2 rounded-full border border-white/50 uppercase tracking-widest">
                                    ${room.price} / Night
                                </div>
                            </div>

                            {/* Content - LIGHT THEME */}
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-emerald-700 text-[9px] uppercase tracking-[0.3em] font-bold">{room.category}</span>
                                        <h3 className="text-stone-950 text-2xl font-serif mt-1">{room.title}</h3>
                                    </div>
                                </div>

                                {/* Features - LIGHT THEME */}
                                <div className="flex gap-6 mb-8 py-4 border-y border-stone-100">
                                    <div className="flex items-center gap-2 text-stone-500 text-[10px] uppercase tracking-widest">
                                        <Users size={14} className="text-emerald-600"/> 2 Guests
                                    </div>
                                    <div className="flex items-center gap-2 text-stone-500 text-[10px] uppercase tracking-widest">
                                        <MapPin size={14} className="text-emerald-600"/> Jungle View
                                    </div>
                                </div>

                                <Link 
                                    to={`/room/${room._id}`}
                                    className="flex items-center justify-between w-full group/btn"
                                >
                                    <span className="text-stone-900 text-[11px] uppercase tracking-[0.3em] font-bold group-hover/btn:text-emerald-700 transition-colors">Details</span>
                                    <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover/btn:bg-emerald-700 group-hover/btn:text-white transition-all">
                                        <ArrowRight size={16} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* No Results State */}
            {!loading && filteredRooms.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-stone-500 font-serif text-xl italic">No eco-sanctuaries found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default AllRooms;