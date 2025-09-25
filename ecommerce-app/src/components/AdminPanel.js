import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Package, ArrowLeft } from 'lucide-react';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Store</span>
              </Link>
              <div className="w-px h-6 bg-gray-300" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Settings className="h-4 w-4" />
              <span>Management Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Management Card */}
          <Link to="/admin/products" className="group">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Product Management</h3>
                  <p className="text-gray-600">Add, edit, and manage products</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <p>• Add new products with images</p>
                <p>• Edit existing product details</p>
                <p>• Manage inventory and categories</p>
              </div>
            </div>
          </Link>

          {/* More admin features can be added here */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-60">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Settings className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Order Management</h3>
                <p className="text-gray-600">Coming Soon</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <p>• View and manage orders</p>
              <p>• Track shipping status</p>
              <p>• Customer management</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-60">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Settings className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                <p className="text-gray-600">Coming Soon</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <p>• Sales reports</p>
              <p>• Product performance</p>
              <p>• Customer insights</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {JSON.parse(localStorage.getItem('ecommerce_products') || '[]').length}
              </div>
              <div className="text-gray-600">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {JSON.parse(localStorage.getItem('ecommerce_products') || '[]').filter(p => p.inStock).length}
              </div>
              <div className="text-gray-600">In Stock</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {JSON.parse(localStorage.getItem('ecommerce_products') || '[]').filter(p => p.featured).length}
              </div>
              <div className="text-gray-600">Featured</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;