import { motion } from 'framer-motion';
import { LayoutDashboard, PlusCircle, Hotel, LogOut } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'stats', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'add-room', name: 'Add New Room', icon: <PlusCircle size={20} /> },
        { id: 'manage', name: 'Manage Rooms', icon: <Hotel size={20} /> },
    ];

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="h-screen w-64 bg-slate-900 text-white p-5 fixed left-0 top-0 shadow-2xl z-50"
        >
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">H</div>
                <h1 className="text-xl font-bold tracking-tight">Hotel Admin</h1>
            </div>

            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'text-slate-400 hover:bg-slate-800'
                            }`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                    </motion.button>
                ))}
            </nav>

            <div className="absolute bottom-10 w-full left-0 px-5">
                <button className="flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 w-full rounded-xl transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </motion.div>
    );
};