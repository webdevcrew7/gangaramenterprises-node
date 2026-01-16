import { NextResponse } from 'next/server';
import pool from '@/lib/db';

/**
 * GET /api/categories - Public endpoint to list active categories with representative images
 * Only returns categories that have at least one visible product
 */
export async function GET() {
    try {
        // Get categories with the first product's first variant image
        // Only include categories that have at least one visible product
        const [rows] = await pool.query(`
            SELECT 
                c.slug, 
                c.name, 
                c.icon, 
                c.display_order,
                (
                    SELECT pv.image 
                    FROM products p 
                    JOIN product_variants pv ON p.id = pv.product_id 
                    WHERE p.category = c.slug AND p.is_hidden = 0
                    ORDER BY p.id ASC, pv.id ASC 
                    LIMIT 1
                ) as image,
                (
                    SELECT COUNT(*) 
                    FROM products p 
                    WHERE p.category = c.slug AND p.is_hidden = 0
                ) as product_count
            FROM categories c 
            WHERE c.is_active = 1 
            HAVING product_count > 0
            ORDER BY c.display_order ASC
        `);
        return NextResponse.json({ categories: rows });
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}