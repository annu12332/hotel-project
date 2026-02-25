import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Mail, Phone, User, ArrowRight, CheckCircle2, Loader2, MapPin, BedDouble } from 'lucide-react';
import axios from 'axios';

const ReservationForm = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // ডাইনামিক রুম লিস্টের জন্য স্টেট
    const [availableRooms, setAvailableRooms] = useState([]);
    const [fetchingRooms, setFetchingRooms] = useState(true);

    // ১. ফরম ডেটা স্টেট
    const [formData, setFormData] = useState({
        roomTitle: '', // এটি ডাইনামিকভাবে সেট হবে
        checkIn: '',
        checkOut: '',
        guestName: '',
        email: '',
        phone: '',
        address: '',
        members: '2 Adults'
    });

    // ডাটাবেজ থেকে রুমগুলো নিয়ে আসা
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await axios.get('https://hotel-server-qryr.onrender.com/api/rooms');
                // রুমের টাইটেলগুলো ডুপ্লিকেট রিমুভ করে ইউনিক লিস্ট তৈরি
                const uniqueRooms = [...new Set(res.data.map(room => room.title))];
                setAvailableRooms(uniqueRooms);
                
                // প্রথম রুমটিকে ডিফল্ট হিসেবে সেট করা
                if (uniqueRooms.length > 0) {
                    setFormData(prev => ({ ...prev, roomTitle: uniqueRooms[0] }));
                }
                setFetchingRooms(false);
            } catch (err) {
                console.error("Error fetching rooms:", err);
                setFetchingRooms(false);
            }
        };
        fetchRooms();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://hotel-server-qryr.onrender.com/api/bookings', {
                ...formData,
                totalPrice: 0 
            });
            
            if (response.data.success) {
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error("Booking Error:", error);
            alert("Reservation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0c0c0c] p-12 rounded-[2.5rem] border border-[#b59473]/30 text-center space-y-6 max-w-lg mx-auto">
                <div className="flex justify-center">
                    <div className="bg-[#b59473]/10 p-5 rounded-full"><CheckCircle2 size={48} className="text-[#b59473]" /></div>
                </div>
                <h2 className="text-white text-3xl font-serif italic">Request Received</h2>
                <p className="text-gray-400 text-sm leading-relaxed uppercase tracking-widest">
                    Thank you <span className="text-white">{formData.guestName}</span>. We've received your request for the <span className="text-[#b59473]">{formData.roomTitle}</span>.
                </p>
                <button onClick={() => onClose ? onClose() : window.location.reload()} className="text-[#b59473] text-[10px] font-bold uppercase tracking-[0.4em] border-b border-[#b59473]/30 pb-1">Dismiss</button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between mb-10 px-10">
                {[1, 2, 3].map((num) => (
                    <div key={num} className="flex flex-col items-center gap-2">
                        <div className={`h-[2px] w-16 rounded-full transition-all duration-700 ${step >= num ? 'bg-[#b59473]' : 'bg-white/10'}`} />
                        <span className={`text-[8px] uppercase tracking-[0.2em] font-bold ${step >= num ? 'text-[#b59473]' : 'text-gray-600'}`}>Step 0{num}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-14 relative shadow-2xl">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ x: 15, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -15, opacity: 0 }} className="space-y-8">
                            <div>
                                <span className="text-[#b59473] text-[10px] uppercase tracking-[0.5em] font-bold">Inquiry</span>
                                <h3 className="text-white text-4xl font-serif mt-2 italic">Choose Your Suite</h3>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 text-[9px] uppercase text-gray-500 tracking-widest font-black ml-1">
                                        <BedDouble size={14} className="text-[#b59473]" /> Dynamic Room Selection
                                    </label>
                                    <div className="relative">
                                        {fetchingRooms ? (
                                            <div className="w-full bg-white/5 py-4 px-2 text-gray-500 text-xs animate-pulse">Loading available rooms...</div>
                                        ) : (
                                            <select name="roomTitle" value={formData.roomTitle} onChange={handleChange} className="w-full bg-white/5 border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473] transition-all appearance-none cursor-pointer">
                                                {availableRooms.map((title, index) => (
                                                    <option key={index} value={title} className="bg-[#111]">{title}</option>
                                                ))}
                                                {availableRooms.length === 0 && <option className="bg-[#111]">No rooms available</option>}
                                            </select>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 text-[9px] uppercase text-gray-500 tracking-widest font-black ml-1"><Calendar size={14} className="text-[#b59473]" /> Arrival</label>
                                        <input required name="checkIn" value={formData.checkIn} onChange={handleChange} type="date" className="w-full bg-white/5 border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473] transition-all" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 text-[9px] uppercase text-gray-500 tracking-widest font-black ml-1"><Calendar size={14} className="text-[#b59473]" /> Departure</label>
                                        <input required name="checkOut" value={formData.checkOut} onChange={handleChange} type="date" className="w-full bg-white/5 border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473] transition-all" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ x: 15, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -15, opacity: 0 }} className="space-y-8">
                            <div>
                                <span className="text-[#b59473] text-[10px] uppercase tracking-[0.5em] font-bold">Guest</span>
                                <h3 className="text-white text-4xl font-serif mt-2 italic">Who is Staying?</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 text-[9px] uppercase text-gray-500 tracking-widest font-black ml-1"><User size={14} className="text-[#b59473]" /> Name</label>
                                    <input required name="guestName" value={formData.guestName} onChange={handleChange} type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473]" />
                                </div>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 text-[9px] uppercase text-gray-500 tracking-widest font-black ml-1"><Mail size={14} className="text-[#b59473]" /> Email</label>
                                    <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@domain.com" className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473]" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ x: 15, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -15, opacity: 0 }} className="space-y-8">
                            <div>
                                <span className="text-[#b59473] text-[10px] uppercase tracking-[0.5em] font-bold">Contact</span>
                                <h3 className="text-white text-4xl font-serif mt-2 italic">Final Details</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 text-[9px] uppercase text-gray-500 tracking-widest font-black ml-1"><Users size={14} className="text-[#b59473]" /> Members</label>
                                    <select name="members" value={formData.members} onChange={handleChange} className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-white outline-none appearance-none cursor-pointer focus:border-[#b59473]">
                                        <option className="bg-[#111]">1 Adult</option>
                                        <option className="bg-[#111]">2 Adults</option>
                                        <option className="bg-[#111]">4 Adults</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 text-[9px] uppercase text-gray-500 tracking-widest font-black ml-1"><Phone size={14} className="text-[#b59473]" /> Phone</label>
                                    <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+..." className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473]" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 text-[9px] uppercase text-gray-500 tracking-widest font-black ml-1"><MapPin size={14} className="text-[#b59473]" /> Address</label>
                                <input required name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Your City, Country" className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473]" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
                    {step > 1 ? (
                        <button type="button" onClick={prevStep} className="text-gray-500 hover:text-white text-[9px] font-black uppercase tracking-[0.3em]">Back</button>
                    ) : <span />}

                    {step < 3 ? (
                        <button type="button" onClick={nextStep} className="group flex items-center gap-4 bg-[#b59473] text-black px-10 py-4 rounded-full font-bold text-[9px] uppercase tracking-widest hover:bg-white transition-all">Next Step <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></button>
                    ) : (
                        <button type="submit" disabled={loading} className="bg-white text-black px-12 py-4 rounded-full font-bold text-[9px] uppercase tracking-widest hover:bg-[#b59473] transition-all disabled:opacity-50 flex items-center gap-3">
                            {loading && <Loader2 className="animate-spin" size={16} />}
                            {loading ? 'Sending...' : 'Confirm Request'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;