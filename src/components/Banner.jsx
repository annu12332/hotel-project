import React from 'react';
import { motion } from 'framer-motion';
import { FaTree, FaWater } from 'react-icons/fa';

const Banner = () => {
  // নিশ্চিত করুন এই লিঙ্কগুলো সরাসরি ইমেজ ফাইল নির্দেশ করছে
  const images = [
    "https://images.unsplash.com/photo-1529419412599-7bb870e11810?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D", // Center
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D", // Top right
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D", // Bottom right
    "https://media.istockphoto.com/id/1347088244/photo/kerala-most-beautiful-place-of-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=azs5OiyZpD_zPj96NASr737IVrCq2_m0iu08EVDvIvE=", // Top left
    "https://media.istockphoto.com/id/2231002213/photo/early-morning-on-tea-plantation-nuwara-eliya-ceylon.webp?a=1&b=1&s=612x612&w=0&k=20&c=6xDLC9aSNtDzOqprCRYgs06BizetQU7IZrRV6_LKnMI=", // Bottom left
  ];

  // হেক্সাগন শেপের জন্য CSS Clip Path (Tailwind এর মাধ্যমে)
  const hexagonStyle = {
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  };

  return (
    <section className="bg-emerald-50 py-16 lg:py-24 overflow-hidden font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* --- Left Content --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Your Sanctuary Awaits
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-emerald-950 leading-tight mb-6">
              Experience Unspoiled <span className="text-emerald-600">Wilderness</span>
            </h1>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed max-w-lg">
              Immerse yourself in sustainable luxury, tranquil forests, and pristine waters. Rediscover peace in the heart of nature.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-full shadow-md text-emerald-600">
                    <FaTree size={20} />
                </div>
                <span className="font-semibold text-emerald-950">Forest Trails</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-full shadow-md text-emerald-600">
                    <FaWater size={20} />
                </div>
                <span className="font-semibold text-emerald-950">Lake Activities</span>
              </div>
            </div>

            <button className="bg-emerald-700 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-emerald-800 transition shadow-lg hover:shadow-emerald-200">
              Explore More
            </button>
          </motion.div>

          {/* --- Right Image Gallery (Hexagons) --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative h-[400px] md:h-[500px] flex justify-center items-center"
          >
            
            {/* Center Main Hexagon */}
            <div className="absolute w-48 h-48 md:w-60 md:h-60 z-10 group overflow-hidden shadow-2xl" style={hexagonStyle}>
              <img src={images[0]} alt="Resort" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* Floating Hexagons - Positions adjusted for better overlap */}
            <div className="absolute w-32 h-32 md:w-40 md:h-40 top-0 left-5 md:top-5 md:left-5 group overflow-hidden shadow-lg rotate-12" style={hexagonStyle}>
                <img src={images[3]} alt="Feature 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            
            <div className="absolute w-32 h-32 md:w-40 md:h-40 bottom-0 left-5 md:bottom-5 md:left-5 group overflow-hidden shadow-lg -rotate-12" style={hexagonStyle}>
                <img src={images[4]} alt="Feature 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            
            <div className="absolute w-28 h-28 md:w-36 md:h-36 top-10 right-0 md:top-0 md:right-5 group overflow-hidden shadow-lg -rotate-12" style={hexagonStyle}>
                <img src={images[1]} alt="Feature 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            
            <div className="absolute w-28 h-28 md:w-36 md:h-36 bottom-10 right-0 md:bottom-0 md:right-5 group overflow-hidden shadow-lg rotate-12" style={hexagonStyle}>
                <img src={images[2]} alt="Feature 4" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;