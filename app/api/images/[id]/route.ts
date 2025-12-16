import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export const runtime = 'nodejs';

// GET - Serve image from database
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = db.prepare('SELECT image_data, image_type FROM products WHERE id = ?').get(parseInt(params.id)) as {
      image_data: Buffer | null;
      image_type: string | null;
    } | undefined;

    if (!product || !product.image_data) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Return image with proper content type
    return new NextResponse(product.image_data, {
      headers: {
        'Content-Type': product.image_type || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Image serve error:', error);
    return NextResponse.json({ error: 'Failed to serve image' }, { status: 500 });
  }
}

