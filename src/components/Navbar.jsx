import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Camera, Aperture, Mail, Zap } from 'lucide-react';

const BRAND_GREEN = "#10a37f";
const BRAND_YELLOW = "#f8e71c";

const navItems = [
  { name: 'Home', id: 'hero', icon: Home },
  { name: 'Services', id: 'services', icon: Zap },
  { name: 'Work', id: 'portfolio', icon: Aperture },
  { name: 'About', id: 'about', icon: Camera },
  { name: 'Contact', id: 'contact', icon: Mail },
];

const GoshTopNav = () => {
  const [hovered, setHovered] = useState(null);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] w-fit hidden md:block">
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative flex items-center gap-1 p-2 bg-[#10a37f] border-[4px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]"
      >
        {/* Animated Background Block (The "Slider") */}
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              layoutId="gosh-nav-hover"
              className="absolute z-0 bg-[#f8e71c] border-2 border-black"
              initial={{ opacity: 0, skewX: -10 }}
              animate={{ opacity: 1, skewX: -10 }}
              exit={{ opacity: 0, skewX: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                width: '110px',
                height: '44px',
                left: hovered * 114 + 8, // Calculated: (Width + Gap) * Index + Padding
              }}
            />
          )}
        </AnimatePresence>

        {navItems.map((item, idx) => {
          const isHovered = hovered === idx;

          return (
            <button
              key={item.name}
              onClick={() => scrollTo(item.id)}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className="relative z-10 w-[110px] h-11 flex items-center justify-center group outline-none"
            >
              <motion.div
                className="flex items-center gap-2"
                animate={{ 
                  color: isHovered ? "#10a37f" : "#ffffff"
                }}
              >
                <item.icon size={16} strokeWidth={3} />
                <span className="text-[11px] font-black uppercase tracking-tighter">
                  {item.name}
                </span>
              </motion.div>
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-[4px] h-8 bg-black/20 mx-2" />

        {/* Booking Trigger - Scrolls to Contact */}
        <motion.button 
          onClick={() => scrollTo('contact')}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#f8e71c] text-black p-2 border-2 border-black hover:bg-white transition-colors"
        >
          <Zap size={20} fill="currentColor" />
        </motion.button>
      </motion.div>
    </nav>
  );
};

export default GoshTopNav;