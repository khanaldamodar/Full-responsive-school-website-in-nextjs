'use client';

import React from 'react';
import Heading from '../global/Heading'; // adjust the path if needed
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0949A3] text-white font-poppins pt-10 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* About Section */}
          <div>
            {/* <Heading title="About Us" icon={null} /> */}
            <h1 className="text-xl font-semibold">About Us</h1>
            <p className="text-sm mt-4 leading-relaxed">
              We are dedicated to providing quality education that fosters academic excellence, creativity, and innovation. Join us in shaping the future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            {/* <Heading title="Quick Links" icon={null} /> */}
            <h1 className="text-xl font-semibold">Quick Links</h1>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Courses</a></li>
              <li><a href="#" className="hover:underline">Admissions</a></li>
              <li><a href="#" className="hover:underline">Gallery</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h1 className="text-xl font-semibold">Contact Info</h1>
            <ul className="mt-4 text-sm space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} />
                <span>+977-1234567890</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} />
                <span>info@school.edu.np</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Subscribe */}
          <div>
            {/* <Heading title="Subscribe" icon={null} /> */}
            <h1 className="text-xl font-semibold">Subscribe</h1>
            <p className="text-sm mt-4 mb-3">Get updates on our latest news and programs.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded text-white text-sm"
            />
            <button className="mt-3 w-full bg-white text-[#0949A3] font-semibold py-2 rounded hover:bg-gray-200 transition cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center text-sm border-t border-white/30 pt-4">
          &copy; {new Date().getFullYear()} Your School Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
