import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Maximize, ArrowRight, Loader2 } from 'lucide-react';
import AOS from 'aos';
import axios from 'axios'; // axios ইম্পোর্ট করা হয়েছে

const AllRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    const categories = ["All", "Standard", "Deluxe", "Suite", "Penthouse", "Villa"];

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1000 });

        const fetchAllRooms = async () => {
            try {
                // axios ব্যবহার করে ডেটা ফেচ
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

    // Filter Logic: টাইটেল এবং ক্যাটাগরি অনুযায়ী ফিল্টার
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
        <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 lg:px-20 text-white">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-16" data-aos="fade-down">
                <span className="text-[#b59473] uppercase tracking-[0.5em] text-[10px] font-bold">The Collection</span>
                <h1 className="text-white text-5xl md:text-7xl font-serif mt-4 mb-8">Refined <br/>Accommodations</h1>
                
                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by room name..." 
                            className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#b59473] outline-none transition-all"
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
                                    ? "bg-[#b59473] text-black border-[#b59473]" 
                                    : "bg-transparent text-white/60 border-white/10 hover:border-[#b59473]"
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
                        <Loader2 className="animate-spin text-[#b59473]" size={40} />
                    </div>
                ) : (
                    filteredRooms.map((room) => (
                        <div 
                            key={room._id} 
                            data-aos="fade-up"
                            className="group bg-[#111] border border-white/5 rounded-[2rem] overflow-hidden hover:border-[#b59473]/30 transition-all duration-500"
                        >
                            {/* Image Wrapper */}
                            <div className="relative h-72 overflow-hidden">
                                <img 
                                    src={room.image || "https://placehold.co/400x300?text=Luxury+Room"} 
                                    alt={room.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                                />
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[#b59473] text-[10px] font-bold px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest">
                                    ${room.price} / Night
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-[#b59473] text-[9px] uppercase tracking-[0.3em] font-bold">{room.category}</span>
                                        <h3 className="text-white text-2xl font-serif mt-1">{room.title}</h3>
                                    </div>
                                </div>

                                {/* Features (Hardcoded for now as it's common in luxury hotels) */}
                                <div className="flex gap-6 mb-8 py-4 border-y border-white/5">
                                    <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-widest">
                                        <Users size={14} className="text-[#b59473]"/> 2 Guests
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-widest">
                                        <Maximize size={14} className="text-[#b59473]"/> 450 sqft
                                    </div>
                                </div>

                                <Link 
                                    to={`/room/${room._id}`}
                                    className="flex items-center justify-between w-full group/btn"
                                >
                                    <span className="text-white text-[11px] uppercase tracking-[0.3em] font-bold group-hover/btn:text-[#b59473] transition-colors">Details</span>
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-[#b59473] group-hover/btn:text-black transition-all">
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
                    <p className="text-gray-500 font-serif text-xl italic">No sanctuaries found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default AllRooms;