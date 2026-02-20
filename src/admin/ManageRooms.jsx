import { motion } from 'framer-motion';
import { Edit3, Trash2, Eye, Search } from 'lucide-react';

export const ManageRooms = () => {
    // Dummy Data for Design (Pore backend theke ashbe)
    const rooms = [
        { id: 1, name: 'Presidential Suite', type: 'Luxury', price: 250, status: 'Available' },
        { id: 2, name: 'Deluxe Ocean View', type: 'Deluxe', price: 180, status: 'Occupied' },
        { id: 3, name: 'Standard Couple Room', type: 'Standard', price: 100, status: 'Available' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
            {/* Table Header with Search */}
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">All Rooms</h2>
                    <p className="text-sm text-slate-500">Manage and update your hotel inventory</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search rooms..."
                        className="pl-12 pr-6 py-3 bg-white border-none rounded-2xl shadow-inner focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all"
                    />
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black tracking-widest">
                        <tr>
                            <th className="px-8 py-5">Room Details</th>
                            <th className="px-8 py-5">Category</th>
                            <th className="px-8 py-5">Price</th>
                            <th className="px-8 py-5">Status</th>
                            <th className="px-8 py-5 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {rooms.map((room, index) => (
                            <motion.tr
                                key={room.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="hover:bg-blue-50/30 transition-colors group"
                            >
                                <td className="px-8 py-6 font-bold text-slate-700">{room.name}</td>
                                <td className="px-8 py-6">
                                    <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                                        {room.type}
                                    </span>
                                </td>
                                <td className="px-8 py-6 font-black text-blue-600">${room.price}</td>
                                <td className="px-8 py-6">
                                    <span className={`flex items-center gap-2 text-xs font-bold ${room.status === 'Available' ? 'text-green-500' : 'text-orange-500'}`}>
                                        <span className={`w-2 h-2 rounded-full ${room.status === 'Available' ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`} />
                                        {room.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex justify-center gap-3">
                                        <button className="p-2 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-blue-600 transition-all">
                                            <Eye size={18} />
                                        </button>
                                        <button className="p-2 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-amber-500 transition-all">
                                            <Edit3 size={18} />
                                        </button>
                                        <button className="p-2 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-red-500 transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};