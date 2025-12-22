import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import pool from './db';
import { RowDataPacket } from 'mysql2/promise';
const SESSION_COOKIE = 'admin_session';

export interface AdminSession {
  userId: number;
  username: string;
}

// -------------------------
// Session helpers
// -------------------------
export function createSession(userId: number, username: string): string {
  const sessionData = JSON.stringify({
    userId,
    username,
    timestamp: Date.now(),
  });

  return Buffer.from(sessionData).toString('base64');
}

export function verifySession(sessionToken: string): AdminSession | null {
  try {
    const sessionData = JSON.parse(
      Buffer.from(sessionToken, 'base64').toString()
    );

    if (Date.now() - sessionData.timestamp > 24 * 60 * 60 * 1000) {
      return null;
    }

    return {
      userId: sessionData.userId,
      username: sessionData.username,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionToken) return null;
  return verifySession(sessionToken);
}

export async function setSessionCookie(sessionToken: string) {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60,
    path: '/',
  });
}

export async function clearSession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE);
}

// -------------------------
// MySQL credential check
// -------------------------
export async function verifyCredentials(
  username: string,
  password: string
): Promise<AdminSession | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, username, password_hash FROM admin_users WHERE username = ?',
    [username]
  );

  if (!rows || rows.length === 0) return null;

  const user = rows[0];

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return null;

  return {
    userId: user.id,
    username: user.username,
  };
}
