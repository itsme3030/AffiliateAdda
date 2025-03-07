import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FaRocket,
  FaChartLine,
  FaLaptopCode,
  FaMoneyBillWave,
  FaGlobe,
  FaUserShield,
  FaRegLightbulb,
  FaTools,
  FaHeadset,
  FaShieldAlt
} from 'react-icons/fa';

// Import components
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroVideo from '../components/Animation/HeroVideo';
import GlobeAnimation from '../components/Animation/GlobeAnimation';
import ParticleBackground from '../components/Animation/ParticleBackground';
import StatsCounter from '../components/Animation/StatsCounter';
import TestimonialCard from '../components/Animation/TestimonialCard';
import FeatureCard from '../components/Animation/FeatureCard';
import PartnersLogos from '../components/Animation/PartnersLogos';
import FAQAccordion from '../components/Animation/FAQAccordion';

const Home = () => {
  const [videoVisible, setVideoVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  // Mock testimonial data
  const testimonials = [
    {
      id: 1,
      quote: "Since joining AffiliateAdda, my monthly passive income has tripled. The tools and support they provide are exceptional!",
      name: "Alex Johnson",
      role: "Professional Blogger",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5,
      revenue: "+$8.5K/mo"
    },
    {
      id: 2,
      quote: "Their dashboard makes tracking conversions so easy. I've been able to optimize my strategy and increase my ROI significantly.",
      name: "Sarah Williams",
      role: "Digital Marketer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5,
      revenue: "+$12K/mo"
    },
    {
      id: 3,
      quote: "The quality of products on this platform is outstanding. My audience trusts my recommendations, which has led to higher conversion rates.",
      name: "Michael Chen",
      role: "E-commerce Entrepreneur",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      stars: 4,
      revenue: "+$15K/mo"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How do I get started with AffiliateAdda?",
      answer: "Getting started is simple! Click on the 'Join Now' button, complete the registration form, and you'll gain immediate access to your affiliate dashboard. From there, you can browse available products, get your unique affiliate links, and start promoting."
    },
    {
      question: "When and how do I get paid?",
      answer: "We process payments on a monthly basis. Once your earnings reach the minimum threshold of $50, you can request a payout. We offer multiple payment methods including PayPal, direct bank transfer, and cryptocurrency options."
    },
    {
      question: "What commission rates can I expect?",
      answer: "Our commission rates are among the highest in the industry, ranging from 10% to 50% depending on the product category. High-ticket items typically offer lower percentage rates but higher dollar amounts. As you generate more sales, you can qualify for our tiered commission structure with increased rates."
    },
    {
      question: "Do you provide marketing materials?",
      answer: "Absolutely! We provide a comprehensive resource library with banner ads, email templates, social media posts, and product images. Our content team regularly updates these materials to ensure you have fresh, high-converting assets for your marketing campaigns."
    },
    {
      question: "How long do cookies last?",
      answer: "Our standard cookie duration is 30 days, but premium affiliates can qualify for extended 60-day or even 90-day cookies. This means you'll earn commissions on any purchase your referred customer makes within that timeframe, even if they don't buy immediately."
    }
  ];

  useEffect(() => {
    // Set video visible after component mounts
    setTimeout(() => {
      setVideoVisible(true);
    }, 300);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-700 bg-white dark:bg-gray-900">
      {/* Header */}
   

      {/* =================================
          HERO SECTION
      ================================== */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Video Background */}
        <HeroVideo isVisible={videoVisible} />

        {/* Hero Content */}
        <motion.div 
          className="relative z-20 container mx-auto px-6 text-center text-white"
          style={{ opacity, scale }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Amplify Your Earnings
            </span>
            <br /> 
            with Powerful Affiliate Marketing
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Join thousands of successful marketers already leveraging our premium products and industry-leading commissions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="/affiliate"
              className="
                bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700
                text-white font-bold py-3 px-8 rounded-full
                transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50
                text-lg
              "
            >
              Join Our Network
            </Link>
            <Link
              to="/products"
              className="
                bg-white/10 backdrop-blur-md hover:bg-white/20
                text-white font-bold py-3 px-8 rounded-full
                border border-white/30 hover:border-white/50
                transform transition-all duration-300 hover:scale-105
                text-lg
              "
            >
              Explore Products
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="w-8 h-12 rounded-full border-2 border-white/40 flex justify-center">
              <motion.div 
                className="w-2 h-2 bg-white rounded-full mt-2"
                animate={{ 
                  y: [0, 16, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* =================================
          STATS SECTION
      ================================== */}
      <section className="relative py-20 bg-gradient-to-b from-black to-blue-900 text-white overflow-hidden">
        {/* Particle Background */}
        <ParticleBackground />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-cyan-400">Global Impact</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCounter 
              value={15000} 
              label="Active Affiliates" 
              startColor="from-cyan-400" 
              endColor="to-blue-500"
            />
            <StatsCounter 
              value={1200} 
              label="Products Available" 
              suffix="+" 
              startColor="from-blue-400" 
              endColor="to-indigo-500"
            />
            <StatsCounter 
              value={8.5} 
              prefix="$" 
              suffix="M" 
              label="Commissions Paid" 
              startColor="from-indigo-400" 
              endColor="to-purple-500"
            />
            <StatsCounter 
              value={98} 
              suffix="%" 
              label="Satisfaction Rate" 
              startColor="from-purple-400" 
              endColor="to-pink-500"
            />
          </div>
        </div>
      </section>

      {/* =================================
          FEATURES SECTION
      ================================== */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Why Choose <span className="text-cyan-600 dark:text-cyan-400">AffiliateAdda</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide everything you need to succeed in affiliate marketing, from high-converting products to cutting-edge tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={FaMoneyBillWave}
              title="Industry-Leading Commissions"
              description="Earn up to 50% commission on sales, with tiered structures that reward performance."
              iconColor="text-green-500 dark:text-green-400"
              delay={0.1}
            />
            <FeatureCard
              icon={FaChartLine}
              title="Real-Time Analytics"
              description="Track clicks, conversions, and earnings with our powerful dashboard."
              iconColor="text-blue-500 dark:text-blue-400"
              delay={0.2}
            />
            <FeatureCard
              icon={FaLaptopCode}
              title="Marketing Resources"
              description="Access ready-made banners, emails, and landing pages to boost your campaigns."
              iconColor="text-purple-500 dark:text-purple-400"
              delay={0.3}
            />
            <FeatureCard
              icon={FaRocket}
              title="Fast Payments"
              description="Get paid reliably every month with multiple payment options to choose from."
              iconColor="text-orange-500 dark:text-orange-400"
              delay={0.4}
            />
            <FeatureCard
              icon={FaHeadset}
              title="Dedicated Support"
              description="Our experienced affiliate managers are ready to help you optimize your strategy."
              iconColor="text-red-500 dark:text-red-400"
              delay={0.5}
            />
            <FeatureCard
              icon={FaRegLightbulb}
              title="Educational Resources"
              description="Access exclusive webinars, guides, and training to take your skills to the next level."
              iconColor="text-yellow-500 dark:text-yellow-400"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* =================================
          GLOBAL REACH SECTION 
      ================================== */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-blue-900 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Global <span className="text-cyan-400">Reach</span>, Local Impact
              </h2>
              <p className="text-lg mb-8">
                Join our worldwide network of successful affiliates. Our platform is used by marketers in over 150 countries, helping them connect with customers around the globe.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Access to international markets with localized products",
                  "Multi-currency support for diverse audience targeting",
                  "Region-specific promotional materials and strategies",
                  "24/7 global support team"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <svg className="w-6 h-6 text-cyan-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link
                to="/affiliate"
                className="
                  inline-flex items-center bg-white text-blue-900 hover:bg-blue-50
                  font-bold py-3 px-6 rounded-full transition-all duration-300
                  transform hover:scale-105 hover:shadow-lg
                "
              >
                Explore Our Network
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
            
            <motion.div
              className="relative w-full h-[400px] lg:h-[600px] rounded-xl overflow-hidden border-4 border-white/20"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlobeAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================================
          TESTIMONIALS SECTION
      ================================== */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Success <span className="text-cyan-600 dark:text-cyan-400">Stories</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from affiliates who have transformed their marketing efforts with our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

     

      {/* =================================
          HOW IT WORKS SECTION
      ================================== */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="text-yellow-300">Works</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              Getting started with AffiliateAdda is easy. Follow these simple steps to begin your journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: <FaUserShield className="w-16 h-16" />,
                title: "Sign Up",
                description: "Create your free account in minutes and get instant access to our affiliate dashboard."
              },
              {
                icon: <FaGlobe className="w-16 h-16" />,
                title: "Promote",
                description: "Choose from our catalog of high-converting products and share your unique affiliate links."
              },
              {
                icon: <FaMoneyBillWave className="w-16 h-16" />,
                title: "Earn",
                description: "Earn commissions on every sale generated through your links and get paid monthly."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="inline-flex items-center justify-center p-4 bg-white/15 rounded-full mb-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================
          FAQ SECTION
      ================================== */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Frequently Asked <span className="text-cyan-600 dark:text-cyan-400">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about our affiliate program.
            </p>
          </motion.div>

          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* =================================
          CALL TO ACTION
      ================================== */}
      <section className="py-20 bg-gradient-to-br from-purple-700 to-indigo-900 text-white overflow-hidden relative">
        {/* Particles for visual effect */}
        <ParticleBackground />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-cyan-300">Transform</span> Your Affiliate Business?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of successful marketers who are already leveraging our platform to increase their earnings.
            </p>
            <Link
              to="/affiliate"
              className="
                inline-flex items-center bg-white text-indigo-900 hover:bg-indigo-50
                font-bold py-4 px-8 rounded-full text-xl
                transform transition-all duration-300 hover:scale-105 hover:shadow-xl
              "
            >
              Start Earning Today
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
