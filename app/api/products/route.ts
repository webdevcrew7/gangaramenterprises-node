import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Product, ProductVariant } from '@/types';

export const runtime = 'nodejs';

// Public API - Get visible products with their variants and images
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
    let variantImageRows: any[] = [];

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

      // Fetch all variant images
      if (variantRows.length > 0) {
        const variantIds = variantRows.map((v: any) => v.id);
        const [images]: any = await pool.query(
          `
          SELECT
            id,
            variant_id,
            image_url,
            display_order
          FROM variant_images
          WHERE variant_id IN (?)
          ORDER BY display_order ASC, id ASC
          `,
          [variantIds]
        );
        variantImageRows = images;
      }
    }

    // Group images by variant_id
    const imagesByVariant: Record<number, string[]> = {};
    for (const img of variantImageRows) {
      if (!imagesByVariant[img.variant_id]) {
        imagesByVariant[img.variant_id] = [];
      }
      imagesByVariant[img.variant_id].push(img.image_url);
    }

    // Group variants by product_id
    const variantsByProduct: Record<number, ProductVariant[]> = {};
    for (const v of variantRows) {
      if (!variantsByProduct[v.product_id]) {
        variantsByProduct[v.product_id] = [];
      }
      // Get images for this variant, or use primary image as fallback
      const additionalImages = imagesByVariant[v.id] || [];
      const allImages = additionalImages.length > 0
        ? [v.image, ...additionalImages]  // Primary image first, then additional
        : [v.image];  // Just the primary image

      variantsByProduct[v.product_id].push({
        id: `${v.product_id}-${v.id}`,
        name: v.name,
        image: v.image,
        images: allImages,
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

