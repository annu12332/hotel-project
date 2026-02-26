import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Loader2, Image as ImageIcon, UploadCloud } from 'lucide-react';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false); 
    const [formData, setFormData] = useState({ title: '', image: '', description: '', category: 'Travel' });

    const API_URL = 'https://hotel-server-qryr.onrender.com/api/blogs';
    const IMGBB_API_KEY = '4284488a37835ed459904bb22afad66f'; 

    useEffect(() => { fetchBlogs(); }, []);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(API_URL);
            setBlogs(res.data);
            setLoading(false);
        } catch (err) { console.error(err); }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const data = new FormData();
        data.append('image', file);

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, data);
            const imageUrl = response.data.data.url;
            setFormData({ ...formData, image: imageUrl }); 
            setUploading(false);
        } catch (error) {
            console.error("Image upload failed:", error);
            alert("Image upload failed. Try again.");
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) return alert("Please upload an image first!");
        
        try {
            await axios.post(API_URL, formData);
            setFormData({ title: '', image: '', description: '', category: 'Travel' });
            fetchBlogs();
            alert("Blog Published Successfully!");
        } catch (err) { alert("Failed to post blog"); }
    };

    const deleteBlog = async (id) => {
        if (window.confirm("Delete this blog?")) {
            await axios.delete(`${API_URL}/${id}`);
            fetchBlogs();
        }
    };

    return (
        <div className="p-6 space-y-8">
            {/* Add Blog Form */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <Plus className="text-indigo-600" /> Create New Blog Post
                </h2>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Title */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Title</label>
                        <input 
                            type="text" placeholder="Enter blog title..." required
                            className="p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Category</label>
                        <select 
                            className="p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="Travel">Travel</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Food">Food</option>
                            <option value="News">News</option>
                        </select>
                    </div>

                    {/* Image Upload via ImgBB */}
                    <div className="md:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 block mb-2">Cover Image</label>
                        <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer">
                            {uploading ? (
                                <div className="flex flex-col items-center gap-2 py-4">
                                    <Loader2 className="animate-spin text-indigo-600" />
                                    <span className="text-sm font-medium text-slate-600">Uploading to ImgBB...</span>
                                </div>
                            ) : formData.image ? (
                                <div className="relative w-full h-40">
                                    <img src={formData.image} className="w-full h-full object-cover rounded-xl" alt="Preview" />
                                    <button 
                                        type="button" onClick={() => setFormData({...formData, image: ''})}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ) : (
                                <label className="w-full h-full flex flex-col items-center py-6 cursor-pointer">
                                    <UploadCloud size={32} className="text-slate-400 mb-2" />
                                    <span className="text-sm text-slate-500 font-medium">Click to upload image</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Content</label>
                        <textarea 
                            rows="4" placeholder="Write blog details here..." required 
                            className="p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <button 
                        disabled={uploading}
                        type="submit" 
                        className={`md:col-span-2 py-4 rounded-xl font-bold transition-all shadow-lg ${uploading ? 'bg-slate-300' : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'}`}
                    >
                        {uploading ? 'Please wait...' : 'Publish Blog Post'}
                    </button>
                </form>
            </div>

            {/* --- Blog List Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {loading ? <div className="col-span-3 text-center py-10"><Loader2 className="animate-spin mx-auto text-indigo-600" /></div> : 
                    blogs.map(blog => (
                        <div key={blog._id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm group">
                            <div className="h-48 overflow-hidden relative">
                                <img src={blog.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <button 
                                    onClick={() => deleteBlog(blog._id)}
                                    className="absolute top-4 right-4 p-2.5 bg-white/90 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="p-5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                    {blog.category}
                                </span>
                                <h3 className="font-bold text-slate-800 mt-3 line-clamp-1">{blog.title}</h3>
                                <p className="text-slate-500 text-xs mt-2 line-clamp-2">{blog.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ManageBlogs;