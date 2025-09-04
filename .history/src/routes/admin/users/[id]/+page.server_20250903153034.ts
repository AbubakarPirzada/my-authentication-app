import type { PageServerLoad, Actions } from './$types';
import { requireAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  await requireAdmin(event);
  
  const userId = event.params.id;
  
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  
  if (!user) {
    throw redirect(303, '/admin/users');
  }
  
  return {
    user
  };
};

export const actions = {
  updateRole: async (event) => {
    await requireAdmin(event);
    
    const data = await event.request.formData();
    const userId = event.params.id;
    const newRole = data.get('role') as 'user' | 'admin';
    
    if (!newRole || !['user', 'admin'].includes(newRole)) {
      return {
        error: 'Invalid role specified'
      };
    }
    
    try {
      await db.update(users)
        .set({ role: newRole })
        .where(eq(users.id, userId));
        
      return {
        success: true,
        message: `User role updated to ${newRole}`
      };
    } catch (error) {
      console.error('Role update error:', error);
      return {
        error: 'Failed to update user role'
      };
    }
  },
  
  deleteUser: async (event) => {
    await requireAdmin(event);
    
    const userId = event.params.id;
    
    try {
      await db.delete(users).where(eq(users.id, userId));
      throw redirect(303, '/admin/users');
    } catch (error) {
      if (error instanceof Response) {
        throw error;
      }
      console.error('User deletion error:', error);
      return {
        error: 'Failed to delete user'
      };
    }
  }
} satisfies Actions;
