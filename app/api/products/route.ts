import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const runtime = 'nodejs';

// Public API - Get visible products only
export async function GET() {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        id,
        name,
        category,
        description,
        image,
        badge,
        display_order
      FROM products
      WHERE is_hidden = 0
      ORDER BY display_order ASC, id ASC
      `
    );

    return NextResponse.json({
      products: rows,
    });
  } catch (error) {
    console.error('Error fetching products:', error);

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
