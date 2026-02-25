import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Trash2, CheckCircle, Clock, Phone, Users, Calendar, AlertCircle, XCircle } from 'lucide-react';
import axios from 'axios';

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    // ডাটাবেস থেকে বুকিং ডাটা নিয়ে আসা
    const fetchBookings = async () => {
        try {
            const res = await axios.get('https://hotel-server-qryr.onrender.com/api/bookings');
            setBookings(res.data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
        } finally {
            setLoading(false);
        }
    };

    // স্ট্যাটাস আপডেট করার ফাংশন (Confirm / Cancel / Pending)
    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`https://hotel-server-qryr.onrender.com/api/bookings/${id}`, { status: newStatus });
            
            // UI আপডেট: শুধু ফিল্টার না করে ম্যাপ করে স্ট্যাটাস চেঞ্জ করা হচ্ছে
            setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
        } catch (err) {
            alert("Failed to update status. Make sure the backend route is working.");
        }
    };

    // বুকিং ডিলিট করার ফাংশন
    const deleteBooking = async (id) => {
        if (window.confirm("Are you sure you want to permanently remove this booking?")) {
            try {
                await axios.delete(`https://hotel-server-qryr.onrender.com/api/bookings/${id}`);
                setBookings(bookings.filter(b => b._id !== id));
            } catch (err) {
                alert("Failed to delete booking.");
            }
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p className="text-sm font-medium tracking-widest uppercase italic">Accessing Database...</p>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Reservations</h2>
                    <p className="text-sm text-slate-500 font-medium">Manage and monitor guest statuses</p>
                </div>
                <div className="px-6 py-3 bg-indigo-600 rounded-2xl text-white font-bold text-sm shadow-lg shadow-indigo-200 flex items-center gap-2">
                    <CheckCircle size={18} /> {bookings.length} Total Bookings
                </div>
            </div>

            <div className="overflow-hidden">
                {/* Desktop View */}
                <div className="hidden lg:block bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-100">
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Guest Info</th>
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Room</th>
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Schedule</th>
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Status</th>
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="p-6">
                                        <div className="font-bold text-slate-800 text-base">{booking.guestName}</div>
                                        <div className="flex items-center gap-2 text-xs text-indigo-500 font-semibold mt-1.5">
                                            <Phone size={12} /> <span>{booking.phone || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm font-bold text-slate-700">{booking.roomTitle}</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1">
                                            <Users size={10} /> {booking.members || 1} Guests
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="inline-flex flex-col gap-1">
                                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">In: {new Date(booking.checkIn).toLocaleDateString()}</span>
                                            <span className="text-[10px] font-medium text-slate-400 ml-1 italic">Out: {new Date(booking.checkOut).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            booking.status === 'Confirmed' ? 'bg-green-50 text-green-600 border-green-100' :
                                            booking.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                                            'bg-amber-50 text-amber-600 border-amber-100'
                                        }`}>
                                            {booking.status === 'Confirmed' ? <CheckCircle size={12} /> : 
                                             booking.status === 'Cancelled' ? <XCircle size={12} /> : 
                                             <Clock size={12} />} 
                                            {booking.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* Confirm Button */}
                                            {booking.status !== 'Confirmed' && (
                                                <button onClick={() => updateStatus(booking._id, 'Confirmed')} className="p-2 text-green-500 hover:bg-green-50 rounded-xl" title="Confirm Booking">
                                                    <CheckCircle size={20} />
                                                </button>
                                            )}
                                            {/* Pending Button (Reset) */}
                                            {booking.status !== 'Pending' && booking.status && (
                                                <button onClick={() => updateStatus(booking._id, 'Pending')} className="p-2 text-amber-500 hover:bg-amber-50 rounded-xl" title="Set to Pending">
                                                    <Clock size={20} />
                                                </button>
                                            )}
                                            {/* Cancel Button */}
                                            {booking.status !== 'Cancelled' && (
                                                <button onClick={() => updateStatus(booking._id, 'Cancelled')} className="p-2 text-red-400 hover:bg-red-50 rounded-xl" title="Cancel Booking">
                                                    <XCircle size={20} />
                                                </button>
                                            )}
                                            <div className="w-px h-6 bg-slate-100 mx-1 self-center" />
                                            <button onClick={() => deleteBooking(booking._id)} className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="grid grid-cols-1 gap-5 lg:hidden">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5 relative overflow-hidden">
                            <div className={`absolute top-0 left-0 w-1.5 h-full ${
                                booking.status === 'Confirmed' ? 'bg-green-500' :
                                booking.status === 'Cancelled' ? 'bg-red-500' : 'bg-amber-500'
                            }`} />
                            
                            <div className="flex justify-between items-start pl-2">
                                <div>
                                    <h3 className="font-black text-slate-800 text-lg leading-tight">{booking.guestName}</h3>
                                    <p className="text-indigo-600 text-sm font-bold mt-1 uppercase tracking-tighter">{booking.roomTitle}</p>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => updateStatus(booking._id, 'Confirmed')} className="p-2 text-green-500 bg-green-50 rounded-lg"><CheckCircle size={16} /></button>
                                    <button onClick={() => updateStatus(booking._id, 'Cancelled')} className="p-2 text-red-500 bg-red-50 rounded-lg"><XCircle size={16} /></button>
                                    <button onClick={() => deleteBooking(booking._id)} className="p-2 bg-slate-50 text-slate-400 rounded-lg"><Trash2 size={16} /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 pl-2">
                                <div className="space-y-1">
                                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Status</p>
                                    <div className="font-bold text-xs uppercase text-slate-700">{booking.status || 'Pending'}</div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Schedule</p>
                                    <div className="flex items-center gap-1 text-slate-700 font-bold text-[10px]">
                                        <Calendar size={10} className="text-indigo-500" />
                                        {new Date(booking.checkIn).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {bookings.length === 0 && (
                <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-100 text-center flex flex-col items-center">
                    <AlertCircle size={48} className="text-slate-200 mb-4" />
                    <h3 className="text-slate-800 font-bold text-lg">No Active Reservations</h3>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto mt-2">New bookings will appear here instantly.</p>
                </div>
            )}
        </div>
    );
};

export default AllBookings;