import type { PageServerLoad } from './$types';
import { requireAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq, count, desc } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
  // Require admin role to access this page
  await requireAdmin(event);
  
  try {
    // Calculate user statistics
    const [totalUsers] = await db.select({ count: count() }).from(users);
    const [adminUsers] = await db.select({ count: count() }).from(users).where(eq(users.role, 'admin'));
    const [regularUsers] = await db.select({ count: count() }).from(users).where(eq(users.role, 'user'));
    
    // Get recent users (last 5 registered) ordered by createdAt
    const recentUsers = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt
    }).from(users).orderBy(desc(users.createdAt)).limit(5);
    
    return {
      stats: {
        totalUsers: totalUsers.count,
        adminUsers: adminUsers.count,
        regularUsers: regularUsers.count
      },
      recentUsers
    };
  } catch (error) {
    console.error('Error loading admin dashboard:', error);
    
    // Return fallback data if queries fail
    return {
      stats: {
        totalUsers: 0,
        adminUsers: 0,
        regularUsers: 0
      },
      recentUsers: []
    };
  }
};
