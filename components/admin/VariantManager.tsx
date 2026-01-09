'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Sortable from 'sortablejs';

interface VariantImage {
    id: number;
    variant_id: number;
    image_url: string;
    display_order: number;
}

interface Variant {
    id: number;
    product_id: number;
    name: string;
    image: string;
    color: string;
    display_order: number;
    images?: VariantImage[];
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
    const [uploadingExtra, setUploadingExtra] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
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
            const variantsData = data.variants || [];

            // Load images for each variant
            const variantsWithImages = await Promise.all(
                variantsData.map(async (v: Variant) => {
                    try {
                        const imgRes = await fetch(`/api/admin/variants/${v.id}/images`);
                        const imgData = await imgRes.json();
                        return { ...v, images: imgData.images || [] };
                    } catch {
                        return { ...v, images: [] };
                    }
                })
            );

            setVariants(variantsWithImages);

            // Also update selectedVariant if it's currently selected
            if (selectedVariant) {
                const updatedSelectedVariant = variantsWithImages.find(v => v.id === selectedVariant.id);
                if (updatedSelectedVariant) {
                    setSelectedVariant(updatedSelectedVariant);
                }
            }
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

    const handleExtraImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, variantId: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingExtra(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            // First upload to Cloudinary
            const uploadRes = await fetch('/api/admin/upload', {
                method: 'POST',
                body: uploadData,
            });
            const uploadResult = await uploadRes.json();

            if (uploadResult.url) {
                // Then add to variant_images
                await fetch(`/api/admin/variants/${variantId}/images`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image_url: uploadResult.url }),
                });
                loadVariants();
            } else {
                alert('Upload failed: ' + (uploadResult.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Extra image upload error:', error);
            alert('Failed to upload image');
        } finally {
            setUploadingExtra(false);
        }
    };

    const handleDeleteImage = async (variantId: number, imageId: number) => {
        if (!confirm('Delete this image?')) return;

        try {
            await fetch(`/api/admin/variants/${variantId}/images/${imageId}`, {
                method: 'DELETE',
            });
            loadVariants();
        } catch (error) {
            console.error('Delete image error:', error);
            alert('Failed to delete image');
        }
    };

    const handleMoveImage = async (variantId: number, imageId: number, direction: 'up' | 'down') => {
        const variant = variants.find(v => v.id === variantId);
        if (!variant?.images) return;

        const images = [...variant.images];
        const index = images.findIndex(img => img.id === imageId);
        if (index === -1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= images.length) return;

        // Swap display orders
        const currentOrder = images[index].display_order;
        const targetOrder = images[newIndex].display_order;

        try {
            await Promise.all([
                fetch(`/api/admin/variants/${variantId}/images/${imageId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ display_order: targetOrder }),
                }),
                fetch(`/api/admin/variants/${variantId}/images/${images[newIndex].id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ display_order: currentOrder }),
                }),
            ]);
            loadVariants();
        } catch (error) {
            console.error('Reorder error:', error);
        }
    };

    // Refs for SortableJS containers
    const editGalleryRef = useRef<HTMLDivElement>(null);
    const viewGalleryRef = useRef<HTMLDivElement>(null);
    const sortableInstanceRef = useRef<Sortable | null>(null);
    const viewSortableInstanceRef = useRef<Sortable | null>(null);

    // Handle reorder via SortableJS
    const handleReorder = useCallback(async (variantId: number, oldIndex: number, newIndex: number) => {
        if (oldIndex === newIndex) return;

        const variant = variants.find(v => v.id === variantId);
        if (!variant?.images) return;

        const images = [...variant.images];
        const [movedItem] = images.splice(oldIndex, 1);
        images.splice(newIndex, 0, movedItem);

        // Update display orders for all images
        try {
            const updates = images.map((img, idx) =>
                fetch(`/api/admin/variants/${variantId}/images/${img.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ display_order: idx }),
                })
            );
            await Promise.all(updates);
            loadVariants();
        } catch (error) {
            console.error('Reorder error:', error);
        }
    }, [variants]);

    // Initialize SortableJS for edit gallery
    useEffect(() => {
        if (editGalleryRef.current && selectedVariant && showForm) {
            // Destroy previous instance
            if (sortableInstanceRef.current) {
                sortableInstanceRef.current.destroy();
            }

            sortableInstanceRef.current = Sortable.create(editGalleryRef.current, {
                animation: 150,
                handle: '.drag-handle',
                ghostClass: 'sortable-ghost',
                chosenClass: 'sortable-chosen',
                dragClass: 'sortable-drag',
                filter: '.no-drag',
                onEnd: (evt) => {
                    if (evt.oldIndex !== undefined && evt.newIndex !== undefined && selectedVariant) {
                        handleReorder(selectedVariant.id, evt.oldIndex, evt.newIndex);
                    }
                },
            });
        }

        return () => {
            if (sortableInstanceRef.current) {
                sortableInstanceRef.current.destroy();
                sortableInstanceRef.current = null;
            }
        };
    }, [selectedVariant, showForm, handleReorder]);

    // Initialize SortableJS for view gallery
    useEffect(() => {
        if (viewGalleryRef.current && selectedVariant && !showForm) {
            // Destroy previous instance
            if (viewSortableInstanceRef.current) {
                viewSortableInstanceRef.current.destroy();
            }

            viewSortableInstanceRef.current = Sortable.create(viewGalleryRef.current, {
                animation: 150,
                handle: '.drag-handle',
                ghostClass: 'sortable-ghost',
                chosenClass: 'sortable-chosen',
                dragClass: 'sortable-drag',
                filter: '.no-drag',
                onEnd: (evt) => {
                    if (evt.oldIndex !== undefined && evt.newIndex !== undefined && selectedVariant) {
                        // Adjust index since primary image is first (not draggable)
                        handleReorder(selectedVariant.id, evt.oldIndex, evt.newIndex);
                    }
                },
            });
        }

        return () => {
            if (viewSortableInstanceRef.current) {
                viewSortableInstanceRef.current.destroy();
                viewSortableInstanceRef.current = null;
            }
        };
    }, [selectedVariant, showForm, handleReorder]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.image) {
            alert('Name and image are required');
            return;
        }

        try {
            if (editingVariant) {
                await fetch(`/api/admin/variants/${editingVariant.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
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
        setSelectedVariant(variant); // Also select to show image gallery
        setFormData({
            name: variant.name,
            image: variant.image,
            color: variant.color,
        });
        setShowForm(true);
    };

    const handleDelete = async (variantId: number) => {
        if (!confirm('Delete this variant and all its images?')) return;

        try {
            await fetch(`/api/admin/variants/${variantId}`, { method: 'DELETE' });
            loadVariants();
            if (selectedVariant?.id === variantId) {
                setSelectedVariant(null);
            }
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
            <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full sm:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
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
                                <label className="block text-sm font-medium mb-1">Primary Image *</label>
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
                                                Uploading...
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

                            {/* Image Gallery - Show when editing a variant */}
                            {editingVariant && selectedVariant && (
                                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-semibold text-blue-900">
                                            <i className="fa-solid fa-images mr-2"></i>
                                            Additional Images
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={() => loadVariants()}
                                            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition flex items-center gap-1"
                                            title="Refresh images"
                                        >
                                            <i className="fa-solid fa-refresh"></i>
                                            <span className="hidden sm:inline">Refresh</span>
                                        </button>
                                    </div>

                                    {/* Image Gallery */}
                                    <div ref={editGalleryRef} className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                                        {/* Additional Images */}
                                        {selectedVariant.images?.map((img, index) => (
                                            <div
                                                key={img.id}
                                                data-id={img.id}
                                                className="aspect-square bg-white rounded-lg overflow-hidden border-2 border-transparent relative group transition-all duration-200"
                                            >
                                                {/* Drag handle - must have drag-handle class for SortableJS */}
                                                <div className="drag-handle absolute top-1 left-1 z-10 w-8 h-8 bg-white/90 rounded flex items-center justify-center cursor-grab active:cursor-grabbing shadow hover:bg-blue-100">
                                                    <i className="fa-solid fa-grip-vertical text-gray-600"></i>
                                                </div>
                                                {/* Order badge */}
                                                <div className="absolute top-1 right-1 z-10 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                                                    {index + 1}
                                                </div>
                                                <img
                                                    src={img.image_url}
                                                    alt={`Image ${index + 2}`}
                                                    className="w-full h-full object-cover pointer-events-none"
                                                />
                                                {/* Delete button - always visible in bottom right */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteImage(selectedVariant.id, img.id); }}
                                                    className="absolute bottom-1 right-1 z-10 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 shadow-md transition"
                                                    title="Delete image"
                                                >
                                                    <i className="fa-solid fa-trash text-xs"></i>
                                                </button>
                                            </div>
                                        ))}

                                        {/* Add Image Button */}
                                        <label className="aspect-square bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleExtraImageUpload(e, selectedVariant.id)}
                                                disabled={uploadingExtra}
                                            />
                                            {uploadingExtra ? (
                                                <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-500"></i>
                                            ) : (
                                                <>
                                                    <i className="fa-solid fa-plus text-2xl text-gray-400 mb-1"></i>
                                                    <span className="text-xs text-gray-500">Add Image</span>
                                                </>
                                            )}
                                        </label>
                                    </div>

                                    <p className="mt-3 text-xs text-gray-500">
                                        <i className="fa-solid fa-info-circle mr-1"></i>
                                        Upload additional images for this variant. Primary image is set above.
                                    </p>
                                </div>
                            )}
                        </form>
                    )}

                    {/* Variants Grid - Hide when editing to reduce clutter */}
                    {
                        !showForm && (loading ? (
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
                                        className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer ${selectedVariant?.id === variant.id ? 'ring-2 ring-blue-500' : ''}`}
                                        onClick={() => setSelectedVariant(selectedVariant?.id === variant.id ? null : variant)}
                                    >
                                        <div className="aspect-square bg-gray-100 relative">
                                            <img
                                                src={variant.image}
                                                alt={variant.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => (e.target as HTMLImageElement).src = '/assets/placeholder.svg'}
                                            />
                                            {/* Image count badge */}
                                            <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                                                <i className="fa-solid fa-images mr-1"></i>
                                                {1 + (variant.images?.length || 0)}
                                            </span>
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
                                                    onClick={(e) => { e.stopPropagation(); handleEdit(variant); }}
                                                    className="flex-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                                                >
                                                    <i className="fa-solid fa-edit mr-1"></i>
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(variant.id); }}
                                                    className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    }

                    {/* Selected Variant Image Gallery - only show when NOT editing (clicking card to view) */}
                    {
                        !showForm && selectedVariant && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-blue-900">
                                        <i className="fa-solid fa-images mr-2"></i>
                                        Images for "{selectedVariant.name}"
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => loadVariants()}
                                            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition flex items-center gap-1"
                                            title="Refresh images"
                                        >
                                            <i className="fa-solid fa-refresh"></i>
                                            <span className="hidden sm:inline">Refresh</span>
                                        </button>
                                        <button
                                            onClick={() => setSelectedVariant(null)}
                                            className="text-blue-600 hover:text-blue-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-100"
                                        >
                                            <i className="fa-solid fa-times"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Image Gallery */}
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {/* Primary Image (not deletable/draggable) */}
                                    <div className="aspect-square bg-white rounded-lg overflow-hidden border-2 border-green-400 relative no-drag">
                                        <img
                                            src={selectedVariant.image}
                                            alt="Primary"
                                            className="w-full h-full object-cover"
                                        />
                                        <span className="absolute bottom-1 left-1 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                                            Primary
                                        </span>
                                    </div>
                                </div>

                                {/* Sortable Additional Images */}
                                {selectedVariant.images && selectedVariant.images.length > 0 && (
                                    <div ref={viewGalleryRef} className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-3">
                                        {selectedVariant.images.map((img, index) => (
                                            <div
                                                key={img.id}
                                                data-id={img.id}
                                                className="aspect-square bg-white rounded-lg overflow-hidden border-2 border-transparent relative group transition-all duration-200"
                                            >
                                                {/* Drag handle - must have drag-handle class for SortableJS */}
                                                <div className="drag-handle absolute top-1 left-1 z-10 w-8 h-8 bg-white/90 rounded flex items-center justify-center cursor-grab active:cursor-grabbing shadow hover:bg-blue-100">
                                                    <i className="fa-solid fa-grip-vertical text-gray-600"></i>
                                                </div>
                                                {/* Order badge */}
                                                <div className="absolute top-1 right-1 z-10 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                                                    {index + 1}
                                                </div>
                                                <img
                                                    src={img.image_url}
                                                    alt={`Image ${index + 2}`}
                                                    className="w-full h-full object-cover pointer-events-none"
                                                />
                                                {/* Delete button - always visible in bottom right */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteImage(selectedVariant.id, img.id); }}
                                                    className="absolute bottom-1 right-1 z-10 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 shadow-md transition"
                                                    title="Delete image"
                                                >
                                                    <i className="fa-solid fa-trash text-xs"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add Image Button */}
                                <div className="mt-3">
                                    <label className="inline-flex aspect-square w-20 bg-white rounded-lg border-2 border-dashed border-gray-300 items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleExtraImageUpload(e, selectedVariant.id)}
                                            disabled={uploadingExtra}
                                        />
                                        {uploadingExtra ? (
                                            <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-500"></i>
                                        ) : (
                                            <div className="text-center">
                                                <i className="fa-solid fa-plus text-2xl text-gray-400 mb-1"></i>
                                                <span className="text-xs text-gray-500 block">Add</span>
                                            </div>
                                        )}
                                    </label>
                                </div>

                                <p className="mt-3 text-xs text-gray-500">
                                    <i className="fa-solid fa-info-circle mr-1"></i>
                                    Click a variant card above to manage its images. Primary image shows on the product card.
                                </p>
                            </div>
                        )
                    }
                </div >
            </div >
        </div >
    );
}
