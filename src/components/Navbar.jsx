import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // updated nav links with Blog and Packages
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Rooms', href: '/all-rooms' },
        { name: 'Packages', href: '/packages' }, // New Addition
        { name: 'Gallery', href: '/gallery' },
        { name: 'Offers', href: '/offers' },
        { name: 'Blog', href: '/blog' },         // New Addition
        { name: 'About Us', href: '/about' },
    ];

    return (
        <>
            <nav className={`fixed w-full z-[100] transition-all duration-500 ${
                scrolled ? 'bg-black/80 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'
            }`}>
                <div className="container mx-auto px-6 flex justify-between items-center">

                    {/* Logo Section */}
                    <div className="text-white z-[120]">
                        <Link to="/">
                            <h1 className="text-2xl md:text-3xl font-serif tracking-widest uppercase cursor-pointer">Almaris</h1>
                        </Link>
                        <div className="flex justify-center text-[8px] md:text-[10px] mt-1 text-yellow-600 tracking-widest">
                            ★★★★★
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex space-x-6 text-white font-medium uppercase text-[11px] xl:text-sm tracking-widest">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.href} 
                                className="hover:text-yellow-600 transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <Link to={"/reservation"}>
                                <button className="border border-white px-6 py-2 text-white text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500">
                                    Reservation
                                </button>
                            </Link>
                        </div>

                        {/* Hamburger Icon */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white lg:hidden text-3xl z-[120] focus:outline-none"
                        >
                            {isOpen ? <HiX className="text-yellow-600" /> : <HiMenuAlt3 />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Dark Blur Background Layer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100]"
                            />

                            {/* Sliding Glass Drawer */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed right-0 top-0 h-screen w-[85%] bg-black/60 backdrop-blur-2xl border-l border-white/10 z-[110] flex flex-col items-center justify-center space-y-6 shadow-2xl"
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
                                            className="text-white text-xl font-serif tracking-[0.2em] uppercase hover:text-yellow-600 transition-all"
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
                                        <button className="mt-6 border-2 border-yellow-600 px-10 py-3 text-yellow-600 font-bold text-sm uppercase tracking-widest hover:bg-yellow-600 hover:text-black transition-all">
                                            Reservation
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