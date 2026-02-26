import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';

// Components
import Navbar from './components/Navbar';
import BackgroundAnimator from './components/BackgroundAnimator';
import Accommodation from './components/Accommodation';
import Banner from './components/Banner';
import BookingBar from './components/BookingBar';
import ExtraFacilities from './components/ExtraFacilites';
import Facilities from './components/Facilities';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Gallery from './components/Gallery';

// Pages
import RoomDetails from './pages/RoomDetails';
import AllRooms from './pages/AllRooms';
import ReservationForm from './forms/Reservation';
import AboutUs from './pages/AboutUs';
import AllPhotos from './pages/AllPhotos';
import Offers from './pages/Offers';
import OfferDetails from './pages/OffersDetails';
import Login from './admin/Login';
import { AdminDashboard } from './admin/AdminDashboard';
import BlogPage from './pages/BlogPage';
import BlogDetails from './pages/BlogDetails';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // ১. ইউজার লগইন আছে কি না তা চেক করা
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ২. অ্যাডমিন পেজে থাকলে মেইন ওয়েবসাইটের Navbar/Footer লুকানোর লজিক
  const isAdminPath = location.pathname.startsWith('/admin');

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0f172a] text-indigo-500 font-bold tracking-widest uppercase">
        Loading AlMaris...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <ScrollToTop />

      {/* অ্যাডমিন প্যানেল ছাড়া অন্য সব পেজে Navbar দেখাবে */}
      {!isAdminPath && <Navbar />}

      {/* ব্যাকগ্রাউন্ড অ্যানিমেশন শুধুমাত্র মেইন সাইটের জন্য */}
      {!isAdminPath && (
        <div className="fixed inset-0 z-[-1]">
          <BackgroundAnimator />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      )}

      <main className={isAdminPath ? "" : "relative z-10"}>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={
            <>
              <HeroSection />
              <Banner />
              <Accommodation />
              <Facilities />
              <ExtraFacilities />
              <BookingBar />
              <Gallery />
            </>
          } />

          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetails />} />

          <Route path="/gallery" element={<AllPhotos />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/offers/:id" element={<OfferDetails />} />
          <Route path="/all-rooms" element={<AllRooms />} />

          {/* --- Login Route --- */}
          {/* লগইন করা থাকলে ইউজার আর লগইন পেজে যেতে পারবে না, সরাসরি ড্যাশবোর্ডে যাবে */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/admin/dashboard" />} />

          {/* --- Protected Admin Routes --- */}
          {/* লগইন করা না থাকলে কেউ /admin/dashboard এ ঢুকতে পারবে না */}
          <Route
            path="/admin/dashboard/*"
            element={user ? <AdminDashboard /> : <Navigate to="/login" />}
          />

          {/* ভুল ইউআরএল দিলে হোমে পাঠিয়ে দিবে */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* অ্যাডমিন প্যানেল ছাড়া অন্য সব পেজে Footer দেখাবে */}
      {!isAdminPath && <Footer />}
    </div>
  );
}

export default App;