import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, Maximize, BedDouble, Check, ChevronLeft } from 'lucide-react';

const RoomDetails = () => {
    const { slug } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const getRoomDetail = async () => {
            const response = await fetch('/rooms.json');
            const data = await response.json();
            const singleRoom = data.find((r) => r.slug === slug);
            setRoom(singleRoom);
        };
        getRoomDetail();
        window.scrollTo(0, 0);
    }, [slug]);

    if (!room) return <div className="h-screen bg-black flex items-center justify-center text-[#b59473]">Loading...</div>;

    return (
        <div className="bg-[#050505] min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 lg:px-20">
                <Link to="/all-rooms" className="flex items-center gap-2 text-white/50 hover:text-[#b59473] text-[10px] uppercase tracking-widest mb-10 transition-colors">
                    <ChevronLeft size={16}/> Back to Collection
                </Link>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left: Info & Gallery */}
                    <div className="lg:w-2/3">
                        <div className="rounded-[2rem] overflow-hidden mb-12 shadow-2xl border border-white/5">
                            <img src={room.thumbnail} className="w-full aspect-[16/9] object-cover" alt={room.type} />
                        </div>
                        <h1 className="text-white text-5xl md:text-6xl font-serif mb-6">{room.type}</h1>
                        <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">{room.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5">
                            <div className="flex flex-col gap-2">
                                <span className="text-[#b59473] uppercase text-[10px] tracking-widest">Guests</span>
                                <div className="flex items-center gap-2 text-white"><Users size={18}/> {room.maxOccupancy.adults} Adults</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[#b59473] uppercase text-[10px] tracking-widest">Size</span>
                                <div className="flex items-center gap-2 text-white"><Maximize size={18}/> {room.size}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[#b59473] uppercase text-[10px] tracking-widest">Bed Type</span>
                                <div className="flex items-center gap-2 text-white"><BedDouble size={18}/> {room.bedType}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[#b59473] uppercase text-[10px] tracking-widest">Price</span>
                                <div className="text-white font-serif text-2xl">${room.price}</div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h4 className="text-white text-xl font-serif mb-6">Premium Amenities</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                                {room.amenities.map((amt, i) => (
                                    <div key={i} className="flex items-center gap-3 text-white/60 text-sm">
                                        <Check size={16} className="text-[#b59473]" /> {amt}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Premium Booking Form */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32 bg-[#111] border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
                            <h3 className="text-white text-2xl font-serif mb-8 text-center">Reserve Your Sanctuary</h3>
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">Full Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#b59473] outline-none transition-all" placeholder="Your Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">Check-In Date</label>
                                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#b59473] outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">Check-Out Date</label>
                                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#b59473] outline-none transition-all" />
                                </div>
                                <button className="w-full bg-[#b59473] text-black font-bold py-4 rounded-xl hover:bg-white transition-all duration-500 uppercase text-[11px] tracking-widest">
                                    Book Now
                                </button>
                                <p className="text-center text-[9px] text-gray-500 uppercase">Payment is required upon arrival</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;