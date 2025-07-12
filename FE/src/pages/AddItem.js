import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../contexts/ItemContext';
import { Upload, X, Plus, ShoppingBag } from 'lucide-react';

const AddItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageFiles, setImageFiles] = useState([]); // store selected files
  const [uploading, setUploading] = useState(false); // show upload progress
  const { createItem } = useItems();
  const navigate = useNavigate();

  const categories = ['Clothing', 'Shoes', 'Accessories', 'Bags', 'Jewelry'];
  const types = ['Shirt', 'Pants', 'Dress', 'Jacket', 'Sweater', 'T-shirt', 'Jeans', 'Skirt'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Used'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
    // For preview only
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData({
      ...formData,
      images: [...formData.images, ...imageUrls]
    });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages
    });
    setImageFiles(newFiles);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    if (!formData.size) {
      newErrors.size = 'Size is required';
    }

    if (!formData.condition) {
      newErrors.condition = 'Condition is required';
    }

    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    let uploadedImageUrls = [];

    try {
      if (imageFiles.length > 0) {
        setUploading(true);
        // Upload each image to backend (Cloudinary)
        for (let i = 0; i < imageFiles.length; i++) {
          const formDataImg = new FormData();
          formDataImg.append('image', imageFiles[i]);
          const res = await fetch('/api/items/upload', {
            method: 'POST',
            body: formDataImg,
          });
          const data = await res.json();
          if (data.success && data.imageUrl) {
            uploadedImageUrls.push(data.imageUrl);
          }
        }
        setUploading(false);
      }
      const itemData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        images: uploadedImageUrls.length > 0 ? uploadedImageUrls : ['https://via.placeholder.com/400x400?text=Item+Image']
      };

      const result = await createItem(itemData);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error creating item:', error);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-br rounded-lg from-primary-500 to-secondary-500">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>
              <p className="mt-1 text-gray-600">
                Share your pre-loved fashion items with the community
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-4xl sm:px-6 lg:px-8">
        <div className="card">
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Basic Information</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                    Item Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                    placeholder="e.g., Blue Denim Jacket"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`input-field ${errors.category ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`input-field ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Describe your item in detail..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>

            {/* Item Details */}
            <div>
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Item Details</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-700">
                    Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`input-field ${errors.type ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Type</option>
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">
                    Size *
                  </label>
                  <select
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className={`input-field ${errors.size ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Size</option>
                    {sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  {errors.size && (
                    <p className="mt-1 text-sm text-red-600">{errors.size}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="condition" className="block mb-2 text-sm font-medium text-gray-700">
                    Condition *
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className={`input-field ${errors.condition ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Condition</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                  {errors.condition && (
                    <p className="mt-1 text-sm text-red-600">{errors.condition}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-700">
                  Tags (optional)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., vintage, casual, summer (separate with commas)"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Add tags to help others find your item
                </p>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Images</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Upload Images *
                  </label>
                  <div className="p-6 text-center rounded-lg border-2 border-gray-300 border-dashed transition-colors duration-200 hover:border-primary-400">
                    <Upload className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Drag and drop images here, or click to select
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-flex items-center space-x-2 cursor-pointer btn-primary"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Choose Images</span>
                      </label>
                    </div>
                  </div>
                  {errors.images && (
                    <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                  )}
                </div>

                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-gray-700">Preview</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="object-cover w-full h-32 rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="flex absolute top-2 right-2 justify-center items-center w-6 h-6 text-white bg-red-500 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-6 space-x-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full border-b-2 border-white animate-spin"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  'Add Item'
                )}
              </button>
            </div>
            {uploading && <div className="text-blue-600 font-medium mb-2">Uploading images to Cloudinary...</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem; 