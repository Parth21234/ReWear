import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SwapContext = createContext();

export const useSwaps = () => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error('useSwaps must be used within a SwapProvider');
  }
  return context;
};

export const SwapProvider = ({ children }) => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserSwaps = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/swaps');
      if (response.data.success) {
        setSwaps(response.data.data);
      } else {
        toast.error('Failed to fetch swaps');
      }
    } catch (error) {
      console.error('Error fetching swaps:', error);
      toast.error('Failed to fetch swaps');
    } finally {
      setLoading(false);
    }
  };

  const createSwapRequest = async (itemId, message) => {
    try {
      const response = await axios.post('/api/swaps', {
        itemId,
        message
      });
      if (response.data.success) {
        setSwaps(prev => [response.data.data, ...prev]);
        toast.success('Swap request sent successfully!');
        return { success: true };
      } else {
        toast.error(response.data.message || 'Failed to send swap request');
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send swap request';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateSwapStatus = async (swapId, status) => {
    try {
      const response = await axios.put(`/api/swaps/${swapId}`, { status });
      if (response.data.success) {
        setSwaps(prev => prev.map(swap => 
          swap._id === swapId ? response.data.data : swap
        ));
        toast.success(`Swap ${status} successfully!`);
        return { success: true };
      } else {
        toast.error(response.data.message || 'Failed to update swap status');
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update swap status';
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
    swaps,
    loading,
    fetchUserSwaps,
    createSwapRequest,
    updateSwapStatus
  };

  return (
    <SwapContext.Provider value={value}>
      {children}
    </SwapContext.Provider>
  );
}; 