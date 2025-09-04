import type { PageServerLoad } from './$types';
import { requireAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq, count, desc } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
  // Require admin role to access this page
  await requireAdmin(event);
  
  // Calculate user statistics
  const [totalUsers] = await db.select({ count: count() }).from(users);
  const [adminUsers] = await db.select({ count: count() }).from(users).where(eq(users.role, 'admin'));
  const [regularUsers] = await db.select({ count: count() }).from(users).where(eq(users.role, 'user'));
  
  // Get verified vs unverified users
  const [verifiedUsers] = await db.select({ count: count() })
    .from(users)
    .where((users, { isNotNull }) => isNotNull(users.emailVerified));
  
  const [unverifiedUsers] = await db.select({ count: count() })
    .from(users)
    .where((users, { isNull }) => isNull(users.emailVerified));
  
  // Get the 5 most recently registered users
  const recentUsers = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    role: users.role,
    emailVerified: users.emailVerified
  }).from(users).orderBy(desc(users.id)).limit(5);
  
  // Calculate percentage metrics
  const totalCount = totalUsers.count;
  const adminPercentage = totalCount > 0 ? ((adminUsers.count / totalCount) * 100).toFixed(1) : '0';
  const verifiedPercentage = totalCount > 0 ? ((verifiedUsers.count / totalCount) * 100).toFixed(1) : '0';
  
  return {
    stats: {
      totalUsers: totalUsers.count,
      adminUsers: adminUsers.count,
      regularUsers: regularUsers.count,
      verifiedUsers: verifiedUsers.count,
      unverifiedUsers: unverifiedUsers.count,
      adminPercentage,
      verifiedPercentage
    },
    recentUsers
  };
};
