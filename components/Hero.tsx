"use client";
import { motion } from "framer-motion";
import { siteData } from "../data/site";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-[#0A0A0A] pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden min-h-[85vh] flex items-center">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium tracking-wide mb-2"
            >
              One Way • Round Trip • Local • Outstation
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
            >
              Taxi Service From <span className="text-[#F5C400]">Indore</span> to All Major Destinations
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
            >
              Comfortable AC Cars • Experienced Drivers • 24/7 Service
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4"
            >
              <a
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-bold py-3.5 px-6 rounded-lg text-base md:text-lg transition-all shadow-lg"
              >
                <MessageCircle size={20} />
                Contact Now
              </a>
              <a
                href={`https://wa.me/91${siteData.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 hover:border-white hover:bg-white/5 text-white font-bold py-3 px-6 rounded-lg text-base md:text-lg transition-all"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm text-gray-400 mt-4 italic"
            >
              Serving Indore and major destinations across Madhya Pradesh
            </motion.p>
          </div>

          {/* Right 3D Visual */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-lg aspect-square lg:aspect-auto lg:h-[500px]"
              style={{
                perspective: "1000px"
              }}
            >
              {/* This container has 3D rotation */}
              <motion.div
                animate={{ 
                  rotateY: [-5, 5, -5],
                  rotateX: [2, 5, 2]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut" 
                }}
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Simulated shadow */}
                <div className="absolute bottom-[10%] left-[10%] w-[80%] h-10 bg-black/80 blur-xl rounded-full" style={{ transform: "translateZ(-50px)" }} />
                
                {/* Main Vehicle Image */}
                <div 
                  className="absolute inset-0 bg-black rounded-2xl flex items-center justify-center overflow-hidden border border-white/10"
                  style={{ transform: "translateZ(0px)" }}
                >
                  <Image 
                    src="/images/cars/hero-bg.jpeg" 
                    alt="Hot and Fast Tour Wala Taxi Service" 
                    fill 
                    className="object-cover" 
                    priority
                  />
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  className="absolute -right-6 top-1/4 bg-white p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-100"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <div className="w-10 h-10 bg-[#E10600] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-inner">24/7</div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Available</p>
                    <p className="text-sm font-extrabold text-black">Anytime</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
                  className="absolute -left-6 bottom-1/4 bg-[#111] p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-800"
                  style={{ transform: "translateZ(80px)" }}
                >
                  <div className="w-10 h-10 bg-[#F5C400] rounded-full flex items-center justify-center text-black font-bold text-lg shadow-inner">₹</div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Best Fares</p>
                    <p className="text-sm font-extrabold text-white">Guaranteed</p>
                  </div>
                </motion.div>

              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
