import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Camera, Zap, Star, ArrowUpRight, Aperture, 
  Layers, Box, Terminal, Monitor, Video, 
  Radio, Instagram, Mail, Phone
} from 'lucide-react';

const GREEN = "#10a37f";
const YELLOW = "#f8e71c";

// --- REUSABLE STACKED CARD WRAPPER ---
const StackCard = ({ children, color, textColor, id, stickyTop = "top-0" }) => (
  <section 
    id={id}
    className={`sticky ${stickyTop} h-screen w-full flex flex-col items-center justify-center p-6 border-t-4 border-black/10 overflow-hidden`} 
    style={{ backgroundColor: color, color: textColor }}
  >
    {children}
  </section>
);

export default function GravityStackGosh() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const scaleVal = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const xMove = useTransform(smoothProgress, [0.3, 0.7], ["0%", "-50%"]);

  // Navigation Handler
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative bg-black font-black uppercase leading-none">
      
      {/* --- FIXED NAVBAR --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-black/80 backdrop-blur-md border-2 border-white/20 p-2 rounded-full text-white font-mono text-[10px] md:text-xs">
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
            className="px-4 py-2 hover:bg-[#10a37f] hover:text-[#f8e71c] rounded-full transition-all duration-300"
          >
            {item.name}
          </button>
        ))}
      </nav>

      {/* 1. HERO CARD */}
      <StackCard id="hero" color={GREEN} textColor={YELLOW}>
        <motion.div style={{ scale: scaleVal }} className="text-center">
          <h1 className="text-[22vw] tracking-tighter italic">GOSHO</h1>
          <div className="flex items-center justify-center gap-6 -mt-10">
            <h2 className="text-[10vw] text-white">STUDIOS</h2>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center animate-bounce">
              <ArrowUpRight size={48} color={GREEN} strokeWidth={4} />
            </div>
          </div>
        </motion.div>
      </StackCard>

      {/* 2. THE SERVICES STACK */}
      <StackCard id="services" color={YELLOW} textColor={GREEN}>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-[12vw] leading-[0.8] mb-10">OUR <br/> EDGE.</h2>
            <p className="text-2xl italic normal-case font-bold max-w-sm">
              We help brands and creators tell powerful stories through visually engaging and strategically crafted media.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 overflow-y-auto max-h-[70vh] pr-4">
            {[
              { label: "Podcast Shooting", icon: <Radio /> },
              { label: "Personal Branding", icon: <Star /> },
              { label: "Brand Reels", icon: <Video /> },
              { label: "Ad Films", icon: <Aperture /> },
              { label: "Catalogue Shoots", icon: <Camera /> },
              { label: "Billboard Shoots", icon: <Layers /> },
              { label: "Video Promotion", icon: <Zap /> }
            ].map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 20, backgroundColor: "#fff" }}
                className="border-4 border-[#10a37f] p-6 flex justify-between items-center transition-colors bg-transparent cursor-pointer"
              >
                <span className="text-3xl">{s.label}</span>
                {s.icon}
              </motion.div>
            ))}
          </div>
        </div>
      </StackCard>

      {/* 3. THE PORTFOLIO */}
      <StackCard id="portfolio" color="white" textColor={GREEN}>
        <div className="w-full h-full flex flex-col justify-center">
          <div className="px-10 mb-10 flex justify-between items-end">
            <h2 className="text-8xl">VISUAL_ARCHIVE</h2>
            <Star size={60} fill={YELLOW} />
          </div>
          <motion.div style={{ x: xMove }} className="flex gap-10 px-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="min-w-[500px] h-[350px] bg-[#10a37f] border-[8px] border-black overflow-hidden relative group">
                <img 
                  src={`https://picsum.photos/1000/700?sig=${i+200}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  alt="Portfolio Work"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </StackCard>

      {/* 4. ABOUT / STATS */}
      <StackCard id="about" color={GREEN} textColor="white">
        <div className="grid md:grid-cols-3 w-full h-full">
          <div className="p-12 border-r border-white/20 flex flex-col justify-between bg-white/5">
            <h3 className="text-7xl italic text-[#f8e71c]">HIGH <br/>END</h3>
            <p className="text-xl normal-case">Full-service creative studio specializing in premium visual production.</p>
          </div>
          <div className="p-12 border-r border-white/20 flex flex-col justify-between">
            <h3 className="text-7xl italic text-[#f8e71c]">STRATEGIC</h3>
            <p className="text-xl normal-case">Strategically crafted media that connects your brand with the right audience.</p>
          </div>
          <div className="p-12 flex flex-col justify-between bg-white/5">
            <h3 className="text-7xl italic text-[#f8e71c]">24/7</h3>
            <p className="text-xl normal-case">Dedicated production support for billboard, catalogue, and ad film shoots.</p>
          </div>
        </div>
      </StackCard>

      {/* 5. CONTACT CARD */}
      <section id="contact" className="relative z-50 min-h-screen bg-white flex flex-col items-center justify-center p-6 border-t-[30px] border-[#f8e71c]">
        <motion.div whileInView={{ y: [100, 0], opacity: [0, 1] }} className="text-center w-full max-w-5xl">
          <h2 className="text-[15vw] leading-none mb-10">LET'S FILM.</h2>
          <div className="grid md:grid-cols-2 gap-10 mb-20 text-left">
            <div className="space-y-6">
               <a href="tel:9061664881" className="flex items-center gap-4 text-3xl hover:text-[#10a37f] transition-colors">
                <Phone size={32} /> 90616 64881
               </a>
               <a href="mailto:goshostudiosclt@gmail.com" className="flex items-center gap-4 text-2xl lowercase font-mono border-b-4 border-black pb-2">
                <Mail size={32} /> goshostudiosclt@gmail.com
               </a>
            </div>
            <div className="flex flex-col justify-end">
              <a href="https://www.instagram.com/gosho_studios" target="_blank" rel="noreferrer" className="bg-[#10a37f] text-[#f8e71c] px-10 py-6 text-3xl border-4 border-black shadow-[10px_10px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-4">
                FOLLOW ON IG <Instagram size={32} />
              </a>
            </div>
          </div>
        </motion.div>
        <footer className="w-full flex flex-col md:flex-row justify-between items-end border-t-8 border-[#10a37f] pt-10 mt-auto">
          <div className="text-9xl text-[#10a37f]/10">GOSHO</div>
          <div className="flex flex-col items-end gap-2 text-xl italic text-right">
            <span>// Kozhikode, India</span>
            <span>© 2026 // GOSHO STUDIOS</span>
          </div>
        </footer>
      </section>

    </div>
  );
}