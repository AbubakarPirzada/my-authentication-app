import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth();
  
  // If no session exists, redirect to login
  if (!session?.user) {
    throw redirect(303, '/login');
  }

  // Fetch the latest user data from database
  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id!),
    columns: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
    },
  });

  if (!user) {
    throw redirect(303, '/login');
  }

  return {
    user
  };
};

export const actions = {
  updateProfile: async ({ request, locals }) => {
    const session = await locals.auth();
    
    if (!session?.user?.id) {
      return fail(401, { error: 'Unauthorized' });
    }

    const data = await request.formData();
    const name = data.get('name') as string;

    // Basic validation
    if (!name || name.trim().length === 0) {
      return fail(400, { error: 'Name is required' });
    }

    if (name.trim().length > 100) {
      return fail(400, { error: 'Name must be less than 100 characters' });
    }

    try {
      // Update the user's name in the database
      await db
        .update(users)
        .set({
          name: name.trim(),
        })
        .where(eq(users.id, session.user.id));

      return {
        success: true,
        message: 'Profile updated successfully!'
      };
    } catch (error) {
      console.error('Profile update error:', error);
      return fail(500, { error: 'Failed to update profile. Please try again.' });
    }
  }
} satisfies Actions;
