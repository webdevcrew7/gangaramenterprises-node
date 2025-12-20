'use client';

import { useCallback } from 'react';

interface CategoryItem {
    id: string;
    label: string;
    emoji?: string;
    isSale?: boolean;
}

const categories: CategoryItem[] = [
    { id: 'sale', label: 'On Sale', emoji: '🔥', isSale: true },
    { id: 'interiors', label: 'Interiors' },
    { id: 'theatre', label: 'Theatre' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'decor', label: 'Decor' },
];

export default function MobileCategoryStrip() {
    const handleCategoryClick = useCallback((categoryId: string) => {
        // Scroll to collections section
        const collectionsSection = document.getElementById('collections');
        if (collectionsSection) {
            collectionsSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Dispatch custom event for Collections to pick up
        setTimeout(() => {
            const event = new CustomEvent('categorySelected', { detail: { category: categoryId } });
            window.dispatchEvent(event);
        }, 500);
    }, []);

    return (
        <section className="mobile-category-strip">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`category-icon-item ${category.isSale ? 'sale-icon' : ''}`}
                    data-category={category.id}
                >
                    <div className="icon-circle">
                        {category.emoji ? (
                            <span style={{ fontSize: '24px' }}>{category.emoji}</span>
                        ) : (
                            <span className="text-xs font-bold text-gray-600">
                                {category.label.charAt(0)}
                            </span>
                        )}
                    </div>
                    <span className={category.isSale ? 'text-red-500 font-bold' : ''}>
                        {category.label}
                    </span>
                </button>
            ))}
        </section>
    );
}
