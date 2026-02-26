import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // রাউটিং এর জন্য লিঙ্ক ইম্পোর্ট
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Loader2, Search } from 'lucide-react';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const API_URL = 'https://hotel-server-qryr.onrender.com/api/blogs';

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(API_URL);
                setBlogs(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#c5a059]" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#c5a059] selection:text-black">
            
            {/* --- Compact Hero --- */}
            <div className="pt-24 pb-12 px-6 text-center border-b border-white/5 bg-[#0d0d0d]">
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#c5a059] font-bold uppercase tracking-[0.3em] text-[10px] mb-3"
                >
                    AlMaris Journal
                </motion.p>
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-serif italic mb-6"
                >
                    Our Facilities & Stories
                </motion.h1>

                <div className="max-w-md mx-auto relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c5a059] transition-colors" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 py-2.5 pl-11 pr-4 rounded-full focus:outline-none focus:border-[#c5a059]/40 transition-all text-xs text-white"
                    />
                </div>
            </div>

            {/* --- Responsive Grid --- */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredBlogs.map((blog, index) => (
                        <motion.article
                            key={blog._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (index % 4) * 0.1 }}
                            className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 group hover:border-[#c5a059]/30 transition-all duration-500 flex flex-col"
                        >
                            {/* লিঙ্ক দিয়ে র‍্যাপ করা হয়েছে যাতে ছবিতে ক্লিক করলে ডিটেইলসে যায় */}
                            <Link to={`/blog/${blog._id}`} className="block overflow-hidden relative aspect-[4/3]">
                                <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute top-2 left-2">
                                    <span className="bg-[#c5a059] text-black px-2.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider">
                                        {blog.category}
                                    </span>
                                </div>
                            </Link>

                            {/* Content */}
                            <div className="p-4 md:p-5 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 text-white/30 text-[9px] font-bold uppercase mb-2">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={10} /> 
                                        {new Date(blog.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                                    </span>
                                </div>

                                {/* টাইটেলে ক্লিক করলে ডিটেইলসে যাবে */}
                                <Link to={`/blog/${blog._id}`}>
                                    <h2 className="text-sm md:text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-[#c5a059] transition-colors leading-tight">
                                        {blog.title}
                                    </h2>
                                </Link>

                                <p className="text-white/40 text-[11px] md:text-xs leading-relaxed line-clamp-2 mb-4 font-light hidden sm:block">
                                    {blog.description}
                                </p>

                                <div className="mt-auto">
                                    <Link 
                                        to={`/blog/${blog._id}`} 
                                        className="inline-flex items-center gap-2 text-[#c5a059] font-bold text-[10px] uppercase tracking-widest group/btn hover:underline decoration-1 underline-offset-4"
                                    >
                                        Explore <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {filteredBlogs.length === 0 && (
                    <div className="text-center py-20 text-white/20 italic text-sm">
                        No articles found.
                    </div>
                )}
            </div>

            <footer className="py-8 border-t border-white/5 text-center">
                <p className="text-white/10 text-[9px] font-bold uppercase tracking-[0.4em]">
                    AlMaris Luxury Hotels Group
                </p>
            </footer>
        </div>
    );
};

export default BlogPage;