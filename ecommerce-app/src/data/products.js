// Product data storage
// This file contains all product information and provides functions to manage products

export const initialProducts = [
  {
    id: 1,
    name: "Boat Watch CQ1",
    price: 59.99,
    rating: 4.5,
    image: "/ProductImages/Item_01.png",
    category: "electronics",
    description: "Premium smartwatch with advanced fitness tracking, heart rate monitoring, sleep analysis, and GPS connectivity. Features include water resistance, long battery life, and smartphone notifications.",
    inStock: true,
    featured: false,
    dateAdded: "2024-01-15",
    brand: "Boat",
    tags: ["smartwatch", "fitness", "wearable", "bluetooth"]
  },
  {
    id: 2,
    name: "Sony Headphones XC7600",
    price: 339.99,
    rating: 4.5,
    image: "/ProductImages/Item_02.png",
    category: "electronics",
    description: "Professional-grade wireless headphones with industry-leading noise cancellation technology. Premium sound quality with 30-hour battery life and quick charge capability.",
    inStock: true,
    featured: true,
    dateAdded: "2024-01-16",
    brand: "Sony",
    tags: ["headphones", "wireless", "noise-canceling", "audio"]
  },
  {
    id: 3,
    name: "Puma Shoes 5'7",
    price: 59.99,
    rating: 4.5,
    image: "/ProductImages/Item_03.png",
    category: "clothing",
    description: "Comfortable and stylish running shoes designed for daily wear and athletic activities. Features breathable mesh upper, cushioned sole, and durable construction.",
    inStock: true,
    featured: false,
    dateAdded: "2024-01-17",
    brand: "Puma",
    tags: ["shoes", "running", "athletic", "comfortable"]
  },
  {
    id: 4,
    name: "iPhone 16 Pro 5G Blue",
    price: 1929.99,
    rating: 4.9,
    image: "/ProductImages/Item_04.png",
    category: "electronics",
    description: "Latest iPhone with cutting-edge A18 Pro chip, advanced triple-camera system with 5x telephoto zoom, titanium design, and ultra-fast 5G connectivity. Available in stunning Pacific Blue.",
    inStock: true,
    featured: true,
    dateAdded: "2024-01-18",
    brand: "Apple",
    tags: ["smartphone", "5g", "camera", "ios", "premium"]
  },
  {
    id: 5,
    name: "HP Inspiron 3378x Laptop",
    price: 1459.99,
    rating: 4.3,
    image: "/ProductImages/Item_05.png",
    category: "electronics",
    description: "High-performance laptop with Intel Core i7 processor, 16GB RAM, 512GB SSD, and dedicated graphics card. Perfect for work, gaming, and creative tasks with 15.6-inch Full HD display.",
    inStock: true,
    featured: false,
    dateAdded: "2024-01-19",
    brand: "HP",
    tags: ["laptop", "gaming", "work", "performance", "ssd"]
  },
  {
    id: 6,
    name: "Samsung FHD TV 43' 2025 Model",
    price: 2029.99,
    rating: 4.2,
    image: "/ProductImages/Item_06.png",
    category: "electronics",
    description: "Smart 4K UHD TV with Crystal Display technology, built-in streaming apps, voice control, and HDR support. Features sleek design with ultra-thin bezels and premium picture quality.",
    inStock: true,
    featured: true,
    dateAdded: "2024-01-20",
    brand: "Samsung",
    tags: ["tv", "4k", "smart", "streaming", "hdr"]
  },
  {
    id: 7,
    name: "Saregama Carvaan 2024 Special Edition",
    price: 229.99,
    rating: 4.7,
    image: "/ProductImages/Item_07.png",
    category: "home",
    description: "Vintage-style digital music player with 5000+ preloaded Hindi songs from golden era. Features FM radio, Bluetooth connectivity, and premium wooden finish with retro design.",
    inStock: true,
    featured: false,
    dateAdded: "2024-01-21",
    brand: "Saregama",
    tags: ["music", "vintage", "hindi", "bluetooth", "retro"]
  },
  {
    id: 8,
    name: "Peter England - Maroon Shirt (Men's)",
    price: 29.99,
    rating: 4.0,
    image: "/ProductImages/Item_08.png",
    category: "clothing",
    description: "Premium formal shirt in rich maroon color, crafted from high-quality cotton blend fabric. Features classic fit, easy-care fabric, and professional styling perfect for office wear.",
    inStock: true,
    featured: false,
    dateAdded: "2024-01-22",
    brand: "Peter England",
    tags: ["shirt", "formal", "cotton", "office", "menswear"]
  },
  {
    id: 9,
    name: "Honor X360 Tab 2024 15'",
    price: 629.99,
    rating: 4.5,
    image: "/ProductImages/Item_09.png",
    category: "electronics",
    description: "Large 15-inch Android tablet with 2K display, powerful processor, and all-day battery life. Ideal for productivity, entertainment, and creative work with support for stylus input.",
    inStock: true,
    featured: false,
    dateAdded: "2024-01-23",
    brand: "Honor",
    tags: ["tablet", "android", "large-screen", "productivity", "stylus"]
  },
  {
    id: 10,
    name: "FlexiCool AC 1.5-Ton",
    price: 929.99,
    rating: 4.5,
    image: "/ProductImages/Item_10.png",
    category: "home",
    description: "Energy-efficient split air conditioner with inverter technology, rapid cooling, air purification filter, and smart connectivity. Features quiet operation and eco-friendly refrigerant.",
    inStock: true,
    featured: false,
    dateAdded: "2024-01-24",
    brand: "FlexiCool",
    tags: ["ac", "inverter", "energy-efficient", "cooling", "smart"]
  },
  {
    id: 11,
    name: "G-Shock XFactor - Gold Edition",
    price: 429.99,
    rating: 4.5,
    image: "/ProductImages/Item_11.png",
    category: "electronics",
    description: "Premium luxury sports watch with shock resistance, water resistance up to 200m, world time, stopwatch, and elegant gold-tone finish. Perfect blend of durability and style.",
    inStock: true,
    featured: true,
    dateAdded: "2024-01-25",
    brand: "Casio",
    tags: ["watch", "luxury", "sports", "water-resistant", "gold"]
  }
];

// Product management functions
export class ProductManager {
  constructor() {
    this.loadProducts();
  }

  // Load products from localStorage or use initial products
  loadProducts() {
    const savedProducts = localStorage.getItem('ecommerce_products');
    if (savedProducts) {
      try {
        this.products = JSON.parse(savedProducts);
      } catch (error) {
        console.error('Error loading products from localStorage:', error);
        this.products = [...initialProducts];
      }
    } else {
      this.products = [...initialProducts];
      this.saveProducts();
    }
  }

  // Save products to localStorage
  saveProducts() {
    try {
      localStorage.setItem('ecommerce_products', JSON.stringify(this.products));
    } catch (error) {
      console.error('Error saving products to localStorage:', error);
    }
  }

  // Get all products
  getAllProducts() {
    return [...this.products];
  }

  // Get product by ID
  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  // Add new product
  addProduct(productData) {
    const newProduct = {
      id: this.getNextId(),
      ...productData,
      dateAdded: new Date().toISOString().split('T')[0],
      inStock: productData.inStock ?? true,
      featured: productData.featured ?? false
    };

    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  // Update existing product
  updateProduct(id, updates) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      this.saveProducts();
      return this.products[index];
    }
    return null;
  }

  // Delete product
  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.saveProducts();
      return deletedProduct;
    }
    return null;
  }

  // Get next available ID
  getNextId() {
    const maxId = this.products.reduce((max, product) => 
      product.id > max ? product.id : max, 0
    );
    return maxId + 1;
  }

  // Get products by category
  getProductsByCategory(category) {
    if (category === 'all') return this.getAllProducts();
    return this.products.filter(product => product.category === category);
  }

  // Get featured products
  getFeaturedProducts() {
    return this.products.filter(product => product.featured);
  }

  // Search products
  searchProducts(query) {
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Reset to initial products (for testing/demo purposes)
  resetToInitialProducts() {
    this.products = [...initialProducts];
    this.saveProducts();
  }
}

// Create a singleton instance
export const productManager = new ProductManager();

// Export categories for consistency
export const productCategories = [
  { 
    id: 'all', 
    name: 'All Categories', 
    description: 'Browse all products',
    count: 0 // Will be calculated dynamically
  },
  { 
    id: 'electronics', 
    name: 'Electronics', 
    description: 'Phones, laptops, TVs, watches, and electronic gadgets',
    tags: ['smartphone', 'laptop', 'tv', 'headphones', 'tablet', 'watch', 'smartwatch']
  },
  { 
    id: 'clothing', 
    name: 'Clothing & Fashion', 
    description: 'Fashion apparel, shoes, and accessories',
    tags: ['shirt', 'shoes', 'formal', 'casual', 'menswear', 'athletic']
  },
  { 
    id: 'home', 
    name: 'Home & Appliances', 
    description: 'Home appliances, decor, and household items',
    tags: ['ac', 'music', 'appliance', 'cooling', 'entertainment']
  }
];

// Brand information
export const productBrands = [
  'Apple', 'Samsung', 'Sony', 'HP', 'Boat', 'Puma', 
  'Peter England', 'Honor', 'FlexiCool', 'Casio', 'Saregama'
];

// Utility function to get category by product
export const getCategoryByProduct = (product) => {
  return productCategories.find(cat => cat.id === product.category) || productCategories[0];
};

// Utility function to get products by brand
export const getProductsByBrand = (products, brand) => {
  return products.filter(product => 
    product.brand && product.brand.toLowerCase() === brand.toLowerCase()
  );
};

// Function to initialize products (useful for resetting to original state)
export const initializeProducts = () => {
  const manager = new ProductManager();
  
  // Clear existing products
  localStorage.removeItem('ecommerce_products');
  
  // Reload initial products
  manager.loadProducts();
  
  return manager.getAllProducts();
};