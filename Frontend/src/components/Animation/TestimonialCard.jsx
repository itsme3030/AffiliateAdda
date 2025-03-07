import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial, delay = 0 }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {/* Star rating */}
      <div className="flex mb-4">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <svg 
            key={i}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 text-yellow-400 fill-yellow-400"
          >
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-gray-700 dark:text-gray-200 text-lg mb-6 italic">
        "{testimonial.quote}"
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-bold text-gray-900 dark:text-white">
              {testimonial.name}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {testimonial.role}
            </p>
          </div>
        </div>
        
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-sm font-medium px-3 py-1 rounded-full">
          {testimonial.revenue}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
