import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Loader2, Tag, Share2, Clock } from 'lucide-react';

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
            <div className="h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#c5a059]" size={40} />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
                <p className="mb-4 opacity-50 italic text-sm">Story not found.</p>
                <button onClick={() => navigate('/blog')} className="text-[#c5a059] font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Journal
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#c5a059] selection:text-black">
            
            {/* --- Hero Image Section --- */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)}
                    className="absolute top-10 left-6 md:left-12 z-30 flex items-center gap-2 text-white/80 hover:text-[#c5a059] transition-colors font-bold uppercase tracking-widest text-[10px]"
                >
                    <ArrowLeft size={18} /> Back
                </button>
            </div>

            {/* --- Main Content --- */}
            <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-20 pb-24">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#111] p-8 md:p-16 rounded-[2.5rem] border border-white/5 shadow-2xl"
                >
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 mb-8">
                        <span className="bg-[#c5a059] text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {blog.category}
                        </span>
                        <div className="flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase tracking-[0.15em]">
                            <span className="flex items-center gap-2"><Calendar size={14} className="text-[#c5a059]"/> {new Date(blog.createdAt).toDateString()}</span>
                            <span className="flex items-center gap-2"><Clock size={14} className="text-[#c5a059]"/> 5 Min Read</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-serif italic text-white leading-tight mb-8">
                        {blog.title}
                    </h1>

                    {/* Divider */}
                    <div className="h-[1px] w-20 bg-[#c5a059] mb-10"></div>

                    {/* Body Text */}
                    <div className="prose prose-invert max-w-none">
                        <p className="text-white/70 text-lg leading-[1.8] font-light whitespace-pre-line mb-10">
                            {blog.description}
                        </p>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <User className="text-[#c5a059]" size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Written By</p>
                                <p className="text-sm font-bold text-white uppercase tracking-wider">AlMaris Editorial</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-white/40 hover:text-[#c5a059] transition-all text-[10px] font-black uppercase tracking-widest">
                                <Share2 size={16} /> Share Story
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* --- Compact Newsletter Suggestion --- */}
                <div className="mt-20 p-10 rounded-[2rem] bg-gradient-to-r from-[#111] to-[#0d0d0d] border border-white/5 text-center">
                    <h3 className="text-[#c5a059] font-serif italic text-2xl mb-4 text-center">Join the Circle</h3>
                    <p className="text-white/40 text-sm mb-6 max-w-sm mx-auto">Subscribe to get exclusive stories and luxury travel insights directly.</p>
                    <div className="flex gap-2 max-w-md mx-auto">
                        <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex-1 focus:outline-none focus:border-[#c5a059]/30 text-xs" />
                        <button className="bg-[#c5a059] text-black px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest">Join</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;