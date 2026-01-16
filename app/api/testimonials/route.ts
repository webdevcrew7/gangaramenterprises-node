import { NextResponse } from 'next/server';
import pool from '@/lib/db';

/**
 * GET /api/testimonials - Public endpoint to list active testimonial videos
 */
export async function GET() {
    try {
        const [rows] = await pool.query(`
            SELECT id, youtube_url, video_id, title, display_order
            FROM testimonial_videos 
            WHERE is_active = 1 
            ORDER BY display_order ASC, created_at DESC
        `);
        return NextResponse.json({ testimonials: rows });
    } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}
