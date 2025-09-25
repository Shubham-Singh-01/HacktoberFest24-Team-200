import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, User, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { AccountDropdown, SideMenu, CategoriesDropdown, MobileNavBar, ResponsiveSearch } from "./NavigationComponents";
import FilterSidebar from "./FilterSidebar";
import { productManager } from "../../data/products";

const Logo = () => (
  <div className="flex items-center space-x-2">
    <img src="/Images/Logo.png" alt="Store Logo" className="h-12 w-auto" />
    <span className="text-xl font-bold text-white hidden md:block"></span>
  </div>
);

const PromoBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const promoSlides = [
    {
      id: 1,
      image: "/Images/Promo_Banner_1.png", 
      alt: "Diwali Banner",
      backgroundColor: "#2d3748"
    },
    {
      id: 2,
      image: "/Images/Promo_Banner_2.png", 
      alt: "Electronics Sale",
      backgroundColor: "#2d3748"
    },
    {
      id: 3,
      image: "/Images/Promo_Banner_3.png", 
      alt: "Computer Sale",
      backgroundColor: "#2d3748"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [promoSlides.length]);

  // Clean and elegant banner theming
  const getBannerTheme = (slideIndex) => {
    const themes = [
      {
        // Diwali - Warm orange theme
        primary: '#ff6b35',
        secondary: '#ffa500',
        accent: '#ffb347'
      },
      {
        // Appliances - Fresh green theme  
        primary: '#4ade80',
        secondary: '#22d3ee',
        accent: '#86efac'
      },
      {
        // Electronics - Cool blue theme
        primary: '#3b82f6',
        secondary: '#60a5fa',
        accent: '#93c5fd'
      }
    ];
    return themes[slideIndex] || themes[0];
  };

  const currentTheme = getBannerTheme(currentSlide);

  return (
    <div 
      className="relative w-screen left-1/2 transform -translate-x-1/2 overflow-hidden bg-white"
      style={{ 
        margin: 0, 
        padding: 0, 
        width: '100vw',
        minWidth: '100vw',
        maxWidth: '100vw'
      }}
    >
      {/* Simple, clean side fade */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(90deg, 
            ${currentTheme.primary}08 0%, 
            transparent 20%, 
            transparent 80%, 
            ${currentTheme.primary}08 100%)`
        }}
      ></div>
      
      {/* Banner container - Responsive height for all screen sizes */}
      <div 
        className="relative flex items-center justify-center h-[150px] xs:h-[200px] sm:h-[350px]"
        style={{ 
          margin: 0, 
          padding: 0
        }}
      >
        {/* Full viewport content container */}
        <div 
          className="relative w-full h-full"
          style={{ margin: 0, padding: 0, width: '100vw' }}
        >
          {promoSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Full width image container */}
              <div 
                className="relative flex items-center justify-center h-full"
                style={{ margin: 0, padding: '0 2rem', width: '100%' }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-auto object-contain"
                  style={{ maxWidth: 'none', width: 'auto', height: '100%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Simple, clean indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {promoSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white shadow-md' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const LogoName = () => (
  <div className="flex items-center space-x-2">
    <img
      src="/Images/Logo_name.png"
      alt="Store Name Logo"
      className="h-6 w-auto"
    />
    <span className="text-xl font-bold text-white hidden md:block"></span>
  </div>
);

const CartComponent = ({ cart, removeFromCart, updateQuantity, onClose }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Cart Panel */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-xl text-gray-600">✕</span>
          </button>
        </div>
        
        <div className="p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={() => {
                  navigate("/");
                  onClose();
                }}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600"
                      >
                        -
                      </button>
                      <span className="mx-3 w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    navigate("/checkout");
                    onClose();
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EcommerceApp = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 2000 },
    category: 'all',
    rating: 0,
    sortBy: 'default'
  });

  useEffect(() => {
    // Check authentication status
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Load products from the product manager
  const [products, setProducts] = useState([]);
  
  // Load products on component mount and when data changes
  useEffect(() => {
    const loadProducts = () => {
      setProducts(productManager.getAllProducts());
    };
    
    loadProducts();
    
    // Listen for storage changes (when products are added/updated in ProductManager)
    const handleStorageChange = (e) => {
      if (e.key === 'ecommerce_products') {
        loadProducts();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(loadProducts, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Filter products based on search query and filters
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply price filter
    filtered = filtered.filter(
      (product) => 
        product.price >= filters.priceRange.min && 
        product.price <= filters.priceRange.max
    );

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }

    // Apply category filter (using product category field)
    if (filters.category !== 'all') {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products, filters]);

  const handleHomeClick = () => {
    setShowCart(false);
    setShowAccountDropdown(false);
    setShowCategories(false);
    navigate("/");
  };

  const handleDealsClick = () => {
    navigate("/deals");
  };

  const handleNewArrivalsClick = () => {
    navigate("/new-arrivals");
  };

  const addToCart = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("cart");
    setIsLoggedIn(false);
    setCart([]);
    navigate("/");
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setShowAccountDropdown(false);
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Navigation - Show only on small screens */}
      <div className="lg:hidden">
        <MobileNavBar
          isLoggedIn={isLoggedIn}
          onMenuClick={() => setShowSideMenu(true)}
          onCartClick={() => {
            if (!isLoggedIn) {
              navigate("/login");
              return;
            }
            setShowCart(!showCart);
          }}
          onAccountClick={() => setShowAccountDropdown(!showAccountDropdown)}
          onLoginClick={() => navigate("/login")}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNavigate={navigate}
        />
        
        {/* Mobile Account Dropdown - positioned relative to mobile nav */}
        {isLoggedIn && (
          <div className="relative dropdown-container">
            <AccountDropdown
              isOpen={showAccountDropdown}
              onClose={() => setShowAccountDropdown(false)}
              onLogout={handleLogout}
            />
          </div>
        )}
      </div>

      {/* Tablet Navigation - Show on medium screens (768px-1024px) */}
      <nav className="hidden md:block lg:hidden bg-gray-800 text-white p-3 relative">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="p-1 hover:bg-gray-700 rounded-md transition-colors"
              onClick={() => setShowSideMenu(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div
              onClick={handleHomeClick}
              className="cursor-pointer flex items-center -space-x-2"
            >
              <Logo />
              <LogoName />
            </div>
          </div>

          {/* Tablet Search */}
          <div className="flex-1 mx-6 max-w-md">
            <ResponsiveSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative dropdown-container">
                <button
                  className="flex items-center space-x-2 hover:text-gray-300 transition-colors px-2 py-2 rounded"
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                >
                  <User className="h-5 w-5" />
                </button>
                <AccountDropdown
                  isOpen={showAccountDropdown}
                  onClose={() => setShowAccountDropdown(false)}
                  onLogout={handleLogout}
                />
              </div>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-gray-300 transition-colors px-2 py-1 rounded text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors text-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
            <div className="relative">
              <ShoppingCart
                className="h-5 w-5 cursor-pointer hover:text-gray-300 transition-colors"
                onClick={() => {
                  if (!isLoggedIn) {
                    navigate("/login");
                    return;
                  }
                  setShowCart(!showCart);
                }}
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Navigation - Show on larger screens (720p+) */}
      <nav className="hidden lg:block bg-gray-800 text-white px-6 py-4 relative shadow-lg">
        <div className="max-w-full flex items-center justify-between gap-8">
          {/* Left Section - Brand + Navigation */}
          <div className="flex items-center space-x-8 flex-shrink-0">
            <button
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => setShowSideMenu(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div
              onClick={handleHomeClick}
              className="cursor-pointer flex items-center -space-x-2 hover:opacity-90 transition-opacity"
            >
              <Logo />
              <LogoName />
            </div>

            <div className="hidden xl:flex items-center space-x-6">
              <button onClick={handleHomeClick} className="hover:text-gray-300 transition-colors px-4 py-2 rounded-lg text-base font-medium">
                Home
              </button>
              <div className="relative dropdown-container">
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="flex items-center space-x-2 hover:text-gray-300 transition-colors px-4 py-2 rounded-lg text-base font-medium"
                >
                  <span>Categories</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <button onClick={handleDealsClick} className="hover:text-gray-300 transition-colors px-4 py-2 rounded-lg text-base font-medium">
                Deals
              </button>
              <button
                onClick={handleNewArrivalsClick}
                className="hover:text-gray-300 transition-colors px-4 py-2 rounded-lg text-base font-medium"
              >
                New Arrivals
              </button>
            </div>
          </div>

          {/* Center Section - Expanded Search */}
          <div className="flex-1 max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-8">
            <ResponsiveSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              className="w-full"
            />
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            {isLoggedIn ? (
              <div className="relative dropdown-container">
                <button
                  className="flex items-center space-x-3 hover:text-gray-300 transition-colors px-4 py-2 rounded-lg text-base font-medium"
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                >
                  <User className="h-6 w-6" />
                  <span className="hidden xl:block">Account</span>
                </button>
                <AccountDropdown
                  isOpen={showAccountDropdown}
                  onClose={() => setShowAccountDropdown(false)}
                  onLogout={handleLogout}
                />
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-gray-300 transition-colors px-4 py-2 rounded-lg text-base font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 text-base font-medium shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </button>
              </div>
            )}
            <button
              className="relative p-2 hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => {
                if (!isLoggedIn) {
                  navigate("/login");
                  return;
                }
                setShowCart(!showCart);
              }}
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0) > 99 ? '99+' : cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Categories Dropdown - Positioned outside nav for proper layering */}
        {showCategories && (
          <CategoriesDropdown
            isOpen={showCategories}
            onClose={() => setShowCategories(false)}
          />
        )}
      </nav>

      <SideMenu 
        isOpen={showSideMenu} 
        onClose={() => setShowSideMenu(false)}
        isLoggedIn={isLoggedIn}
        onLogin={() => navigate("/login")}
        onSignup={() => navigate("/signup")}  
        onLogout={handleLogout}
      />

      {/* Promo Banner - Full width, no gaps */}
      <div style={{ margin: 0, padding: 0, width: '100%', overflow: 'hidden' }}>
        <PromoBanner />
      </div>

      {/* Circular Toggle Button - Fixed Position */}
      {!showSideMenu && (
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`
            fixed top-1/2 transform -translate-y-1/2 z-50
            w-12 h-12 rounded-r-full shadow-lg transition-all duration-300
            flex items-center justify-center
            ${showFilters 
              ? 'left-80 bg-blue-600 text-white hover:bg-blue-700' 
              : 'left-0 bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600'
            }
          `}
        aria-label={showFilters ? 'Hide Filters' : 'Show Filters'}
      >
        {showFilters ? (
          <ChevronLeft className="h-5 w-5 ml-1" />
        ) : (
          <ChevronRight className="h-5 w-5 mr-1" />
        )}
        
        {/* Active Filters Indicator */}
        {(filters.category !== 'all' || filters.rating > 0 || filters.sortBy !== 'default' || 
          filters.priceRange.min > 0 || filters.priceRange.max < 2000) && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
            !
          </span>
        )}
        </button>
      )}

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowFilters(false)}
          />
          <div className="fixed top-0 left-0 z-50 w-80 h-full lg:hidden transform transition-transform duration-300">
            <FilterSidebar
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              filters={filters}
              onFiltersChange={setFilters}
              productCount={filteredProducts.length}
            />
          </div>
        </>
      )}

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Desktop Filter Sidebar */}
        {showFilters && (
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              filters={filters}
              onFiltersChange={setFilters}
              productCount={filteredProducts.length}
            />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="py-6 px-4 pb-20 sm:pb-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Products 
                <span className="ml-2 text-lg font-normal text-gray-600">
                  ({filteredProducts.length} items)
                </span>
              </h1>
            </div>

            <div className={`
              grid gap-3 w-full small-screen-grid
              ${showFilters 
                ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' 
                : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
              }
            `}>
              {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transform transition duration-200 hover:shadow-lg hover:scale-102 w-full"
            >
              <div className="aspect-square p-4 flex items-center justify-center bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-3 flex flex-col h-40">
                <h3 className="text-sm font-medium mb-3 line-clamp-3 text-gray-900 leading-relaxed min-h-[3rem]">{product.name}</h3>
                <div className="flex items-center justify-between mb-3 mt-auto">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  <span className="text-yellow-500 text-sm">★ {product.rating}</span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition duration-200 shadow-sm hover:shadow-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
            </div>
          </div>
        </main>
      </div>

      {showCart && (
        <CartComponent
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          onClose={() => setShowCart(false)}
        />
      )}
    </div>
  );
};

export default EcommerceApp;