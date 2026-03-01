import React from 'react';
import { motion } from 'framer-motion';
// Icons updated for Brighter Eco-theme
import { Users, CreditCard, Clock, CheckCircle, Leaf } from 'lucide-react';

const StatsCard = ({ title, value, icon, color }) => (
    <motion.div 
        whileHover={{ y: -5 }}                
        // Subtle border and shadow for a clean look
        className="bg-white p-6 rounded-[2rem] shadow-sm border border-stone-100 flex items-center gap-5"
    >
        <div className={`w-16 h-16 rounded-3xl ${color} flex items-center justify-center text-white shadow-lg`}>
            {icon}
        </div>
        <div>
            <p className="text-stone-500 text-sm font-semibold uppercase tracking-wider">{title}</p>
            <h3 className="text-3xl font-black text-stone-900 mt-1">{value}</h3>
        </div>
    </motion.div>
);

const AdminStats = ({ bookings }) => {
    // ক্যালকুলেশন লজিক
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    // Calculation for Total Revenue
    const revenue = bookings.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);

    return (
        // Grid layout with natural theme
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            <StatsCard
                title="Total Bookings"
                value={total}
                icon={<Users size={28} />}
                // Brighter Emerald for primary stats
                color="bg-emerald-500"
            />
            <StatsCard
                title="Pending Actions"
                value={pending}
                icon={<Clock size={28} />}
                // Amber for warning/pending
                color="bg-amber-500"
            />
            <StatsCard
                title="Confirmed Stays"
                value={confirmed}
                icon={<CheckCircle size={28} />}
                // Darker green for confirmation
                color="bg-emerald-600"
            />
            <StatsCard
                title="Total Revenue"
                value={`$${revenue.toLocaleString()}`}
                icon={<CreditCard size={28} />}
                // A subtle accent color for revenue
                color="bg-stone-800"
            />
        </div>
    );
};

export default AdminStats;