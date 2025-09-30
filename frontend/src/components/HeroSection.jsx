import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              {/* Limited Time Badge */}
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-medium">LIMITED TIME OFFER 🔥</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                ENGINEERED FOR
                <br />
                <span className="text-emerald-200">ELEVATION.</span>
                <br />
                <span className="text-2xl lg:text-3xl font-normal">
                  THCa That Hits Different.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg lg:text-xl text-emerald-50 mb-8 max-w-md">
                Top-shelf potency, rich flavor, and full compliance—THCa flower and extracts designed for those who demand more.
              </p>

              {/* CTA Button */}
              <Button 
                size="lg" 
                className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 text-lg font-semibold group"
              >
                SHOP NOW
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right Content - Product Hero Image */}
            <div className="relative lg:ml-8">
              <div className="relative">
                {/* Main product image */}
                <div className="relative z-10">
                  <img 
                    src="https://images.pexels.com/photos/6694187/pexels-photo-6694187.jpeg" 
                    alt="Better Lifestyles Products" 
                    className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                  />
                </div>

                {/* Floating product elements */}
                <div className="absolute -top-4 -left-4 z-20">
                  <img 
                    src="https://images.unsplash.com/photo-1625480498292-631335ea1510" 
                    alt="Supplement" 
                    className="w-20 h-20 rounded-xl shadow-lg"
                  />
                </div>
                
                <div className="absolute -bottom-6 -right-6 z-20">
                  <img 
                    src="https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f" 
                    alt="Skincare" 
                    className="w-24 h-24 rounded-xl shadow-lg"
                  />
                </div>

                <div className="absolute top-1/2 -right-8 z-20 hidden lg:block">
                  <img 
                    src="https://images.unsplash.com/photo-1664956618021-73c47736845e" 
                    alt="Wellness" 
                    className="w-16 h-16 rounded-xl shadow-lg"
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-8 right-1/4 w-6 h-6 bg-yellow-400 rounded-full opacity-80"></div>
                <div className="absolute bottom-1/4 -left-6 w-4 h-4 bg-pink-400 rounded-full opacity-60"></div>
                <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-blue-400 rounded-full opacity-70"></div>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl -rotate-3 scale-105"></div>
            </div>
          </div>
        </div>

        {/* Background pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;