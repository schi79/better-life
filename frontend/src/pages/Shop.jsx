import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, Star, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { products, categories } from '../data/mock';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Shop = ({ cartItems, onAddToCart, onCartClick, onAddToWishlist }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Filter logic
  React.useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(product => product.type.toLowerCase() === selectedType.toLowerCase());
    }

    // Price filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.id - a.id;
        default: // featured
          return b.featured ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedType, priceRange, sortBy]);

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden border border-gray-100">
      <Link to={`/product/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          {product.originalPrice && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
          
          <Badge className="absolute bottom-3 left-3 bg-emerald-100 text-emerald-700 capitalize">
            {product.type}
          </Badge>
          
          {product.thca && (
            <Badge className="absolute bottom-3 right-3 bg-purple-600 text-white">
              {product.thca} THCa
            </Badge>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              onAddToWishlist(product);
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
        </Link>

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
          onClick={() => onAddToCart(product, product.variants[0])}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItems={cartItems} onCartClick={onCartClick} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-emerald-600">Home</Link>
          <span>/</span>
          <span className="text-gray-800">Shop</span>
        </nav>

        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop THCa Products</h1>
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex border rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedType('all');
                    setPriceRange('all');
                  }}
                >
                  Clear All
                </Button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Category</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <Checkbox
                      checked={selectedCategory === 'all'}
                      onCheckedChange={() => setSelectedCategory('all')}
                    />
                    <span className="ml-2 text-sm">All Products</span>
                  </label>
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center">
                      <Checkbox
                        checked={selectedCategory === category.slug}
                        onCheckedChange={() => setSelectedCategory(category.slug)}
                      />
                      <span className="ml-2 text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Type</h4>
                <div className="space-y-2">
                  {['All', 'Indica', 'Sativa', 'Hybrid', 'Rosin'].map(type => (
                    <label key={type} className="flex items-center">
                      <Checkbox
                        checked={selectedType === type.toLowerCase()}
                        onCheckedChange={() => setSelectedType(type.toLowerCase())}
                      />
                      <span className="ml-2 text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Prices' },
                    { value: '0-25', label: 'Under $25' },
                    { value: '25-50', label: '$25 - $50' },
                    { value: '50-100', label: '$50 - $100' },
                    { value: '100', label: 'Over $100' }
                  ].map(range => (
                    <label key={range.value} className="flex items-center">
                      <Checkbox
                        checked={priceRange === range.value}
                        onCheckedChange={() => setPriceRange(range.value)}
                      />
                      <span className="ml-2 text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            } gap-6`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* No products found */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters</p>
                <Button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedType('all');
                    setPriceRange('all');
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;