import type { PageServerLoad } from './$types';
import { requireAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq, count } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
  // Require admin role to access this page
  requireAdmin(event);
  
  // Calculate user statistics
  const [totalUsers] = await db.select({ count: count() }).from(users);
  const [adminUsers] = await db.select({ count: count() }).from(users).where(eq(users.role, 'admin'));
  const [regularUsers] = await db.select({ count: count() }).from(users).where(eq(users.role, 'user'));
  
  // Get recent users (last 5 registered)
  const recentUsers = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    role: users.role,
    emailVerified: users.emailVerified
  }).from(users).orderBy(users.id).limit(5);
  
  return {
    stats: {
      totalUsers: totalUsers.count,
      adminUsers: adminUsers.count,
      regularUsers: regularUsers.count
    },
    recentUsers
  };
};
