import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { getSession } from '@/lib/auth';

/**
 * POST /api/admin/change-password - Change password for logged-in user
 */
export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { currentPassword, newPassword } = await request.json();

        // Validate input
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Current password and new password are required' },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: 'New password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Get current user's password hash
        const [rows] = await pool.query<any[]>(
            'SELECT password_hash FROM admin_users WHERE id = ?',
            [session.userId]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, rows[0].password_hash);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Current password is incorrect' },
                { status: 400 }
            );
        }

        // Hash new password and update
        const newPasswordHash = bcrypt.hashSync(newPassword, 10);
        await pool.query(
            'UPDATE admin_users SET password_hash = ? WHERE id = ?',
            [newPasswordHash, session.userId]
        );

        return NextResponse.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        console.error('Failed to change password:', error);
        return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
    }
}
