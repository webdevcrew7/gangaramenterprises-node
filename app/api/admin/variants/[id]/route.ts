import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

export const runtime = 'nodejs';

// PUT - Update variant
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { name, image, color, display_order } = await request.json();

        const [existing]: any = await pool.query(
            'SELECT id FROM product_variants WHERE id = ?',
            [Number(params.id)]
        );

        if (existing.length === 0) {
            return NextResponse.json({ error: 'Variant not found' }, { status: 404 });
        }

        await pool.query(
            `UPDATE product_variants
       SET name = COALESCE(?, name),
           image = COALESCE(?, image),
           color = COALESCE(?, color),
           display_order = COALESCE(?, display_order)
       WHERE id = ?`,
            [name ?? null, image ?? null, color ?? null, display_order ?? null, Number(params.id)]
        );

        const [rows]: any = await pool.query(
            'SELECT * FROM product_variants WHERE id = ?',
            [Number(params.id)]
        );

        return NextResponse.json({ variant: rows[0] });
    } catch (error) {
        console.error('Update variant error:', error);
        return NextResponse.json({ error: 'Failed to update variant' }, { status: 500 });
    }
}

// DELETE - Delete variant
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const [result]: any = await pool.query(
            'DELETE FROM product_variants WHERE id = ?',
            [Number(params.id)]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Variant not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete variant error:', error);
        return NextResponse.json({ error: 'Failed to delete variant' }, { status: 500 });
    }
}
