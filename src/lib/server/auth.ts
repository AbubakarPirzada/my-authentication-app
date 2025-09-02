import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export type UserRole = 'user' | 'admin';

export function requireAuth(event: RequestEvent) {
  if (!event.locals.session) {
    throw redirect(303, '/login');
  }
  return event.locals.session;
}

export function requireRole(event: RequestEvent, requiredRole: UserRole) {
  const session = requireAuth(event);
  
  if (!session.user?.role) {
    throw redirect(303, '/login');
  }
  
  if (session.user.role !== requiredRole) {
    throw redirect(303, '/dashboard'); // Redirect to user dashboard if not authorized
  }
  
  return session;
}

export function requireAdmin(event: RequestEvent) {
  return requireRole(event, 'admin');
}

export function isAdmin(session: any): boolean {
  return session?.user?.role === 'admin';
}

export function isUser(session: any): boolean {
  return session?.user?.role === 'user';
}
