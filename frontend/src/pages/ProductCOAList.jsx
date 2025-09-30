import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Shield, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductCOAList = ({ cartItems, onCartClick }) => {
  // COA data organized by categories
  const coaData = {
    flowers: [
      {
        name: 'High THCa Deep Space',
        slug: 'high-thca-deep-space',
        pdfUrl: '#'
      },
      {
        name: 'High THCa Purple Soda',
        slug: 'high-thca-purple-soda',
        pdfUrl: '#'
      },
      {
        name: 'High THCa Cookies and Cream',
        slug: 'high-thca-cookies-cream',
        pdfUrl: '#'
      },
      {
        name: 'High THCa Mochi',
        slug: 'high-thca-mochi',
        pdfUrl: '#'
      },
      {
        name: 'High THCa Dirty Taxi - Light Dep',
        slug: 'high-thca-dirty-taxi-light-dep',
        pdfUrl: '#'
      },
      {
        name: 'High THCa Orange Sunset - Light Dep',
        slug: 'high-thca-orange-sunset-light-dep',
        pdfUrl: '#'
      },
      {
        name: 'High THCa Z Cake - Light Dep',
        slug: 'high-thca-z-cake-light-dep',
        pdfUrl: '#'
      },
      {
        name: 'High THCa Obama Runtz',
        slug: 'high-thca-obama-runtz',
        pdfUrl: '#'
      },
      {
        name: 'High THCa Bubblegum Runtz',
        slug: 'high-thca-bubblegum-runtz-bundle',
        pdfUrl: '#'
      },
      // Additional flowers from original site
      {
        name: 'Galactic Runtz',
        slug: 'galactic-runtz',
        pdfUrl: '#'
      },
      {
        name: 'Truffle Cake',
        slug: 'truffle-cake',
        pdfUrl: '#'
      },
      {
        name: 'Grape Cream Cake',
        slug: 'grape-cream-cake',
        pdfUrl: '#'
      },
      {
        name: 'Duck Sauce',
        slug: 'duck-sauce',
        pdfUrl: '#'
      },
      {
        name: 'Gelato 45',
        slug: 'gelato-45',
        pdfUrl: '#'
      },
      {
        name: 'Biscotti Diesel',
        slug: 'biscotti-diesel',
        pdfUrl: '#'
      },
      {
        name: 'Apple Runtz',
        slug: 'apple-runtz',
        pdfUrl: '#'
      },
      {
        name: 'Gelato 41',
        slug: 'gelato-41',
        pdfUrl: '#'
      },
      {
        name: 'Garlic Cocktail',
        slug: 'garlic-cocktail',
        pdfUrl: '#'
      },
      {
        name: 'Lemon Gas',
        slug: 'lemon-gas',
        pdfUrl: '#'
      },
      {
        name: 'Gary Payton',
        slug: 'gary-payton',
        pdfUrl: '#'
      },
      {
        name: 'Apricot Scones',
        slug: 'apricot-scones',
        pdfUrl: '#'
      },
      {
        name: 'Mocha',
        slug: 'mocha',
        pdfUrl: '#'
      },
      {
        name: 'Kept Secret',
        slug: 'kept-secret',
        pdfUrl: '#'
      },
      {
        name: 'Zoap',
        slug: 'zoap',
        pdfUrl: '#'
      },
      {
        name: 'Chocolate Tie',
        slug: 'chocolate-tie',
        pdfUrl: '#'
      },
      {
        name: 'Blue Dream Pie',
        slug: 'blue-dream-pie',
        pdfUrl: '#'
      },
      {
        name: 'Ghost Rider',
        slug: 'ghost-rider',
        pdfUrl: '#'
      },
      {
        name: 'Lemon Drop',
        slug: 'lemon-drop',
        pdfUrl: '#'
      },
      {
        name: 'Oreo Blizzard',
        slug: 'oreo-blizzard',
        pdfUrl: '#'
      },
      {
        name: 'Perm Marker',
        slug: 'perm-marker',
        pdfUrl: '#'
      },
      {
        name: 'Garlic Crusher',
        slug: 'garlic-crusher',
        pdfUrl: '#'
      },
      {
        name: 'Mochi Cake',
        slug: 'mochi-cake',
        pdfUrl: '#'
      },
      {
        name: 'Sour Animals',
        slug: 'sour-animals',
        pdfUrl: '#'
      },
      {
        name: 'Black Garlic',
        slug: 'black-garlic',
        pdfUrl: '#'
      },
      {
        name: 'White Trufflez',
        slug: 'white-trufflez',
        pdfUrl: '#'
      },
      {
        name: 'White Peaches',
        slug: 'white-peaches',
        pdfUrl: '#'
      },
      {
        name: 'Tropicana Cherries',
        slug: 'tropicana-cherries',
        pdfUrl: '#'
      },
      {
        name: 'Strawberry Strudel',
        slug: 'strawberry-strudel',
        pdfUrl: '#'
      },
      {
        name: 'Starburst',
        slug: 'starburst',
        pdfUrl: '#'
      },
      {
        name: 'Sour Joker',
        slug: 'sour-joker',
        pdfUrl: '#'
      },
      {
        name: 'Rainbow Sherbert',
        slug: 'rainbow-sherbert',
        pdfUrl: '#'
      },
      {
        name: 'Rainbow Gelato',
        slug: 'rainbow-gelato',
        pdfUrl: '#'
      },
      {
        name: 'Krypto Chronic',
        slug: 'krypto-chronic',
        pdfUrl: '#'
      },
      {
        name: 'Blue Cherry Gelato',
        slug: 'blue-cherry-gelato',
        pdfUrl: '#'
      },
      {
        name: 'Birthday Cake',
        slug: 'birthday-cake',
        pdfUrl: '#'
      },
      {
        name: 'Kush Mintz',
        slug: 'kush-mintz',
        pdfUrl: '#'
      },
      {
        name: 'Rainbow Road',
        slug: 'rainbow-road',
        pdfUrl: '#'
      }
    ],
    concentrates: [
      {
        name: 'Big Dipper Live Rosin',
        slug: 'big-dipper-live-rosin',
        pdfUrl: '#'
      },
      {
        name: 'Dante\'s Inferno Rosin',
        slug: 'dantes-inferno-rosin',
        pdfUrl: '#'
      },
      {
        name: 'White Runtz Rosin',
        slug: 'white-runtz-rosin',
        pdfUrl: '#'
      },
      {
        name: 'Skywalker OG Rosin',
        slug: 'skywalker-og-rosin',
        pdfUrl: '#'
      },
      {
        name: 'Blueberry Muffin Rosin',
        slug: 'blueberry-muffin-rosin',
        pdfUrl: '#'
      },
      {
        name: 'Diamonds Gusherz',
        slug: 'diamonds-gusherz',
        pdfUrl: '#'
      },
      {
        name: 'Moroccan Hash',
        slug: 'moroccan-hash',
        pdfUrl: '#'
      },
      {
        name: 'THCa Sugar Wax',
        slug: 'thca-sugar-wax',
        pdfUrl: '#'
      },
      {
        name: 'THCa Diamonds',
        slug: 'thca-diamonds',
        pdfUrl: '#'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItems={cartItems} onCartClick={onCartClick} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-emerald-600">Home</Link>
          <span>/</span>
          <span className="text-gray-800">Product COAs</span>
        </nav>

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-100 rounded-full p-4">
              <Shield className="h-12 w-12 text-emerald-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Products COAs
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            View detailed lab reports for each product in our collection. These COAs verify potency, 
            purity, and safety through certified third-party testing.
          </p>
        </div>

        {/* Flowers Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wider">
              FLOWERS
            </h2>
            <div className="ml-4 flex-1 h-px bg-gray-300"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {coaData.flowers.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="h-6 w-6 text-emerald-600" />
                  <Download className="h-4 w-4 text-gray-400" />
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-4 text-sm leading-tight">
                  {product.name}
                </h3>
                
                <Link 
                  to={`/product-coa/${product.slug}`}
                  className="inline-block w-full"
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-emerald-600 border-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    View
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Concentrates Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wider">
              CONCENTRATES
            </h2>
            <div className="ml-4 flex-1 h-px bg-gray-300"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {coaData.concentrates.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="h-6 w-6 text-emerald-600" />
                  <Download className="h-4 w-4 text-gray-400" />
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-4 text-sm leading-tight">
                  {product.name}
                </h3>
                
                <Link 
                  to={`/product-coa/${product.slug}`}
                  className="inline-block w-full"
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-emerald-600 border-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    View
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-emerald-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-emerald-800 mb-2">
                Third-Party Lab Testing
              </h3>
              <p className="text-emerald-700 text-sm leading-relaxed">
                All our products are tested by certified third-party laboratories to ensure quality, 
                potency, and safety. Each Certificate of Analysis (COA) provides detailed information 
                about cannabinoid profiles, terpenes, and contaminant testing results including 
                pesticides, heavy metals, residual solvents, and microbials.
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