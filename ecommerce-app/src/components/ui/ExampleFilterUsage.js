// Example usage of FilterSidebar in other components
import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';

const ExampleProductPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 2000 },
    category: 'all',
    rating: 0,
    sortBy: 'default'
  });

  // Example products data
  const products = [
    { id: 1, name: "Sample Product", price: 99.99, rating: 4.5, category: 'electronics' },
    // ... more products
  ];

  // Filter products based on current filters
  const filteredProducts = products.filter(product => {
    // Apply your filtering logic here
    return product.price >= filters.priceRange.min && 
           product.price <= filters.priceRange.max;
  });

  // Custom categories for this page
  const customCategories = [
    { value: 'all', label: 'All Items' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'books', label: 'Books' },
    { value: 'sports', label: 'Sports' }
  ];

  return (
    <div className="flex">
      {/* Reusable FilterSidebar */}
      <FilterSidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
        productCount={filteredProducts.length}
        categories={customCategories} // Custom categories for this page
      />
      
      <main className={`flex-1 transition-all duration-300 ${showFilters ? 'lg:ml-80' : 'lg:ml-0'}`}>
        <div className="p-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Toggle Filters
          </button>
          
          <h1>Another Product Page</h1>
          <p>Products found: {filteredProducts.length}</p>
          
          {/* Your product grid here */}
        </div>
      </main>
    </div>
  );
};

export default ExampleProductPage;