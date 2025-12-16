import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

export const runtime = 'nodejs';

// GET - Fetch all products (admin view)
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
        id,
        name,
        category,
        description,
        image,
        badge,
        is_hidden,
        display_order,
        created_at,
        updated_at
      FROM products
    `;

    const params: any[] = [];

    if (!includeHidden) {
      query += ' WHERE is_hidden = ?';
      params.push(0);
    }

    query += ' ORDER BY display_order ASC, id ASC';

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
      badge,
      is_hidden,
      display_order,
    } = await request.json();

    if (!name || !category || !description || !image) {
      return NextResponse.json(
        { error: 'Name, category, description, and image are required' },
        { status: 400 }
      );
    }

    const validCategories = ['interiors', 'theatre', 'furniture', 'decor'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const [result]: any = await pool.query(
      `
      INSERT INTO products
      (name, category, description, image, badge, is_hidden, display_order, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `,
      [
        name,
        category,
        description,
        image,
        badge || '',
        is_hidden ? 1 : 0,
        display_order ?? 0,
      ]
    );

    const [rows]: any = await pool.query(
      'SELECT * FROM products WHERE id = ?',
      [result.insertId]
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
