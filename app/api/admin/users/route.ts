import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { getSession } from '@/lib/auth';

/**
 * GET /api/admin/users - List all admin users
 */
export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const [rows] = await pool.query(
            'SELECT id, username, role, created_at FROM admin_users ORDER BY created_at ASC'
        );
        return NextResponse.json({ users: rows });
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

/**
 * POST /api/admin/users - Create new admin user
 */
export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { username, password, role } = await request.json();

        // Validate input
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        if (username.length < 3) {
            return NextResponse.json(
                { error: 'Username must be at least 3 characters' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Validate role
        const validRoles = ['admin', 'developer'];
        const userRole = validRoles.includes(role) ? role : 'developer';

        // Check if username already exists
        const [existing] = await pool.query<any[]>(
            'SELECT id FROM admin_users WHERE username = ?',
            [username]
        );

        if (existing.length > 0) {
            return NextResponse.json(
                { error: 'Username already exists' },
                { status: 400 }
            );
        }

        // Hash password and create user
        const passwordHash = bcrypt.hashSync(password, 10);
        const [result] = await pool.query<any>(
            'INSERT INTO admin_users (username, password_hash, role) VALUES (?, ?, ?)',
            [username, passwordHash, userRole]
        );

        return NextResponse.json({
            success: true,
            user: {
                id: result.insertId,
                username,
                role: userRole,
            },
        });
    } catch (error) {
        console.error('Failed to create user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}
