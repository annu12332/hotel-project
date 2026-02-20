import { useState } from 'react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('stats');

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="ml-64 p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 capitalize tracking-tight">
                        {activeTab.replace('-', ' ')}
                    </h1>
                    <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow-sm pr-6">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600">M</div>
                        <span className="font-semibold text-slate-700 text-sm">Manager Account</span>
                    </div>
                </header>

                {/* Dynamic Content */}
                {activeTab === 'add-room' && <AddRoom />}
                {activeTab === 'stats' && <div className="text-slate-500">Stats Overview Coming Soon...</div>}
                {activeTab === 'manage' && <div className="text-slate-500">Room List Coming Soon...</div>}
            </main>
        </div>
    );
}