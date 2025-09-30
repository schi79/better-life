import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CategoryCards from "./components/CategoryCards";
import ProductGrid from "./components/ProductGrid";
import ShopByMoodSection from "./components/ShopByMoodSection";
import TestimonialsSection from "./components/TestimonialsSection";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import AgeVerificationModal from "./components/AgeVerificationModal";
import CartSidebar from "./components/CartSidebar";
import { Toaster } from "./components/ui/toaster";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = ({ cartItems, onAddToCart, onAddToWishlist, onCartClick }) => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header cartItems={cartItems} onCartClick={onCartClick} />
      <HeroSection />
      <CategoryCards />
      <ProductGrid 
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
      />
      <ShopByMoodSection />
      <TestimonialsSection />
      <BlogSection />
      <Footer />
    </div>
  );
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('betterLifestylesCart');
    const savedWishlist = localStorage.getItem('betterLifestylesWishlist');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('betterLifestylesCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('betterLifestylesWishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const handleAddToCart = (product, variant = null) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: variant || product.variants[0],
      quantity: 1
    };

    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.variant === cartItem.variant
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.variant === cartItem.variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, cartItem];
    });
  };

  const handleAddToWishlist = (product) => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    };

    setWishlistItems(prevItems => {
      const exists = prevItems.find(item => item.id === product.id);
      if (exists) {
        return prevItems.filter(item => item.id !== product.id);
      }
      return [...prevItems, wishlistItem];
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      
      <AgeVerificationModal />
      <Toaster />
    </div>
  );
}

export default App;
