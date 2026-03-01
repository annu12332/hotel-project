import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, DollarSign, CheckCircle, Loader2, ArrowLeft, Tag } from 'lucide-react'; // Added icons
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
                theme: "light",
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
            // LIGHT THEME: bg-stone-50, emerald-700
            <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-emerald-700 mb-4" size={40} />
                <p className="text-emerald-700 text-lg tracking-widest uppercase italic">Loading Eco Offer...</p>
            </div>
        );
    }

    if (!offer) {
        return (
            // LIGHT THEME: bg-stone-50
            <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center text-center px-4 text-stone-900">
                <p className="text-lg mb-4">Offer not found or has been removed.</p>
                <button onClick={() => navigate('/offers')} className="bg-emerald-700 text-white px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors">
                    Back to Offers
                </button>
            </div>
        );
    }

    return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <section className="bg-stone-50 py-20 px-4 min-h-screen text-stone-900">
            <ToastContainer />
            <div className="container mx-auto">
                <motion.button
                    onClick={() => navigate('/offers')}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="mb-8 flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors font-bold text-sm"
                >
                    <ArrowLeft size={20} />
                    Back to all offers
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                >
                    {/* Offer Details Section */}
                    {/* LIGHT THEME: bg-white, border-stone-100 */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-8 border border-stone-100">
                        <div className="relative overflow-hidden rounded-lg mb-8">
                            <img
                                src={offer.imageUrl}
                                alt={offer.title}
                                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                            />
                            {offer.discount && (
                                // LIGHT THEME: Emerald Green tag
                                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-1 rounded-full font-bold shadow-md flex items-center gap-1 text-sm">
                                    <Tag size={16} /> {offer.discount}
                                </div>
                            )}
                        </div>

                        <h1 className="text-stone-950 text-4xl md:text-5xl font-serif italic mb-4 leading-tight">
                            {offer.title}
                        </h1>
                        <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                            {offer.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {/* LIGHT THEME: bg-stone-100, emerald-600 icons */}
                            <div className="flex items-center text-stone-800 text-base bg-stone-100 p-5 rounded-xl border border-stone-200">
                                <DollarSign size={24} className="mr-4 text-emerald-600" />
                                <div>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest">Price Starts From</p>
                                    <span className="text-xl font-bold text-stone-950">{offer.price}</span>
                                </div>
                            </div>
                            <div className="flex items-center text-stone-800 text-base bg-stone-100 p-5 rounded-xl border border-stone-200">
                                <CalendarDays size={24} className="mr-4 text-emerald-600" />
                                <div>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest">Offer Validity</p>
                                    <span className="text-xl font-bold text-stone-950">{offer.validity}</span>
                                </div>
                            </div>
                        </div>

                        {/* LIGHT THEME: Gradient updated */}
                        <div className="mt-10 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                            <h3 className="text-emerald-900 text-2xl font-serif italic mb-6">Premium Inclusions:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Complimentary welcome drink on arrival.",
                                    "Daily organic gourmet breakfast.",
                                    "Eco-friendly spa session for two.",
                                    "Bicycle rentals for local exploration."
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start text-emerald-800">
                                        <CheckCircle size={18} className="mr-3 text-emerald-600 mt-1 shrink-0" />
                                        <span className="text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Form Section */}
                    {/* LIGHT THEME: bg-white, border-stone-100 */}
                    <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-8 h-fit sticky top-10 border border-stone-100">
                        <h2 className="text-stone-950 text-3xl font-serif italic mb-6 text-center">
                            Claim This Eco Offer
                        </h2>
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div>
                                <label className="block text-stone-500 text-xs uppercase tracking-widest mb-2">Full Name</label>
                                <input
                                    type="text" name="guestName" value={formData.guestName} onChange={handleFormChange}
                                    className="w-full p-3 bg-white border border-stone-200 rounded-md text-stone-900 focus:ring-1 focus:ring-emerald-300 outline-none"
                                    placeholder="Enter your name" required
                                />
                            </div>
                            <div>
                                <label className="block text-stone-500 text-xs uppercase tracking-widest mb-2">Email Address</label>
                                <input
                                    type="email" name="email" value={formData.email} onChange={handleFormChange}
                                    className="w-full p-3 bg-white border border-stone-200 rounded-md text-stone-900 focus:ring-1 focus:ring-emerald-300 outline-none"
                                    placeholder="email@example.com" required
                                />
                            </div>
                            <div>
                                <label className="block text-stone-500 text-xs uppercase tracking-widest mb-2">Phone</label>
                                <input
                                    type="tel" name="phone" value={formData.phone} onChange={handleFormChange}
                                    className="w-full p-3 bg-white border border-stone-200 rounded-md text-stone-900 focus:ring-1 focus:ring-emerald-300 outline-none"
                                    placeholder="+880..." required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-stone-500 text-xs uppercase tracking-widest mb-2">Check-in</label>
                                    <input
                                        type="date" name="checkIn" value={formData.checkIn} onChange={handleFormChange}
                                        className="w-full p-3 bg-white border border-stone-200 rounded-md text-stone-900 text-xs outline-none" required
                                    />
                                </div>
                                <div>
                                    <label className="block text-stone-500 text-xs uppercase tracking-widest mb-2">Check-out</label>
                                    <input
                                        type="date" name="checkOut" value={formData.checkOut} onChange={handleFormChange}
                                        className="w-full p-3 bg-white border border-stone-200 rounded-md text-stone-900 text-xs outline-none" required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-stone-500 text-xs uppercase tracking-widest mb-2">Guests</label>
                                <input
                                    type="number" name="members" min="1" value={formData.members} onChange={handleFormChange}
                                    className="w-full p-3 bg-white border border-stone-200 rounded-md text-stone-900 outline-none" required
                                />
                            </div>
                            <div>
                                <label className="block text-stone-500 text-xs uppercase tracking-widest mb-2">Your Address</label>
                                <textarea
                                    name="address" rows="3" value={formData.address} onChange={handleFormChange}
                                    className="w-full p-3 bg-white border border-stone-200 rounded-md text-stone-900 outline-none"
                                    placeholder="City, Country"
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={submitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full bg-emerald-700 text-white py-4 rounded-full font-bold text-lg transition-all duration-300 ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-800'}`}
                            >
                                {submitting ? 'Processing...' : 'Confirm Reservation'}
                            </motion.button>
                        </form>
                        <p className="text-[10px] text-stone-500 text-center mt-4 uppercase tracking-widest font-bold">
                            * No advance payment required
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default OfferDetails;