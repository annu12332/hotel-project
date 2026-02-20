import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, CheckCircle2 } from 'lucide-react';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: 'Deluxe'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      console.log("Room Data:", formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      // 3 second por success message chole jabe
      setTimeout(() => setIsSuccess(false), 3000);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden"
    >
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <CheckCircle2 size={80} className="text-green-500 mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-slate-800">Room Published!</h3>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-10">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Create New Room</h2>
        <p className="text-slate-500 mt-2">Fill in the details to list your luxury room on the platform.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 ml-1">Room Name</label>
            <input 
               required
               type="text" 
               className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner"
               placeholder="e.g. Royal Sea Suite"
               onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 ml-1">Price Per Night ($)</label>
            <input 
               required
               type="number" 
               className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner"
               placeholder="250"
               onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600 ml-1">Room Description</label>
          <textarea 
            required
            rows="4" 
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner resize-none"
            placeholder="Describe the view, bed type, and amenities..."
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600 ml-1">Upload Media</label>
          <motion.div 
            whileHover={{ borderColor: '#3b82f6', backgroundColor: '#f8faff' }}
            className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center gap-3 bg-slate-50 cursor-pointer group transition-all"
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
               <Upload size={28} />
            </div>
            <div className="text-center">
              <p className="text-slate-700 font-bold text-sm">Click to upload room images</p>
              <p className="text-slate-400 text-xs mt-1">PNG, JPG up to 10MB</p>
            </div>
          </motion.div>
        </div>

        <motion.button 
          disabled={isSubmitting}
          whileHover={{ y: -3, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-5 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
            isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-black'
          }`}
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          ) : "Publish Room Now"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddRoom; 