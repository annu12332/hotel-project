import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, DollarSign, CheckCircle, Loader2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const OfferDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Booking Form State
    const [formData, setFormData] = useState({
        guestName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        members: 1,
        address: ''
    });

    useEffect(() => {
        const fetchOfferDetails = async () => {
            try {

                const res = await axios.get('https://hotel-server-qryr.onrender.com/api/offers');
                const foundOffer = res.data.find(o => o._id === id);

                if (foundOffer) {
                    setOffer(foundOffer);
                } else {
                    toast.error("Offer not found");
                }
            } catch (err) {
                console.error("Error fetching offer:", err);
                toast.error("Failed to load offer details");
            } finally {
                setLoading(false);
            }
        };

        fetchOfferDetails();
    }, [id]);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const bookingPayload = {
            roomId: `OFFER_${offer._id}`,
            roomTitle: `Offer: ${offer.title}`,
            totalPrice: offer.price,
            ...formData
        };

        try {
            await axios.post('https://hotel-server-qryr.onrender.com/api/bookings', bookingPayload);

            toast.success('Booking Request Sent! We will contact you shortly.', {
                theme: "dark",
            });

            setFormData({
                guestName: '', email: '', phone: '',
                checkIn: '', checkOut: '', members: 1, address: ''
            });
        } catch (err) {
            toast.error("Booking failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-[#b59473] mb-4" size={40} />
                <p className="text-[#b59473] text-lg">Loading luxury offer...</p>
            </div>
        );
    }

    if (!offer) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-4">
                <p className="text-white text-lg mb-4">Offer not found or has been removed.</p>
                <button onClick={() => navigate('/offers')} className="bg-[#b59473] text-white px-6 py-3 rounded-full">
                    Back to Offers
                </button>
            </div>
        );
    }

    return (
        <section className="bg-[#050505] py-20 px-4 min-h-screen text-white">
            <ToastContainer />
            <div className="container mx-auto">
                <motion.button
                    onClick={() => navigate('/offers')}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="mb-8 flex items-center gap-2 text-[#b59473] hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                    Back to all offers
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                >
                    {/* Offer Details Section */}
                    <div className="lg:col-span-2 bg-[#1a1a1a] rounded-lg shadow-xl p-8 border border-white/5">
                        <div className="relative overflow-hidden rounded-lg mb-8">
                            <img
                                src={offer.imageUrl}
                                alt={offer.title}
                                className="w-full h-[450px] object-cover shadow-md hover:scale-105 transition-transform duration-700"
                            />
                            {offer.discount && (
                                <div className="absolute top-4 left-4 bg-[#b59473] text-white px-4 py-1 rounded-full font-bold shadow-lg">
                                    {offer.discount}
                                </div>
                            )}
                        </div>

                        <h1 className="text-white text-4xl md:text-5xl font-serif italic mb-4 leading-tight">
                            {offer.title}
                        </h1>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            {offer.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center text-gray-300 text-base bg-[#0f0f0f] p-5 rounded-xl border border-white/5">
                                <DollarSign size={24} className="mr-4 text-[#b59473]" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">Price Starts From</p>
                                    <span className="text-xl font-bold text-white">{offer.price}</span>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-300 text-base bg-[#0f0f0f] p-5 rounded-xl border border-white/5">
                                <CalendarDays size={24} className="mr-4 text-[#b59473]" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">Offer Validity</p>
                                    <span className="text-xl font-bold text-white">{offer.validity}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] rounded-xl border border-[#b59473]/20">
                            <h3 className="text-white text-2xl font-serif italic mb-6">Premium Inclusions:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Complimentary welcome drink on arrival.",
                                    "Daily gourmet breakfast for two.",
                                    "Late checkout until 2 PM (subject to availability).",
                                    "Access to our state-of-the-art fitness center."
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start text-gray-300">
                                        <CheckCircle size={18} className="mr-3 text-[#b59473] mt-1 shrink-0" />
                                        <span className="text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Form Section */}
                    <div className="lg:col-span-1 bg-[#1a1a1a] rounded-lg shadow-2xl p-8 h-fit sticky top-10 border border-[#b59473]/30">
                        <h2 className="text-white text-3xl font-serif italic mb-6 text-center">
                            Claim This Offer
                        </h2>
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Full Name</label>
                                <input
                                    type="text" name="guestName" value={formData.guestName} onChange={handleFormChange}
                                    className="w-full p-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:ring-1 focus:ring-[#b59473] outline-none"
                                    placeholder="Enter your name" required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Email Address</label>
                                <input
                                    type="email" name="email" value={formData.email} onChange={handleFormChange}
                                    className="w-full p-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:ring-1 focus:ring-[#b59473] outline-none"
                                    placeholder="email@example.com" required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Phone</label>
                                <input
                                    type="tel" name="phone" value={formData.phone} onChange={handleFormChange}
                                    className="w-full p-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white focus:ring-1 focus:ring-[#b59473] outline-none"
                                    placeholder="+880..." required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Check-in</label>
                                    <input
                                        type="date" name="checkIn" value={formData.checkIn} onChange={handleFormChange}
                                        className="w-full p-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white text-xs outline-none" required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Check-out</label>
                                    <input
                                        type="date" name="checkOut" value={formData.checkOut} onChange={handleFormChange}
                                        className="w-full p-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white text-xs outline-none" required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Guests</label>
                                <input
                                    type="number" name="members" min="1" value={formData.members} onChange={handleFormChange}
                                    className="w-full p-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white outline-none" required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Your Address</label>
                                <textarea
                                    name="address" rows="3" value={formData.address} onChange={handleFormChange}
                                    className="w-full p-3 bg-[#0f0f0f] border border-gray-800 rounded-md text-white outline-none"
                                    placeholder="City, Country"
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={submitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full bg-[#b59473] text-white py-4 rounded-full font-bold text-lg transition-all duration-300 ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#a07c5b]'}`}
                            >
                                {submitting ? 'Processing...' : 'Confirm Reservation'}
                            </motion.button>
                        </form>
                        <p className="text-[10px] text-gray-500 text-center mt-4 uppercase tracking-widest font-bold">
                            * No advance payment required
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default OfferDetails;