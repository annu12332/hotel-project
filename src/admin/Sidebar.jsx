import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, PlusCircle, Hotel, LogOut, 
    CalendarCheck, Image as ImageIcon, X, Tag, FileText, Package, Leaf
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config'; 
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
    const navigate = useNavigate();

    const menuItems = [
        { id: 'stats', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'bookings', name: 'Bookings', icon: <CalendarCheck size={20} /> },
        { id: 'add-room', name: 'Add New Room', icon: <PlusCircle size={20} /> },
        { id: 'manage', name: 'Manage Rooms', icon: <Hotel size={20} /> },
        { id: 'manage-offers', name: 'Manage Offers', icon: <Tag size={20} /> },
        { id: 'manage-packages', name: 'Manage Packages', icon: <Package size={20} /> },
        { id: 'manage-blogs', name: 'Manage Blogs', icon: <FileText size={20} /> },
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
        // Theme updated to Dark Slate + Emerald Highlights
        <div className="h-screen w-64 bg-[#1C2431] text-stone-100 p-5 flex flex-col relative border-r border-stone-800 shadow-2xl overflow-y-auto custom-scrollbar">
            {/* Close Button - Mobile Only */}
            <button 
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden absolute top-5 right-4 p-2 bg-stone-800 hover:bg-stone-700 rounded-full text-stone-400"
            >
                <X size={20} />
            </button>

            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-10 px-2 mt-2">
                <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/20 text-white">
                    <Leaf size={22} />
                </div>
                <div>
                    <h1 className="text-xl font-black text-white leading-none tracking-tight">Eco<span className="text-emerald-400">Resort</span></h1>
                    <p className="text-[10px] text-stone-400 uppercase font-bold mt-1 tracking-widest">Admin Panel</p>
                </div>
            </div>

            {/* Menu Items */}
            <nav className="space-y-1.5 flex-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            if (window.innerWidth < 768) setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${
                            activeTab === item.id
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 font-semibold'
                                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                        }`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </button>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="pt-5 border-t border-stone-800 mt-4">
                <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3.5 text-stone-400 hover:text-red-400 w-full rounded-xl transition-colors">
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
                            className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
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