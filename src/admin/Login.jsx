import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Icons updated for Brighter Eco-theme
import { LockKeyhole, Mail, Eye, EyeOff, Loader2, Leaf, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../firebase.config"; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); 
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); 
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin'); 
        } catch (err) {
            console.error(err.code);
            if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password! Please try again.');
            } else {
                setError('Server error, please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        // Clean White Background
        <div className="min-h-screen flex items-center justify-center bg-white p-4 font-sans">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Login Card with Light Shadow */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-2xl shadow-stone-100">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full mb-5 border-4 border-emerald-100 text-emerald-500">
                            <Leaf size={40} />
                        </div>
                        <h2 className="text-4xl font-extrabold text-stone-900 tracking-tighter">Admin Portal</h2>
                        <p className="text-stone-500 mt-2 font-medium">Welcome back to your natural sanctuary</p>
                    </div>

                    {/* Error Message Section */}
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-bold"
                        >
                            <AlertCircle size={18} />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-stone-600 ml-1">Work Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@ecoresort.com"
                                    className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 pl-12 pr-4 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-200 focus:bg-emerald-50/30 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-stone-600 ml-1">Security Key</label>
                            <div className="relative group">
                                <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 pl-12 pr-12 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-200 focus:bg-emerald-50/30 transition-all"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-emerald-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-5 rounded-2xl shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                "Sign In to Sanctuary"
                            )}
                        </button>
                    </form>
                </div>
                
                <p className="text-center text-stone-400 mt-8 text-xs uppercase tracking-[0.1em] font-semibold">
                    &copy; 2026 Eco Resort &bull; Secure Portal
                </p>
            </motion.div>
        </div>
    );
};

export default Login;