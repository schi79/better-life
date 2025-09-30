import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { navigationMenus } from '../data/mock';

const Header = ({ cartItems = [], onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      {/* BOGO Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center py-2 text-sm">
        Buy One Get One 20% Off - Limited Time Offer!
      </div>

      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-800">
                  Better Lifestyles
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/shop" className="text-gray-700 hover:text-emerald-600 font-medium">
                Shop
              </a>
              
              {/* Flowers Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('flowers')}
                  className="flex items-center text-gray-700 hover:text-emerald-600 font-medium"
                >
                  Flowers
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'flowers' && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Shop by Category</h3>
                      <div className="space-y-2">
                        {navigationMenus.categories[0].items.map((item, index) => (
                          <a
                            key={index}
                            href="#"
                            className="block text-sm text-gray-600 hover:text-emerald-600 py-1"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a href="/category/edibles" className="text-gray-700 hover:text-emerald-600 font-medium">
                Edibles
              </a>
              <a href="/category/concentrates" className="text-gray-700 hover:text-emerald-600 font-medium">
                Concentrates
              </a>
              
              {/* Learn Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('learn')}
                  className="flex items-center text-gray-700 hover:text-emerald-600 font-medium"
                >
                  Learn
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === 'learn' && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-4">
                      <div className="space-y-2">
                        {navigationMenus.learn.map((item, index) => (
                          <a
                            key={index}
                            href="#"
                            className="block text-sm text-gray-600 hover:text-emerald-600 py-1"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a href="/bulk-deals" className="text-gray-700 hover:text-emerald-600 font-medium">
                Wholesale Deals
              </a>
              <a href="/contact" className="text-gray-700 hover:text-emerald-600 font-medium">
                Contact Us
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-emerald-600">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/shop" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
                Shop
              </a>
              <a href="/flowers" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
                Flowers
              </a>
              <a href="/edibles" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
                Edibles
              </a>
              <a href="/concentrates" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
                Concentrates
              </a>
              <a href="/learn" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
                Learn
              </a>
              <a href="/wholesale-deals" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
                Wholesale Deals
              </a>
              <a href="/contact" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
                Contact Us
              </a>
            </div>
            <div className="border-t px-4 py-3 flex items-center justify-around">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-emerald-600">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;