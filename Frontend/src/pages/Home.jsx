import React from 'react';
import { FaHandshake, FaLink, FaDollarSign, FaStar, FaChartLine, FaUsers, FaMobileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="
          relative overflow-hidden
          bg-gradient-to-r from-indigo-600 to-purple-600
          dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900
          text-white text-center py-20
          transition-colors duration-700
        "
      >
        {/* Subtle floating shapes (optional) */}
        <div className="
          absolute inset-0
          pointer-events-none
          opacity-40
          mix-blend-overlay
          bg-[radial-gradient(ellipse_at_top_left,_transparent_0%,_rgba(255,255,255,0.2)_50%,_transparent_80%),_radial-gradient(ellipse_at_bottom_right,_transparent_0%,_rgba(255,255,255,0.2)_50%,_transparent_80%)]
          dark:bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.05)_0%,_transparent_50%),_radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.05)_0%,_transparent_50%)]
        "></div>

        <h1 className="
          relative z-10
          text-5xl font-extrabold mb-4 drop-shadow-lg
          animate-pulse
        ">
          Unlock Passive Income with Top-Tier Products
        </h1>
        <p className="relative z-10 text-xl mb-6">
          Join our Affiliate Program and earn commissions by promoting products you love.
        </p>
        <Link
          to="/affiliate"
          className="
            relative z-10
            bg-yellow-400 text-gray-900 py-3 px-8 rounded-full text-xl font-semibold
            hover:bg-yellow-500 transition duration-300
            shadow-lg hover:shadow-2xl
            hover:-translate-y-1 transform
          "
        >
          Get Started
        </Link>
      </section>

      {/* How It Works */}
      <section className="
        py-16
        bg-gray-50
        dark:bg-[radial-gradient(circle,_rgba(31,41,55,1)_0%,_rgba(17,24,39,1)_100%)]
        transition-colors duration-700
      ">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
          How It Works
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
          {/* Card 1: Register */}
          <div className="
            bg-white dark:bg-gray-700 p-8 rounded-lg shadow-xl
            text-center transform transition-all duration-300 hover:scale-105
            dark:text-gray-100
            hover:shadow-2xl dark:hover:shadow-cyan-700
          ">
            <FaUsers className="text-6xl text-indigo-600 dark:text-indigo-300 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Register</h3>
            <p>Create your affiliate account in minutes and gain access to our dashboard.</p>
          </div>

          {/* Card 2: Promote */}
          <div className="
            bg-white dark:bg-gray-700 p-8 rounded-lg shadow-xl
            text-center transform transition-all duration-300 hover:scale-105
            dark:text-gray-100
            hover:shadow-2xl dark:hover:shadow-cyan-700
          ">
            <FaLink className="text-6xl text-green-600 dark:text-green-300 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Promote</h3>
            <p>Share your unique links across blogs, social media, or your website.</p>
          </div>

          {/* Card 3: Earn */}
          <div className="
            bg-white dark:bg-gray-700 p-8 rounded-lg shadow-xl
            text-center transform transition-all duration-300 hover:scale-105
            dark:text-gray-100
            hover:shadow-2xl dark:hover:shadow-cyan-700
          ">
            <FaDollarSign className="text-6xl text-yellow-500 dark:text-yellow-300 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Earn</h3>
            <p>Receive commissions for every sale made through your referrals.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="
        py-16 bg-white dark:bg-gray-700
        transition-colors duration-700
      ">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
          Why Partner with Us?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="
            bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-xl
            text-center dark:text-white
            hover:shadow-2xl dark:hover:shadow-cyan-700
            transition-transform duration-300 transform hover:-translate-y-1
          ">
            <FaChartLine className="text-6xl text-blue-600 dark:text-blue-300 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Competitive Commissions</h3>
            <p>Benefit from industry-leading commission rates that maximize your earnings.</p>
          </div>
          <div className="
            bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-xl
            text-center dark:text-white
            hover:shadow-2xl dark:hover:shadow-cyan-700
            transition-transform duration-300 transform hover:-translate-y-1
          ">
            <FaMobileAlt className="text-6xl text-purple-600 dark:text-purple-300 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Real-Time Tracking</h3>
            <p>Monitor your performance with our state-of-the-art tracking tools.</p>
          </div>
          <div className="
            bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-xl
            text-center dark:text-white
            hover:shadow-2xl dark:hover:shadow-cyan-700
            transition-transform duration-300 transform hover:-translate-y-1
          ">
            <FaStar className="text-6xl text-yellow-500 dark:text-yellow-300 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Exclusive Products</h3>
            <p>Promote a curated selection of high-quality products that resonate with your audience.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="
        py-16 bg-gray-50 dark:bg-gray-800
        transition-colors duration-700
      ">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
          What Our Affiliates Say
        </h2>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 px-6">
          <div className="
            bg-white dark:bg-gray-700 p-8 rounded-lg shadow-xl w-80
            dark:text-gray-100
            hover:shadow-2xl dark:hover:shadow-cyan-700
            transition-transform duration-300 transform hover:-translate-y-1
          ">
            <p className="text-xl mb-4">
              "This program has transformed my blogging income. The support and products are top-notch!"
            </p>
            <p className="font-semibold">Alex Johnson</p>
            <p className="text-gray-500 dark:text-gray-300">Professional Blogger</p>
          </div>
          <div className="
            bg-white dark:bg-gray-700 p-8 rounded-lg shadow-xl w-80
            dark:text-gray-100
            hover:shadow-2xl dark:hover:shadow-cyan-700
            transition-transform duration-300 transform hover:-translate-y-1
          ">
            <p className="text-xl mb-4">
              "The real-time tracking tools have made it easy to optimize my strategies and boost earnings."
            </p>
            <p className="font-semibold">Samantha Lee</p>
            <p className="text-gray-500 dark:text-gray-300">Digital Marketer</p>
          </div>
          <div className="
            bg-white dark:bg-gray-700 p-8 rounded-lg shadow-xl w-80
            dark:text-gray-100
            hover:shadow-2xl dark:hover:shadow-cyan-700
            transition-transform duration-300 transform hover:-translate-y-1
          ">
            <p className="text-xl mb-4">
              "Partnering with this program was the best decision for my online business."
            </p>
            <p className="font-semibold">Michael Chen</p>
            <p className="text-gray-500 dark:text-gray-300">E-commerce Entrepreneur</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="
        bg-indigo-600 dark:bg-indigo-800
        text-white py-20 text-center
        transition-colors duration-700
      ">
        <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
          Start Your Affiliate Journey Today!
        </h2>
        <p className="text-xl mb-8">
          Join now and turn your influence into income by promoting products you believe in.
        </p>
        <Link
          to="/affiliate"
          className="
            bg-yellow-400 text-gray-900 py-3 px-8 rounded-full
            text-xl font-semibold hover:bg-yellow-500
            transition duration-300 shadow-lg hover:shadow-2xl
            hover:-translate-y-1 transform
          "
        >
          Join Now
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
