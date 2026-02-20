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
import AboutUs from './pages/AboutUs';
import Gallery from './components/Gallery';
import AllPhotos from './pages/AllPhotos';
import Offers from './pages/Offers';
import OfferDetails from './pages/OffersDetails';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="relative min-h-screen">
      {/* 1. ScrollToTop ke Routes er baire rakha hoyeche jate eta shob path change e kaj kore */}
      <ScrollToTop />

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
              <Gallery />
            </>
          } />

          {/* Room Details Route */}
          <Route path="/room/:slug" element={<RoomDetails />} />

          {/* All routes */}
          <Route path="/all-rooms" element={<AllRooms />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/gallery" element={<AllPhotos />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/offers/:id" element={<OfferDetails />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;