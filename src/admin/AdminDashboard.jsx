import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import AddRoom from './AddRoom';
import ManageRooms from '../admin/ManageRooms';
import AllBookings from './AllBookings';
import ManageGallery from './ManageGallery'; 
import ManageOffers from './ManageOffers'; 
import ManageBlogs from './ManageBlogs'; 
import ManagePackages from './ManagePackages'; 
import { Menu, Hotel, Calendar, DollarSign, Bell, FileText, Package } from 'lucide-react';
import axios from 'axios';

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('stats');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [stats, setStats] = useState({
        totalRooms: 0,
        totalPackages: 0,
        todayBookings: 0,
        revenue: 0,
        pendingBookings: 0
    });

    const tabTitles = {
        'stats': 'Dashboard Overview',
        'add-room': 'Create New Listing',
        'manage': 'Room Inventory',
        'bookings': 'Booking Management',
        'manage-gallery': 'Gallery Management',
        'manage-offers': 'Promotions & Offers',
        'manage-blogs': 'Editorial & Blogs',
        'manage-packages': 'Exclusive Packages'
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // প্রতিটি এপিআই কল আলাদাভাবে করা হচ্ছে এবং এরর হ্যান্ডেল করা হয়েছে 
                // যাতে একটি ফেল করলেও অন্যগুলো কাজ করে
                const roomsReq = axios.get('https://hotel-server-qryr.onrender.com/api/rooms').catch(e => ({ data: [] }));
                const bookingsReq = axios.get('https://hotel-server-qryr.onrender.com/api/bookings').catch(e => ({ data: [] }));
                const packagesReq = axios.get('https://hotel-server-qryr.onrender.com/api/packages').catch(e => ({ data: [] }));

                const [roomsRes, bookingsRes, packagesRes] = await Promise.all([roomsReq, bookingsReq, packagesReq]);
                
                const rooms = roomsRes.data || [];
                const bookings = bookingsRes.data || [];
                const packages = packagesRes.data || [];

                const today = new Date().toISOString().split('T')[0];
                const todayBookingsCount = bookings.filter(b => b.createdAt?.includes(today)).length;
                
                const pending = bookings.filter(b => b.status?.toLowerCase() === 'pending').length;
                const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);

                setStats({
                    totalRooms: rooms.length,
                    totalPackages: packages.length,
                    todayBookings: todayBookingsCount || bookings.length,
                    revenue: totalRevenue,
                    pendingBookings: pending
                });
            } catch (error) {
                console.error("Dashboard Global Error:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans relative overflow-x-hidden">

            {/* --- SIDEBAR --- */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col min-h-screen w-full md:ml-64 transition-all duration-300">

                {/* Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-12 py-4 md:py-5 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2.5 bg-slate-100 rounded-xl md:hidden text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                            <Menu size={22} />
                        </button>

                        <div>
                            <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.2em] mb-1">AlMaris Hotel</p>
                            <motion.h1
                                key={activeTab}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xl md:text-2xl font-black text-slate-800 tracking-tight"
                            >
                                {tabTitles[activeTab]}
                            </motion.h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="relative p-2 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors hidden sm:block">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </div>

                        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-800 leading-none">Admin Manager</p>
                                <p className="text-[10px] text-green-500 font-bold flex items-center justify-end gap-1 mt-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> LIVE
                                </p>
                            </div>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center text-white font-black text-xl">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Section */}
                <main className="p-4 md:p-10 lg:p-12">
                    <div className="max-w-7xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'add-room' && <AddRoom />}
                                {activeTab === 'manage' && <ManageRooms />}
                                {activeTab === 'bookings' && <AllBookings />}
                                {activeTab === 'manage-gallery' && <ManageGallery />}
                                {activeTab === 'manage-offers' && <ManageOffers />}
                                {activeTab === 'manage-blogs' && <ManageBlogs />}
                                {activeTab === 'manage-packages' && <ManagePackages />}

                                {activeTab === 'stats' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                                            <StatsCard label="Total Rooms" value={stats.totalRooms} icon={<Hotel size={22}/>} color="indigo" />
                                            <StatsCard label="Active Packages" value={stats.totalPackages} icon={<Package size={22}/>} color="blue" />
                                            <StatsCard label="Pending Action" value={stats.pendingBookings} icon={<Bell size={22}/>} color="amber" />
                                            <StatsCard label="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={<DollarSign size={22}/>} color="emerald" />
                                        </div>

                                        <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] -mr-32 -mt-32"></div>
                                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                                                <div>
                                                    <h2 className="text-3xl font-black mb-3">System Overview</h2>
                                                    <p className="text-slate-400 font-medium max-w-md">
                                                        Welcome back. You have <span className="text-amber-400 font-bold">{stats.pendingBookings} pending requests</span> to review.
                                                    </p>
                                                </div>
                                                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                                    <button
                                                        onClick={() => setActiveTab('bookings')}
                                                        className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-xl active:scale-95"
                                                    >
                                                        Review Bookings
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveTab('manage-packages')}
                                                        className="bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                                                    >
                                                        <Package size={18} /> Manage Packages
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
};

const StatsCard = ({ label, value, icon, color }) => {
    const colors = {
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100"
    };

    return (
        <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colors[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest">{label}</p>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800 mt-1 tracking-tight">{value}</h3>
            </div>
        </motion.div>
    );
};