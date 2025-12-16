'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, DatabaseProduct } from '@/types';

export default function AdminDashboard() {
  const [products, setProducts] = useState<DatabaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'interiors' as Product['category'],
    description: '',
    image: '',
    image_data: '',
    image_type: '',
    badge: '',
    is_hidden: false,
    display_order: 0,
  });
  const [imageInputType, setImageInputType] = useState<'url' | 'upload'>('url');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check-auth');
      const data = await response.json();
      if (data.authenticated) {
        setAuthenticated(true);
        loadProducts();
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/admin/products?includeHidden=true');
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load products:', error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleEdit = (product: DatabaseProduct) => {
    setEditingProduct(product);
    const productAny = product as any;
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      image: product.image,
      image_data: productAny.image_data ? Buffer.from(productAny.image_data).toString('base64') : '',
      image_type: productAny.image_type || '',
      badge: product.badge || '',
      is_hidden: product.is_hidden === 1,
      display_order: product.display_order || 0,
    });
    // Determine if image is a URL or uploaded file/database
    setImageInputType(product.image.startsWith('http') ? 'url' : 'upload');
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'interiors',
      description: '',
      image: '',
      image_data: '',
      image_type: '',
      badge: '',
      is_hidden: false,
      display_order: products.length,
    });
    setImageInputType('url');
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Failed to upload image');
        setSelectedFile(null);
        setUploading(false);
        return;
      }

      const data = await response.json();
      // Store both URL and image data for database storage
      setFormData({ 
        ...formData, 
        image: data.url,
        image_data: data.data,
        image_type: data.type
      });
      setUploading(false);
    } catch (error) {
      alert('Failed to upload image. Please try again.');
      setSelectedFile(null);
      setUploading(false);
    }
  };

  const handleSave = async () => {
    // Validate image is provided
    if (!formData.image) {
      alert('Please provide an image URL or upload an image');
      return;
    }

    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Failed to save product');
        return;
      }

      setShowModal(false);
      setSelectedFile(null);
      loadProducts();
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        alert('Failed to delete product');
        return;
      }

      loadProducts();
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  const handleToggleVisibility = async (product: DatabaseProduct) => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_hidden: !product.is_hidden }),
      });

      if (!response.ok) {
        alert('Failed to update visibility');
        return;
      }

      loadProducts();
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  if (!authenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-gold-500"></i>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-gray-600 hover:text-gray-900 transition"
              target="_blank"
            >
              <i className="fa-solid fa-external-link-alt mr-2"></i>
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <i className="fa-solid fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Portfolio Items</h2>
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-gradient-to-r from-black to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-black transition font-semibold"
          >
            <i className="fa-solid fa-plus mr-2"></i>
            Add Product
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${
                product.is_hidden ? 'opacity-60 border-gray-300' : 'border-transparent'
              }`}
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src={
                    product.image && product.image.startsWith('/uploads/')
                      ? `/api/images/${product.id}`
                      : product.image
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to original image path if API fails
                    if (product.image && product.image.startsWith('/uploads/')) {
                      (e.target as HTMLImageElement).src = product.image;
                    }
                  }}
                />
                {product.is_hidden && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Hidden
                  </div>
                )}
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-gold-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {product.category}
                  </span>
                  <span className="text-xs text-gray-500">Order: {product.display_order}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                  >
                    <i className="fa-solid fa-edit mr-1"></i>
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleVisibility(product)}
                    className={`flex-1 px-3 py-2 rounded transition text-sm ${
                      product.is_hidden
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                    }`}
                  >
                    <i className={`fa-solid ${product.is_hidden ? 'fa-eye' : 'fa-eye-slash'} mr-1`}></i>
                    {product.is_hidden ? 'Show' : 'Hide'}
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <i className="fa-solid fa-box-open text-4xl mb-4"></i>
            <p>No products found. Add your first product to get started.</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Product['category'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="interiors">Interiors</option>
                    <option value="theatre">Home Theatre</option>
                    <option value="furniture">Furniture</option>
                    <option value="decor">Decor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image *
                  </label>
                  
                  {/* Toggle between URL and Upload */}
                  <div className="flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        setImageInputType('url');
                        setSelectedFile(null);
                        if (imageInputType === 'upload') {
                          setFormData({ ...formData, image: '' });
                        }
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                        imageInputType === 'url'
                          ? 'bg-gradient-to-r from-black to-gray-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <i className="fa-solid fa-link mr-2"></i>
                      URL
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageInputType('upload');
                        if (imageInputType === 'url' && formData.image.startsWith('http')) {
                          setFormData({ ...formData, image: '' });
                        }
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                        imageInputType === 'upload'
                          ? 'bg-gradient-to-r from-black to-gray-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <i className="fa-solid fa-upload mr-2"></i>
                      Upload
                    </button>
                  </div>

                  {/* URL Input */}
                  {imageInputType === 'url' && (
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  )}

                  {/* File Upload Input */}
                  {imageInputType === 'upload' && (
                    <div>
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                        {uploading ? (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <i className="fa-solid fa-spinner fa-spin text-2xl text-gold-500 mb-2"></i>
                            <p className="text-sm text-gray-500">Uploading...</p>
                          </div>
                        ) : selectedFile ? (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <i className="fa-solid fa-check-circle text-2xl text-green-500 mb-2"></i>
                            <p className="text-sm text-gray-600 font-medium">{selectedFile.name}</p>
                            <p className="text-xs text-gray-500 mt-1">Click to change</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <i className="fa-solid fa-cloud-arrow-up text-2xl text-gray-400 mb-2"></i>
                            <p className="text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                          </div>
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileSelect}
                          disabled={uploading}
                        />
                      </label>
                      {formData.image && (formData.image.startsWith('db://') || formData.image_data) && (
                        <p className="text-xs text-gray-500 mt-2">
                          <i className="fa-solid fa-check text-green-500 mr-1"></i>
                          Image will be stored in database
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Badge
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="e.g., Top Seller, Trending"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_hidden}
                        onChange={(e) => setFormData({ ...formData, is_hidden: e.target.checked })}
                        className="w-5 h-5 text-gold-500 rounded focus:ring-gold-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Hide from public</span>
                    </label>
                  </div>
                </div>

                {formData.image && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preview
                    </label>
                    <img
                      src={
                        formData.image_data && formData.image_type
                          ? `data:${formData.image_type};base64,${formData.image_data}`
                          : formData.image.startsWith('db://') && editingProduct
                          ? `/api/images/${editingProduct.id}`
                          : formData.image.startsWith('/api/images/')
                          ? formData.image
                          : formData.image
                      }
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-2 bg-gradient-to-r from-black to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-black transition font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

