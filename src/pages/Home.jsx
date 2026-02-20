import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Camera, Zap, Star, ArrowUpRight, Aperture, 
  Layers, Radio, Instagram, Mail, Phone, Video
} from 'lucide-react';

const GREEN = "#10a37f";
const YELLOW = "#f8e71c";

// --- REUSABLE STACKED CARD WRAPPER ---
const StackCard = ({ children, color, textColor, id, stickyTop = "top-0" }) => (
  <section 
    id={id}
    className={`sticky ${stickyTop} min-h-[100svh] w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 border-t-2 md:border-t-4 border-black/10 overflow-hidden`} 
    style={{ backgroundColor: color, color: textColor }}
  >
    {children}
  </section>
);

export default function GravityStackGosh() {
  const containerRef = useRef(null);
  
  // Ref for horizontal scroll tracking
  const horizontalRef = useRef(null);

  // Global Scroll progress
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Specific progress for the Portfolio horizontal section
  const { scrollYProgress: horizontalScrollValue } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });

  // Transforms
  const scaleVal = useTransform(smoothProgress, [0, 0.1], [1, 0.85]);
  const xMoveSticky = useTransform(horizontalScrollValue, [0, 1], ["0%", "-85%"]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative bg-black font-black uppercase leading-none selection:bg-white selection:text-black">
      
      {/* --- FIXED NAVBAR --- */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 bg-black/90 backdrop-blur-md border border-white/20 p-1 rounded-full text-white font-mono text-[10px] sm:text-xs whitespace-nowrap">
        {[
          { name: 'HOME', id: 'hero' },
          { name: 'SERVICES', id: 'services' },
          { name: 'WORK', id: 'portfolio' },
          { name: 'ABOUT', id: 'about' },
          { name: 'CONTACT', id: 'contact' }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="px-3 py-2 hover:bg-[#10a37f] hover:text-[#f8e71c] rounded-full transition-all duration-300"
          >
            {item.name}
          </button>
        ))}
      </nav>

      {/* 1. HERO CARD */}
      <StackCard id="hero" color={GREEN} textColor={YELLOW}>
        <motion.div style={{ scale: scaleVal }} className="text-center w-full px-2">
          <h1 className="text-[26vw] md:text-[22vw] tracking-tighter italic leading-[0.75]">GOSHO</h1>
          <div className="flex items-center justify-center gap-3 md:gap-6 mt-4 md:-mt-6">
            <h2 className="text-[14vw] md:text-[10vw] text-white">STUDIOS</h2>
            <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center animate-bounce shadow-xl">
              <ArrowUpRight className="w-6 h-6 md:w-12 md:h-12" color={GREEN} strokeWidth={4} />
            </div>
          </div>
        </motion.div>
      </StackCard>

      {/* 2. THE SERVICES STACK */}
      <StackCard id="services" color={YELLOW} textColor={GREEN}>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center pt-12 md:pt-0">
          <div className="text-left">
            <h2 className="text-[20vw] md:text-[10vw] leading-[0.8] mb-4 md:mb-8">OUR <br className="hidden md:block"/> EDGE.</h2>
            <p className="text-lg md:text-2xl italic normal-case font-bold max-w-[280px] md:max-w-sm">
              Helping brands tell powerful stories through visually engaging media.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-2 md:gap-3 max-h-[40vh] md:max-h-none overflow-y-auto pr-2">
            {[
              { label: "Podcast Shooting", icon: <Radio /> },
              { label: "Personal Branding", icon: <Star /> },
              { label: "Brand Reels", icon: <Video /> },
              { label: "Ad Films", icon: <Aperture /> },
              { label: "Catalogue", icon: <Camera /> },
            ].map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10, backgroundColor: "#fff" }}
                className="border-2 md:border-4 border-[#10a37f] p-4 md:p-6 flex justify-between items-center bg-transparent cursor-pointer"
              >
                <span className="text-xl md:text-3xl">{s.label}</span>
                <span className="scale-75 md:scale-100">{s.icon}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </StackCard>

      {/* 3. THE PORTFOLIO (Vertical-to-Horizontal Scroll Lock) */}
      <div ref={horizontalRef} id="portfolio" className="relative h-[300vh] bg-white">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden border-t-2 md:border-t-4 border-black/10">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10 mb-8 md:mb-12 flex justify-between items-end">
            <h2 className="text-5xl md:text-9xl text-[#10a37f]">ARCHIVE</h2>
            <Star className="w-10 h-10 md:w-20 md:h-20" fill={YELLOW} color="#000" />
          </div>

          <motion.div style={{ x: xMoveSticky }} className="flex gap-4 md:gap-12 px-6 md:px-20">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div 
                key={i} 
                className="group relative min-w-[85vw] md:min-w-[600px] aspect-[16/10] md:aspect-video bg-[#10a37f] border-4 md:border-[10px] border-black shadow-[8px_8px_0px_#000] overflow-hidden"
              >
                <img 
                  src={`https://picsum.photos/1200/800?sig=${i+500}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  alt="Work"
                />
              </div>
            ))}
            <div className="min-w-[20vw]" /> {/* End spacer */}
          </motion.div>
        </div>
      </div>

      {/* 4. ABOUT / STATS */}
      <StackCard id="about" color={GREEN} textColor="white">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full pt-12 md:pt-0">
          {[
            { title: "HIGH END", desc: "Specializing in premium visual production." },
            { title: "STRATEGIC", desc: "Media crafted to connect your brand." },
            { title: "24/7", desc: "Dedicated support for all major shoots." }
          ].map((item, idx) => (
            <div key={idx} className={`p-8 md:p-12 flex flex-col justify-center md:justify-between border-white/20 ${idx !== 2 ? 'border-b md:border-b-0 md:border-r' : ''} bg-white/5`}>
              <h3 className="text-5xl md:text-7xl italic text-[#f8e71c] mb-4">{item.title}</h3>
              <p className="text-sm md:text-xl normal-case font-medium opacity-90">{item.desc}</p>
            </div>
          ))}
        </div>
      </StackCard>

      {/* 5. CONTACT CARD */}
      <section id="contact" className="relative z-50 min-h-screen bg-white flex flex-col items-center justify-between p-6 md:p-12 border-t-[20px] md:border-t-[30px] border-[#f8e71c]">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl pt-20">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }} 
            whileInView={{ y: 0, opacity: 1 }} 
            className="text-[18vw] md:text-[12vw] leading-none mb-12 text-center"
          >
            LET'S FILM.
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="flex flex-col gap-6 text-left">
               <a href="tel:9061664881" className="flex items-center gap-3 text-2xl md:text-4xl hover:text-[#10a37f] transition-colors font-mono">
                <Phone className="w-6 h-6 md:w-10 md:h-10" /> 90616 64881
               </a>
               <a href="mailto:goshostudiosclt@gmail.com" className="flex items-center gap-3 text-sm sm:text-lg md:text-2xl lowercase font-mono border-b-2 border-black pb-2 break-all">
                <Mail className="w-6 h-6 md:w-10 md:h-10" /> goshostudiosclt@gmail.com
               </a>
            </div>
            <div className="flex items-center">
              <a href="https://instagram.com/gosho_studios" target="_blank" rel="noreferrer" className="w-full bg-[#10a37f] text-[#f8e71c] py-6 md:py-10 text-2xl md:text-3xl border-4 border-black shadow-[8px_8px_0px_#000] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all flex items-center justify-center gap-4">
                INSTAGRAM <Instagram />
              </a>
            </div>
          </div>
        </div>
        
        <footer className="w-full flex flex-col md:flex-row justify-between items-center border-t-4 md:border-t-8 border-[#10a37f] pt-10 mt-20 gap-8">
          <div className="text-7xl md:text-9xl text-[#10a37f]/10">GOSHO</div>
          <div className="flex flex-col items-center md:items-end gap-1 text-xs md:text-lg italic opacity-70 text-center md:text-right">
            <span>// Kozhikode, India</span>
            <span>© 2026 // GOSHO STUDIOS</span>
          </div>
        </footer>
      </section>
    </div>
  );
}