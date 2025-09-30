import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CategoryPage = ({ cartItems, onAddToCart, onCartClick, onAddToWishlist }) => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState(null);

  // Define category mappings
  const categoryMappings = {
    'high-thca-flowers': {
      name: 'High THCa Flowers',
      description: 'Premium THCa flower strains',
      image: 'https://hmp.store/wp-content/uploads/2025/08/Deep-Spac.png'
    },
    'concentrates': {
      name: 'Concentrates',
      description: 'Live rosin & concentrates',
      image: 'https://hmp.store/wp-content/uploads/2025/07/THCa-Dantes-Driver-Rosin-a-300x300.jpg'
    },
    'bundles': {
      name: 'Bundles',
      description: 'Value packs & deals',
      image: 'https://hmp.store/wp-content/uploads/2025/07/Bubble-Gum-Runtz.png'
    },
    'wholesale': {
      name: 'Wholesale',
      description: 'Bulk pricing available',
      image: 'https://hmp.store/wp-content/uploads/2025/08/mochi-2.png'
    }
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/products/`, {
          params: {
            category: category,
            limit: 100
          }
        });
        setProducts(response.data);
        setCategoryData(categoryMappings[category]);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryProducts();
    }
  }, [category]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
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

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-white">
        <Header cartItems={cartItems} onCartClick={onCartClick} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <Link to="/shop" className="text-emerald-600 hover:text-emerald-700">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
          
          {product.thca_percentage && (
            <Badge className="absolute bottom-3 right-3 bg-purple-600 text-white">
              {product.thca_percentage} THCa
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
            {product.rating} ({product.review_count})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">
              ${product.price}
            </span>
            {product.original_price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.original_price}
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
          <Link to="/shop" className="hover:text-emerald-600">Shop</Link>
          <span>/</span>
          <span className="text-gray-800">{categoryData.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-lg overflow-hidden">
              <img
                src={categoryData.image}
                alt={categoryData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{categoryData.name}</h1>
              <p className="text-gray-600 mb-4">{categoryData.description}</p>
              <p className="text-sm text-gray-500">
                {sortedProducts.length} products available
              </p>
            </div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {categoryData.name} ({sortedProducts.length})
            </h2>
          </div>
          
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {loading ? (
            // Loading skeletons
            Array(8).fill().map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* No products found */}
        {!loading && sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-800 mb-2">No products found in this category</h3>
            <p className="text-gray-600 mb-4">Check back soon for new products</p>
            <Link to="/shop">
              <Button variant="outline">Browse All Products</Button>
            </Link>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;