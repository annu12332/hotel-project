import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Trash2, CheckCircle, Clock, Phone, Users, Calendar, AlertCircle, XCircle, Mail, MapPin, Info, ArrowRight } from 'lucide-react';
import axios from 'axios';

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

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

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`https://hotel-server-qryr.onrender.com/api/bookings/${id}`, { status: newStatus });
            setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
        } catch (err) {
            alert("Status update failed.");
        }
    };

    const deleteBooking = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete(`https://hotel-server-qryr.onrender.com/api/bookings/${id}`);
                setBookings(bookings.filter(b => b._id !== id));
            } catch (err) {
                alert("Delete failed.");
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
        <div className="space-y-6 p-2 md:p-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Reservations</h2>
                    <p className="text-sm text-slate-500 font-medium">Full guest insights</p>
                </div>
                <div className="px-6 py-3 bg-indigo-600 rounded-2xl text-white font-bold text-sm shadow-lg shadow-indigo-200 flex items-center gap-2 w-fit">
                    <CheckCircle size={18} /> {bookings.length} Total
                </div>
            </div>

            <div className="overflow-hidden">
                {/* Desktop Table View */}
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
                                <React.Fragment key={booking._id}>
                                    <tr className="hover:bg-slate-50/50 transition-all group">
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
                                                <button onClick={() => setExpandedId(expandedId === booking._id ? null : booking._id)} className="p-2 text-indigo-400 hover:bg-indigo-50 rounded-xl"><Info size={20} /></button>
                                                {booking.status !== 'Confirmed' && <button onClick={() => updateStatus(booking._id, 'Confirmed')} className="p-2 text-green-500 hover:bg-green-50 rounded-xl"><CheckCircle size={20} /></button>}
                                                {booking.status !== 'Pending' && booking.status && <button onClick={() => updateStatus(booking._id, 'Pending')} className="p-2 text-amber-500 hover:bg-amber-50 rounded-xl"><Clock size={20} /></button>}
                                                {booking.status !== 'Cancelled' && <button onClick={() => updateStatus(booking._id, 'Cancelled')} className="p-2 text-red-400 hover:bg-red-50 rounded-xl"><XCircle size={20} /></button>}
                                                <button onClick={() => deleteBooking(booking._id)} className="p-2 text-slate-300 hover:text-red-600 rounded-xl"><Trash2 size={20} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <AnimatePresence>
                                        {expandedId === booking._id && (
                                            <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-slate-50/30">
                                                <td colSpan="5" className="p-6">
                                                    <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Mail size={14} className="text-indigo-400" /> {booking.email || 'N/A'}</div>
                                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><MapPin size={14} className="text-indigo-400" /> {booking.location || 'N/A'}</div>
                                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Users size={14} className="text-indigo-400" /> {booking.members || 1} Persons</div>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        )}
                                    </AnimatePresence>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- MOBILE VIEW (Updated) --- */}
                <div className="grid grid-cols-1 gap-4 lg:hidden">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            {/* Top Section: Status & Actions */}
                            <div className="p-5 flex justify-between items-center bg-slate-50/50 border-b border-slate-100">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' :
                                    booking.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                                }`}>
                                    {booking.status || 'Pending'}
                                </span>
                                <div className="flex gap-1">
                                    <button onClick={() => updateStatus(booking._id, 'Confirmed')} className="p-2 text-green-500 bg-white border border-slate-100 rounded-lg shadow-sm"><CheckCircle size={16} /></button>
                                    <button onClick={() => updateStatus(booking._id, 'Pending')} className="p-2 text-amber-500 bg-white border border-slate-100 rounded-lg shadow-sm"><Clock size={16} /></button>
                                    <button onClick={() => updateStatus(booking._id, 'Cancelled')} className="p-2 text-red-400 bg-white border border-slate-100 rounded-lg shadow-sm"><XCircle size={16} /></button>
                                    <button onClick={() => deleteBooking(booking._id)} className="p-2 text-slate-300 bg-white border border-slate-100 rounded-lg shadow-sm"><Trash2 size={16} /></button>
                                </div>
                            </div>

                            {/* Middle Section: Main Info */}
                            <div className="p-5 space-y-4">
                                <div>
                                    <h3 className="font-black text-slate-800 text-lg leading-tight">{booking.guestName}</h3>
                                    <p className="text-indigo-600 text-xs font-bold mt-1 uppercase tracking-tight flex items-center gap-1">
                                        <Info size={12}/> {booking.roomTitle}
                                    </p>
                                </div>

                                {/* Dates Grid */}
                                <div className="grid grid-cols-2 gap-3 bg-indigo-50/30 p-3 rounded-2xl">
                                    <div>
                                        <p className="text-[8px] uppercase font-black text-slate-400 mb-1">Check In</p>
                                        <p className="text-xs font-bold text-slate-700 flex items-center gap-1"><Calendar size={12} className="text-indigo-500"/> {new Date(booking.checkIn).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] uppercase font-black text-slate-400 mb-1">Check Out</p>
                                        <p className="text-xs font-bold text-slate-700 flex items-center gap-1"><Calendar size={12} className="text-indigo-500"/> {new Date(booking.checkOut).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {/* Contact & Other Details */}
                                <div className="space-y-2 text-xs font-bold text-slate-600 px-1">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-indigo-500"><Phone size={14} /></div>
                                        <span>{booking.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-indigo-500"><Mail size={14} /></div>
                                        <span className="truncate">{booking.email || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-indigo-500"><MapPin size={14} /></div>
                                        <span>{booking.location || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-indigo-500"><Users size={14} /></div>
                                        <span>{booking.members || 1} Person(s)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {bookings.length === 0 && (
                <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-slate-100 text-center">
                    <p className="text-slate-400 font-bold">No bookings found.</p>
                </div>
            )}
        </div>
    );
};

export default AllBookings;