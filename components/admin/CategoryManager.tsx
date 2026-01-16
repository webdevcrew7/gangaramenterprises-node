'use client';

import { useState, useEffect } from 'react';
import { DatabaseCategory } from '@/types';

interface CategoryManagerProps {
    onClose: () => void;
    onCategoriesChange: () => void;
}

const ICON_OPTIONS = [
    { value: 'fa-couch', label: 'Couch' },
    { value: 'fa-tv', label: 'TV' },
    { value: 'fa-chair', label: 'Chair' },
    { value: 'fa-window-maximize', label: 'Window' },
    { value: 'fa-bed', label: 'Bed' },
    { value: 'fa-door-open', label: 'Door' },
    { value: 'fa-lightbulb', label: 'Lightbulb' },
    { value: 'fa-utensils', label: 'Utensils' },
    { value: 'fa-bath', label: 'Bath' },
    { value: 'fa-home', label: 'Home' },
    { value: 'fa-paint-roller', label: 'Paint Roller' },
    { value: 'fa-ruler', label: 'Ruler' },
    { value: 'fa-folder', label: 'Folder' },
];

export default function CategoryManager({ onClose, onCategoriesChange }: CategoryManagerProps) {
    const [categories, setCategories] = useState<DatabaseCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<DatabaseCategory | null>(null);
    const [formData, setFormData] = useState({
        slug: '',
        name: '',
        icon: 'fa-folder',
        display_order: 0,
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await fetch('/api/admin/categories');
            const data = await response.json();
            setCategories(data.categories || []);
        } catch (error) {
            console.error('Failed to load categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingCategory(null);
        setFormData({
            slug: '',
            name: '',
            icon: 'fa-folder',
            display_order: categories.length,
        });
        setShowForm(true);
    };

    const handleEdit = (category: DatabaseCategory) => {
        setEditingCategory(category);
        setFormData({
            slug: category.slug,
            name: category.name,
            icon: category.icon,
            display_order: category.display_order,
        });
        setShowForm(true);
    };

    const handleDelete = async (category: DatabaseCategory) => {
        if (!confirm(`Delete category "${category.name}"? This cannot be undone.`)) return;

        try {
            const response = await fetch(`/api/admin/categories/${category.id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Failed to delete category');
                return;
            }

            loadCategories();
            onCategoriesChange();
        } catch (error) {
            console.error('Delete category error:', error);
            alert('Failed to delete category');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.slug || !formData.name) {
            alert('Slug and name are required');
            return;
        }

        setSaving(true);

        try {
            const url = editingCategory
                ? `/api/admin/categories/${editingCategory.id}`
                : '/api/admin/categories';
            const method = editingCategory ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Failed to save category');
                setSaving(false);
                return;
            }

            setShowForm(false);
            loadCategories();
            onCategoriesChange();
        } catch (error) {
            console.error('Save category error:', error);
            alert('Failed to save category');
        } finally {
            setSaving(false);
        }
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-4 sm:p-6 border-b bg-gradient-to-r from-purple-900 to-purple-700 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold">Manage Categories</h2>
                            <p className="text-purple-200 text-xs sm:text-sm">Add, edit, or remove product categories</p>
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
                    {/* Add Category Button */}
                    {!showForm && (
                        <button
                            onClick={handleAdd}
                            className="mb-4 sm:mb-6 w-full sm:w-auto px-4 py-3 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-base"
                        >
                            <i className="fa-solid fa-plus mr-2"></i>
                            Add Category
                        </button>
                    )}

                    {/* Category Form */}
                    {showForm && (
                        <form onSubmit={handleSubmit} className="mb-4 sm:mb-6 p-4 bg-gray-50 rounded-lg border">
                            <h3 className="font-semibold mb-4">
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h3>

                            {/* Info alert for new categories */}
                            {!editingCategory && (
                                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                                    <i className="fa-solid fa-info-circle text-blue-500 mt-0.5"></i>
                                    <p className="text-sm text-blue-700">
                                        New categories will only appear on the website once you add at least one product to them.
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => {
                                            const name = e.target.value;
                                            setFormData(prev => ({
                                                ...prev,
                                                name,
                                                // Auto-generate slug if not editing
                                                slug: editingCategory ? prev.slug : generateSlug(name),
                                            }));
                                        }}
                                        placeholder="e.g. Modular Kitchens"
                                        className="w-full px-4 py-3 sm:py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-base"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Slug *</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
                                        placeholder="e.g. modular-kitchens"
                                        className="w-full px-4 py-3 sm:py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-base"
                                        required
                                        disabled={!!editingCategory}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">URL-friendly identifier (lowercase, no spaces)</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Icon</label>
                                        <div className="flex gap-2">
                                            <div className="w-12 h-10 flex items-center justify-center bg-purple-100 text-purple-700 rounded border">
                                                <i className={`fa-solid ${formData.icon}`}></i>
                                            </div>
                                            <select
                                                value={formData.icon}
                                                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                                                className="flex-1 px-3 py-2 border rounded-lg"
                                            >
                                                {ICON_OPTIONS.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Display Order</label>
                                        <input
                                            type="number"
                                            value={formData.display_order}
                                            onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 sm:flex-none px-6 py-3 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-base disabled:opacity-50"
                                >
                                    {saving ? (
                                        <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Saving...</>
                                    ) : (
                                        <><i className="fa-solid fa-check mr-2"></i>{editingCategory ? 'Update' : 'Add'}</>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-6 py-3 sm:py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition text-base"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Categories List */}
                    {loading ? (
                        <div className="text-center py-8">
                            <i className="fa-solid fa-spinner fa-spin text-3xl text-gray-400"></i>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <i className="fa-solid fa-folder-open text-4xl mb-2"></i>
                            <p>No categories yet. Add your first category above.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center gap-4 p-4 bg-white border rounded-lg hover:shadow-md transition"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-700 rounded-lg">
                                        <i className={`fa-solid ${category.icon}`}></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-gray-900 truncate">{category.name}</h4>
                                            {(category as any).product_count === 0 && (
                                                <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-1">
                                                    <i className="fa-solid fa-eye-slash text-[10px]"></i>
                                                    Hidden
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            /{category.slug} • {(category as any).product_count || 0} product{(category as any).product_count !== 1 ? 's' : ''}
                                            {(category as any).product_count === 0 && (
                                                <span className="text-yellow-600 ml-1">(not visible on website)</span>
                                            )}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400">Order: {category.display_order}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                                        >
                                            <i className="fa-solid fa-edit"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category)}
                                            className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
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
