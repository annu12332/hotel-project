import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ChevronLeft, Maximize, BedDouble, Check, CheckCircle, Users } from 'lucide-react';
import axios from 'axios';

const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [bookingData, setBookingData] = useState({
        guestName: '',
        phone: '',
        address: '',
        checkIn: '',
        checkOut: '',
        members: 1
    });
    
    const [isBooking, setIsBooking] = useState(false);
    const [isBooked, setIsBooked] = useState(false);

    useEffect(() => {
        const fetchRoom = async () => {
            if (!id || id === 'undefined') {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const res = await axios.get(`https://hotel-server-qryr.onrender.com/api/rooms/${id}`);
                setRoom(res.data);
            } catch (err) {
                console.error("Error fetching room:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
        window.scrollTo(0, 0);
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setIsBooking(true);
        try {
            const payload = {
                roomId: room._id,
                roomTitle: room.title,
                totalPrice: room.price,
                ...bookingData
            };
            await axios.post('https://hotel-server-qryr.onrender.com/api/bookings', payload);
            setIsBooked(true);
        } catch (err) {
            alert("Booking failed. Please check your connection.");
        } finally {
            setIsBooking(false);
        }
    };

    if (loading) return (
        <div className="h-screen bg-black flex flex-col items-center justify-center text-[#b59473]">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="uppercase tracking-[0.3em] text-[10px] font-bold">Opening Sanctuary...</p>
        </div>
    );

    if (!room) return (
        <div className="h-screen bg-black text-white flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-2xl md:text-3xl">Room Not Found</p>
            <Link to="/" className="text-[#b59473] uppercase tracking-widest text-xs border-b border-[#b59473] pb-1">Return Home</Link>
        </div>
    );

    return (
        <div className="bg-[#050505] min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 text-white selection:bg-[#b59473] selection:text-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                
                {/* Back Button */}
                <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-[#b59473] text-[10px] uppercase tracking-widest mb-8 md:mb-12 transition-all group">
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    
                    {/* Left Side: Room Content (8 Columns on Large) */}
                    <div className="lg:col-span-8">
                        {/* Main Hero Image */}
                        <div className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden mb-8 md:mb-12 shadow-2xl border border-white/5 aspect-video">
                            <img 
                                src={room.image || 'https://placehold.co/1200x800'} 
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[3s]" 
                                alt={room.title} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        </div>

                        {/* Title & Category */}
                        <div className="mb-8">
                            <span className="text-[#b59473] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block mb-3">
                                {room.category || 'Luxury Suite'}
                            </span>
                            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
                                {room.title}
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-10 max-w-3xl">
                            {room.description}
                        </p>
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10 py-8 border-y border-white/5">
                            <div className="space-y-1">
                                <span className="text-[#b59473] uppercase text-[9px] tracking-[0.2em] font-semibold">Sanctuary Size</span>
                                <div className="text-white text-lg md:text-xl font-medium flex items-center gap-3">
                                    <Maximize size={18} className="text-[#b59473] opacity-60"/> {room.size}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[#b59473] uppercase text-[9px] tracking-[0.2em] font-semibold">Bed Configuration</span>
                                <div className="text-white text-lg md:text-xl font-medium flex items-center gap-3">
                                    <BedDouble size={18} className="text-[#b59473] opacity-60"/> {room.bedType}
                                </div>
                            </div>
                            <div className="space-y-1 col-span-2 sm:col-span-1">
                                <span className="text-[#b59473] uppercase text-[9px] tracking-[0.2em] font-semibold">Exclusive Rate</span>
                                <div className="text-[#b59473] font-serif text-3xl md:text-4xl">
                                    ${room.price}<span className="text-sm text-gray-500 font-sans ml-1">/night</span>
                                </div>
                            </div>
                        </div>

                        {/* Amenities (Optional but recommended for Production look) */}
                        {room.amenities && (
                            <div className="mt-12 md:mt-16">
                                <h4 className="text-white text-xl md:text-2xl font-serif mb-6">Premium In-Room Amenities</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {room.amenities.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 text-gray-400 text-sm py-1">
                                            <div className="w-5 h-5 rounded-full bg-[#b59473]/10 flex items-center justify-center flex-shrink-0">
                                                <Check size={12} className="text-[#b59473]" />
                                            </div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Booking Form (4 Columns on Large) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-3xl shadow-3xl">
                            {isBooked ? (
                                <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="w-20 h-20 bg-[#b59473]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={40} className="text-[#b59473]" />
                                    </div>
                                    <h3 className="text-white text-2xl font-serif mb-3">Reservation Initiated</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">Our concierge will contact you shortly to finalize your stay at {room.title}.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <h3 className="text-white text-2xl font-serif mb-2">Reserve Room</h3>
                                        <div className="h-0.5 w-10 bg-[#b59473] mb-3"></div>
                                        <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold leading-relaxed">Please provide your details below</p>
                                    </div>

                                    <form onSubmit={handleBooking} className="space-y-5">
                                        <div className="space-y-4">
                                            {/* Name */}
                                            <input required type="text" placeholder="Full Name" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#b59473] focus:bg-white/[0.07] outline-none transition-all" 
                                                onChange={e => setBookingData({...bookingData, guestName: e.target.value})} />
                                            
                                            {/* Phone & Members */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <input required type="tel" placeholder="Phone" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#b59473] outline-none transition-all" 
                                                    onChange={e => setBookingData({...bookingData, phone: e.target.value})} />
                                                <div className="relative">
                                                    <input required type="number" min="1" placeholder="Guests" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#b59473] outline-none transition-all" 
                                                        onChange={e => setBookingData({...bookingData, members: e.target.value})} />
                                                    <Users size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                                                </div>
                                            </div>

                                            {/* Address */}
                                            <input required type="text" placeholder="Address" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#b59473] outline-none transition-all" 
                                                onChange={e => setBookingData({...bookingData, address: e.target.value})} />

                                            {/* Dates */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[9px] text-gray-500 uppercase tracking-widest ml-1">Arrival</label>
                                                    <input required type="date" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-xs focus:border-[#b59473] outline-none transition-all invert opacity-70 focus:opacity-100" 
                                                        onChange={e => setBookingData({...bookingData, checkIn: e.target.value})} />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[9px] text-gray-500 uppercase tracking-widest ml-1">Departure</label>
                                                    <input required type="date" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-xs focus:border-[#b59473] outline-none transition-all invert opacity-70 focus:opacity-100" 
                                                        onChange={e => setBookingData({...bookingData, checkOut: e.target.value})} />
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            disabled={isBooking} 
                                            className="group relative w-full bg-[#b59473] text-black font-bold py-5 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(181,148,115,0.3)] active:scale-[0.98] disabled:bg-gray-700 mt-4"
                                        >
                                            <span className="relative z-10 uppercase text-[10px] tracking-[0.3em]">
                                                {isBooking ? "Transmitting..." : "Confirm Reservation"}
                                            </span>
                                            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                        </button>
                                        
                                        <p className="text-center text-[8px] text-gray-600 uppercase tracking-[0.2em] mt-6">
                                            Secured & Confidential Booking
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;