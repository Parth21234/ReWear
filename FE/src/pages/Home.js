import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../contexts/ItemContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Heart, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const { items, fetchItems } = useItems();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const recentItems = items.slice(0, 6);

  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Easy Exchange",
      description: "Swap your pre-loved clothing with others in the community"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Sustainable Fashion",
      description: "Reduce environmental impact by giving clothes a second life"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Connect with like-minded fashion enthusiasts"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Eco-Friendly",
      description: "Contribute to a more sustainable fashion industry"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Sustainable Fashion
              <span className="block text-3xl md:text-5xl mt-2">Exchange Platform</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Join the revolution of conscious fashion. Exchange, discover, and contribute to a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/items" 
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Browse Items</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              {!isAuthenticated && (
                <Link 
                  to="/register" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
                >
                  Join Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ReWear?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're making sustainable fashion accessible to everyone through our innovative exchange platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-primary-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Items Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Items
            </h2>
            <p className="text-xl text-gray-600">
              Discover the newest additions to our community
            </p>
          </div>

          {recentItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentItems.map((item) => (
                <div key={item._id} className="card overflow-hidden group">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200 group-hover:opacity-75 transition-opacity duration-200">
                    {item.images && item.images[0] ? (
                      <img 
                        src={item.images[0]} 
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <span className="text-sm text-gray-500 capitalize">
                        {item.condition}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                          {item.category}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {item.size}
                        </span>
                      </div>
                      <Link 
                        to={`/items/${item._id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No items yet
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to add an item to our community!
              </p>
              {isAuthenticated && (
                <Link 
                  to="/add-item" 
                  className="btn-primary"
                >
                  Add Your First Item
                </Link>
              )}
            </div>
          )}

          {recentItems.length > 0 && (
            <div className="text-center mt-12">
              <Link 
                to="/items" 
                className="btn-outline"
              >
                View All Items
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Sustainable Fashion Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who are already making a difference through conscious fashion choices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/register" 
                  className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link 
                to="/add-item" 
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
              >
                Add Your First Item
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 