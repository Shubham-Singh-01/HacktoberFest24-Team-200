import React from "react";
import { Sliders, Star, Filter, X } from "lucide-react";

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  productCount = 0,
  categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home', label: 'Home & Garden' }
  ]
}) => {
  const handlePriceChange = (type, value) => {
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: Number(value)
      }
    });
  };

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: { min: 0, max: 2000 },
      category: 'all',
      rating: 0,
      sortBy: 'default'
    });
  };

  return (
    <div className="w-full h-full bg-white border-r border-gray-200">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold flex items-center text-gray-800">
              <Sliders className="h-5 w-5 mr-2 text-blue-600" />
              Filters & Sort
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
              aria-label="Close filters"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Results Count */}
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <span className="font-medium text-blue-800">{productCount}</span> products found
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
            >
              Clear All Filters
            </button>

            {/* Sort By */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-800 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Sort By
              </h3>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">Price Range</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-gray-600">Minimum</label>
                    <span className="text-sm font-medium text-gray-800">${filters.priceRange.min}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="10"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-gray-600">Maximum</label>
                    <span className="text-sm font-medium text-gray-800">${filters.priceRange.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="10"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                  <span>${filters.priceRange.min}</span>
                  <span>-</span>
                  <span>${filters.priceRange.max}</span>
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">Category</h3>
              <div className="space-y-3">
                {categories.map(({ value, label }) => (
                  <label key={value} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value={value}
                      checked={filters.category === value}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">Minimum Rating</h3>
              <div className="space-y-3">
                {[
                  { value: 0, label: 'Any Rating', stars: 0 },
                  { value: 4, label: '4+ Stars', stars: 4 },
                  { value: 4.5, label: '4.5+ Stars', stars: 4.5 }
                ].map(({ value, label, stars }) => (
                  <label key={value} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      value={value}
                      checked={filters.rating === value}
                      onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex items-center ml-3">
                      {stars === 0 ? (
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                          {label}
                        </span>
                      ) : (
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(stars)
                                    ? 'text-yellow-400 fill-current'
                                    : i === Math.floor(stars) && stars % 1 !== 0
                                    ? 'text-yellow-400 fill-current opacity-50'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                            {label}
                          </span>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default FilterSidebar;