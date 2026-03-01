import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Icons updated for Brighter Eco-theme
import { Lock, User, ArrowRight, AlertCircle, Leaf, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    // Dummy Logic: Pore backend join hobe
    setTimeout(() => {
      if (email === 'admin@hotel.com' && password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
      } else {
        setError(true);
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    // Clean White Background
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Brand Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-5 border-4 border-emerald-100">
            <Sparkles size={40} />
          </div>
          <h1 className="text-4xl font-extrabold text-stone-900 tracking-tighter">Resort Manager</h1>
          <p className="text-stone-500 mt-2 font-medium">Welcome back to your natural sanctuary</p>
        </div>

        {/* Login Form Card */}
        <motion.div 
          animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.3 }}
          // Subtle border and light shadow for a floating effect
          className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-100"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-1">Work Email</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // Light gray background for input
                  className="w-full pl-12 pr-5 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:border-emerald-200 focus:bg-emerald-50/30 outline-none transition-all font-medium text-stone-800"
                  placeholder="admin@hotel.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:border-emerald-200 focus:bg-emerald-50/30 outline-none transition-all font-medium text-stone-800"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-emerald-700 text-sm font-bold bg-emerald-50 p-4 rounded-2xl border border-emerald-100"
                >
                  <AlertCircle size={16} />
                  <span>Oops! Check your credentials.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              // Brighter emerald button
              className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                isLoading ? 'bg-stone-200 text-stone-500 cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Enter Dashboard <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-stone-400 text-sm font-medium">
          Need access? <span className="text-emerald-500 cursor-pointer hover:underline font-bold">Contact Support</span>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;