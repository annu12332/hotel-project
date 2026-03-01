import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ChevronLeft, Maximize, BedDouble, CheckCircle, Mail } from 'lucide-react';
import axios from 'axios';

const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // LIGHT THEME: State update for email added
    const [bookingData, setBookingData] = useState({
        guestName: '',
        email: '',
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
                ...bookingData
            };
            
            await axios.post('https://hotel-server-qryr.onrender.com/api/bookings', payload);
            setIsBooked(true);
        } catch (err) {
            console.error("Booking Error:", err.response?.data || err.message);
            alert(`Booking failed: ${err.response?.data?.message || "Check connection"}`);
        } finally {
            setIsBooking(false);
        }
    };

    if (loading) return (
        // LIGHT THEME: bg-stone-50, emerald-700
        <div className="h-screen bg-stone-50 flex flex-col items-center justify-center text-emerald-700">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="uppercase tracking-[0.3em] text-[10px] font-bold">Preparing Sanctuary...</p>
        </div>
    );

    if (!room) return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <div className="h-screen bg-stone-50 text-stone-900 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-2xl md:text-3xl">Room Not Found</p>
            <Link to="/" className="text-emerald-700 uppercase tracking-widest text-xs border-b border-emerald-700 pb-1">Return Home</Link>
        </div>
    );

    return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <div className="bg-stone-50 min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 text-stone-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-emerald-700 text-[10px] uppercase tracking-widest mb-8 transition-all group">
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    {/* Left: Image & Info */}
                    <div className="lg:col-span-8">
                        {/* LIGHT THEME: border-stone-200 */}
                        <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video border border-stone-200">
                            <img src={room.image} className="w-full h-full object-cover" alt={room.title} />
                        </div>
                        <h1 className="text-stone-950 text-4xl md:text-6xl font-serif mb-6">{room.title}</h1>
                        <p className="text-stone-600 text-base leading-relaxed mb-10">{room.description}</p>
                        
                        {/* LIGHT THEME: border-stone-200, text-emerald-700 */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-8 border-y border-stone-200">
                            <div className="space-y-1">
                                <span className="text-emerald-700 text-[9px] uppercase tracking-widest">Size</span>
                                <div className="text-stone-800 flex items-center gap-2"><Maximize size={16}/> {room.size}</div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-emerald-700 text-[9px] uppercase tracking-widest">Bed</span>
                                <div className="text-stone-800 flex items-center gap-2"><BedDouble size={16}/> {room.bedType}</div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-emerald-700 text-[9px] uppercase tracking-widest">Rate</span>
                                <div className="text-emerald-700 text-2xl font-serif">${room.price}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Updated Booking Form */}
                    <div className="lg:col-span-4">
                        {/* LIGHT THEME: bg-white, border-stone-100 */}
                        <div className="sticky top-28 bg-white border border-stone-100 p-6 rounded-3xl shadow-sm">
                            {isBooked ? (
                                <div className="text-center py-12">
                                    <CheckCircle size={40} className="text-emerald-600 mx-auto mb-4" />
                                    <h3 className="text-stone-950 text-xl font-serif">Booking Received!</h3>
                                    <p className="text-stone-500 text-xs mt-2">We will contact you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleBooking} className="space-y-4">
                                    <h3 className="text-stone-950 text-xl font-serif mb-4">Reserve Now</h3>
                                    
                                    {/* LIGHT THEME: bg-stone-100, border-stone-200, text-stone-900 */}
                                    <input required type="text" placeholder="Full Name" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-300 outline-none text-stone-900" 
                                        onChange={e => setBookingData({...bookingData, guestName: e.target.value})} />

                                    <div className="relative">
                                        <input required type="email" placeholder="Email Address" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-300 outline-none text-stone-900" 
                                            onChange={e => setBookingData({...bookingData, email: e.target.value})} />
                                        <Mail size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input required type="tel" placeholder="Phone" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-300 outline-none text-stone-900" 
                                            onChange={e => setBookingData({...bookingData, phone: e.target.value})} />
                                        <input required type="number" placeholder="Guests" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-300 outline-none text-stone-900" 
                                            onChange={e => setBookingData({...bookingData, members: e.target.value})} />
                                    </div>

                                    <input required type="text" placeholder="Address" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-300 outline-none text-stone-900" 
                                        onChange={e => setBookingData({...bookingData, address: e.target.value})} />

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[8px] text-stone-500 uppercase">Check In</label>
                                            <input required type="date" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:border-emerald-300 outline-none text-stone-900" 
                                                onChange={e => setBookingData({...bookingData, checkIn: e.target.value})} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[8px] text-stone-500 uppercase">Check Out</label>
                                            <input required type="date" className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:border-emerald-300 outline-none text-stone-900" 
                                                onChange={e => setBookingData({...bookingData, checkOut: e.target.value})} />
                                        </div>
                                    </div>

                                    {/* LIGHT THEME: bg-emerald-700, hover:bg-emerald-800 */}
                                    <button disabled={isBooking} className="w-full bg-emerald-700 text-white font-bold py-4 rounded-xl uppercase text-[10px] tracking-widest hover:bg-emerald-800 transition-all">
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