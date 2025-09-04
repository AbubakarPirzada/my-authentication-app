import type { PageServerLoad, Actions } from './$types';
import { requireAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq, count } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  // Require admin role to access this page
  await requireAdmin(event);
  
  // Get all users with 'user' role (potential candidates for promotion)
  const regularUsers = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    emailVerified: users.emailVerified
  }).from(users).where(eq(users.role, 'user'));
  
  // Get current admin count for display
  const [adminCount] = await db.select({ count: count() }).from(users).where(eq(users.role, 'admin'));
  
  return {
    regularUsers,
    adminCount: adminCount.count
  };
};

export const actions = {
  promoteUser: async (event) => {
    await requireAdmin(event);
    
    const data = await event.request.formData();
    const userId = data.get('userId') as string;
    
    if (!userId) {
      return fail(400, { error: 'User ID is required' });
    }
    
    try {
      // Check if user exists and is currently a regular user
      const userToPromote = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });
      
      if (!userToPromote) {
        return fail(404, { error: 'User not found' });
      }
      
      if (userToPromote.role !== 'user') {
        return fail(400, { error: 'This user is already an administrator or has an invalid role' });
      }
      
      // Promote the user to admin
      await db.update(users)
        .set({ role: 'admin' })
        .where(eq(users.id, userId));
      
      return {
        success: true,
        message: `${userToPromote.name || userToPromote.email} has been promoted to administrator`
      };
      
    } catch (error) {
      console.error('User promotion error:', error);
      return fail(500, { error: 'Failed to promote user' });
    }
  },
  
  demoteUser: async (event) => {
    await requireAdmin(event);
    
    const data = await event.request.formData();
    const userId = data.get('userId') as string;
    
    if (!userId) {
      return fail(400, { error: 'User ID is required' });
    }
    
    try {
      // Check if user exists and is currently an admin
      const userToDemote = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });
      
      if (!userToDemote) {
        return fail(404, { error: 'User not found' });
      }
      
      if (userToDemote.role !== 'admin') {
        return fail(400, { error: 'This user is not an administrator' });
      }
      
      // Check if this is the last admin
      const [adminCount] = await db.select({ count: count() }).from(users).where(eq(users.role, 'admin'));
      if (adminCount.count <= 1) {
        return fail(400, { error: 'Cannot demote the last administrator' });
      }
      
      // Demote the user to regular user
      await db.update(users)
        .set({ role: 'user' })
        .where(eq(users.id, userId));
      
      return {
        success: true,
        message: `${userToDemote.name || userToDemote.email} has been demoted to regular user`
      };
      
    } catch (error) {
      console.error('User demotion error:', error);
      return fail(500, { error: 'Failed to demote user' });
    }
  }
} satisfies Actions;
