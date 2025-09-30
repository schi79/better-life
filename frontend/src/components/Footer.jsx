import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Instagram, Twitter, Send, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed successfully!",
        description: "Welcome to the Better Lifestyles community.",
      });
      setEmail('');
    }
  };

  const footerLinks = {
    sitemap: [
      { name: 'Home', href: '/' },
      { name: 'Shop', href: '/shop' },
      { name: 'Supplements', href: '/supplements' },
      { name: 'Fitness Equipment', href: '/fitness' },
      { name: 'Skincare', href: '/skincare' },
      { name: 'Wellness Bundles', href: '/bundles' },
      { name: 'Bulk Orders', href: '/bulk' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Product Guides', href: '/guides' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Return Policy', href: '/returns' },
      { name: 'Terms & Conditions', href: '/terms' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Better Lifestyles</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Save Big On Bulk With Our Wholesale Channel! Join the community of wellness enthusiasts.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <Button variant="outline" size="icon" className="border-gray-700 text-gray-300 hover:bg-emerald-600 hover:border-emerald-600">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-700 text-gray-300 hover:bg-emerald-600 hover:border-emerald-600">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-700 text-gray-300 hover:bg-emerald-600 hover:border-emerald-600">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-sm text-gray-400 mb-2">We Accept</p>
              <div className="flex space-x-2">
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-gray-800">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-gray-800">MC</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-gray-800">AMEX</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-blue-600">PayPal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="font-semibold mb-4">Sitemap</h4>
            <ul className="space-y-2">
              {footerLinks.sitemap.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get special offers, wellness tips, and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-800 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {/* Email */}
            <div className="flex items-center justify-center md:justify-start">
              <Mail className="h-5 w-5 text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-400">EMAIL ID</p>
                <a 
                  href="mailto:betterlifestyles33@gmail.com" 
                  className="text-white hover:text-emerald-400 transition-colors"
                >
                  betterlifestyles33@gmail.com
                </a>
              </div>
            </div>

            {/* General Queries */}
            <div className="flex items-center justify-center md:justify-start">
              <Mail className="h-5 w-5 text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-400">GENERAL QUERIES</p>
                <a 
                  href="mailto:betterlifestyles33@gmail.com" 
                  className="text-white hover:text-emerald-400 transition-colors"
                >
                  betterlifestyles33@gmail.com
                </a>
              </div>
            </div>

            {/* Follow Us */}
            <div className="flex items-center justify-center md:justify-start">
              <div>
                <p className="text-sm text-gray-400 mb-2">FOLLOW US</p>
                <div className="flex space-x-3">
                  <Instagram className="h-5 w-5 text-gray-300 hover:text-emerald-400 cursor-pointer transition-colors" />
                  <Twitter className="h-5 w-5 text-gray-300 hover:text-emerald-400 cursor-pointer transition-colors" />
                  <Send className="h-5 w-5 text-gray-300 hover:text-emerald-400 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              You must be 18 years of age or older to purchase from this website. 
              Products on this site are made with natural ingredients and are not intended to diagnose, treat, cure or prevent any disease. 
              All information presented here is not meant to be a substitute for or alternative to, information from health care practitioners. 
              Please consult your health care professional about potential interactions or other possible complications before using any product.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              Copyright ©2025 Better Lifestyles. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;