import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, Share2, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { products } from '../data/mock';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetail = ({ cartItems, onAddToCart, onCartClick }) => {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header cartItems={cartItems} onCartClick={onCartClick} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-emerald-600 hover:text-emerald-700">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Mock additional product images
  const productImages = [
    product.image,
    product.image, // In real app, these would be different angles
    product.image
  ];

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Header cartItems={cartItems} onCartClick={onCartClick} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-emerald-600">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-emerald-600">Shop</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-emerald-600 capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-emerald-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-emerald-100 text-emerald-700 capitalize">
                  {product.type}
                </Badge>
                {product.thca && (
                  <Badge className="bg-purple-600 text-white">
                    {product.thca} THCa
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="bg-red-500 text-white">
                    {discount}% OFF
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <button className="flex items-center text-emerald-600 hover:text-emerald-700">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-800">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Effects:</h3>
              <div className="flex flex-wrap gap-2">
                {product.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Size:</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3 py-2 sm:px-4 border rounded-lg transition-colors text-sm ${
                      selectedVariant === variant
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-300 hover:border-emerald-300'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Quantity:</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-lg font-medium"
                >
                  -
                </button>
                <span className="font-medium w-12 text-center text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-lg font-medium"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    onAddToCart(product, selectedVariant);
                  }
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-base sm:text-lg font-semibold"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? `Add to Cart - $${(product.price * quantity).toFixed(2)}` : 'Out of Stock'}
              </Button>
              
              <Button variant="outline" className="w-full py-4 text-base">
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {/* COA Link */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-emerald-600 mr-2" />
                <div>
                  <h4 className="font-semibold text-gray-800">Lab Tested</h4>
                  <Link 
                    to={`/product-coa/${product.slug}`}
                    className="text-emerald-600 hover:text-emerald-700 text-sm"
                  >
                    View Certificate of Analysis (COA)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">{product.description}</p>
                <h3 className="text-lg font-semibold mb-2">Product Details:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Type: {product.type}</li>
                  {product.thca && <li>THCa Content: {product.thca}</li>}
                  <li>Effects: {product.benefits.join(', ')}</li>
                  <li>Available Sizes: {product.variants.join(', ')}</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xl font-semibold">{product.rating} out of 5</span>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>
                
                {/* Mock reviews */}
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="font-medium">John D.</span>
                      <span className="text-gray-500 text-sm">Verified Purchase</span>
                    </div>
                    <p className="text-gray-600">
                      Amazing quality! This strain exceeded my expectations. The effects are exactly as described.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Free shipping on orders over $50</li>
                  <li>Same-day processing for orders placed before 2 PM</li>
                  <li>Discreet packaging guaranteed</li>
                  <li>Tracking provided for all orders</li>
                  <li>Age verification required upon delivery (21+)</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="aspect-square relative overflow-hidden rounded-t-xl">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-emerald-100 text-emerald-700 capitalize">
                        {relatedProduct.type}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-emerald-600">
                          ${relatedProduct.price}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">
                            {relatedProduct.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;