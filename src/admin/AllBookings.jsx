import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Icons updated for Brighter Eco-theme
import { Loader2, Trash2, CheckCircle, Clock, Phone, Users, Calendar, XCircle, Mail, MapPin, Info, Leaf } from 'lucide-react';
import axios from 'axios';

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    // API Base URL
    const API_URL = 'https://hotel-server-qryr.onrender.com/api/bookings';

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await axios.get(API_URL);
            setBookings(res.data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}`, { status: newStatus });
            if (response.status === 200) {
                setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
            }
        } catch (err) {
            console.error("Update failed:", err);
            alert("Status update failed. Make sure backend is updated.");
        }
    };

    const deleteBooking = async (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            try {
                const response = await axios.delete(`${API_URL}/${id}`);
                if (response.status === 200) {
                    setBookings(prev => prev.filter(b => b._id !== id));
                }
            } catch (err) {
                console.error("Delete failed:", err);
                alert("Failed to delete booking.");
            }
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="text-sm font-bold tracking-widest uppercase italic text-stone-600">Fetching Records...</p>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-stone-900 tracking-tight">Reservations</h2>
                    <p className="text-sm text-stone-500 font-medium">Manage status and guest records</p>
                </div>
                <div className="px-6 py-3 bg-emerald-600 rounded-2xl text-white font-bold text-sm shadow-lg shadow-emerald-100 flex items-center gap-2 w-fit">
                    <Leaf size={18} /> {bookings.length} Total Bookings
                </div>
            </div>

            {/* Desktop View Table */}
            <div className="hidden lg:block bg-white rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-stone-50/80 border-b border-stone-100">
                            <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">Guest Info</th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">Cabin Details</th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">Schedule</th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black">Status</th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                        {bookings.map((booking) => (
                            <React.Fragment key={booking._id}>
                                <tr className="hover:bg-emerald-50/30 transition-all">
                                    <td className="p-6">
                                        <div className="font-bold text-stone-900 text-base">{booking.guestName}</div>
                                        <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold mt-1">
                                            <Phone size={12} /> {booking.phone || 'N/A'}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm font-bold text-stone-700">{booking.roomTitle}</div>
                                        <div className="text-[10px] text-stone-400 uppercase tracking-widest mt-1 flex items-center gap-1">
                                            <Users size={10} /> {booking.members || 1} Persons
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1 text-xs">
                                            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md w-fit">In: {new Date(booking.checkIn).toLocaleDateString()}</span>
                                            <span className="text-[10px] text-stone-400 italic ml-1 font-medium">Out: {new Date(booking.checkOut).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-100' :
                                            booking.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-100' :
                                            'bg-amber-50 text-amber-700 border-amber-100'
                                        }`}>
                                            {booking.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-1.5">
                                            <button onClick={() => setExpandedId(expandedId === booking._id ? null : booking._id)} className="p-2 text-emerald-500 hover:bg-emerald-100 rounded-xl" title="Details"><Info size={18} /></button>
                                            <button onClick={() => updateStatus(booking._id, 'Confirmed')} className="p-2 text-green-600 hover:bg-green-100 rounded-xl" title="Confirm"><CheckCircle size={18} /></button>
                                            <button onClick={() => updateStatus(booking._id, 'Pending')} className="p-2 text-amber-600 hover:bg-amber-100 rounded-xl" title="Pending"><Clock size={18} /></button>
                                            <button onClick={() => updateStatus(booking._id, 'Cancelled')} className="p-2 text-red-500 hover:bg-red-100 rounded-xl" title="Cancel"><XCircle size={18} /></button>
                                            <button onClick={() => deleteBooking(booking._id)} className="p-2 text-stone-300 hover:text-red-600 rounded-xl transition-colors"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                                <AnimatePresence>
                                    {expandedId === booking._id && (
                                        <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-stone-50/50">
                                            <td colSpan="5" className="p-4">
                                                <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-stone-100">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-stone-600"><Mail size={14} className="text-emerald-500" /> {booking.email || 'N/A'}</div>
                                                    <div className="flex items-center gap-2 text-xs font-bold text-stone-600"><MapPin size={14} className="text-emerald-500" /> {booking.location || 'N/A'}</div>
                                                    <div className="flex items-center gap-2 text-xs font-bold text-stone-600"><Users size={14} className="text-emerald-500" /> {booking.members || 1} Guest(s)</div>
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

            {/* Mobile View Card Layout */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
                {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
                        {/* Mobile Header: Status & Quick Actions */}
                        <div className="p-4 flex justify-between items-center bg-stone-50/50 border-b border-stone-100">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-100' :
                                booking.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}>
                                {booking.status || 'Pending'}
                            </span>
                            <div className="flex gap-1">
                                <button onClick={() => updateStatus(booking._id, 'Confirmed')} className="p-2 text-green-600 bg-white rounded-lg shadow-sm border border-stone-100"><CheckCircle size={16} /></button>
                                <button onClick={() => updateStatus(booking._id, 'Cancelled')} className="p-2 text-red-500 bg-white rounded-lg shadow-sm border border-stone-100"><XCircle size={16} /></button>
                                <button onClick={() => deleteBooking(booking._id)} className="p-2 text-stone-300 bg-white rounded-lg shadow-sm border border-stone-100"><Trash2 size={16} /></button>
                            </div>
                        </div>

                        {/* Mobile Body: Full Details */}
                        <div className="p-5 space-y-4">
                            <div>
                                <h3 className="font-black text-stone-900 text-lg leading-tight">{booking.guestName}</h3>
                                <p className="text-emerald-600 text-xs font-black mt-1 uppercase tracking-tight">{booking.roomTitle}</p>
                            </div>

                            {/* Dates Section */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
                                    <p className="text-[8px] uppercase font-black text-stone-400">Check In</p>
                                    <p className="text-xs font-bold text-stone-700 flex items-center gap-1 mt-1"><Calendar size={12} className="text-emerald-500"/> {new Date(booking.checkIn).toLocaleDateString()}</p>
                                </div>
                                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
                                    <p className="text-[8px] uppercase font-black text-stone-400">Check Out</p>
                                    <p className="text-xs font-bold text-stone-700 flex items-center gap-1 mt-1"><Calendar size={12} className="text-emerald-500"/> {new Date(booking.checkOut).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Info List */}
                            <div className="space-y-2.5 pt-2">
                                <div className="flex items-center gap-3 text-xs font-bold text-stone-600">
                                    <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500"><Phone size={14} /></div>
                                    <span>{booking.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-stone-600">
                                    <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500"><Mail size={14} /></div>
                                    <span className="truncate">{booking.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-stone-600">
                                    <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500"><Users size={14} /></div>
                                    <span>{booking.members || 1} Guest(s)</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-stone-600">
                                    <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500"><MapPin size={14} /></div>
                                    <span>{booking.location || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {!loading && bookings.length === 0 && (
                <div className="py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-stone-100">
                    <p className="text-stone-400 font-bold uppercase tracking-widest text-sm">No reservations found</p>
                </div>
            )}
        </div>
    );
};

export default AllBookings;