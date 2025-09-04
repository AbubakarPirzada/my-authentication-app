import type { PageServerLoad, Actions } from './$types';
import { requireAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq, count } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  // Require admin role to access this page
  await requireAdmin(event);
  
  // Fetch all users from the database
  const allUsers = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    role: users.role,
    emailVerified: users.emailVerified
  }).from(users);
  
  return {
    users: allUsers
  };
};

export const actions = {
  deleteUser: async (event) => {
    await requireAdmin(event);
    
    const data = await event.request.formData();
    const userId = data.get('userId') as string;
    
    if (!userId) {
      return fail(400, { error: 'User ID is required' });
    }
    
    try {
      // Check if user exists before deletion
      const userToDelete = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });
      
      if (!userToDelete) {
        return fail(404, { error: 'User not found' });
      }
      
      // Don't allow deletion of the last admin user
      if (userToDelete.role === 'admin') {
        const [adminCount] = await db.select({ count: count() }).from(users).where(eq(users.role, 'admin'));
        if (adminCount.count <= 1) {
          return fail(400, { error: 'Cannot delete the last admin user' });
        }
      }
      
      await db.delete(users).where(eq(users.id, userId));
      
      return {
        success: true,
        message: 'User deleted successfully'
      };
    } catch (error) {
      console.error('User deletion error:', error);
      return fail(500, { error: 'Failed to delete user' });
    }
  }
} satisfies Actions;
