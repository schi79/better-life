import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const CategoryCards = () => {
  const categories = [
    {
      name: 'Flowers',
      image: 'https://hmp.store/wp-content/uploads/2025/08/Deep-Spac.png',
      description: 'Premium THCa flower strains',
      color: 'from-green-50 to-green-100'
    },
    {
      name: 'Extracts',
      image: 'https://hmp.store/wp-content/uploads/2025/07/THCa-Dantes-Driver-Rosin-a-300x300.jpg',
      description: 'Live rosin & concentrates',
      color: 'from-yellow-50 to-yellow-100'
    },
    {
      name: 'Bundles',
      image: 'https://hmp.store/wp-content/uploads/2025/07/Bubble-Gum-Runtz.png',
      description: 'Value packs & deals',
      color: 'from-purple-50 to-purple-100'
    },
    {
      name: 'Wholesale',
      image: 'https://hmp.store/wp-content/uploads/2025/08/mochi-2.png',
      description: 'Bulk pricing available',
      color: 'from-blue-50 to-blue-100'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer bg-gradient-to-br ${category.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              {/* Background Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-200 transition-colors">
                  {category.name}
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  {category.description}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="self-start bg-white/90 hover:bg-white text-gray-800 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300"
                >
                  SHOP NOW
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;