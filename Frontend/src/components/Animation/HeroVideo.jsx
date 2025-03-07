import React from 'react';
import { motion } from 'framer-motion';

const HeroVideo = ({ isVisible }) => {
  return (
    <>
      {/* Dark overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/70 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
      />

      {/* Video background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`object-cover w-full h-full scale-105 transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            filter: 'brightness(0.6)', 
          }}
        >
          <source 
            src="https://cdn.coverr.co/videos/coverr-a-person-coding-on-computer-5856/1080p.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Radial gradient overlay for extra depth */}
      <div 
        className="absolute inset-0 z-10 opacity-70 bg-gradient-radial from-transparent via-black/40 to-black/70"
      />
    </>
  );
};

export default HeroVideo;
