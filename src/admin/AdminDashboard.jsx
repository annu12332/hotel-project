import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar'; 
import AddRoom from './AddRoom';   
import { ManageRooms } from './ManageRooms'; // ManageRooms import korun

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('add-room');

    // Tab title mapping for the header
    const tabTitles = {
        'stats': 'Dashboard Overview',
        'add-room': 'List New Room',
        'manage': 'Hotel Inventory'
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* 1. Sidebar - Fixed left */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* 2. Main Content Area */}
            <div className="flex-1 ml-64 min-h-screen flex flex-col">
                
                {/* Modern Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-12 py-6 flex justify-between items-center">
                    <motion.h1 
                        key={activeTab}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-black text-slate-800 tracking-tight"
                    >
                        {tabTitles[activeTab]}
                    </motion.h1>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-slate-800">Hotel Manager</p>
                            <p className="text-xs text-green-500 font-medium flex items-center justify-end gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" /> Online
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center text-white font-bold text-xl">
                            M
                        </div>
                    </div>
                </header>

                {/* Content Section */}
                <main className="p-12">
                    <div className="max-w-6xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Conditional Rendering */}
                                {activeTab === 'add-room' && <AddRoom />}
                                
                                {activeTab === 'manage' && <ManageRooms />}

                                {activeTab === 'stats' && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {/* Example Stats Cards */}
                                        {['Available Rooms', 'Today\'s Bookings', 'Monthly Revenue'].map((item, i) => (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={item}
                                                className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-default"
                                            >
                                                <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">{item}</p>
                                                <h3 className="text-4xl font-black text-slate-800 mt-4 tracking-tighter">
                                                    {i === 2 ? '$12,450' : i === 0 ? '24' : '07'}
                                                </h3>
                                            </motion.div>
                                        ))}
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