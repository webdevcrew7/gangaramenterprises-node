import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

export const runtime = 'nodejs';

// GET - Fetch all images for a variant
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
            `SELECT * FROM variant_images WHERE variant_id = ? ORDER BY display_order ASC`,
            [Number(params.id)]
        );

        return NextResponse.json({ images: rows });
    } catch (error) {
        console.error('Fetch variant images error:', error);
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}

// POST - Add a new image to a variant
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { image_url } = await request.json();

        if (!image_url) {
            return NextResponse.json(
                { error: 'Image URL is required' },
                { status: 400 }
            );
        }

        // Get next display order
        const [countResult]: any = await pool.query(
            'SELECT MAX(display_order) as max_order FROM variant_images WHERE variant_id = ?',
            [Number(params.id)]
        );
        const nextOrder = (countResult[0]?.max_order ?? -1) + 1;

        const [result]: any = await pool.query(
            `INSERT INTO variant_images (variant_id, image_url, display_order)
             VALUES (?, ?, ?)`,
            [Number(params.id), image_url, nextOrder]
        );

        const [rows]: any = await pool.query(
            'SELECT * FROM variant_images WHERE id = ?',
            [result.insertId]
        );

        return NextResponse.json({ image: rows[0] }, { status: 201 });
    } catch (error) {
        console.error('Add variant image error:', error);
        return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
    }
}
