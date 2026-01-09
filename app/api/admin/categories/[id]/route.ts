import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// PUT - Update category
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();
        const { name, icon, display_order, is_active, slug } = body;

        // Build dynamic update query
        const updates: string[] = [];
        const values: any[] = [];

        if (name !== undefined) {
            updates.push('name = ?');
            values.push(name);
        }
        if (icon !== undefined) {
            updates.push('icon = ?');
            values.push(icon);
        }
        if (display_order !== undefined) {
            updates.push('display_order = ?');
            values.push(display_order);
        }
        if (is_active !== undefined) {
            updates.push('is_active = ?');
            values.push(is_active ? 1 : 0);
        }
        if (slug !== undefined) {
            // Validate slug format
            if (!/^[a-z0-9-]+$/.test(slug)) {
                return NextResponse.json(
                    { error: 'Slug must be lowercase alphanumeric with dashes only' },
                    { status: 400 }
                );
            }
            // Check if new slug conflicts with existing
            const [existing] = await pool.query<any[]>(
                'SELECT id FROM categories WHERE slug = ? AND id != ?',
                [slug, id]
            );
            if (existing.length > 0) {
                return NextResponse.json(
                    { error: 'A category with this slug already exists' },
                    { status: 400 }
                );
            }

            // Get old slug for product update
            const [oldCat] = await pool.query<any[]>(
                'SELECT slug FROM categories WHERE id = ?',
                [id]
            );
            if (oldCat.length > 0) {
                const oldSlug = oldCat[0].slug;
                // Update all products using this category
                await pool.query(
                    'UPDATE products SET category = ? WHERE category = ?',
                    [slug, oldSlug]
                );
            }

            updates.push('slug = ?');
            values.push(slug);
        }

        if (updates.length === 0) {
            return NextResponse.json(
                { error: 'No fields to update' },
                { status: 400 }
            );
        }

        values.push(id);
        await pool.query(
            `UPDATE categories SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update category:', error);
        return NextResponse.json(
            { error: 'Failed to update category' },
            { status: 500 }
        );
    }
}

// DELETE - Delete category
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        // Check if any products use this category
        const [category] = await pool.query<any[]>(
            'SELECT slug FROM categories WHERE id = ?',
            [id]
        );

        if (category.length === 0) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }

        const [products] = await pool.query<any[]>(
            'SELECT COUNT(*) AS count FROM products WHERE category = ?',
            [category[0].slug]
        );

        if (products[0].count > 0) {
            return NextResponse.json(
                { error: `Cannot delete category: ${products[0].count} product(s) are using it` },
                { status: 400 }
            );
        }

        await pool.query('DELETE FROM categories WHERE id = ?', [id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete category:', error);
        return NextResponse.json(
            { error: 'Failed to delete category' },
            { status: 500 }
        );
    }
}
