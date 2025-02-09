import React from 'react';
import { FaHandshake, FaLink, FaDollarSign, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Earn Money by Sharing Great Products!</h1>
        <p className="text-xl mb-6">Join our Affiliate Marketing Program today and start earning commissions on every sale you refer.</p>
        <Link to="/affiliate" className="bg-yellow-500 text-black py-2 px-6 rounded-full text-xl font-semibold hover:bg-yellow-600">
          Get Started
        </Link>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
          {/* Card 1: Share Your Link */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition      duration-300 ease-in-out hover:scale-105">
            <FaLink className="text-6xl text-blue-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Share Your Link</h3>
            <p>Share your unique affiliate link on social media, blogs, or websites.</p>
          </div>

          {/* Card 2: Engage with Users */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition      duration-300 ease-in-out hover:scale-105">
            <FaHandshake className="text-6xl text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Engage with Users</h3>
            <p>Get your audience excited about the products and drive traffic to your affiliate       link.</p>
          </div>

          {/* Card 3: Earn Commissions */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition      duration-300 ease-in-out hover:scale-105">
            <FaDollarSign className="text-6xl text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Earn Commissions</h3>
            <p>Earn money when someone clicks on your link and makes a purchase.</p>
          </div>
        </div>
      </section>



      {/* Benefits Section */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12">Why Join Our Affiliate Program?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <FaDollarSign className="text-6xl text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">High Commissions</h3>
            <p>Earn up to 50% in commission on every sale generated from your affiliate link.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <FaHandshake className="text-6xl text-blue-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Reliable Support</h3>
            <p>Our dedicated affiliate support team will help you every step of the way.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <FaStar className="text-6xl text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Top-tier Products</h3>
            <p>Promote high-quality products that your audience will love and trust.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Affiliates Are Saying</h2>
        <div className="flex flex-wrap justify-center space-x-6">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <p className="text-xl mb-4">"Joining this affiliate program has been a game-changer. I've made more money than I ever expected!"</p>
            <p className="font-semibold">Yash Sojitra</p>
            <p className="text-gray-500">Influencer</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <p className="text-xl mb-4">"The support team is amazing, and the commissions are very generous. Highly recommend!"</p>
            <p className="font-semibold">Harshil</p>
            <p className="text-gray-500">Affiliate Marketer</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <p className="text-xl mb-4">"I love promoting products that my followers genuinely love. It’s a win-win!"</p>
            <p className="font-semibold">Utsav</p>
            <p className="text-gray-500">Blogger</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-500 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Earning?</h2>
        <p className="text-xl mb-8">Join our affiliate marketing program and start earning passive income by sharing great products today!</p>
        <Link to="/affiliate" className="bg-yellow-500 text-black py-3 px-8 rounded-full text-xl font-semibold hover:bg-yellow-600">
          Join Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Pay Per Go. All rights reserved.</p>
          <p>Follow us on social media: 
            <a href="#" className="text-blue-400 ml-2">Facebook</a> | 
            <a href="#" className="text-blue-400 ml-2">Instagram</a> | 
            <a href="#" className="text-blue-400 ml-2">Twitter</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
