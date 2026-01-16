'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
    id: number;
    youtube_url: string;
    video_id: string;
    title: string;
    display_order: number;
    is_active: boolean;
}

interface TestimonialManagerProps {
    onClose: () => void;
}

/**
 * Extract YouTube video ID from various URL formats
 */
function extractVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

export default function TestimonialManager({ onClose }: TestimonialManagerProps) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [reorderMode, setReorderMode] = useState(false);
    const [draggedId, setDraggedId] = useState<number | null>(null);

    // Form state
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [title, setTitle] = useState('');
    const [previewVideoId, setPreviewVideoId] = useState<string | null>(null);

    useEffect(() => {
        loadTestimonials();
    }, []);

    // Update preview when URL changes
    useEffect(() => {
        const videoId = extractVideoId(youtubeUrl);
        setPreviewVideoId(videoId);
    }, [youtubeUrl]);

    const loadTestimonials = async () => {
        try {
            const res = await fetch('/api/admin/testimonials');
            const data = await res.json();
            setTestimonials(data.testimonials || []);
        } catch (err) {
            console.error('Failed to load testimonials:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!youtubeUrl.trim()) {
            setError('Please enter a YouTube URL');
            return;
        }

        const videoId = extractVideoId(youtubeUrl);
        if (!videoId) {
            setError('Invalid YouTube URL. Please enter a valid YouTube video link.');
            return;
        }

        setSaving(true);
        try {
            const res = await fetch('/api/admin/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ youtube_url: youtubeUrl, title })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to add testimonial');
            }

            setYoutubeUrl('');
            setTitle('');
            setShowForm(false);
            loadTestimonials();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleToggleActive = async (testimonial: Testimonial) => {
        try {
            await fetch('/api/admin/testimonials', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: testimonial.id, is_active: !testimonial.is_active })
            });
            loadTestimonials();
        } catch (err) {
            console.error('Failed to toggle testimonial:', err);
        }
    };

    const handleDelete = async (testimonial: Testimonial) => {
        if (!confirm(`Delete this testimonial video?\n\n"${testimonial.title || 'Untitled'}"`)) {
            return;
        }

        try {
            await fetch(`/api/admin/testimonials?id=${testimonial.id}`, {
                method: 'DELETE'
            });
            loadTestimonials();
        } catch (err) {
            console.error('Failed to delete testimonial:', err);
        }
    };

    // Drag and drop handlers
    const handleDragStart = (e: React.DragEvent, id: number) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = async (e: React.DragEvent, targetId: number) => {
        e.preventDefault();
        if (draggedId === null || draggedId === targetId) return;

        const draggedIndex = testimonials.findIndex(t => t.id === draggedId);
        const targetIndex = testimonials.findIndex(t => t.id === targetId);

        if (draggedIndex === -1 || targetIndex === -1) return;

        // Reorder locally first for instant feedback
        const newTestimonials = [...testimonials];
        const [draggedItem] = newTestimonials.splice(draggedIndex, 1);
        newTestimonials.splice(targetIndex, 0, draggedItem);

        // Update display_order for all items
        const updatedTestimonials = newTestimonials.map((t, index) => ({
            ...t,
            display_order: index + 1
        }));

        setTestimonials(updatedTestimonials);
        setDraggedId(null);

        // Save all new orders to database
        try {
            await Promise.all(
                updatedTestimonials.map(t =>
                    fetch('/api/admin/testimonials', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: t.id, display_order: t.display_order })
                    })
                )
            );
        } catch (err) {
            console.error('Failed to save order:', err);
            loadTestimonials(); // Reload on error
        }
    };

    const handleDragEnd = () => {
        setDraggedId(null);
    };

    // Move up/down buttons for mobile
    const handleMoveUp = async (index: number) => {
        if (index === 0) return;
        const newTestimonials = [...testimonials];
        [newTestimonials[index - 1], newTestimonials[index]] = [newTestimonials[index], newTestimonials[index - 1]];

        const updated = newTestimonials.map((t, i) => ({ ...t, display_order: i + 1 }));
        setTestimonials(updated);

        try {
            await Promise.all(
                updated.map(t =>
                    fetch('/api/admin/testimonials', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: t.id, display_order: t.display_order })
                    })
                )
            );
        } catch (err) {
            console.error('Failed to save order:', err);
            loadTestimonials();
        }
    };

    const handleMoveDown = async (index: number) => {
        if (index === testimonials.length - 1) return;
        const newTestimonials = [...testimonials];
        [newTestimonials[index], newTestimonials[index + 1]] = [newTestimonials[index + 1], newTestimonials[index]];

        const updated = newTestimonials.map((t, i) => ({ ...t, display_order: i + 1 }));
        setTestimonials(updated);

        try {
            await Promise.all(
                updated.map(t =>
                    fetch('/api/admin/testimonials', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: t.id, display_order: t.display_order })
                    })
                )
            );
        } catch (err) {
            console.error('Failed to save order:', err);
            loadTestimonials();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <i className="fa-brands fa-youtube text-2xl"></i>
                        <h2 className="text-xl font-bold">Manage Video Testimonials</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-6">
                        {!showForm && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <i className="fa-solid fa-plus"></i>
                                Add Video
                            </button>
                        )}
                        {testimonials.length > 1 && (
                            <button
                                onClick={() => setReorderMode(!reorderMode)}
                                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${reorderMode
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                <i className="fa-solid fa-arrows-up-down"></i>
                                {reorderMode ? 'Done Reordering' : 'Reorder'}
                            </button>
                        )}
                    </div>

                    {/* Reorder Instructions */}
                    {reorderMode && (
                        <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
                            <i className="fa-solid fa-info-circle mr-2"></i>
                            Drag and drop videos to reorder, or use the arrow buttons on mobile.
                        </div>
                    )}

                    {/* Add Form */}
                    {showForm && (
                        <form onSubmit={handleAdd} className="mb-6 bg-gray-50 rounded-xl p-6 border">
                            <h3 className="font-semibold text-gray-800 mb-4">Add New Testimonial Video</h3>

                            {error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                                    <i className="fa-solid fa-exclamation-circle mr-2"></i>
                                    {error}
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            YouTube URL *
                                        </label>
                                        <input
                                            type="url"
                                            value={youtubeUrl}
                                            onChange={(e) => setYoutubeUrl(e.target.value)}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Supports youtube.com and youtu.be links
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title (optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Customer name or description"
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Preview */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preview
                                    </label>
                                    {previewVideoId ? (
                                        <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
                                            <iframe
                                                className="absolute inset-0 w-full h-full"
                                                src={`https://www.youtube.com/embed/${previewVideoId}`}
                                                title="Preview"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                            <div className="text-center text-gray-500">
                                                <i className="fa-brands fa-youtube text-4xl mb-2"></i>
                                                <p className="text-sm">Paste a YouTube URL to preview</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="submit"
                                    disabled={saving || !previewVideoId}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    {saving ? (
                                        <>
                                            <i className="fa-solid fa-spinner fa-spin"></i>
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-check"></i>
                                            Add Video
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setYoutubeUrl('');
                                        setTitle('');
                                        setError('');
                                    }}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Testimonials List */}
                    {loading ? (
                        <div className="text-center py-8">
                            <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-500"></i>
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <i className="fa-brands fa-youtube text-5xl mb-4"></i>
                            <p>No testimonial videos yet</p>
                            <p className="text-sm mt-2">Add your first video testimonial above</p>
                        </div>
                    ) : (
                        <div className={`grid gap-4 ${reorderMode ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    draggable={reorderMode}
                                    onDragStart={(e) => handleDragStart(e, testimonial.id)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, testimonial.id)}
                                    onDragEnd={handleDragEnd}
                                    className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all ${!testimonial.is_active ? 'opacity-60' : ''
                                        } ${reorderMode ? 'cursor-grab active:cursor-grabbing flex items-center gap-4 p-3' : 'hover:shadow-md'} ${draggedId === testimonial.id ? 'opacity-50 scale-95' : ''
                                        }`}
                                >
                                    {reorderMode ? (
                                        <>
                                            {/* Reorder Mode - Horizontal Layout */}
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    onClick={() => handleMoveUp(index)}
                                                    disabled={index === 0}
                                                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed rounded flex items-center justify-center"
                                                >
                                                    <i className="fa-solid fa-chevron-up text-gray-600"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleMoveDown(index)}
                                                    disabled={index === testimonials.length - 1}
                                                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed rounded flex items-center justify-center"
                                                >
                                                    <i className="fa-solid fa-chevron-down text-gray-600"></i>
                                                </button>
                                            </div>
                                            <div className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            <img
                                                src={`https://img.youtube.com/vi/${testimonial.video_id}/default.jpg`}
                                                alt={testimonial.title || 'Testimonial'}
                                                className="w-24 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-800 text-sm truncate">
                                                    {testimonial.title || 'Untitled Video'}
                                                </p>
                                            </div>
                                            <i className="fa-solid fa-grip-vertical text-gray-400 text-lg"></i>
                                        </>
                                    ) : (
                                        <>
                                            {/* Normal Mode - Card Layout */}
                                            <div className="relative">
                                                <img
                                                    src={`https://img.youtube.com/vi/${testimonial.video_id}/hqdefault.jpg`}
                                                    alt={testimonial.title || 'Testimonial'}
                                                    className="w-full aspect-video object-cover"
                                                />
                                                {!testimonial.is_active && (
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                                            Hidden
                                                        </span>
                                                    </div>
                                                )}
                                                <a
                                                    href={testimonial.youtube_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                                                        <i className="fa-solid fa-play text-white text-lg ml-1"></i>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="p-3">
                                                <p className="font-medium text-gray-800 text-sm truncate">
                                                    {testimonial.title || 'Untitled Video'}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Order: {testimonial.display_order}
                                                </p>

                                                <div className="flex gap-2 mt-3">
                                                    <button
                                                        onClick={() => handleToggleActive(testimonial)}
                                                        className={`flex-1 text-xs py-1.5 rounded ${testimonial.is_active
                                                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                            } transition-colors`}
                                                    >
                                                        <i className={`fa-solid ${testimonial.is_active ? 'fa-eye-slash' : 'fa-eye'} mr-1`}></i>
                                                        {testimonial.is_active ? 'Hide' : 'Show'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(testimonial)}
                                                        className="flex-1 text-xs py-1.5 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                                                    >
                                                        <i className="fa-solid fa-trash mr-1"></i>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
