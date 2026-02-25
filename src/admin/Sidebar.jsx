import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, PlusCircle, Hotel, LogOut, 
    CalendarCheck, Image as ImageIcon, X, Tag 
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config'; 
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
    const navigate = useNavigate();

    // menuItems-এ 'manage-offers' যুক্ত করা হয়েছে
    const menuItems = [
        { id: 'stats', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'bookings', name: 'Bookings', icon: <CalendarCheck size={20} /> },
        { id: 'add-room', name: 'Add New Room', icon: <PlusCircle size={20} /> },
        { id: 'manage', name: 'Manage Rooms', icon: <Hotel size={20} /> },
        { id: 'manage-offers', name: 'Manage Offers', icon: <Tag size={20} /> }, // নতুন ট্যাব
        { id: 'manage-gallery', name: 'Gallery', icon: <ImageIcon size={20} /> },
    ];

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to logout?")) {
            try {
                await signOut(auth);
                navigate('/login');
            } catch (error) {
                console.error("Logout error:", error.message);
            }
        }
    };

    const sidebarBody = (
        <div className="h-screen w-64 bg-[#0F172A] text-white p-5 flex flex-col relative border-r border-slate-800 shadow-2xl overflow-y-auto">
            {/* Close Button - Mobile Only */}
            <button 
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400"
            >
                <X size={22} />
            </button>

            <div className="flex items-center gap-3 mb-10 px-2 mt-2">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/20">A</div>
                <div>
                    <h1 className="text-lg font-bold uppercase text-white leading-none tracking-tight">AlMaris</h1>
                    <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">Admin Panel</p>
                </div>
            </div>

            <nav className="space-y-1.5 flex-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            if (window.innerWidth < 768) setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                            activeTab === item.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                    >
                        {item.icon}
                        <span className="font-semibold text-sm">{item.name}</span>
                    </button>
                ))}
            </nav>

            <div className="pt-5 border-t border-slate-800">
                <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-red-400 w-full rounded-xl transition-colors">
                    <LogOut size={20} />
                    <span className="font-bold text-sm">Logout</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop: Static Sidebar */}
            <aside className="hidden md:block fixed top-0 left-0 h-screen z-40">
                {sidebarBody}
            </aside>

            {/* Mobile: Animated Drawer */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <div className="fixed inset-0 z-[100] md:hidden">
                        {/* Overlay */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative w-64 h-full"
                        >
                            {sidebarBody}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};