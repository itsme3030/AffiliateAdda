import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQAccordion = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 w-full max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <button
            className="flex justify-between items-center w-full p-5 text-left focus:outline-none"
            onClick={() => toggleFAQ(index)}
          >
            <span className="text-lg font-medium dark:text-white">{faq.question}</span>
            <span className="ml-6 flex-shrink-0">
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-5 border-t border-gray-200 dark:border-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default FAQAccordion;
