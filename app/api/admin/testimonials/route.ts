import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

/**
 * Extract YouTube video ID from various URL formats
 */
function extractVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

/**
 * GET /api/admin/testimonials - Get all testimonial videos (including inactive)
 */
export async function GET() {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM testimonial_videos 
            ORDER BY display_order ASC, created_at DESC
        `);
        return NextResponse.json({ testimonials: rows });
    } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}

/**
 * POST /api/admin/testimonials - Add a new testimonial video
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { youtube_url, title = '' } = body;

        if (!youtube_url) {
            return NextResponse.json({ error: 'YouTube URL is required' }, { status: 400 });
        }

        const videoId = extractVideoId(youtube_url);
        if (!videoId) {
            return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
        }

        // Get max display_order
        const [maxOrderRows] = await pool.query<any[]>(
            'SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM testimonial_videos'
        );
        const nextOrder = maxOrderRows[0].next_order;

        const [result] = await pool.query<any>(
            'INSERT INTO testimonial_videos (youtube_url, video_id, title, display_order) VALUES (?, ?, ?, ?)',
            [youtube_url, videoId, title, nextOrder]
        );

        return NextResponse.json({
            success: true,
            id: result.insertId,
            video_id: videoId
        });
    } catch (error) {
        console.error('Failed to add testimonial:', error);
        return NextResponse.json({ error: 'Failed to add testimonial' }, { status: 500 });
    }
}

/**
 * PUT /api/admin/testimonials - Update a testimonial video
 */
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, title, display_order, is_active } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const updates: string[] = [];
        const values: any[] = [];

        if (title !== undefined) {
            updates.push('title = ?');
            values.push(title);
        }
        if (display_order !== undefined) {
            updates.push('display_order = ?');
            values.push(display_order);
        }
        if (is_active !== undefined) {
            updates.push('is_active = ?');
            values.push(is_active ? 1 : 0);
        }

        if (updates.length === 0) {
            return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
        }

        values.push(id);
        await pool.query(
            `UPDATE testimonial_videos SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update testimonial:', error);
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

/**
 * DELETE /api/admin/testimonials - Remove a testimonial video
 */
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        await pool.query('DELETE FROM testimonial_videos WHERE id = ?', [id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete testimonial:', error);
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
