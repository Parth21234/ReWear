import React, { useState, useEffect } from 'react';
import { useSwaps } from '../contexts/SwapContext';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageCircle,
  User
} from 'lucide-react';

const Swaps = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const { swaps, loading, fetchUserSwaps, updateSwapStatus } = useSwaps();

  useEffect(() => {
    fetchUserSwaps();
  }, [fetchUserSwaps]);

  const filteredSwaps = swaps.filter(swap => {
    if (activeTab === 'pending') return swap.status === 'pending';
    if (activeTab === 'accepted') return swap.status === 'accepted';
    if (activeTab === 'completed') return swap.status === 'completed';
    if (activeTab === 'declined') return swap.status === 'declined';
    return true;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'declined':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'completed':
        return 'Completed';
      case 'declined':
        return 'Declined';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSwapAction = async (swapId, action) => {
    await updateSwapStatus(swapId, action);
  };

  const isOwner = (swap) => {
    // Check if current user is the owner of the item
    return swap.owner?._id === swap.requester?._id ? false : true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Swaps</h1>
              <p className="mt-1 text-gray-600">
                Manage your swap requests and track your exchange history
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'all', label: 'All Swaps', count: swaps.length },
                { id: 'pending', label: 'Pending', count: swaps.filter(s => s.status === 'pending').length },
                { id: 'accepted', label: 'Accepted', count: swaps.filter(s => s.status === 'accepted').length },
                { id: 'completed', label: 'Completed', count: swaps.filter(s => s.status === 'completed').length },
                { id: 'declined', label: 'Declined', count: swaps.filter(s => s.status === 'declined').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Swaps List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredSwaps.length > 0 ? (
          <div className="space-y-6">
            {filteredSwaps.map((swap) => (
              <div key={swap._id} className="card">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(swap.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {isOwner(swap) ? 'Swap Request Received' : 'Swap Request Sent'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(swap.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(swap.status)}`}>
                      {getStatusText(swap.status)}
                    </span>
                  </div>

                  {/* Swap Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {/* Your Item */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Your Item</h4>
                      <div className="flex items-center space-x-3">
                        {swap.item?.images?.[0] ? (
                          <img
                            src={swap.item.images[0]}
                            alt={swap.item.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{swap.item?.title || 'Item'}</p>
                          <p className="text-sm text-gray-600">{swap.item?.category} • {swap.item?.size}</p>
                        </div>
                      </div>
                    </div>

                    {/* Their Item */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        {isOwner(swap) ? 'Requested Item' : 'Their Item'}
                      </h4>
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Swap Request</p>
                          <p className="text-sm text-gray-600">Item exchange</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center space-x-3 mb-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {isOwner(swap) ? swap.requester?.fullname : swap.owner?.fullname}
                      </p>
                      <p className="text-sm text-gray-600">
                        {isOwner(swap) ? 'wants to swap with you' : 'accepted your swap request'}
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  {swap.message && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <MessageCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                        <p className="text-gray-700">{swap.message}</p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {swap.status === 'pending' && isOwner(swap) && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleSwapAction(swap._id, 'accepted')}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Accept Swap</span>
                      </button>
                      <button
                        onClick={() => handleSwapAction(swap._id, 'declined')}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                    </div>
                  )}

                  {swap.status === 'accepted' && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Swap accepted! Arrange a meeting to exchange items.
                      </p>
                      <button
                        onClick={() => handleSwapAction(swap._id, 'completed')}
                        className="btn-primary"
                      >
                        Mark as Completed
                      </button>
                    </div>
                  )}

                  {swap.status === 'completed' && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Swap completed successfully!</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No swaps found
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'all' 
                ? 'You haven\'t made any swap requests yet.'
                : `No ${activeTab} swaps found.`
              }
            </p>
            <button className="btn-primary">
              Browse Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Swaps; 