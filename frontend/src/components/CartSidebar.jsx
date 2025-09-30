import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  const progressToFreeShipping = Math.min((subtotal / 50) * 100, 100);
  const remainingForFreeShipping = Math.max(50 - subtotal, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Your Cart ({cartItems.length})
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress Bar for Free Shipping */}
        {remainingForFreeShipping > 0 && (
          <div className="p-6 bg-emerald-50 border-b">
            <div className="text-center mb-3">
              <p className="text-sm text-emerald-700">
                You're <span className="font-semibold">${remainingForFreeShipping.toFixed(2)}</span> away from <span className="font-semibold">FREE shipping!</span>
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>$0</span>
              <span>$50</span>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-700">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.variant}`} className="flex items-center space-x-4 p-4 border rounded-lg">
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.variant}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-emerald-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onUpdateQuantity(item.id, item.variant, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onUpdateQuantity(item.id, item.variant, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-400 hover:text-red-500"
                    onClick={() => onRemoveItem(item.id, item.variant)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Totals and Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'text-emerald-600 font-medium' : ''}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3">
              Proceed to Checkout
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;