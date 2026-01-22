import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

export interface AuthUser {
  email: string;
  role: string;
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getAuthUser(request: NextRequest): AuthUser | null {
  // Try to get token from cookie first (more secure)
  const cookieToken = request.cookies.get('admin_token')?.value;
  
  // Try to get token from Authorization header
  const authHeader = request.headers.get('authorization');
  const headerToken = authHeader?.replace('Bearer ', '');

  const token = cookieToken || headerToken;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export function requireAuth(request: NextRequest): AuthUser {
  const user = getAuthUser(request);
  
  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}
