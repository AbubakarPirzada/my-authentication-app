import type { PageServerLoad } from './$types';
import { requireAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq, count, desc, isNotNull, isNull } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
  try {
    // Require admin role to access this page
    await requireAdmin(event);
  } catch (error) {
    console.error('Admin access required for stats page:', error);
    throw error;
  }
  
  try {
    console.log('Loading admin statistics...');
    
    // Calculate user statistics using proper Drizzle syntax
    console.log('Fetching total users count...');
    const [totalUsersResult] = await db.select({ count: count() }).from(users);
    console.log('Total users result:', totalUsersResult);
    
    console.log('Fetching admin users count...');
    const [adminUsersResult] = await db.select({ count: count() }).from(users).where(eq(users.role, 'admin'));
    console.log('Admin users result:', adminUsersResult);
    
    console.log('Fetching regular users count...');
    const [regularUsersResult] = await db.select({ count: count() }).from(users).where(eq(users.role, 'user'));
    console.log('Regular users result:', regularUsersResult);
    
    // Get verified vs unverified users using proper functions
    console.log('Fetching verified users count...');
    const [verifiedUsersResult] = await db.select({ count: count() })
      .from(users)
      .where(isNotNull(users.emailVerified));
    console.log('Verified users result:', verifiedUsersResult);
    
    console.log('Fetching unverified users count...');
    const [unverifiedUsersResult] = await db.select({ count: count() })
      .from(users)
      .where(isNull(users.emailVerified));
    console.log('Unverified users result:', unverifiedUsersResult);
    
    // Get the 5 most recently registered users, ordered by createdAt
    console.log('Fetching recent users...');
    const recentUsers = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt
    }).from(users).orderBy(desc(users.createdAt)).limit(5);
    console.log(`Recent users loaded: ${recentUsers.length} users`);
    
    // Extract counts from results
    const totalCount = totalUsersResult.count;
    const adminCount = adminUsersResult.count;
    const regularCount = regularUsersResult.count;
    const verifiedCount = verifiedUsersResult.count;
    const unverifiedCount = unverifiedUsersResult.count;
    
    console.log('Statistics calculated:', {
      totalCount,
      adminCount,
      regularCount,
      verifiedCount,
      unverifiedCount
    });
    
    // Calculate percentage metrics
    const adminPercentage = totalCount > 0 ? ((adminCount / totalCount) * 100).toFixed(1) : '0';
    const verifiedPercentage = totalCount > 0 ? ((verifiedCount / totalCount) * 100).toFixed(1) : '0';
    
    const statsData = {
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
    
    console.log('Stats load completed successfully');
    return statsData;
    
  } catch (error) {
    console.error('Error loading admin stats:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    
    // Return fallback data if queries fail
    console.log('Returning fallback stats data due to error');
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
