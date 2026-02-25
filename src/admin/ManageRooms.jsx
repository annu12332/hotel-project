import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2, Search, Loader2, X, CheckCircle, Upload, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

const ManageRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [editingRoom, setEditingRoom] = useState(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    // ১. Cloudinary কনফিগারেশন
    const CLOUDINARY_CLOUD_NAME = "hotelproject"; 
    const CLOUDINARY_UPLOAD_PRESET = "hotel presets"; 

    const fetchRooms = async () => {
        try {
            const res = await axios.get('https://hotel-server-qryr.onrender.com/api/rooms');
            setRooms(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching rooms:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const openEditModal = (room) => {
        setEditingRoom({ ...room });
        setPreviewUrl(room.image); 
        setSelectedFile(null);
    };

    // --- আপডেট সাবমিট করার মূল লজিক ---
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setIsUpdateLoading(true);

        try {
            let imageUrl = editingRoom.image;

            // যদি নতুন ইমেজ সিলেক্ট করা হয় তবে Cloudinary-তে আপলোড হবে
            if (selectedFile) {
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
                formData.append("api_key", "927472846548219"); // আপনার দেওয়া API Key

                const uploadRes = await axios.post(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                    formData
                );
                
                if (uploadRes.data.secure_url) {
                    imageUrl = uploadRes.data.secure_url;
                }
            }

            const updatedData = { 
                ...editingRoom, 
                image: imageUrl,
                price: Number(editingRoom.price) 
            };

            const res = await axios.put(`https://hotel-server-qryr.onrender.com/api/rooms/${editingRoom._id}`, updatedData);
            
            // UI update
            setRooms(prevRooms => prevRooms.map(r => r._id === editingRoom._id ? res.data : r));
            setEditingRoom(null);
            setSelectedFile(null);
            alert("✅ Room and Image updated successfully!");
        } catch (err) {
            console.error("Update error:", err.response?.data || err.message);
            alert("❌ Update failed! Check Cloudinary settings or Server.");
        } finally {
            setIsUpdateLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            try {
                await axios.delete(`https://hotel-server-qryr.onrender.com/api/rooms/${id}`);
                setRooms(rooms.filter(room => room._id !== id));
            } catch (err) {
                alert("Failed to delete!");
            }
        }
    };

    const filteredRooms = rooms.filter(room => 
        room.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
            >
                {/* Header */}
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center bg-slate-50/50 gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Manage Inventory</h2>
                        <p className="text-sm text-slate-500">Live control of all {rooms.length} rooms</p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search rooms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-20 text-slate-400">
                            <Loader2 className="animate-spin mb-2 text-indigo-500" size={32} />
                            <p>Loading database...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black tracking-widest">
                                <tr>
                                    <th className="px-8 py-5">Room Preview</th>
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-8 py-5">Price</th>
                                    <th className="px-8 py-5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredRooms.map((room) => (
                                    <tr key={room._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-4">
                                                <img src={room.image} className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-sm" alt="" />
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-700">{room.title}</span>
                                                    <span className="text-[10px] text-slate-400 uppercase">ID: {room._id.slice(-6)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[11px] font-black uppercase tracking-wider">{room.category}</span>
                                        </td>
                                        <td className="px-8 py-4 font-black text-slate-800">${room.price}</td>
                                        <td className="px-8 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => openEditModal(room)} className="p-2.5 bg-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(room._id)} className="p-2.5 bg-slate-100 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </motion.div>

            {/* --- Advanced Update Modal --- */}
            <AnimatePresence>
                {editingRoom && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingRoom(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                            
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Edit Room Details</h3>
                                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest mt-1">Cloudinary Integration Active</p>
                                </div>
                                <button onClick={() => setEditingRoom(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleUpdateSubmit} className="p-8 space-y-6">
                                {/* Image Upload */}
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-500 uppercase ml-1">Room Main Image</label>
                                    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                                        <div className="relative group w-32 h-32 flex-shrink-0">
                                            <img src={previewUrl} className="w-full h-full object-cover rounded-2xl shadow-md border-2 border-white" alt="preview" />
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <p className="text-sm font-bold text-slate-700">Change Room Photo</p>
                                            <label className="mt-4 cursor-pointer bg-white px-6 py-2.5 rounded-xl shadow-sm border border-slate-200 text-xs font-black uppercase tracking-wider text-indigo-600 hover:bg-indigo-50 transition-all inline-flex items-center gap-2">
                                                <Upload size={14} /> Upload to Cloudinary
                                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase ml-1">Room Title</label>
                                        <input type="text" value={editingRoom.title} onChange={(e) => setEditingRoom({...editingRoom, title: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase ml-1">Category</label>
                                        <select value={editingRoom.category} onChange={(e) => setEditingRoom({...editingRoom, category: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium">
                                            <option value="Single">Single Room</option>
                                            <option value="Double">Double Room</option>
                                            <option value="Luxury">Luxury Suite</option>
                                            <option value="Suite">Presidential Suite</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase ml-1">Price ($)</label>
                                        <input type="number" value={editingRoom.price} onChange={(e) => setEditingRoom({...editingRoom, price: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase ml-1">Area (sqft)</label>
                                        <input type="text" value={editingRoom.area || ''} onChange={(e) => setEditingRoom({...editingRoom, area: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase ml-1">Description</label>
                                    <textarea rows="3" value={editingRoom.description || ''} onChange={(e) => setEditingRoom({...editingRoom, description: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium resize-none"></textarea>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button type="button" onClick={() => setEditingRoom(null)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                                    <button type="submit" disabled={isUpdateLoading} className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                                        {isUpdateLoading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                                        {isUpdateLoading ? 'Uploading...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageRooms;