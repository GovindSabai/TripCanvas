import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export function CinematicCTA() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: custom * 0.15 
      }
    })
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-ink"
    >
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop')` 
          }}
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/60" />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 max-w-[1000px] mx-auto text-ivory">
        <motion.div
          custom={1}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-6 tracking-[0.2em] text-sm font-bold uppercase text-bronzeLight"
        >
          Begin Your Story
        </motion.div>
        
        <motion.h2 
          custom={2}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-h1 font-serif font-bold leading-[1.1] mb-6"
        >
          The World Is Waiting.<br className="hidden md:block" /> Where Will You Go Next?
        </motion.h2>
        
        <motion.p 
          custom={3}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-lg md:text-xl text-ivory/80 max-w-[600px] mb-12 font-light"
        >
          Your next journey is closer than you think. Let us help you craft an itinerary that turns a vacation into an experience of a lifetime.
        </motion.p>
        
        <motion.div 
          custom={4}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <Link 
            to="/plan"
            className="px-8 py-4 bg-ivory text-ink rounded-full font-medium hover:bg-sand transition-colors duration-300"
          >
            Start Planning
          </Link>
          <Link 
            to="/destinations"
            className="px-8 py-4 bg-transparent border border-ivory/30 text-ivory rounded-full font-medium hover:bg-ivory/10 transition-colors duration-300"
          >
            Explore Destinations
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
