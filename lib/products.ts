'use client';

import { Product, ProductVariant } from '@/types';

/**
 * Get human-readable category name
 */
export function getCategoryName(category: string): string {
    const names: Record<string, string> = {
        interiors: 'Interiors',
        theatre: 'Home Theatre',
        furniture: 'Furniture',
        curtains: 'Curtains',
    };
    return names[category] || category;
}

/**
 * Category configuration for filters
 */
export const categories = [
    { key: 'sale', label: 'On Sale', icon: '🔥' },
    { key: 'interiors', label: 'Interiors', image: '/assets/Interiors/Design1.webp' },
    { key: 'theatre', label: 'Home Theatre', image: '/assets/Home Theatre/HT1.webp' },
    { key: 'furniture', label: 'Furniture', image: '/assets/Furniture/sofa1.webp' },
    { key: 'curtains', label: 'Curtains', image: '/assets/Curtains/Curtain1.webp' },
];

// Re-export types for convenience
export type { Product, ProductVariant };
