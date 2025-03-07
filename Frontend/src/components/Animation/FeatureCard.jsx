import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0, 
  iconColor = "text-indigo-500",
  hoverEffect = true 
}) => {
  return (
    <motion.div
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 
        transition-all duration-300
        ${hoverEffect ? 'hover:shadow-xl hover:-translate-y-1' : ''}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={`${iconColor} mb-4 text-4xl`}>
        <Icon className="w-12 h-12" />
      </div>
      <h3 className="text-xl font-bold mb-3 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
