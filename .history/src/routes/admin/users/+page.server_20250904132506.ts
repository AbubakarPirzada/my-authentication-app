import type { PageServerLoad, Actions } from './$types';
import { requireAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq, count } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  try {
    // Require admin role to access this page
    await requireAdmin(event);
  } catch (error) {
    console.error('Admin access required for users list:', error);
    throw error;
  }
  
  try {
    console.log('Loading users list...');
    // Fetch all users from the database
    const allUsers = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt
    }).from(users);
    
    console.log(`Loaded ${allUsers.length} users from database`);
    
    return {
      users: allUsers
    };
  } catch (error) {
    console.error('Failed to load users:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Return empty list on error
    return {
      users: []
    };
  }
};

export const actions = {
  deleteUser: async (event) => {
    try {
      await requireAdmin(event);
    } catch (error) {
      console.error('Admin access required for user deletion:', error);
      throw error;
    }
    
    console.log('Delete user action triggered');
    
    const data = await event.request.formData();
    const userId = data.get('userId') as string;
    
    console.log('Delete user request for ID:', userId);
    
    if (!userId) {
      console.log('Delete failed: no user ID provided');
      return fail(400, { error: 'User ID is required' });
    }
    
    try {
      console.log('Checking if user exists...');
      // Check if user exists before deletion
      const userToDelete = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, userId),
      });
      
      if (!userToDelete) {
        console.log('Delete failed: user not found');
        return fail(404, { error: 'User not found' });
      }
      
      console.log('User found:', { id: userToDelete.id, email: userToDelete.email, role: userToDelete.role });
      
      // Don't allow deletion of the last admin user
      if (userToDelete.role === 'admin') {
        console.log('Checking admin count before deleting admin user...');
        const [adminCount] = await db.select({ count: count() }).from(users).where(eq(users.role, 'admin'));
        console.log('Current admin count:', adminCount.count);
        if (adminCount.count <= 1) {
          console.log('Delete failed: cannot delete last admin');
          return fail(400, { error: 'Cannot delete the last admin user' });
        }
      }
      
      console.log('Deleting user from database...');
      const deletedUsers = await db.delete(users).where(eq(users.id, userId)).returning();
      
      console.log('User deleted successfully:', deletedUsers[0]?.id);
      
      return {
        success: true,
        message: 'User deleted successfully'
      };
    } catch (error) {
      console.error('User deletion database error:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      return fail(500, { error: 'Failed to delete user. Please check the server logs for details.' });
    }
  }
} satisfies Actions;
