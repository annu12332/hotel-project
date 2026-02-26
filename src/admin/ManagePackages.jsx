import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, X, Save, Package, Clock, DollarSign, Image as ImageIcon, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

const ManagePackages = () => {
    const [packages, setPackages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPkg, setEditingPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false); 

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        duration: '',
        image: '',
        description: '',
        features: ''
    });

    const IMGBB_API_KEY = '4284488a37835ed459904bb22afad66f'; 
    const API_URL = 'https://hotel-server-qryr.onrender.com/api/packages';

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const res = await axios.get(API_URL);
            setPackages(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching packages:", err);
            setLoading(false);
        }
    };

    // --- Image Upload to ImgBB ---
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('image', file);

        setIsUploading(true);
        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, uploadData);
            const imageUrl = res.data.data.display_url;
            setFormData(prev => ({ ...prev, image: imageUrl }));
            Swal.fire({
                icon: 'success',
                title: 'Image Uploaded',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });
        } catch (err) {
            Swal.fire('Upload Failed', 'Could not upload image to ImgBB', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) return Swal.fire('Wait!', 'Please upload an image first.', 'warning');

        const payload = {
            ...formData,
            features: typeof formData.features === 'string' ? formData.features.split(',').map(f => f.trim()) : formData.features
        };

        try {
            if (editingPkg) {
                await axios.put(`${API_URL}/${editingPkg._id}`, payload);
                Swal.fire('Updated!', 'Package has been updated.', 'success');
            } else {
                await axios.post(API_URL, payload);
                Swal.fire('Created!', 'New package added.', 'success');
            }
            closeModal();
            fetchPackages();
        } catch (err) {
            Swal.fire('Error', 'Something went wrong!', 'error');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPkg(null);
        setFormData({ title: '', price: '', duration: '', image: '', description: '', features: '' });
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${API_URL}/${id}`);
                fetchPackages();
                Swal.fire('Deleted!', 'Package has been removed.', 'success');
            }
        });
    };

    const openEditModal = (pkg) => {
        setEditingPkg(pkg);
        setFormData({
            title: pkg.title,
            price: pkg.price,
            duration: pkg.duration,
            image: pkg.image,
            description: pkg.description,
            features: pkg.features.join(', ')
        });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Active Packages</h2>
                    <p className="text-sm text-slate-400 font-medium">Manage your hotel's exclusive deals</p>
                </div>
                <button 
                    onClick={() => { setEditingPkg(null); setIsModalOpen(true); }}
                    className="bg-indigo-600 text-white p-3 rounded-2xl flex items-center gap-2 font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                    <Plus size={20} /> Add Package
                </button>
            </div>

            {/* Package Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex justify-center py-20"><Loader2 className="animate-spin text-indigo-500" size={40} /></div>
                ) : packages.map((pkg) => (
                    <motion.div layout key={pkg._id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                        <div className="relative h-48 overflow-hidden">
                            <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl font-black text-indigo-600 text-sm">
                                ${pkg.price}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-black text-slate-800 text-lg mb-2 line-clamp-1">{pkg.title}</h3>
                            <div className="flex items-center gap-3 text-slate-400 text-xs font-bold mb-4 uppercase">
                                <span className="flex items-center gap-1"><Clock size={14} className="text-indigo-500"/> {pkg.duration}</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openEditModal(pkg)} className="flex-1 bg-slate-100 text-slate-600 p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2 font-bold text-xs">
                                    <Edit size={16} /> Edit
                                </button>
                                <button onClick={() => handleDelete(pkg._id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden">
                            <div className="p-8 md:p-12 overflow-y-auto max-h-[85vh] custom-scrollbar">
                                <h2 className="text-3xl font-black text-slate-800 mb-8">{editingPkg ? 'Update Package' : 'New Package'}</h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Title</label>
                                            <input name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-medium" placeholder="Summer Bliss" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Price ($)</label>
                                            <input name="price" type="number" value={formData.price} onChange={handleInputChange} className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-medium" placeholder="299" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Duration</label>
                                            <input name="duration" value={formData.duration} onChange={handleInputChange} className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-medium" placeholder="3 Days, 2 Nights" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Package Image</label>
                                            <div className="relative">
                                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="pkg-img" />
                                                <label htmlFor="pkg-img" className="w-full bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-2xl flex items-center justify-center gap-3 cursor-pointer hover:border-indigo-400 transition-all">
                                                    {isUploading ? <Loader2 className="animate-spin text-indigo-500" /> : <ImageIcon size={20} className="text-slate-400" />}
                                                    <span className="text-sm font-bold text-slate-500">{formData.image ? 'Change Image' : 'Upload Image'}</span>
                                                </label>
                                            </div>
                                            {formData.image && <p className="text-[10px] text-green-500 font-bold mt-1 ml-2">✓ Image Ready</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Features (Comma Separated)</label>
                                        <input name="features" value={formData.features} onChange={handleInputChange} className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-medium" placeholder="Breakfast, Pool, Wi-Fi" required />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Description</label>
                                        <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-medium h-32 resize-none" placeholder="Package details..." required />
                                    </div>

                                    <button type="submit" disabled={isUploading} className="w-full bg-indigo-600 disabled:bg-slate-300 text-white p-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-3">
                                        <Save size={18} /> {editingPkg ? 'Update Changes' : 'Publish Package'}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManagePackages;