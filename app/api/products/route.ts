import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Product, ProductVariant } from '@/types';

export const runtime = 'nodejs';

// Public API - Get visible products with their variants
export async function GET() {
  try {
    // Fetch products
    const [productRows]: any = await pool.query(
      `
      SELECT
        id,
        name,
        category,
        description,
        badge,
        on_sale,
        display_order
      FROM products
      WHERE is_hidden = 0
      ORDER BY display_order ASC, id ASC
      `
    );

    // Fetch all variants for visible products
    const productIds = productRows.map((p: any) => p.id);

    let variantRows: any[] = [];
    if (productIds.length > 0) {
      const [variants]: any = await pool.query(
        `
        SELECT
          id,
          product_id,
          name,
          image,
          color,
          display_order
        FROM product_variants
        WHERE product_id IN (?)
        ORDER BY display_order ASC, id ASC
        `,
        [productIds]
      );
      variantRows = variants;
    }

    // Group variants by product_id
    const variantsByProduct: Record<number, ProductVariant[]> = {};
    for (const v of variantRows) {
      if (!variantsByProduct[v.product_id]) {
        variantsByProduct[v.product_id] = [];
      }
      variantsByProduct[v.product_id].push({
        id: `${v.product_id}-${v.id}`,
        name: v.name,
        image: v.image,
        color: v.color,
      });
    }

    // Build products with variants
    const products: Product[] = productRows.map((p: any) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      description: p.description,
      badge: p.badge || undefined,
      onSale: p.on_sale === 1,
      variants: variantsByProduct[p.id] || [],
    }));

    return NextResponse.json({
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
