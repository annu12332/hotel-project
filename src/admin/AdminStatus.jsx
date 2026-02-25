import React from 'react';
import { motion } from 'framer-motion';
import { Users, CreditCard, Clock, CheckCircle } from 'lucide-react';

const StatsCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
            {icon}
        </div>
        <div>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-black text-slate-800">{value}</h3>
        </div>
    </div>
);

const AdminStats = ({ bookings }) => {
    // ক্যালকুলেশন লজিক
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const revenue = bookings.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            <StatsCard
                title="Total Bookings"
                value={total}
                icon={<Users size={24} />}
                color="bg-blue-600"
            />
            <StatsCard
                title="Pending"
                value={pending}
                icon={<Clock size={24} />}
                color="bg-amber-500"
            />
            <StatsCard
                title="Confirmed"
                value={confirmed}
                icon={<CheckCircle size={24} />}
                color="bg-emerald-500"
            />
            <StatsCard
                title="Total Revenue"
                value={`$${revenue}`}
                icon={<CreditCard size={24} />}
                color="bg-indigo-600"
            />
        </div>
    );
};

export default AdminStats;