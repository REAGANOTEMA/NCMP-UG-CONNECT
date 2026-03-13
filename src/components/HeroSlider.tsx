"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1526470498-9ae73c66a992?q=80&w=2070",
    title: "National Authority",
    subtitle: "The heart of Ugandan legislation and governance."
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    title: "Civic Infrastructure",
    subtitle: "Connecting citizens to the Republic's leadership."
  },
  {
    image: "https://images.unsplash.com/photo-1577985043696-8bd54d9f09b7?q=80&w=2070",
    title: "Digital Sovereignty",
    subtitle: "Building a transparent and accountable future for all Ugandans."
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          {/* Professional Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
        </motion.div>
      </AnimatePresence>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-500 rounded-full ${
              current === i ? "w-8 bg-gold" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}