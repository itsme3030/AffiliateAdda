import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatsCounter = ({
  value,
  prefix = '',
  suffix = '',
  label,
  decimals = 0,
  duration = 2,
  startColor = 'from-blue-400',
  endColor = 'to-indigo-400',
}) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );
    
    const currentRef = document.getElementById(`stat-${label.replace(/\s+/g, '-')}`);
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [label]);

  useEffect(() => {
    let start = 0;
    const end = value;
    
    // Once in view, we want to increment the count up to the value
    if (isInView) {
      let timer = setInterval(() => {
        // Incremental animation logic
        const progress = Math.min(1, start / (duration * 60));
        const nextCount = Math.floor(end * progress);
        
        // Update count state
        setCount(nextCount);
        start++;
        
        // If we've reached the end value, clear the interval
        if (nextCount >= end) {
          clearInterval(timer);
          setCount(end);
        }
      }, 16.67); // roughly 60fps
      
      return () => clearInterval(timer);
    }
  }, [value, isInView, duration]);

  return (
    <motion.div
      id={`stat-${label.replace(/\s+/g, '-')}`}
      className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl p-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${startColor} ${endColor} bg-clip-text text-transparent`}>
        {prefix}{count.toLocaleString(undefined, { 
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals 
        })}{suffix}
      </div>
      <p className="text-white text-lg">{label}</p>
    </motion.div>
  );
};

export default StatsCounter;
