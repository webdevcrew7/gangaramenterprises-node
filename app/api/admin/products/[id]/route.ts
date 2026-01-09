import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

export const runtime = 'nodejs';

// GET - Get single product with variants
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [rows]: any = await pool.query(
    `SELECT p.*, 
      (SELECT pv.image FROM product_variants pv WHERE pv.product_id = p.id ORDER BY pv.display_order LIMIT 1) as image
     FROM products p WHERE p.id = ?`,
    [Number(params.id)]
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ product: rows[0] });
}

// PUT - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const {
      name,
      category,
      description,
      badge,
      on_sale,
      is_hidden,
      display_order,
    } = await request.json();

    const [existing]: any = await pool.query(
      'SELECT id FROM products WHERE id = ?',
      [Number(params.id)]
    );

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (category) {
      const validCategories = ['interiors', 'theatre', 'furniture', 'curtains'];
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { error: 'Invalid category' },
          { status: 400 }
        );
      }
    }

    await pool.query(
      `
      UPDATE products
      SET
        name = COALESCE(?, name),
        category = COALESCE(?, category),
        description = COALESCE(?, description),
        badge = COALESCE(?, badge),
        on_sale = COALESCE(?, on_sale),
        is_hidden = COALESCE(?, is_hidden),
        display_order = COALESCE(?, display_order),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [
        name ?? null,
        category ?? null,
        description ?? null,
        badge ?? null,
        on_sale !== undefined ? (on_sale ? 1 : 0) : null,
        is_hidden !== undefined ? (is_hidden ? 1 : 0) : null,
        display_order ?? null,
        Number(params.id),
      ]
    );

    const [rows]: any = await pool.query(
      'SELECT * FROM products WHERE id = ?',
      [Number(params.id)]
    );

    return NextResponse.json({ product: rows[0] });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete product (with manual cascade for variant_images)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const productId = Number(params.id);

    // First, get all variant IDs for this product
    const [variants]: any = await pool.query(
      'SELECT id FROM product_variants WHERE product_id = ?',
      [productId]
    );

    // Delete variant_images for all variants of this product
    if (variants.length > 0) {
      const variantIds = variants.map((v: any) => v.id);
      await pool.query(
        `DELETE FROM variant_images WHERE variant_id IN (?)`,
        [variantIds]
      );
    }

    // Now delete the product (variants will cascade delete)
    const [result]: any = await pool.query(
      'DELETE FROM products WHERE id = ?',
      [productId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
