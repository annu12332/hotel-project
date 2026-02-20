import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackgroundAnimator from './components/BackgroundAnimator';
import Accommodation from './components/Accommodation';
import Banner from './components/Banner';
import BookingBar from './components/BookingBar';
import ExtraFacilities from './components/ExtraFacilites';
import Facilities from './components/Facilities';
import HeroSection from './components/HeroSection';
import RoomDetails from './pages/RoomDetails';
import AllRooms from './pages/AllRooms';
import Footer from './components/Footer';
import ReservationForm from './forms/Reservation';

function App() {
  return (
    <div className="relative min-h-screen">
      {/* --- Global Components --- */}
      <Navbar />



      <div className="fixed inset-0 z-[-1]">
        <BackgroundAnimator />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* --- Dynamic Content Layer --- */}
      <main className="relative z-10">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <>
              <HeroSection />
              <Banner />
              <Accommodation />
              <Facilities />
              <ExtraFacilities />
              <BookingBar />
            </>
          } />

          {/* Room Details Route: Shudhu specific room-er details dekhabe */}
          <Route path="/room/:slug" element={<RoomDetails />} />

          {/* All routes */}
          <Route path="/all-rooms" element={<AllRooms />} />
          <Route path="/reservation" element={<ReservationForm />} />

        </Routes>
      </main>
      <Footer />
    </div>

  );
}

export default App;