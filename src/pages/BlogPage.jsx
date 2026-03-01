import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
            // LIGHT THEME: bg-stone-50
            <div className="h-screen bg-stone-50 flex items-center justify-center">
                <Loader2 className="animate-spin text-emerald-700" size={40} />
            </div>
        );
    }

    return (
        // LIGHT THEME: bg-stone-50, text-stone-900
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
            
            {/* --- Compact Hero --- */}
            <div className="pt-24 pb-12 px-6 text-center border-b border-stone-100 bg-white">
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-emerald-700 font-bold uppercase tracking-[0.3em] text-[10px] mb-3"
                >
                    Eco Journal
                </motion.p>
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-serif italic mb-6 text-stone-950"
                >
                    Our Green Stories
                </motion.h1>

                <div className="max-w-md mx-auto relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-700 transition-colors" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search articles..." 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-stone-100 border border-stone-200 py-2.5 pl-11 pr-4 rounded-full focus:outline-none focus:border-emerald-300 transition-all text-xs text-stone-900"
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
                            // LIGHT THEME: Card Style Updated
                            className="bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-emerald-100 hover:shadow-lg transition-all duration-500 flex flex-col"
                        >
                            <Link to={`/blog/${blog._id}`} className="block overflow-hidden relative aspect-[4/3]">
                                <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-2 left-2">
                                    <span className="bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider">
                                        {blog.category}
                                    </span>
                                </div>
                            </Link>

                            {/* Content */}
                            <div className="p-4 md:p-5 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 text-stone-500 text-[9px] font-bold uppercase mb-2">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={10} className="text-emerald-600" /> 
                                        {new Date(blog.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                                    </span>
                                </div>

                                <Link to={`/blog/${blog._id}`}>
                                    <h2 className="text-sm md:text-base font-bold text-stone-950 mb-2 line-clamp-2 hover:text-emerald-700 transition-colors leading-tight">
                                        {blog.title}
                                    </h2>
                                </Link>

                                <p className="text-stone-600 text-[11px] md:text-xs leading-relaxed line-clamp-2 mb-4 font-light hidden sm:block">
                                    {blog.description}
                                </p>

                                <div className="mt-auto">
                                    <Link 
                                        to={`/blog/${blog._id}`} 
                                        className="inline-flex items-center gap-2 text-emerald-700 font-bold text-[10px] uppercase tracking-widest hover:underline decoration-1 underline-offset-4"
                                    >
                                        Explore <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {filteredBlogs.length === 0 && (
                    <div className="text-center py-20 text-stone-500 italic text-sm">
                        No articles found.
                    </div>
                )}
            </div>

            <footer className="py-8 border-t border-stone-100 text-center bg-white">
                <p className="text-stone-400 text-[9px] font-bold uppercase tracking-[0.4em]">
                    AlMaris Eco Resort & Spa
                </p>
            </footer>
        </div>
    );
};

export default BlogPage;