import React, { useState } from 'react';
import { 
  ShoppingCart, Search, Menu, User, Settings, LogOut, UserCircle, Package, Heart, 
  FileText, HelpCircle, Phone, Home, Tag, Sparkles, Smartphone, Shirt, 
  Sofa, Dumbbell, ChevronDown, X, Grid3X3, Bookmark, Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Account Dropdown Component with working sign out
const AccountDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
      <div className="px-4 py-2 border-b">
        <p className="text-sm text-gray-700">Welcome!</p>
        <p className="text-xs text-gray-500">example@email.com</p>
      </div>
      <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <UserCircle className="h-4 w-4 mr-2" />
        Your Profile
      </a>
      <a href="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <Package className="h-4 w-4 mr-2" />
        Your Orders
      </a>
      <a href="/wishlist" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <Heart className="h-4 w-4 mr-2" />
        Wishlist
      </a>
      <div className="border-t">
        <button 
          onClick={handleSignOut}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

const SideMenu = ({ isOpen, onClose, isLoggedIn, onLogin, onSignup, onLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleAuthAction = (action) => {
    action();
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative flex flex-col w-72 sm:w-80 max-w-xs bg-white h-full shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <span className="text-xl text-gray-600">✕</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Navigation Links - Mobile Priority */}
          <div className="p-2 border-b">
            <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Navigation</h3>
            <button 
              onClick={() => handleNavigation('/')} 
              className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Home className="h-5 w-5 mr-3 text-blue-600" />
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/deals')} 
              className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Tag className="h-5 w-5 mr-3 text-red-600" />
              Deals & Offers
            </button>
            <button 
              onClick={() => handleNavigation('/new-arrivals')} 
              className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Sparkles className="h-5 w-5 mr-3 text-purple-600" />
              New Arrivals
            </button>
          </div>

          {/* Categories - Mobile Friendly */}
          <div className="p-2 border-b">
            <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Categories</h3>
            <button 
              onClick={() => handleNavigation('/category/electronics')} 
              className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Smartphone className="h-5 w-5 mr-3 text-blue-600" />
              Electronics
            </button>
            <button 
              onClick={() => handleNavigation('/category/fashion')} 
              className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Shirt className="h-5 w-5 mr-3 text-pink-600" />
              Fashion
            </button>
            <button 
              onClick={() => handleNavigation('/category/home-garden')} 
              className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Sofa className="h-5 w-5 mr-3 text-green-600" />
              Home & Garden
            </button>
            <button 
              onClick={() => handleNavigation('/category/sports')} 
              className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Dumbbell className="h-5 w-5 mr-3 text-orange-600" />
              Sports
            </button>
          </div>

          {/* Account Section - Mobile */}
          {isLoggedIn ? (
            <div className="p-2 border-b bg-blue-50">
              <h3 className="px-3 py-2 text-sm font-semibold text-blue-700 uppercase tracking-wide">Your Account</h3>
              <button 
                onClick={() => handleNavigation('/profile')} 
                className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-blue-100 rounded-md transition-colors"
              >
                <UserCircle className="h-5 w-5 mr-3 text-blue-600" />
                Your Profile
              </button>
              <button 
                onClick={() => handleNavigation('/orders')} 
                className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-blue-100 rounded-md transition-colors"
              >
                <Package className="h-5 w-5 mr-3 text-blue-600" />
                Your Orders
              </button>
              <button 
                onClick={() => handleNavigation('/wishlist')} 
                className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-blue-100 rounded-md transition-colors"
              >
                <Heart className="h-5 w-5 mr-3 text-blue-600" />
                Wishlist
              </button>
              <button 
                onClick={() => handleAuthAction(onLogout)} 
                className="flex items-center w-full px-3 py-3 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="p-2 border-b bg-green-50">
              <h3 className="px-3 py-2 text-sm font-semibold text-green-700 uppercase tracking-wide">Account</h3>
              <button 
                onClick={() => handleAuthAction(onLogin)} 
                className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-green-100 rounded-md transition-colors"
              >
                <User className="h-5 w-5 mr-3 text-green-600" />
                Login
              </button>
              <button 
                onClick={() => handleAuthAction(onSignup)} 
                className="flex items-center w-full px-3 py-3 text-sm bg-green-600 text-white hover:bg-green-700 rounded-md transition-colors"
              >
                <UserCircle className="h-5 w-5 mr-3" />
                Sign Up
              </button>
            </div>
          )}
          
          {/* Help & Support */}
          <div className="p-2 border-b">
            <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Help & Settings</h3>
            <button 
              onClick={() => handleNavigation('/settings')} 
              className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Settings className="h-5 w-5 mr-3" />
              Account Settings
            </button>
            <button 
              onClick={() => handleNavigation('/customer-service')} 
              className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <HelpCircle className="h-5 w-5 mr-3" />
              Customer Service
            </button>
            <button 
              onClick={() => handleNavigation('/contact')} 
              className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Phone className="h-5 w-5 mr-3" />
              Contact Us
            </button>
          </div>
          
          {/* Policies */}
          <div className="p-2">
            <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Policies</h3>
            <button 
              onClick={() => handleNavigation('/privacy')} 
              className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <FileText className="h-5 w-5 mr-3" />
              Privacy Policy
            </button>
            <button 
              onClick={() => handleNavigation('/terms')} 
              className="flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <FileText className="h-5 w-5 mr-3" />
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoriesDropdown = ({ isOpen, onClose }) => {
  const categories = [
    {
      name: "Electronics",
      icon: <Smartphone className="h-5 w-5 text-blue-600" />,
      subcategories: [
        { name: "Phones", icon: <Smartphone className="h-4 w-4 text-gray-600" /> },
        { name: "Laptops", icon: <Package className="h-4 w-4 text-gray-600" /> },
        { name: "Tablets", icon: <Package className="h-4 w-4 text-gray-600" /> },
        { name: "Accessories", icon: <Package className="h-4 w-4 text-gray-600" /> }
      ]
    },
    {
      name: "Fashion",
      icon: <Shirt className="h-5 w-5 text-pink-600" />,
      subcategories: [
        { name: "Men's Clothing", icon: <Shirt className="h-4 w-4 text-gray-600" /> },
        { name: "Women's Clothing", icon: <Shirt className="h-4 w-4 text-gray-600" /> },
        { name: "Kids", icon: <Heart className="h-4 w-4 text-gray-600" /> },
        { name: "Shoes", icon: <Package className="h-4 w-4 text-gray-600" /> }
      ]
    },
    {
      name: "Home & Garden",
      icon: <Sofa className="h-5 w-5 text-green-600" />,
      subcategories: [
        { name: "Furniture", icon: <Sofa className="h-4 w-4 text-gray-600" /> },
        { name: "Decor", icon: <Heart className="h-4 w-4 text-gray-600" /> },
        { name: "Kitchen", icon: <Package className="h-4 w-4 text-gray-600" /> },
        { name: "Garden", icon: <Package className="h-4 w-4 text-gray-600" /> }
      ]
    },
    {
      name: "Sports",
      icon: <Dumbbell className="h-5 w-5 text-orange-600" />,
      subcategories: [
        { name: "Equipment", icon: <Dumbbell className="h-4 w-4 text-gray-600" /> },
        { name: "Clothing", icon: <Shirt className="h-4 w-4 text-gray-600" /> },
        { name: "Shoes", icon: <Package className="h-4 w-4 text-gray-600" /> },
        { name: "Accessories", icon: <Package className="h-4 w-4 text-gray-600" /> }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden" 
        onClick={onClose}
      />
      
      {/* Dropdown Content */}
      <div className="absolute top-full left-0 right-0 bg-white shadow-2xl border border-gray-200 z-50 max-w-6xl mx-auto rounded-b-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Shop by Category</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors md:hidden"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <div className="text-blue-600">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-base">
                    {category.name}
                  </h3>
                </div>
                
                <ul className="space-y-2">
                  {category.subcategories.map((sub) => (
                    <li key={sub.name}>
                      <a 
                        href={`/category/${category.name.toLowerCase()}/${sub.name.toLowerCase().replace(/\s+/g, '-')}`} 
                        className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 text-sm py-2 px-3 hover:bg-blue-50 rounded-md transition-all duration-200 group"
                        onClick={onClose}
                      >
                        <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                          {sub.icon}
                        </div>
                        <span>{sub.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* View All Categories Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <a 
              href="/categories" 
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              onClick={onClose}
            >
              <span>View All Categories</span>
              <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// Mobile Navigation Bar Component
const MobileNavBar = ({ 
  isLoggedIn, 
  onMenuClick, 
  onCartClick, 
  onAccountClick, 
  onLoginClick,
  cartCount,
  searchQuery,
  onSearchChange,
  onNavigate 
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="md:hidden">
      {/* Main Mobile Nav */}
      <div className="bg-gray-800 text-white p-3">
        <div className="flex items-center justify-between">
          {/* Left: Menu + Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-700 rounded-md transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center -space-x-2">
              <img src="/Images/Logo.png" alt="Store Logo" className="h-8 w-auto" />
              <img src="/Images/Logo_name.png" alt="Store Name" className="h-4 w-auto" />
            </div>
          </div>

          {/* Right: Search, Account, Cart */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-700 rounded-md transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {isLoggedIn ? (
              <button
                onClick={onAccountClick}
                className="p-2 hover:bg-gray-700 rounded-md transition-colors dropdown-container"
              >
                <User className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}

            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-700 rounded-md transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Expandable */}
        {showSearch && (
          <div className="mt-3 pb-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-3 rounded-lg text-gray-800 text-sm"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
              />
              <button
                onClick={() => setShowSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Tab Bar - Different functionality */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 sm:hidden shadow-lg">
        <div className="flex items-center justify-between px-4 py-2">
          <button 
            onClick={() => onNavigate && onNavigate('/categories')}
            className="flex flex-col items-center py-2 px-6 text-gray-600 hover:text-blue-600 transition-colors min-w-0 flex-1"
          >
            <Grid3X3 className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Categories</span>
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('/wishlist')}
            className="flex flex-col items-center py-2 px-6 text-gray-600 hover:text-pink-600 transition-colors min-w-0 flex-1"
          >
            <Heart className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Wishlist</span>
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('/saved')}
            className="flex flex-col items-center py-2 px-6 text-gray-600 hover:text-green-600 transition-colors min-w-0 flex-1"
          >
            <Bookmark className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Saved</span>
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('/notifications')}
            className="flex flex-col items-center py-2 px-6 text-gray-600 hover:text-red-600 transition-colors min-w-0 flex-1 relative"
          >
            <Bell className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Alerts</span>
            {/* Notification badge */}
            <span className="absolute top-1 right-4 bg-red-500 text-white rounded-full w-2 h-2"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Responsive Search Component
const ResponsiveSearch = ({ searchQuery, onSearchChange, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Search for products, brands, categories..."
        className="w-full px-4 py-3 pr-14 rounded-lg text-gray-800 text-base border-2 border-transparent focus:border-blue-500 focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md bg-white"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg backdrop-blur-sm bg-white/60 border border-gray-200/50">
        <Search className="h-5 w-5 text-gray-500" />
      </div>
    </div>
  );
};

export { AccountDropdown, SideMenu, CategoriesDropdown, MobileNavBar, ResponsiveSearch };
