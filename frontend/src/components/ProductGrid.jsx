import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Plus, Heart } from 'lucide-react';
import { products } from '../data/mock';

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden border border-gray-100">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white">
            {discount}% OFF
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
          onClick={() => onAddToWishlist(product)}
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Type Badge */}
        <Badge 
          variant="secondary" 
          className="absolute bottom-3 left-3 bg-emerald-100 text-emerald-700 capitalize"
        >
          {product.type}
        </Badge>
        
        {/* THCa Percentage Badge */}
        {product.thca && (
          <Badge 
            className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-700 text-white"
          >
            {product.thca} THCa
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>

        {/* Variant Selection */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.variants.map((variant) => (
            <button
              key={variant}
              onClick={() => setSelectedVariant(variant)}
              className={`px-2 py-1 text-xs rounded border transition-colors ${
                selectedVariant === variant
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {variant}
            </button>
          ))}
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.benefits.slice(0, 2).map((benefit, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
            >
              {benefit}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => onAddToCart(product, selectedVariant)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white group-hover:bg-emerald-700 transition-colors"
          disabled={!product.inStock}
        >
          <Plus className="h-4 w-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};

const ProductGrid = ({ 
  title = "Explore Our Premium Products",
  subtitle = "Discover our curated selection of wellness essentials",
  showAll = false,
  limit = 8,
  onAddToCart = () => {},
  onAddToWishlist = () => {}
}) => {
  const displayProducts = showAll ? products : products.slice(0, limit);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          {/* Quality Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span className="text-sm font-medium">Fast Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span className="text-sm font-medium">Lab-Tested</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span className="text-sm font-medium">Same Day Shipping</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
            />
          ))}
        </div>

        {/* Load More Button */}
        {!showAll && products.length > limit && (
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              Shop Now
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;