import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../contexts/ItemContext';
import { 
  Search, 
  Filter, 
  Grid, 
  List,
  Heart,
  Eye,
  ShoppingBag
} from 'lucide-react';

const Items = () => {
  const { items, loading, fetchItems, filters, setFilters } = useItems();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const categories = ['All', 'Clothing', 'Shoes', 'Accessories', 'Bags', 'Jewelry'];
  const types = ['All', 'Shirt', 'Pants', 'Dress', 'Jacket', 'Sweater', 'T-shirt', 'Jeans', 'Skirt'];
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const conditions = ['All', 'New', 'Like New', 'Good', 'Fair', 'Used'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category === '' || item.category === filters.category;
    const matchesType = filters.type === '' || item.type === filters.type;
    const matchesSize = filters.size === '' || item.size === filters.size;
    const matchesCondition = filters.condition === '' || item.condition === filters.condition;
    
    return matchesSearch && matchesCategory && matchesType && matchesSize && matchesCondition;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value === 'All' ? '' : value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      type: '',
      size: '',
      condition: ''
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Browse Items</h1>
              <p className="mt-1 text-gray-600">
                Discover pre-loved fashion items from our community
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-outline flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              onClick={clearFilters}
              className="btn-secondary"
            >
              Clear All
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category || 'All'}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={filters.type || 'All'}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <select
                    value={filters.size || 'All'}
                    onChange={(e) => handleFilterChange('size', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    value={filters.condition || 'All'}
                    onChange={(e) => handleFilterChange('condition', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Sort by:</span>
              <select className="border-none bg-transparent focus:ring-0">
                <option>Newest</option>
                <option>Oldest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items Grid/List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredItems.map((item) => (
              <div key={item._id} className="card group hover:shadow-lg transition-shadow duration-200">
                <div className="relative">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    {item.images && item.images[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors duration-200">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                    <Link
                      to={`/items/${item._id}`}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </Link>
                  </div>

                  {/* Status Badge */}
                  {item.status === 'swapped' && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                        Swapped
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
                    {item.pointsValue && (
                      <span className="text-sm font-medium text-primary-600">
                        {item.pointsValue} pts
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {item.condition}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.size}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-600">
                          {item.uploader?.fullname?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">
                        {item.uploader?.fullname || 'Anonymous'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || Object.values(filters).some(f => f !== '') 
                ? 'Try adjusting your search or filters.'
                : 'No items have been added to the platform yet.'
              }
            </p>
            {(searchTerm || Object.values(filters).some(f => f !== '')) && (
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Load More */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-8">
            <button className="btn-outline">
              Load More Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Items; 