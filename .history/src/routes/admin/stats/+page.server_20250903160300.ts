import type { PageServerLoad } from './$types';
import { requireAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq, count, desc, isNotNull, isNull } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
  // Require admin role to access this page
  await requireAdmin(event);
  
  try {
    // Calculate user statistics using proper Drizzle syntax
    const [totalUsersResult] = await db.select({ count: count() }).from(users);
    const [adminUsersResult] = await db.select({ count: count() }).from(users).where(eq(users.role, 'admin'));
    const [regularUsersResult] = await db.select({ count: count() }).from(users).where(eq(users.role, 'user'));
    
    // Get verified vs unverified users using proper functions
    const [verifiedUsersResult] = await db.select({ count: count() })
      .from(users)
      .where(isNotNull(users.emailVerified));
    
    const [unverifiedUsersResult] = await db.select({ count: count() })
      .from(users)
      .where(isNull(users.emailVerified));
    
    // Get the 5 most recently registered users, ordered by createdAt (fallback to id if createdAt not available)
    const recentUsers = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt
    }).from(users).orderBy(desc(users.createdAt)).limit(5);
    
    // Extract counts from results
    const totalCount = totalUsersResult.count;
    const adminCount = adminUsersResult.count;
    const regularCount = regularUsersResult.count;
    const verifiedCount = verifiedUsersResult.count;
    const unverifiedCount = unverifiedUsersResult.count;
    
    // Calculate percentage metrics
    const adminPercentage = totalCount > 0 ? ((adminCount / totalCount) * 100).toFixed(1) : '0';
    const verifiedPercentage = totalCount > 0 ? ((verifiedCount / totalCount) * 100).toFixed(1) : '0';
    
    return {
      stats: {
        totalUsers: totalCount,
        adminUsers: adminCount,
        regularUsers: regularCount,
        verifiedUsers: verifiedCount,
        unverifiedUsers: unverifiedCount,
        adminPercentage,
        verifiedPercentage
      },
      recentUsers
    };
  } catch (error) {
    console.error('Error loading admin stats:', error);
    
    // Return fallback data if queries fail
    return {
      stats: {
        totalUsers: 0,
        adminUsers: 0,
        regularUsers: 0,
        verifiedUsers: 0,
        unverifiedUsers: 0,
        adminPercentage: '0',
        verifiedPercentage: '0'
      },
      recentUsers: []
    };
  }
};
