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
            Swal.fire({ icon: 'success', title: 'Reserved!', text: 'Our team will contact you soon.', background: '#111', color: '#fff', confirmButtonColor: '#c5a059' });
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
        }
    };

    if (!pkg) return <div className="h-screen bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="animate-spin text-[#c5a059]" /></div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-20 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
                
                {/* Left: Content */}
                <div className="lg:col-span-2">
                    <img src={pkg.image} className="w-full h-[500px] object-cover rounded-[2.5rem] mb-10 border border-white/10" alt="" />
                    <h1 className="text-4xl md:text-5xl font-serif italic mb-6">{pkg.title}</h1>
                    <p className="text-white/60 text-lg leading-relaxed mb-10">{pkg.description}</p>
                    
                    <h3 className="text-[#c5a059] uppercase tracking-widest text-sm font-bold mb-6">Package Features</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {pkg.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/80">
                                <CheckCircle size={18} className="text-[#c5a059]" /> {f}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Booking Form */}
                <div className="lg:col-span-1">
                    <div className="bg-[#111] border border-[#c5a059]/20 p-8 rounded-[2rem] sticky top-28">
                        <h3 className="text-2xl font-bold mb-2">Book This Package</h3>
                        <p className="text-[#c5a059] text-3xl font-serif italic mb-6">${pkg.price} <span className="text-xs text-white/40 uppercase tracking-tighter">/ Total</span></p>
                        
                        <form onSubmit={handleBooking} className="space-y-4">
                            <div className="relative">
                                <input type="text" placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-[#c5a059] outline-none text-sm" onChange={e => setFormData({...formData, userName: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="email" placeholder="Email" required className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-[#c5a059] outline-none text-sm" onChange={e => setFormData({...formData, email: e.target.value})} />
                                <input type="text" placeholder="Phone" required className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-[#c5a059] outline-none text-sm" onChange={e => setFormData({...formData, phone: e.target.value})} />
                            </div>
                            <input type="date" required className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-[#c5a059] outline-none text-sm text-white/50" onChange={e => setFormData({...formData, checkIn: e.target.value})} />
                            <button type="submit" className="w-full bg-[#c5a059] text-black font-black py-4 rounded-xl uppercase text-xs tracking-[0.2em] hover:scale-[1.02] transition-all">
                                Confirm Reservation
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};