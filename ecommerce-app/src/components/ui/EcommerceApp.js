import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, User } from "lucide-react";
import { AccountDropdown, SideMenu, CategoriesDropdown } from "./NavigationComponents";

const Logo = () => (
  <div className="flex items-center space-x-2">
    <img src="/Images/Logo.png" alt="Store Logo" className="h-12 w-auto" />
    <span className="text-xl font-bold text-white hidden md:block"></span>
  </div>
);

const LogoName = () => (
  <div className="flex items-center space-x-2">
    <img
      src="/public/Images/Logo_name.png"
      alt="Store Name Logo"
      className="h-6 w-auto"
    />
    <span className="text-xl font-bold text-white hidden md:block"></span>
  </div>
);

const CartComponent = ({ cart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed top-0 right-0 w-80 bg-white h-full shadow-lg p-4 z-50 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 border-b pb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    -
                  </button>
                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
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

  const products = [
    {
      id: 1,
      name: "Boat Watch CQ1",
      price: 59.99,
      rating: 4.5,
      image: "/ProductImages/Item_01.png",
    },
    {
      id: 2,
      name: "Sony Headphones XC7600",
      price: 339.99,
      rating: 4.5,
      image: "/ProductImages/Item_02.png",
    },
    {
      id: 3,
      name: "Puma Shoes 5'7",
      price: 59.99,
      rating: 4.5,
      image: "/ProductImages/Item_03.png",
    },
    {
      id: 4,
      name: "Iphone 16 Pro 5G Blue",
      price: 1929.99,
      rating: 4.9,
      image: "/ProductImages/Item_04.png",
    },
    {
      id: 5,
      name: "Hp Inspirion 3378x Laptop",
      price: 1459.99,
      rating: 4.3,
      image: "/ProductImages/Item_05.png",
    },  
    {
      id: 6,
      name: "Samsung FHD TV 43' 2025 Model",
      price: 2029.99,
      rating: 4.2,
      image: "/ProductImages/Item_06.png",
    },
    {
      id: 7,
      name: "Saregama Caaravan 2024 Special Edition",
      price: 229.99,
      rating: 4.7,
      image: "/ProductImages/Item_07.png",
    },
    {
      id: 8,
      name: "Peter England - Maaroon Shirt(Mens)",
      price: 29.99,
      rating: 4.0,
      image: "/ProductImages/Item_08.png",
    },
    {
      id: 9,
      name: "Honor X360 Tab 2024 15'",
      price: 629.99,
      rating: 4.5,
      image: "/ProductImages/Item_09.png",
    },
    {
      id: 10,
      name: "FlexiCool AC 15-Ton",
      price: 929.99,
      rating: 4.5,
      image: "/ProductImages/Item_10.png",
    },
    {
      id: 11,
      name: "G-Shock XFactor - Gold Edition ",
      price: 429.99,
      rating: 4.5,
      image: "/ProductImages/Item_11.png",
    },
    
  ];

  useEffect(() => {
    // Filter products based on search query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

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
      <nav className="bg-gray-800 text-white p-4 relative">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              className="p-1 hover:bg-gray-700 rounded-md"
              onClick={() => setShowSideMenu(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div
              onClick={handleHomeClick}
              className="cursor-pointer flex items-center -space-x-3"
            >
              <Logo />
              <LogoName />
            </div>

            <div className="hidden md:flex space-x-4 ml-6">
              <button onClick={handleHomeClick} className="hover:text-gray-300">
                Home
              </button>
              <div className="grid">
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="hover:text-gray-300"
                >
                  Categories
                </button>
                <CategoriesDropdown
                  isOpen={showCategories}
                  onClose={() => setShowCategories(false)}
                />
              </div>
              <button onClick={handleDealsClick} className="hover:text-gray-300">
                Deals
              </button>
              <button
                onClick={handleNewArrivalsClick}
                className="hover:text-gray-300"
              >
                New Arrivals
              </button>
            </div>
          </div>

          <div className="flex-1 mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 rounded text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-2 top-2 h-6 w-6 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <div className="relative dropdown-container">
                <button
                  className="hidden md:flex items-center space-x-2 hover:text-gray-300"
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                >
                  <User className="h-6 w-6" />
                  <span>Account</span>
                </button>
                <AccountDropdown
                  isOpen={showAccountDropdown}
                  onClose={() => setShowAccountDropdown(false)}
                  onLogout={handleLogout}
                />
              </div>
            ) : (
              <div className="hidden md:flex space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-gray-300"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </div>
            )}
            <div className="relative">
              <ShoppingCart
                className="h-6 w-6 cursor-pointer hover:text-gray-300"
                onClick={() => {
                  if (!isLoggedIn) {
                    navigate("/login");
                    return;
                  }
                  setShowCart(!showCart);
                }}
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <SideMenu isOpen={showSideMenu} onClose={() => setShowSideMenu(false)} />

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-200 hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">${product.price}</span>
                  <span className="text-yellow-500">★ {product.rating}</span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showCart && (
        <CartComponent
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      )}
    </div>
  );
};

export default EcommerceApp;