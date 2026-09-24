import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
    id: 1,
    video: '/Home/Taj_Mahal.mp4',
    heading: 'WONDERS OF INDIA',
    animationType: 'slideUp'
  },
  {
    id: 2,
    video: '/Home/Europe.mp4',
    heading: 'DISCOVER EUROPE',
    animationType: 'blurScale'
  },
  {
    id: 3,
    video: '/Home/Indonesia.mp4',
    heading: 'EXPLORE INDONESIA',
    animationType: 'slideRight'
  }
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000); // Wait 7 seconds before showing the next video
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 2.0, // Delay the text so the video plays first
        staggerChildren: 0.3,
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const getWordVariants = (type) => {
    switch(type) {
      case 'slideUp':
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
        };
      case 'blurScale':
        return {
          hidden: { filter: 'blur(10px)', scale: 0.8, opacity: 0 },
          visible: { filter: 'blur(0px)', scale: 1, opacity: 1, transition: { duration: 1, ease: 'easeOut' } }
        };
      case 'slideRight':
        return {
          hidden: { x: 50, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  return (
    <div className="pt-[4.5rem] md:pt-[5.5rem] pb-8 px-2 md:px-4 lg:px-6 max-w-[1440px] mx-auto">
      <section className="relative w-full h-[65vh] md:h-[85vh] overflow-hidden bg-ink rounded-2xl md:rounded-3xl shadow-2xl">
        
        {/* Render all videos simultaneously and just transition opacity to prevent black screen */}
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: index === 0 ? 1 : 0 }}
            animate={{ opacity: current === index ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: current === index ? 10 : 0 }}
          >
            <video
              src={slide.video}
              autoPlay
              loop
              muted
              playsInline
              onCanPlay={(e) => { e.target.playbackRate = 1.5; }}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        <div className="absolute inset-0 bg-black/40 z-20" />
        
        <div className="absolute inset-0 flex items-center justify-center pt-20 z-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="flex flex-wrap justify-center gap-4 px-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {slides[current].heading.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  variants={getWordVariants(slides[current].animationType)}
                  className="text-white text-5xl md:text-7xl lg:text-9xl font-bold text-center drop-shadow-2xl inline-block"
                  style={{
                    WebkitTextStroke: '1px rgba(255,255,255,0.6)',
                    color: 'transparent',
                    background: 'linear-gradient(to bottom, #ffffff 40%, rgba(255,255,255,0.1) 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text'
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
