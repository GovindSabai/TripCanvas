import React from 'react';
import { Award, Briefcase, Settings, FileText, Globe, HeadphonesIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhyChooseUs() {
  const features = [
    {
      icon: <Briefcase size={28} className="text-[#eab308]" />,
      title: "21+ Years of Experience",
      description: "Delivering memorable travel experiences with industry expertise and trusted services since years."
    },
    {
      icon: <Award size={28} className="text-[#eab308]" />,
      title: "Government Approved",
      description: "Recognized by the Ministry of Tourism, Government of India for reliable travel services."
    },
    {
      icon: <Settings size={28} className="text-[#eab308]" />,
      title: "Customized Tour Packages",
      description: "Personalized domestic and international travel packages designed for every traveler."
    },
    {
      icon: <FileText size={28} className="text-[#eab308]" />,
      title: "Visa Assistance",
      description: "Complete visa documentation and guidance for hassle-free international travel."
    },
    {
      icon: <Globe size={28} className="text-[#eab308]" />,
      title: "Global Travel Network",
      description: "Strong partnerships with hotels and travel partners across India and worldwide."
    },
    {
      icon: <HeadphonesIcon size={28} className="text-[#eab308]" />,
      title: "Reach us for 24/7",
      description: (
        <>
          Support via email at <a href="mailto:info@tripcanvas.com" className="text-[#eab308] hover:underline">info@tripcanvas.com</a> or by phone at <a href="https://wa.me/18000000000" target="_blank" rel="noopener noreferrer" className="text-[#eab308] hover:underline">+1 800 TRIPCANVAS</a>. We're here to assist you.
        </>
      )
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-20 bg-white max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 text-center">
      <h2 className="text-3xl md:text-4xl font-serif text-[#1e293b] mb-4 italic">Why Choose Us</h2>
      <p className="text-[#eab308] text-sm md:text-base font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
        Trusted travel experts offering customized domestic & international tours with 24/7 support, visa assistance, and unforgettable travel experiences.
      </p>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
      >
        {features.map((feature, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            className="group bg-gray-50 border border-gray-100 rounded-lg p-6 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center bg-white transform group-hover:rotate-6 transition-transform duration-500 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-800">{feature.title}</h3>
            </div>
            <div className="text-gray-500 text-sm leading-relaxed">{feature.description}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
