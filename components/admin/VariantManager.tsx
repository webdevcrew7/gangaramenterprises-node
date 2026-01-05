'use client';

import { useState, useEffect } from 'react';

interface Variant {
    id: number;
    product_id: number;
    name: string;
    image: string;
    color: string;
    display_order: number;
}

interface VariantManagerProps {
    productId: number;
    productName: string;
    onClose: () => void;
}

export default function VariantManager({ productId, productName, onClose }: VariantManagerProps) {
    const [variants, setVariants] = useState<Variant[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingVariant, setEditingVariant] = useState<Variant | null>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        color: '#000000',
    });

    useEffect(() => {
        loadVariants();
    }, [productId]);

    const loadVariants = async () => {
        try {
            const response = await fetch(`/api/admin/products/${productId}/variants`);
            const data = await response.json();
            setVariants(data.variants || []);
        } catch (error) {
            console.error('Failed to load variants:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: uploadData,
            });
            const data = await response.json();
            if (data.url) {
                setFormData(prev => ({ ...prev, image: data.url }));
            } else {
                alert('Upload failed: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.image) {
            alert('Name and image are required');
            return;
        }

        try {
            if (editingVariant) {
                // Update existing variant
                await fetch(`/api/admin/variants/${editingVariant.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
                // Add new variant
                await fetch(`/api/admin/products/${productId}/variants`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }

            loadVariants();
            resetForm();
        } catch (error) {
            console.error('Save variant error:', error);
            alert('Failed to save variant');
        }
    };

    const handleEdit = (variant: Variant) => {
        setEditingVariant(variant);
        setFormData({
            name: variant.name,
            image: variant.image,
            color: variant.color,
        });
        setShowForm(true);
    };

    const handleDelete = async (variantId: number) => {
        if (!confirm('Delete this variant?')) return;

        try {
            await fetch(`/api/admin/variants/${variantId}`, { method: 'DELETE' });
            loadVariants();
        } catch (error) {
            console.error('Delete variant error:', error);
            alert('Failed to delete variant');
        }
    };

    const resetForm = () => {
        setFormData({ name: '', image: '', color: '#000000' });
        setEditingVariant(null);
        setShowForm(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-4 sm:p-6 border-b bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold">Manage Variants</h2>
                            <p className="text-gray-300 text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none">{productName}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition"
                        >
                            <i className="fa-solid fa-times text-xl"></i>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {/* Add Variant Button */}
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="mb-4 sm:mb-6 w-full sm:w-auto px-4 py-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-base"
                        >
                            <i className="fa-solid fa-plus mr-2"></i>
                            Add Variant
                        </button>
                    )}

                    {/* Variant Form */}
                    {showForm && (
                        <form onSubmit={handleSubmit} className="mb-4 sm:mb-6 p-4 bg-gray-50 rounded-lg border">
                            <h3 className="font-semibold mb-4">
                                {editingVariant ? 'Edit Variant' : 'Add New Variant'}
                            </h3>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Variant Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="e.g. Classic White"
                                        className="w-full px-4 py-3 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-base"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Color</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={formData.color}
                                            onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                                            className="w-12 h-10 border rounded cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={formData.color}
                                            onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                                            className="flex-1 px-3 py-2 border rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-1">Image *</label>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="w-full px-3 py-2 border rounded-lg"
                                            disabled={uploading}
                                        />
                                        {uploading && (
                                            <p className="text-sm text-blue-600 mt-1">
                                                <i className="fa-solid fa-spinner fa-spin mr-1"></i>
                                                Uploading to Cloudinary...
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">Or enter URL:</p>
                                        <input
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                            placeholder="https://..."
                                            className="w-full mt-1 px-3 py-2 border rounded-lg"
                                        />
                                    </div>
                                    {formData.image && (
                                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => (e.target as HTMLImageElement).src = '/assets/placeholder.svg'}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 sm:flex-none px-6 py-3 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-base"
                                >
                                    <i className="fa-solid fa-check mr-2"></i>
                                    {editingVariant ? 'Update' : 'Add'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 sm:py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition text-base"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Variants Grid */}
                    {loading ? (
                        <div className="text-center py-8">
                            <i className="fa-solid fa-spinner fa-spin text-3xl text-gray-400"></i>
                        </div>
                    ) : variants.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <i className="fa-solid fa-images text-4xl mb-2"></i>
                            <p>No variants yet. Add your first variant above.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {variants.map((variant) => (
                                <div
                                    key={variant.id}
                                    className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                                >
                                    <div className="aspect-square bg-gray-100">
                                        <img
                                            src={variant.image}
                                            alt={variant.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => (e.target as HTMLImageElement).src = '/assets/placeholder.svg'}
                                        />
                                    </div>
                                    <div className="p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span
                                                className="w-4 h-4 rounded-full border"
                                                style={{ backgroundColor: variant.color }}
                                            ></span>
                                            <span className="font-medium text-sm truncate">{variant.name}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(variant)}
                                                className="flex-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                                            >
                                                <i className="fa-solid fa-edit mr-1"></i>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(variant.id)}
                                                className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
