import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Cottages', href: '/all-rooms' },
        { name: 'Packages', href: '/packages' },
        { name: 'Activities', href: '/activities' },
        { name: 'Blog', href: '/blog' },
        { name: 'About Us', href: '/about' },
    ];

    return (
        <>
            <nav className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${
                scrolled 
                    // লাইট ব্লার ইফেক্ট এখানে যোগ করা হয়েছে (white/80, backdrop-blur-md)
                    ? 'bg-white/80 backdrop-blur-md py-2 shadow-sm border-b border-stone-100/50' 
                    : 'bg-transparent py-5'
            }`}>
                <div className="container mx-auto px-6 flex justify-between items-center">

                    {/* Logo Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-stone-950 z-[120]"
                    >
                        <Link to="/" className='flex flex-col items-center'>
                            <h1 className="text-2xl md:text-3xl font-serif tracking-widest uppercase cursor-pointer">
                                Almaris <span className='text-emerald-600 font-bold'>Eco</span>
                            </h1>
                            {/* Leaf icons */}
                            <div className="flex justify-center text-[10px] md:text-[11px] mt-0 text-emerald-600 tracking-[0.3em] gap-1">
                                <FaLeaf /> <FaLeaf /> <FaLeaf /> <FaLeaf /> <FaLeaf />
                            </div>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6 text-stone-800 font-medium uppercase text-[11px] xl:text-sm tracking-widest">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.href} 
                                className="relative group py-2"
                            >
                                {link.name}
                                {/* Underline Animation */}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <Link to={"/reservation"}>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border border-emerald-600 px-6 py-2 text-sm text-emerald-700 uppercase tracking-[0.2em] hover:bg-emerald-600 hover:text-white transition-all duration-300 rounded-full font-semibold"
                                >
                                    Book Now
                                </motion.button>
                            </Link>
                        </div>

                        {/* Hamburger Icon */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-stone-950 lg:hidden text-3xl z-[120] focus:outline-none"
                        >
                            {isOpen ? <HiX className="text-emerald-600" /> : <HiMenuAlt3 />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                // মোবাইল মেনুর ব্যাকগ্রাউন্ডেও ব্লার যোগ করা হয়েছে
                                className="fixed inset-0 bg-white/50 backdrop-blur-sm z-[100]"
                            />

                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                // মোবাইল মেনুর ব্যাকগ্রাউন্ডও স্বচ্ছ এবং ব্লার করা হয়েছে
                                className="fixed right-0 top-0 h-screen w-[80%] bg-white/90 backdrop-blur-lg z-[110] flex flex-col items-center justify-center space-y-8 shadow-2xl"
                            >
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 * index }}
                                    >
                                        <Link
                                            to={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-stone-900 text-lg font-medium tracking-[0.2em] uppercase hover:text-emerald-700 transition-all"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                
                                {/* Mobile Reservation Button */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Link to="/reservation" onClick={() => setIsOpen(false)}>
                                        <button className="border-2 border-emerald-600 px-8 py-3 text-emerald-700 font-bold text-sm uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all rounded-full">
                                            Book Now
                                        </button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;