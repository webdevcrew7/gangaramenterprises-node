import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

export const runtime = 'nodejs';

// GET - Fetch all variants for a product
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const [rows] = await pool.query(
            `SELECT * FROM product_variants WHERE product_id = ? ORDER BY display_order ASC`,
            [Number(params.id)]
        );

        return NextResponse.json({ variants: rows });
    } catch (error) {
        console.error('Fetch variants error:', error);
        return NextResponse.json({ error: 'Failed to fetch variants' }, { status: 500 });
    }
}

// POST - Add new variant to product
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { name, image, color } = await request.json();

        if (!name || !image) {
            return NextResponse.json(
                { error: 'Name and image are required' },
                { status: 400 }
            );
        }

        // Get next display order
        const [countResult]: any = await pool.query(
            'SELECT MAX(display_order) as max_order FROM product_variants WHERE product_id = ?',
            [Number(params.id)]
        );
        const nextOrder = (countResult[0]?.max_order ?? -1) + 1;

        const [result]: any = await pool.query(
            `INSERT INTO product_variants (product_id, name, image, color, display_order)
       VALUES (?, ?, ?, ?, ?)`,
            [Number(params.id), name, image, color || '#000000', nextOrder]
        );

        const [rows]: any = await pool.query(
            'SELECT * FROM product_variants WHERE id = ?',
            [result.insertId]
        );

        return NextResponse.json({ variant: rows[0] }, { status: 201 });
    } catch (error) {
        console.error('Add variant error:', error);
        return NextResponse.json({ error: 'Failed to add variant' }, { status: 500 });
    }
}
