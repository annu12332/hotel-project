import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, Tag, DollarSign, CheckCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OfferDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Booking Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        message: ''
    });

    useEffect(() => {
        fetch('/offers.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                const foundOffer = data.find(o => o.id === parseInt(id));
                if (foundOffer) {
                    setOffer(foundOffer);
                } else {
                    setError(new Error('Offer not found'));
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [id]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send this data to a backend server
        console.log('Booking submitted:', formData);

        // Simulate a successful booking
        toast.success('Booking Request Sent! We will contact you shortly.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        // Optionally, clear the form or redirect
        setFormData({
            name: '',
            email: '',
            phone: '',
            checkIn: '',
            checkOut: '',
            guests: 1,
            message: ''
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <p className="text-[#b59473] text-lg">Loading offer details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-4">
                <p className="text-red-500 text-lg mb-4">Error: {error.message}</p>
                <button
                    onClick={() => navigate('/offers')}
                    className="bg-[#b59473] text-white px-6 py-3 rounded-full hover:bg-[#a07c5b] transition-all"
                >
                    Back to Offers
                </button>
            </div>
        );
    }

    if (!offer) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-4">
                <p className="text-white text-lg mb-4">No offer found with ID: {id}</p>
                <button
                    onClick={() => navigate('/offers')}
                    className="bg-[#b59473] text-white px-6 py-3 rounded-full hover:bg-[#a07c5b] transition-all"
                >
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
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex items-center gap-2 text-[#b59473] hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                    Back to all offers
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                >
                    {/* Offer Details Section */}
                    <div className="lg:col-span-2 bg-[#1a1a1a] rounded-lg shadow-xl p-8">
                        <img
                            src={offer.imageUrl}
                            alt={offer.title}
                            className="w-full h-96 object-cover rounded-lg mb-8 shadow-md"
                        />
                        <h1 className="text-white text-4xl md:text-5xl font-serif italic mb-4 leading-tight">
                            {offer.title}
                        </h1>
                        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                            {offer.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center text-gray-300 text-base bg-[#0f0f0f] p-4 rounded-md">
                                <DollarSign size={20} className="mr-3 text-[#b59473]" />
                                <span><strong className="text-white">Price:</strong> {offer.price}</span>
                            </div>
                            <div className="flex items-center text-gray-300 text-base bg-[#0f0f0f] p-4 rounded-md">
                                <CalendarDays size={20} className="mr-3 text-[#b59473]" />
                                <span><strong className="text-white">Validity:</strong> {offer.validity}</span>
                            </div>
                        </div>

                        {/* Additional Details/Bullet Points (Optional) */}
                        <div className="mt-8">
                            <h3 className="text-white text-2xl font-serif italic mb-4">What's Included:</h3>
                            <ul className="list-none space-y-3">
                                <li className="flex items-center text-gray-300">
                                    <CheckCircle size={18} className="mr-3 text-[#b59473] shrink-0" />
                                    <span>Complimentary welcome drink on arrival.</span>
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <CheckCircle size={18} className="mr-3 text-[#b59473] shrink-0" />
                                    <span>Daily gourmet breakfast for two.</span>
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <CheckCircle size={18} className="mr-3 text-[#b59473] shrink-0" />
                                    <span>Late checkout until 2 PM (subject to availability).</span>
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <CheckCircle size={18} className="mr-3 text-[#b59473] shrink-0" />
                                    <span>Access to our state-of-the-art fitness center.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Booking Form Section */}
                    <div className="lg:col-span-1 bg-[#1a1a1a] rounded-lg shadow-xl p-8 h-fit sticky top-10">
                        <h2 className="text-white text-3xl font-serif italic mb-6 text-center">
                            Book This Offer
                        </h2>
                        <form onSubmit={handleBookingSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#b59473]"
                                    placeholder="Your Full Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#b59473]"
                                    placeholder="your@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-gray-300 text-sm font-bold mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#b59473]"
                                    placeholder="+1234567890"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="checkIn" className="block text-gray-300 text-sm font-bold mb-2">Check-in Date</label>
                                    <input
                                        type="date"
                                        id="checkIn"
                                        name="checkIn"
                                        value={formData.checkIn}
                                        onChange={handleFormChange}
                                        className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#b59473]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="checkOut" className="block text-gray-300 text-sm font-bold mb-2">Check-out Date</label>
                                    <input
                                        type="date"
                                        id="checkOut"
                                        name="checkOut"
                                        value={formData.checkOut}
                                        onChange={handleFormChange}
                                        className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#b59473]"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="guests" className="block text-gray-300 text-sm font-bold mb-2">Number of Guests</label>
                                <input
                                    type="number"
                                    id="guests"
                                    name="guests"
                                    min="1"
                                    value={formData.guests}
                                    onChange={handleFormChange}
                                    className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#b59473]"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">Special Requests</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleFormChange}
                                    className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#b59473]"
                                    placeholder="Any special requests or notes..."
                                ></textarea>
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-[#b59473] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#a07c5b] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#b59473]/50"
                            >
                                Confirm Booking
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default OfferDetails;