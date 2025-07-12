import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ItemContext = createContext();

export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    size: '',
    condition: ''
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/items');
      if (response.data.success) {
        setItems(response.data.data);
      } else {
        toast.error('Failed to fetch items');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData) => {
    try {
      const response = await axios.post('/api/items', itemData);
      if (response.data.success) {
        setItems(prev => [response.data.data, ...prev]);
        toast.success('Item created successfully!');
        return { success: true };
      } else {
        toast.error(response.data.message || 'Failed to create item');
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create item';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateItem = async (id, itemData) => {
    try {
      const response = await axios.put(`/api/items/${id}`, itemData);
      if (response.data.success) {
        setItems(prev => prev.map(item => 
          item._id === id ? response.data.data : item
        ));
        toast.success('Item updated successfully!');
        return { success: true };
      } else {
        toast.error(response.data.message || 'Failed to update item');
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update item';
      toast.error(message);
      return { success: false, message };
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`/api/items/${id}`);
      if (response.data.success) {
        setItems(prev => prev.filter(item => item._id !== id));
        toast.success('Item deleted successfully!');
        return { success: true };
      } else {
        toast.error(response.data.message || 'Failed to delete item');
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete item';
      toast.error(message);
      return { success: false, message };
    }
  };

  const getItemById = async (id) => {
    try {
      const response = await axios.get(`/api/items/${id}`);
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error('Failed to fetch item details');
        return null;
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      toast.error('Failed to fetch item details');
      return null;
    }
  };

  const filteredItems = items.filter(item => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.type && item.type !== filters.type) return false;
    if (filters.size && item.size !== filters.size) return false;
    if (filters.condition && item.condition !== filters.condition) return false;
    return true;
  });

  const value = {
    items: filteredItems,
    loading,
    filters,
    setFilters,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    getItemById
  };

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
}; 