import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - Fetch all categories with product counts
export async function GET() {
    try {
        const [categories] = await pool.query(`
            SELECT 
                c.*,
                (SELECT COUNT(*) FROM products p WHERE p.category = c.slug AND p.is_hidden = 0) as product_count
            FROM categories c 
            ORDER BY c.display_order ASC, c.name ASC
        `);

        return NextResponse.json({ categories });
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}

// POST - Create new category
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { slug, name, icon, display_order } = body;

        if (!slug || !name) {
            return NextResponse.json(
                { error: 'Slug and name are required' },
                { status: 400 }
            );
        }

        // Validate slug format (lowercase, no spaces, alphanumeric with dashes)
        if (!/^[a-z0-9-]+$/.test(slug)) {
            return NextResponse.json(
                { error: 'Slug must be lowercase alphanumeric with dashes only' },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const [existing] = await pool.query<any[]>(
            'SELECT id FROM categories WHERE slug = ?',
            [slug]
        );

        if (existing.length > 0) {
            return NextResponse.json(
                { error: 'A category with this slug already exists' },
                { status: 400 }
            );
        }

        const [result] = await pool.query<any>(
            'INSERT INTO categories (slug, name, icon, display_order) VALUES (?, ?, ?, ?)',
            [slug, name, icon || 'fa-folder', display_order || 0]
        );

        return NextResponse.json({
            success: true,
            category: {
                id: result.insertId,
                slug,
                name,
                icon: icon || 'fa-folder',
                display_order: display_order || 0,
                is_active: 1,
            },
        });
    } catch (error) {
        console.error('Failed to create category:', error);
        return NextResponse.json(
            { error: 'Failed to create category' },
            { status: 500 }
        );
    }
}
