import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

export const runtime = 'nodejs';

// PUT - Update image (reorder)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string; imageId: string } }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { display_order, image_url } = await request.json();

        const [existing]: any = await pool.query(
            'SELECT id FROM variant_images WHERE id = ?',
            [Number(params.imageId)]
        );

        if (existing.length === 0) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        await pool.query(
            `UPDATE variant_images
             SET image_url = COALESCE(?, image_url),
                 display_order = COALESCE(?, display_order)
             WHERE id = ?`,
            [image_url ?? null, display_order ?? null, Number(params.imageId)]
        );

        const [rows]: any = await pool.query(
            'SELECT * FROM variant_images WHERE id = ?',
            [Number(params.imageId)]
        );

        return NextResponse.json({ image: rows[0] });
    } catch (error) {
        console.error('Update variant image error:', error);
        return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
    }
}

// DELETE - Delete an image
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string; imageId: string } }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const [result]: any = await pool.query(
            'DELETE FROM variant_images WHERE id = ?',
            [Number(params.imageId)]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete variant image error:', error);
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
