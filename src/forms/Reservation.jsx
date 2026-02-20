import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Mail, Phone, User, ArrowRight, CheckCircle2 } from 'lucide-react';

const ReservationForm = () => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#111] p-12 rounded-[2.5rem] border border-[#b59473]/30 text-center space-y-6 max-w-lg mx-auto"
            >
                <div className="flex justify-center">
                    <CheckCircle2 size={64} className="text-[#b59473] animate-pulse" />
                </div>
                <h2 className="text-white text-3xl font-serif italic">Reservation Received</h2>
                <p className="text-gray-400 text-sm leading-relaxed uppercase tracking-widest">
                    Our concierge will contact you shortly to finalize your stay at Almaris.
                </p>
                <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#b59473] text-[10px] font-bold uppercase tracking-[0.4em] border-b border-[#b59473]/30 pb-1"
                >
                    Return to Home
                </button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Form Progress Indicator */}
            <div className="flex justify-between mb-12 px-10">
                {[1, 2, 3].map((num) => (
                    <div key={num} className="flex flex-col items-center gap-2">
                        <div className={`h-1 w-20 rounded-full transition-all duration-700 ${step >= num ? 'bg-[#b59473]' : 'bg-white/10'}`} />
                        <span className={`text-[9px] uppercase tracking-tighter ${step >= num ? 'text-[#b59473]' : 'text-gray-600'}`}>Step 0{num}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center md:text-left">
                                <span className="text-[#b59473] text-[10px] uppercase tracking-[0.5em] font-bold">Booking Details</span>
                                <h3 className="text-white text-4xl font-serif mt-2 italic">Select Dates</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 text-[10px] uppercase text-gray-500 tracking-widest font-bold ml-1">
                                        <Calendar size={14} className="text-[#b59473]" /> Check-In
                                    </label>
                                    <input type="date" className="w-full bg-white/5 border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473] transition-colors appearance-none" />
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 text-[10px] uppercase text-gray-500 tracking-widest font-bold ml-1">
                                        <Calendar size={14} className="text-[#b59473]" /> Check-Out
                                    </label>
                                    <input type="date" className="w-full bg-white/5 border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473] transition-colors appearance-none" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center md:text-left">
                                <span className="text-[#b59473] text-[10px] uppercase tracking-[0.5em] font-bold">Personal Info</span>
                                <h3 className="text-white text-4xl font-serif mt-2 italic">Your Identity</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 text-[10px] uppercase text-gray-500 tracking-widest font-bold ml-1">
                                        <User size={14} className="text-[#b59473]" /> Full Name
                                    </label>
                                    <input type="text" placeholder="Johnathan Doe" className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473] transition-colors" />
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 text-[10px] uppercase text-gray-500 tracking-widest font-bold ml-1">
                                        <Mail size={14} className="text-[#b59473]" /> Email
                                    </label>
                                    <input type="email" placeholder="john@example.com" className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473] transition-colors" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center md:text-left">
                                <span className="text-[#b59473] text-[10px] uppercase tracking-[0.5em] font-bold">Finalize</span>
                                <h3 className="text-white text-4xl font-serif mt-2 italic">Guest Preferences</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 text-[10px] uppercase text-gray-500 tracking-widest font-bold ml-1">
                                        <Users size={14} className="text-[#b59473]" /> Guests
                                    </label>
                                    <select className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473] transition-colors appearance-none">
                                        <option className="bg-[#111]">1 Adult</option>
                                        <option className="bg-[#111]">2 Adults</option>
                                        <option className="bg-[#111]">4 Adults</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 text-[10px] uppercase text-gray-500 tracking-widest font-bold ml-1">
                                        <Phone size={14} className="text-[#b59473]" /> Phone Number
                                    </label>
                                    <input type="tel" placeholder="+1 234 567 890" className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-white outline-none focus:border-[#b59473] transition-colors" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- Form Controls --- */}
                <div className="flex items-center justify-between mt-16 pt-10 border-t border-white/5">
                    {step > 1 ? (
                        <button type="button" onClick={prevStep} className="text-gray-500 hover:text-white text-[10px] uppercase tracking-[0.3em] transition-all">
                            Back
                        </button>
                    ) : (
                        <span />
                    )}

                    {step < 3 ? (
                        <button 
                            type="button" 
                            onClick={nextStep}
                            className="flex items-center gap-4 bg-[#b59473] text-black px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-xl shadow-[#b59473]/10"
                        >
                            Continue <ArrowRight size={14} />
                        </button>
                    ) : (
                        <button 
                            type="submit"
                            className="bg-white text-black px-12 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#b59473] transition-all duration-500 shadow-2xl"
                        >
                            Confirm Reservation
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;