import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Expanded Image Set (15 unique abstract/architectural shots)
const images = [
  { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe', title: 'VOID' },
  { url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400', title: 'CHROMA' },
  { url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2', title: 'PRISM' },
  { url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead', title: 'NEON' },
  { url: 'https://images.unsplash.com/photo-1604871000636-074fa5117945', title: 'MATRIX' },
  { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853', title: 'OSCILLATE' },
  { url: 'https://images.unsplash.com/photo-1506792006437-256b665541e2', title: 'SOLACE' },
  { url: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3', title: 'KINETIC' },
  { url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d', title: 'ECHO' },
  { url: 'https://images.unsplash.com/photo-1617396900799-f4ec3b43c7ae', title: 'FLUX' },
  { url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e', title: 'GLOW' },
  { url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4', title: 'QUARTZ' },
  { url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17', title: 'SIGNAL' },
  { url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab', title: 'VORTEX' },
  { url: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43', title: 'AURA' },
];

export default function PerspectiveGallery() {
  const [captures, setCaptures] = useState([]);
  const [flash, setFlash] = useState(false);

  const handleCapture = (e) => {
    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    const newPhoto = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      // Pulls a random image from the 15 available
      url: images[Math.floor(Math.random() * images.length)].url,
      rotate: Math.random() * 40 - 20,
    };

    // Limits total captures to 20 to prevent DOM lag, keeps the newest
    setCaptures((prev) => [...prev, newPhoto].slice(-20));
  };

  return (
    <main className="bg-red-600 text-yellow-400 overflow-x-hidden relative">
      <AnimatePresence>
        {flash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <section 
        onClick={handleCapture}
        className="h-screen flex flex-col items-start justify-end p-10 border-b border-yellow-400/20 relative overflow-hidden cursor-crosshair"
      >
        <AnimatePresence>
          {captures.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="absolute w-40 h-48 bg-white p-2 shadow-2xl z-10 pointer-events-none"
              style={{ 
                left: 0, 
                top: 0, 
                rotate: photo.rotate,
                x: photo.x - 80, 
                y: photo.y - 100 
              }}
            >
              <img src={photo.url} className="w-full h-32 object-cover bg-gray-200" alt="captured" />
              <div className="mt-2 h-8 bg-gray-100 flex items-center px-1">
                <span className="text-[10px] text-black font-mono">
                  #ID_{photo.id.toString().slice(-4)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <h1 className="text-[20vw] font-black uppercase leading-[0.8] mb-10 select-none">
          The <br /> <span className="text-outline">Vault</span>
        </h1>
        <div className="flex justify-between w-full font-mono text-sm uppercase tracking-widest text-yellow-200/70 z-20">
          <span>Database // 15_FILES_LOADED</span>
          <span>Click to Capture / Scroll to Unlock</span>
        </div>
      </section>

      <section className="py-20 px-4">
        {images.map((img, i) => (
          <PerspectiveCard key={i} {...img} />
        ))}
      </section>

      <footer className="h-[50vh] flex items-center justify-center">
        <h2 className="text-5xl font-light tracking-[1em] uppercase opacity-40">Finis</h2>
      </footer>

      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 2px #facc15;
          color: transparent;
        }
      `}</style>
    </main>
  );
}

const PerspectiveCard = ({ url, title }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [45, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={container} className="h-[80vh] flex items-center justify-center perspective-[1000px]">
      <motion.div 
        style={{ scale, rotateX, opacity }}
        className="relative w-full max-w-4xl h-[500px] rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-red-900"
      >
        <img src={url} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent flex items-end p-12">
          <h2 className="text-[10vw] font-black text-yellow-400 italic tracking-tighter leading-[0.7]">
            {title}
          </h2>
        </div>
      </motion.div>
    </div>
  );
};