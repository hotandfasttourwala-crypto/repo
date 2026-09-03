"use client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function RouteVisualization() {
  const destinations = [
    { name: "Ujjain", x: 70, y: 15 },
    { name: "Omkareshwar", x: 80, y: 85 },
    { name: "Bhopal", x: 15, y: 30 },
    { name: "Khandwa", x: 60, y: 95 },
    { name: "Burhanpur", x: 40, y: 100 },
    { name: "Ratlam", x: 10, y: 10 },
    { name: "Mandsaur", x: 30, y: 5 },
    { name: "Neemuch", x: 50, y: 0 },
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Your Journey Starts From <span className="text-[#E10600]">Indore</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connecting you to all major destinations across Madhya Pradesh.
          </p>
        </div>

        <div className="relative w-full max-w-3xl mx-auto h-[400px] md:h-[500px]">
          {/* Indore Node (Center) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 bg-[#E10600] rounded-full flex flex-col items-center justify-center text-white font-bold shadow-[0_0_30px_rgba(225,6,0,0.6)]"
            >
              <MapPin size={24} />
            </motion.div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 font-extrabold text-xl text-white drop-shadow-md">
              INDORE
            </div>
          </div>

          {/* SVG Lines */}
          <svg className="absolute top-0 left-0 w-full h-full z-0" style={{ overflow: "visible" }}>
            {destinations.map((dest, i) => (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${dest.x}%`}
                y2={`${dest.y}%`}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            ))}
          </svg>

          {/* Destination Nodes */}
          {destinations.map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className="absolute group z-10"
              style={{ top: `${dest.y}%`, left: `${dest.x}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="w-4 h-4 bg-white rounded-full group-hover:scale-150 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 font-bold text-sm text-gray-300 group-hover:text-white group-hover:scale-110 whitespace-nowrap transition-all bg-black/50 px-2 py-1 rounded">
                {dest.name}
              </div>
            </motion.div>
          ))}
          
          {/* Animated Car on a path */}
          <motion.div
            animate={{ 
              x: ["0%", "40%", "0%"],
              y: ["0%", "-35%", "0%"]
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 z-15 text-2xl -ml-3 -mt-3 drop-shadow-lg"
          >
            🚘
          </motion.div>
        </div>
      </div>
    </section>
  );
}
