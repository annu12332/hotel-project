import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Loader2, Share2, Clock, Leaf } from 'lucide-react'; // Added Leaf

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = `https://hotel-server-qryr.onrender.com/api/blogs/${id}`;

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const res = await axios.get(API_URL);
                setBlog(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blog details:", err);
                setLoading(false);
            }
        };
        fetchBlogDetails();
        window.scrollTo(0, 0); 
    }, [id]);

    if (loading) {
        return (
            // LIGHT THEME: bg-stone-50
            <div className="h-screen bg-stone-50 flex items-center justify-center">
                <Loader2 className="animate-spin text-emerald-700" size={40} />
            </div>
        );
    }

    if (!blog) {
        return (
            // LIGHT THEME: bg-stone-50
            <div className="h-screen bg-stone-50 flex flex-col items-center justify-center text-stone-900">
                <p className="mb-4 opacity-50 italic text-sm">Story not found.</p>
                <button onClick={() => navigate('/blog')} className="text-emerald-700 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Journal
                </button>
            </div>
        );
    }

    return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
            
            {/* --- Hero Image Section --- */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img 
                    src={blog.image} 
                    alt={blog.title} 
                    // LIGHT THEME: Opacity increased for better visibility
                    className="w-full h-full object-cover opacity-90"
                />
                {/* LIGHT THEME: Gradient updated */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-transparent"></div>
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)}
                    className="absolute top-10 left-6 md:left-12 z-30 flex items-center gap-2 text-stone-900 hover:text-emerald-700 transition-colors font-bold uppercase tracking-widest text-[10px]"
                >
                    <ArrowLeft size={18} /> Back
                </button>
            </div>

            {/* --- Main Content --- */}
            <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-20 pb-24">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    // LIGHT THEME: Background and border updated
                    className="bg-white p-8 md:p-16 rounded-[2.5rem] border border-stone-100 shadow-xl"
                >
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 mb-8">
                        <span className="bg-emerald-100 text-emerald-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {blog.category}
                        </span>
                        <div className="flex items-center gap-4 text-stone-500 text-[10px] font-bold uppercase tracking-[0.15em]">
                            <span className="flex items-center gap-2"><Calendar size={14} className="text-emerald-600"/> {new Date(blog.createdAt).toDateString()}</span>
                            <span className="flex items-center gap-2"><Clock size={14} className="text-emerald-600"/> 5 Min Read</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-serif italic text-stone-950 leading-tight mb-8">
                        {blog.title}
                    </h1>

                    {/* Divider */}
                    <div className="h-[1px] w-20 bg-emerald-700 mb-10"></div>

                    {/* Body Text */}
                    <div className="prose prose-stone max-w-none">
                        <p className="text-stone-700 text-lg leading-[1.8] font-light whitespace-pre-line mb-10">
                            {blog.description}
                        </p>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-16 pt-10 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                <User className="text-emerald-700" size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">Written By</p>
                                <p className="text-sm font-bold text-stone-950 uppercase tracking-wider">AlMaris Editorial</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-stone-500 hover:text-emerald-700 transition-all text-[10px] font-black uppercase tracking-widest">
                                <Share2 size={16} /> Share Story
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* --- Compact Newsletter Suggestion --- */}
                <div className="mt-20 p-10 rounded-[2rem] bg-stone-100 border border-stone-200 text-center">
                    <Leaf className="mx-auto text-emerald-700 mb-4" size={30} />
                    <h3 className="text-emerald-800 font-serif italic text-2xl mb-4 text-center">Join the Eco Circle</h3>
                    <p className="text-stone-600 text-sm mb-6 max-w-sm mx-auto">Subscribe to get exclusive stories and sustainable travel insights directly.</p>
                    <div className="flex gap-2 max-w-md mx-auto">
                        <input type="email" placeholder="Email" className="bg-white border border-stone-200 px-4 py-2 rounded-xl flex-1 focus:outline-none focus:border-emerald-300 text-xs" />
                        <button className="bg-emerald-700 text-white px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest">Join</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;