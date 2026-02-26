import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ChevronLeft, Maximize, BedDouble, Check, CheckCircle, Users, Mail } from 'lucide-react';
import axios from 'axios';

const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // ১. এখানে email স্টেটটি যোগ করা হয়েছে
    const [bookingData, setBookingData] = useState({
        guestName: '',
        email: '', // যোগ করা হয়েছে
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
            // ২. পেলোড লজিক আপডেট
            const payload = {
                roomId: room._id,
                roomTitle: room.title,
                ...bookingData
            };
            
            // ৩. ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
            await axios.post('https://hotel-server-qryr.onrender.com/api/bookings', payload);
            setIsBooked(true);
        } catch (err) {
            // এরর মেসেজ আরও ডিটেইল দেখা যাবে এখন
            console.error("Booking Error:", err.response?.data || err.message);
            alert(`Booking failed: ${err.response?.data?.message || "Check connection"}`);
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
        <div className="bg-[#050505] min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-[#b59473] text-[10px] uppercase tracking-widest mb-8 transition-all group">
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    {/* Left: Image & Info */}
                    <div className="lg:col-span-8">
                        <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video border border-white/5">
                            <img src={room.image} className="w-full h-full object-cover" alt={room.title} />
                        </div>
                        <h1 className="text-white text-4xl md:text-6xl font-serif mb-6">{room.title}</h1>
                        <p className="text-gray-400 text-base leading-relaxed mb-10">{room.description}</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-8 border-y border-white/5">
                            <div className="space-y-1">
                                <span className="text-[#b59473] text-[9px] uppercase tracking-widest">Size</span>
                                <div className="text-white flex items-center gap-2"><Maximize size={16}/> {room.size}</div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[#b59473] text-[9px] uppercase tracking-widest">Bed</span>
                                <div className="text-white flex items-center gap-2"><BedDouble size={16}/> {room.bedType}</div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[#b59473] text-[9px] uppercase tracking-widest">Rate</span>
                                <div className="text-[#b59473] text-2xl font-serif">${room.price}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Updated Booking Form */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl">
                            {isBooked ? (
                                <div className="text-center py-12">
                                    <CheckCircle size={40} className="text-[#b59473] mx-auto mb-4" />
                                    <h3 className="text-white text-xl font-serif">Booking Received!</h3>
                                    <p className="text-gray-500 text-xs mt-2">We will contact you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleBooking} className="space-y-4">
                                    <h3 className="text-white text-xl font-serif mb-4">Reserve Now</h3>
                                    
                                    <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#b59473] outline-none" 
                                        onChange={e => setBookingData({...bookingData, guestName: e.target.value})} />

                                    {/* নতুন ইমেইল ইনপুট ফিল্ড */}
                                    <div className="relative">
                                        <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#b59473] outline-none" 
                                            onChange={e => setBookingData({...bookingData, email: e.target.value})} />
                                        <Mail size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input required type="tel" placeholder="Phone" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#b59473] outline-none" 
                                            onChange={e => setBookingData({...bookingData, phone: e.target.value})} />
                                        <input required type="number" placeholder="Guests" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#b59473] outline-none" 
                                            onChange={e => setBookingData({...bookingData, members: e.target.value})} />
                                    </div>

                                    <input required type="text" placeholder="Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#b59473] outline-none" 
                                        onChange={e => setBookingData({...bookingData, address: e.target.value})} />

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[8px] text-gray-500 uppercase">Check In</label>
                                            <input required type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:border-[#b59473] outline-none invert" 
                                                onChange={e => setBookingData({...bookingData, checkIn: e.target.value})} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[8px] text-gray-500 uppercase">Check Out</label>
                                            <input required type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:border-[#b59473] outline-none invert" 
                                                onChange={e => setBookingData({...bookingData, checkOut: e.target.value})} />
                                        </div>
                                    </div>

                                    <button disabled={isBooking} className="w-full bg-[#b59473] text-black font-bold py-4 rounded-xl uppercase text-[10px] tracking-widest hover:bg-white transition-all">
                                        {isBooking ? "Processing..." : "Confirm Reservation"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;