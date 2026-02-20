import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Camera, Star, ArrowUpRight, Aperture, 
  Radio, Instagram, Mail, Phone, Video, X 
} from 'lucide-react';

const GREEN = "#10a37f";
const YELLOW = "#f8e71c";

// Your Vertical Image Assets
const imageUrls = [
  "/assets/img1.jpeg",
  "/assets/img2.jpeg",
  "/assets/img3.jpeg",
  "/assets/img4.jpeg",
  "/assets/img5.jpeg",
  "/assets/img6.jpeg"
];

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
  const horizontalRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const { scrollYProgress: horizontalScrollValue } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });

  const scaleVal = useTransform(smoothProgress, [0, 0.1], [1, 0.85]);
  
  // Adjusted xMove for portrait cards (they are narrower, so we can scroll further)
  const xMoveSticky = useTransform(horizontalScrollValue, [0, 1], ["0%", "-70%"]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative bg-black font-black uppercase leading-none selection:bg-white selection:text-black">
      
    

      {/* 1. HERO */}
      <StackCard id="hero" color={GREEN} textColor={YELLOW}>
        <motion.div style={{ scale: scaleVal }} className="text-center w-full">
          <h1 className="text-[26vw] md:text-[22vw] tracking-tighter italic leading-[0.75]">GOSHO</h1>
          <div className="flex items-center justify-center gap-3 mt-4 md:-mt-6">
            <h2 className="text-[14vw] md:text-[10vw] text-white">STUDIOS</h2>
            <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center animate-bounce shadow-xl">
              <ArrowUpRight className="w-6 h-6 md:w-12 md:h-12" color={GREEN} strokeWidth={4} />
            </div>
          </div>
        </motion.div>
      </StackCard>

      {/* 2. SERVICES */}
      <StackCard id="services" color={YELLOW} textColor={GREEN}>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-12 md:pt-0">
          <div className="text-left">
            <h2 className="text-[20vw] md:text-[10vw] leading-[0.8] mb-4">OUR <br/> EDGE.</h2>
            <p className="text-lg md:text-2xl italic normal-case font-bold max-w-sm">
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
              <motion.div key={i} whileHover={{ x: 10, backgroundColor: "#fff" }} className="border-2 md:border-4 border-[#10a37f] p-4 md:p-6 flex justify-between items-center cursor-pointer transition-colors">
                <span className="text-xl md:text-3xl">{s.label}</span>
                {s.icon}
              </motion.div>
            ))}
          </div>
        </div>
      </StackCard>

      {/* 3. THE PORTFOLIO (Vertical Layout) */}
      <div ref={horizontalRef} id="portfolio" className="relative h-[400vh] bg-white">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden border-t-2 md:border-t-4 border-black/10">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10 mb-6 flex justify-between items-end">
            <h2 className="text-5xl md:text-9xl text-[#10a37f]">ARCHIVE</h2>
            <Star className="w-10 h-10 md:w-20 md:h-20" fill={YELLOW} color="#000" />
          </div>

          <motion.div style={{ x: xMoveSticky }} className="flex gap-4 md:gap-8 px-6 md:px-20">
            {imageUrls.map((url, i) => (
              <motion.div 
                layoutId={`card-${url}`}
                key={url} 
                onClick={() => setSelectedImg(url)}
                // min-w-[70vw] and aspect-[2/3] handles vertical photos beautifully
                className="group relative min-w-[70vw] md:min-w-[400px] aspect-[2/3] md:aspect-[3/4] bg-neutral-100 border-4 md:border-[10px] border-black shadow-[8px_8px_0px_#000] overflow-hidden cursor-zoom-in"
              >
                <motion.img 
                  layoutId={`img-${url}`}
                  src={url} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  alt={`GOSHO Work ${i + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                   <p className="text-white text-2xl italic font-black">VIEW PROJECT</p>
                </div>
              </motion.div>
            ))}
            <div className="min-w-[30vw]" />
          </motion.div>
        </div>
      </div>

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-zoom-out"
            />

            <motion.div 
              layoutId={`card-${selectedImg}`}
              // max-h-[90vh] ensures vertical images don't go off-screen
              className="relative h-full max-h-[85vh] aspect-[2/3] md:aspect-[3/4] bg-black border-4 md:border-[12px] border-white z-10 overflow-hidden"
            >
              <motion.img 
                layoutId={`img-${selectedImg}`}
                src={selectedImg} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 bg-[#f8e71c] text-black p-3 rounded-full hover:rotate-90 transition-transform z-20"
              >
                <X size={24} strokeWidth={4} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. ABOUT */}
      <StackCard id="about" color={GREEN} textColor="white">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full pt-12 md:pt-0">
          {[
            { title: "HIGH END", desc: "Specializing in premium visual production." },
            { title: "STRATEGIC", desc: "Media crafted to connect your brand." },
            { title: "24/7", desc: "Dedicated support for all major shoots." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 md:p-12 flex flex-col justify-center border-white/20 border-b md:border-b-0 md:border-r bg-white/5">
              <h3 className="text-5xl md:text-7xl italic text-[#f8e71c] mb-4">{item.title}</h3>
              <p className="text-sm md:text-xl normal-case font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </StackCard>

      {/* 5. CONTACT */}
      <section id="contact" className="relative z-50 min-h-screen bg-white flex flex-col items-center justify-between p-6 md:p-12 border-t-[20px] border-[#f8e71c]">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl pt-20">
          <h2 className="text-[18vw] md:text-[12vw] leading-none mb-12 text-center">LET'S FILM.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="flex flex-col gap-6">
               <a href="tel:9061664881" className="flex items-center gap-3 text-2xl md:text-4xl hover:text-[#10a37f] transition-colors font-mono uppercase">
                <Phone className="w-6 h-6 md:w-10 md:h-10" /> 90616 64881
               </a>
               <a href="mailto:goshostudiosclt@gmail.com" className="flex items-center gap-3 text-sm md:text-2xl font-mono border-b-2 border-black pb-2 break-all lowercase">
                <Mail className="w-6 h-6 md:w-10 md:h-10" /> goshostudiosclt@gmail.com
               </a>
            </div>
            <a href="https://instagram.com/gosho_studios" target="_blank" rel="noreferrer" className="bg-[#10a37f] text-[#f8e71c] py-6 md:py-10 text-2xl border-4 border-black shadow-[8px_8px_0px_#000] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all flex items-center justify-center gap-4">
              INSTAGRAM <Instagram />
            </a>
          </div>
        </div>
        
        <footer className="w-full flex flex-col md:flex-row justify-between items-center border-t-4 border-[#10a37f] pt-10 mt-20 gap-8">
          <div className="text-7xl md:text-9xl text-[#10a37f]/10">GOSHO</div>
          <div className="text-xs md:text-lg italic opacity-70 text-center md:text-right">
            <span>// Kozhikode, India</span><br/>
            <span>© 2026 // GOSHO STUDIOS</span>
          </div>
        </footer>
      </section>
    </div>
  );
}