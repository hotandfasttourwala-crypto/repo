"use client";
import { Check } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FleetCar } from "../data/fleet";

function CarCard({ car }: { car: FleetCar }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = car.gallery || [car.image];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-200 group">
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-[110]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          
          <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
            <Image 
              src={images[currentIndex]} 
              alt={`${car.name} image ${currentIndex + 1}`} 
              fill 
              className="object-contain" 
            />
            {images.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div 
        className="relative h-64 md:h-80 bg-black overflow-hidden group cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      >
        <Image 
          src={images[currentIndex]} 
          alt={`${car.name} image ${currentIndex + 1}`} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
          unoptimized
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all z-10 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all z-10 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-[#E10600] w-4" : "bg-white/70 hover:bg-white"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-extrabold text-black mb-6">{car.name}</h3>
        
        <ul className="space-y-4">
          {car.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="text-gray-700 font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Fleet({ cars }: { cars: FleetCar[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-black">Our Cars</h2>
          <p className="text-gray-600 text-lg">
            We provide clean, comfortable, and well-maintained vehicles.
          </p>
          <div className="w-24 h-1 bg-[#F5C400] mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {cars.map((car, idx) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
