import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

export const runtime = 'nodejs';

// GET - Fetch all products (admin view) with their first variant image
export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const includeHidden = searchParams.get('includeHidden') === 'true';

    let query = `
      SELECT
        p.id,
        p.name,
        p.category,
        p.description,
        p.badge,
        p.on_sale,
        p.is_hidden,
        p.display_order,
        p.created_at,
        p.updated_at,
        (SELECT pv.image FROM product_variants pv WHERE pv.product_id = p.id ORDER BY pv.display_order LIMIT 1) as image
      FROM products p
    `;

    const params: any[] = [];

    if (!includeHidden) {
      query += ' WHERE p.is_hidden = ?';
      params.push(0);
    }

    query += ' ORDER BY p.display_order ASC, p.id ASC';

    const [rows] = await pool.query(query, params);

    return NextResponse.json({ products: rows });
  } catch (error) {
    console.error('Admin products fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const {
      name,
      category,
      description,
      image,
      variant_name,
      badge,
      on_sale,
      is_hidden,
      display_order,
    } = await request.json();

    if (!name || !category || !description) {
      return NextResponse.json(
        { error: 'Name, category, and description are required' },
        { status: 400 }
      );
    }

    const validCategories = ['interiors', 'theatre', 'furniture', 'curtains'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const [result]: any = await pool.query(
      `
      INSERT INTO products
      (name, category, description, badge, on_sale, is_hidden, display_order, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `,
      [
        name,
        category,
        description,
        badge || '',
        on_sale ? 1 : 0,
        is_hidden ? 1 : 0,
        display_order ?? 0,
      ]
    );

    const productId = result.insertId;

    // Auto-create a default variant using the form data
    await pool.query(
      `INSERT INTO product_variants (product_id, name, image, color, display_order)
       VALUES (?, ?, ?, ?, ?)`,
      [productId, variant_name || name, image || '/assets/placeholder.svg', '#808080', 0]
    );

    const [rows]: any = await pool.query(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    );

    return NextResponse.json({ product: rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
