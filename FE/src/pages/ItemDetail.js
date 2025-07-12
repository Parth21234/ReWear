import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useItems } from '../contexts/ItemContext';
import { useAuth } from '../contexts/AuthContext';
import { useSwaps } from '../contexts/SwapContext';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MessageCircle, 
  User, 
  Calendar,
  Tag,
  ShoppingBag
} from 'lucide-react';
import toast from 'react-hot-toast';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById } = useItems();
  const { user, isAuthenticated } = useAuth();
  const { createSwapRequest } = useSwaps();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');
  const [swapLoading, setSwapLoading] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemData = await getItemById(id);
        setItem(itemData);
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, getItemById]);

  const handleSwapRequest = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowSwapModal(true);
  };

  const handleSendSwapRequest = async () => {
    if (!swapMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setSwapLoading(true);
    try {
      const result = await createSwapRequest(id, swapMessage);
      if (result.success) {
        setShowSwapModal(false);
        setSwapMessage('');
        navigate('/swaps');
      }
    } catch (error) {
      console.error('Error sending swap request:', error);
    } finally {
      setSwapLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Item not found</h2>
          <p className="text-gray-600 mb-4">The item you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/items')}
            className="btn-primary"
          >
            Browse Items
          </button>
        </div>
      </div>
    );
  }

  const isOwner = user && item.uploader?._id === user._id;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              {item.images && item.images[selectedImage] ? (
                <img
                  src={item.images[selectedImage]}
                  alt={item.title}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {item.images && item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? 'border-primary-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <p className="text-lg text-gray-600">{item.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Item Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-semibold text-gray-900">{item.category}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-semibold text-gray-900">{item.type}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Size</p>
                <p className="font-semibold text-gray-900">{item.size}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Condition</p>
                <p className="font-semibold text-gray-900 capitalize">{item.condition}</p>
              </div>
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Owner Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Listed by</p>
                  <p className="text-sm text-gray-600">{item.uploader?.fullname || 'Anonymous'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Listed {new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              {!isOwner ? (
                <>
                  <button
                    onClick={handleSwapRequest}
                    className="w-full btn-primary py-3 text-lg font-medium"
                  >
                    Request Swap
                  </button>
                  <button className="w-full btn-outline py-3 text-lg font-medium flex items-center justify-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Message Owner</span>
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => navigate(`/items/${item._id}/edit`)}
                    className="w-full btn-primary py-3 text-lg font-medium"
                  >
                    Edit Item
                  </button>
                  <button className="w-full btn-secondary py-3 text-lg font-medium">
                    Mark as Swapped
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Items */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder for similar items */}
            <div className="card p-4 text-center">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">More items coming soon...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Request Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Swap</h3>
            <p className="text-gray-600 mb-4">
              Send a swap request to the owner of "{item.title}". They'll be notified and can accept or decline your request.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (optional)
              </label>
              <textarea
                value={swapMessage}
                onChange={(e) => setSwapMessage(e.target.value)}
                className="input-field"
                rows={3}
                placeholder="Tell the owner why you'd like to swap..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 btn-secondary"
                disabled={swapLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSendSwapRequest}
                disabled={swapLoading}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {swapLoading ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail; 