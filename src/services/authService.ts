/**
 * Auth service – integration-ready.
 * Replace these stubs with real HTTP calls.
 * Never store plaintext passwords in production.
 */

import type { User } from '../types';

const MOCK_USER_KEY = 'g4g_user';

export async function login(email: string, password: string): Promise<User> {
  // POST /api/auth/login
  if (!email.includes('@')) throw new Error('Please enter a valid email address.');
  if (password.length < 6) throw new Error('Password must be at least 6 characters.');
  await new Promise(r => setTimeout(r, 600));
  return {
    id: crypto.randomUUID(),
    email,
    displayName: email.split('@')[0],
    verified: true,
    createdAt: new Date().toISOString(),
  };
}

export async function register(email: string, password: string): Promise<User> {
  // POST /api/auth/register
  return login(email, password);
}

export async function logout(): Promise<void> {
  // POST /api/auth/logout
  localStorage.removeItem(MOCK_USER_KEY);
  await new Promise(r => setTimeout(r, 200));
}