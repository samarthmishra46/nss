
import {  Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NSS</h3>
            <p className="text-gray-400">
              Not Me But You - National Service Scheme
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white">Events</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-500" />
                <span className="text-gray-400">NSS Office,CSA,MMMUT,Gorakhpur - 273010</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-blue-500" />
                <span className="text-gray-400">+91 732271723</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-blue-500" />
                <span className="text-gray-400">nssmmmutofficial@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/nss-mmmut-gkp/?originalSubdomain=in" className="text-gray-400 hover:text-white">
                <Linkedin size={24} />
              </a>
              <a href="https://x.com/nss_mmmut" className="text-gray-400 hover:text-white">
                <Twitter size={24} />
              </a>
              <a href="https://www.instagram.com/nss_mmmut/" className="text-gray-400 hover:text-white">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} National Service Scheme. All rights reserved.
          </p>
          <p  className="text-gray-400">
          Designed and Handled by <a href="" style={{ textDecoration: "underline", color: "green" }}>Samarth Mishra</a>
          </p>
        </div>
      </div>
    </footer>
  );
}