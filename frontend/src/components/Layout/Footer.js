import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/95 backdrop-blur-md border-t border-green-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
                <span className="text-white font-bold text-sm">YU</span>
              </div>
              <span className="text-xl font-bold text-white">Yuno</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting students, faculty, and staff through amazing campus events. 
              Discover, create, and participate in the vibrant university community.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 hover:border-green-500/30"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 hover:border-green-500/30"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 hover:border-green-500/30"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 hover:border-green-500/30"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/events" 
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link 
                  to="/calendar" 
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Event Calendar
                </Link>
              </li>
              <li>
                <Link 
                  to="/create-event" 
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Create Event
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700">
                  <Mail className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white text-sm">events@university.edu</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700">
                  <Phone className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700">
                  <MapPin className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="text-white text-sm">123 University Ave<br />Campus City, ST 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Yuno Campus Events. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="#" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;