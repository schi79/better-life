import React, { useState, useEffect } from 'react';
import { ExternalLink, FileText, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductCOAList = ({ cartItems, onCartClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API}/products/`, {
          params: { limit: 100 }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? productsByCategory 
    : { [selectedCategory]: productsByCategory[selectedCategory] || [] };

  const categoryLabels = {
    'high-thca-flowers': 'FLOWERS',
    'concentrates': 'CONCENTRATES',
    'edibles': 'EDIBLES',
    'bundles': 'BUNDLES',
    'wholesale': 'WHOLESALE'
  };

  const COAProductCard = ({ product }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Badge variant="outline" className="text-xs">
              {product.type}
            </Badge>
            {product.thca_percentage && (
              <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600">
                {product.thca_percentage} THCa
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-400">Lab tested for purity and potency</p>
        </div>
        <div className="ml-4">
          <Button
            asChild
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <a 
              href={`${BACKEND_URL}/api/coa/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <FileText className="h-3 w-3" />
              View
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItems={cartItems} onCartClick={onCartClick} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-800">Products COAs</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            View detailed lab reports for each product in our collection. These COAs verify potency, 
            purity, and safety through certified third-party testing.
          </p>
          
          {/* Quality Assurance Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 mb-8">
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span className="text-sm font-medium">Third-Party Tested</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span className="text-sm font-medium">Potency Verified</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span className="text-sm font-medium">Purity Confirmed</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span className="text-sm font-medium">Safety Compliance</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              size="sm"
              className={selectedCategory === 'all' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              All Categories
            </Button>
            {Object.keys(productsByCategory).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                className={selectedCategory === category ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                {categoryLabels[category] || category.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Products by Category */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading COA documents...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(filteredProducts).map(([category, categoryProducts]) => (
              categoryProducts && categoryProducts.length > 0 && (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {categoryLabels[category] || category.toUpperCase()}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryProducts.map((product) => (
                      <COAProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* No Products Message */}
        {!loading && Object.keys(filteredProducts).length === 0 && (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No COAs Available</h3>
            <p className="text-gray-600">
              COA documents will be available as products are added to this category.
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">About Our COAs</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                All Certificate of Analysis (COA) documents are provided by certified third-party laboratories. 
                These reports verify the potency, purity, and safety of our products through comprehensive testing 
                for cannabinoids, terpenes, pesticides, heavy metals, residual solvents, and microbials. 
                Results ensure compliance with industry standards and regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductCOAList;