import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Loader2, Calendar, Users, Phone, Mail } from 'lucide-react';
import Swal from 'sweetalert2'; 

const PackageDetails = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [formData, setFormData] = useState({ userName: '', email: '', phone: '', checkIn: '', guests: 1 });

    useEffect(() => {
        axios.get(`https://hotel-server-qryr.onrender.com/api/packages/${id}`).then(res => setPkg(res.data));
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://hotel-server-qryr.onrender.com/api/bookings', { ...formData, packageId: id });
            // LIGHT THEME: Swal updated
            Swal.fire({ 
                icon: 'success', 
                title: 'Reserved!', 
                text: 'Our team will contact you soon.', 
                background: '#fff', 
                color: '#1c1917', 
                confirmButtonColor: '#047857' // Emerald-700
            });
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
        }
    };

    if (!pkg) return (
        // LIGHT THEME: bg-stone-50
        <div className="h-screen bg-stone-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-700" size={40} />
        </div>
    );

    return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-20 px-6 font-sans">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
                
                {/* Left: Content */}
                <div className="lg:col-span-2">
                    {/* LIGHT THEME: border-stone-200 */}
                    <img src={pkg.image} className="w-full h-[500px] object-cover rounded-[2.5rem] mb-10 border border-stone-200" alt={pkg.title} />
                    <h1 className="text-4xl md:text-5xl font-serif italic mb-6 text-stone-950">{pkg.title}</h1>
                    <p className="text-stone-600 text-lg leading-relaxed mb-10">{pkg.description}</p>
                    
                    {/* LIGHT THEME: text-emerald-700 */}
                    <h3 className="text-emerald-700 uppercase tracking-widest text-sm font-bold mb-6">Package Features</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {pkg.features.map((f, i) => (
                            // LIGHT THEME: text-stone-700, text-emerald-600
                            <div key={i} className="flex items-center gap-3 text-stone-700">
                                <CheckCircle size={18} className="text-emerald-600" /> {f}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Booking Form */}
                <div className="lg:col-span-1">
                    {/* LIGHT THEME: bg-white, border-stone-100 */}
                    <div className="bg-white border border-stone-100 p-8 rounded-[2rem] sticky top-28 shadow-sm">
                        <h3 className="text-2xl font-bold mb-2 text-stone-950">Book This Package</h3>
                        {/* LIGHT THEME: text-emerald-700, text-stone-500 */}
                        <p className="text-emerald-700 text-3xl font-serif italic mb-6">${pkg.price} <span className="text-xs text-stone-500 uppercase tracking-tighter">/ Total</span></p>
                        
                        <form onSubmit={handleBooking} className="space-y-4">
                            <div className="relative">
                                {/* LIGHT THEME: bg-stone-100, border-stone-200, text-stone-900 */}
                                <input type="text" placeholder="Full Name" required className="w-full bg-stone-100 border border-stone-200 p-3 rounded-xl focus:border-emerald-300 outline-none text-sm text-stone-900" onChange={e => setFormData({...formData, userName: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="email" placeholder="Email" required className="w-full bg-stone-100 border border-stone-200 p-3 rounded-xl focus:border-emerald-300 outline-none text-sm text-stone-900" onChange={e => setFormData({...formData, email: e.target.value})} />
                                <input type="text" placeholder="Phone" required className="w-full bg-stone-100 border border-stone-200 p-3 rounded-xl focus:border-emerald-300 outline-none text-sm text-stone-900" onChange={e => setFormData({...formData, phone: e.target.value})} />
                            </div>
                            <input type="date" required className="w-full bg-stone-100 border border-stone-200 p-3 rounded-xl focus:border-emerald-300 outline-none text-sm text-stone-900" onChange={e => setFormData({...formData, checkIn: e.target.value})} />
                            {/* LIGHT THEME: bg-emerald-700, hover:bg-emerald-800 */}
                            <button type="submit" className="w-full bg-emerald-700 text-white font-black py-4 rounded-xl uppercase text-xs tracking-[0.2em] hover:bg-emerald-800 transition-all">
                                Confirm Reservation
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PackageDetails;