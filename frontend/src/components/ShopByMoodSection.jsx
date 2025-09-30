import React from 'react';
import { Button } from './ui/button';
import { products, moods } from '../data/mock';

const ShopByMoodSection = () => {
  const moodProducts = moods.map(mood => ({
    ...mood,
    featuredProduct: products.find(p => mood.products.includes(p.id))
  }));

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Shop By Mood
          </h2>
          <p className="text-lg text-gray-600">
            Find the perfect products to match your wellness goals
          </p>
          
          {/* Mood Tags */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {moods.map((mood) => (
              <button
                key={mood.id}
                className="px-6 py-3 rounded-full border-2 border-gray-200 hover:border-emerald-500 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 font-medium transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  '--mood-color': mood.color,
                  borderColor: mood.color + '40',
                }}
              >
                {mood.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Slider */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {moodProducts.map((mood) => (
              <div
                key={mood.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={mood.featuredProduct?.image}
                    alt={mood.featuredProduct?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Mood Badge */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: mood.color }}
                  >
                    {mood.name}
                  </div>

                  {/* Product Type */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-medium capitalize">
                      {mood.featuredProduct?.type}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {mood.featuredProduct?.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gray-800">
                      ${mood.featuredProduct?.price}
                    </span>
                    {mood.featuredProduct?.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${mood.featuredProduct?.originalPrice}
                      </span>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    style={{
                      backgroundColor: mood.color,
                      borderColor: mood.color,
                    }}
                  >
                    ORDER NOW
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ShopByMoodSection;