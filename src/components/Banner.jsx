import React from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <section className="bg-white py-12 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* - flex-row (Mobile-e pashapashi rakhar jonno)
            - flex-wrap (Content niche nambanor jonno)
            - items-start (Arch style thik thakar jonno)
        */}
        <div className="flex flex-row flex-wrap lg:flex-nowrap items-start lg:items-center justify-between gap-y-10 lg:gap-x-6">
          
          {/* --- Left Arch Image --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-1/2 lg:w-1/3 flex justify-center lg:justify-start order-1"
          >
            <div className="relative w-full aspect-[3/4] max-w-[150px] md:max-w-[300px] lg:max-w-[350px] rounded-t-full overflow-hidden shadow-xl group border-2 border-transparent hover:border-[#b59473]/20 transition-all">
              <img 
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000&auto=format&fit=crop" 
                alt="Luxury Bedroom" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* --- Right Arch Image (Mobile-e order-2 rakha hoyeche pashapashi anar jonno) --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="w-1/2 lg:w-1/3 flex justify-center lg:justify-end order-2 lg:order-3"
          >
            <div className="relative w-full aspect-[3/4] max-w-[150px] md:max-w-[300px] lg:max-w-[350px] rounded-t-full overflow-hidden shadow-xl group border-2 border-transparent hover:border-[#b59473]/20 transition-all">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000&auto=format&fit=crop" 
                alt="Luxury Spa" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* --- Center Content --- */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 text-center space-y-4 lg:space-y-8 order-3 lg:order-2 px-2"
          >
            <div className="flex flex-col items-center">
              <span className="text-[#b59473] text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold mb-3 lg:mb-5">
                Welcome to Almaris
              </span>
              <h2 className="text-gray-900 text-2xl md:text-4xl lg:text-5xl font-serif leading-tight max-w-[280px] md:max-w-none">
                Exceptional Hospitality and Unmatched Relaxation
              </h2>
            </div>

            <div className="pt-2 space-y-2 lg:space-y-4">
              <p className="text-gray-900 font-serif text-2xl md:text-3xl italic">
                4.9 out of 5
              </p>
              <div className="flex justify-center gap-1 text-[#b59473]">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} className="md:size-4" />
                ))}
              </div>
              <p className="text-gray-500 text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-semibold">
                Based on 25,000+ reviews
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;