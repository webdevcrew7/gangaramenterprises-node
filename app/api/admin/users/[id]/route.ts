import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

/**
 * DELETE /api/admin/users/[id] - Delete admin user
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(params.id);

    // Prevent self-deletion
    if (userId === session.userId) {
        return NextResponse.json(
            { error: 'Cannot delete your own account' },
            { status: 400 }
        );
    }

    try {
        // Check if user exists
        const [existing] = await pool.query<any[]>(
            'SELECT id FROM admin_users WHERE id = ?',
            [userId]
        );

        if (existing.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Delete user
        await pool.query('DELETE FROM admin_users WHERE id = ?', [userId]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
