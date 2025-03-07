import React from 'react';
import { motion } from 'framer-motion';

const PartnersLogos = () => {
  // Mock logo URLs - replace with actual partner logos
  const logos = [
    {
      name: "Acme Inc",
      grayscale: "https://via.placeholder.com/120x60?text=ACME",
      color: "https://via.placeholder.com/120x60?text=ACME"
    },
    {
      name: "TechCorp",
      grayscale: "https://via.placeholder.com/120x60?text=TechCorp",
      color: "https://via.placeholder.com/120x60?text=TechCorp"
    },
    {
      name: "Global Enterprises",
      grayscale: "https://via.placeholder.com/120x60?text=Global",
      color: "https://via.placeholder.com/120x60?text=Global"
    },
    {
      name: "InnovateTech",
      grayscale: "https://via.placeholder.com/120x60?text=Innovate",
      color: "https://via.placeholder.com/120x60?text=Innovate"
    },
    {
      name: "FutureBrand",
      grayscale: "https://via.placeholder.com/120x60?text=Future",
      color: "https://via.placeholder.com/120x60?text=Future"
    },
    {
      name: "DigitalSolutions",
      grayscale: "https://via.placeholder.com/120x60?text=Digital",
      color: "https://via.placeholder.com/120x60?text=Digital"
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex flex-wrap justify-center gap-8 md:gap-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {logos.map((logo, index) => (
          <div 
            key={index}
            className="relative group transition-all duration-300"
          >
            <img
              src={logo.grayscale}
              alt={logo.name}
              className="h-12 object-contain opacity-70 group-hover:opacity-0 transition-opacity duration-300"
            />
            <img
              src={logo.color}
              alt={logo.name}
              className="h-12 object-contain absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PartnersLogos;
