import type { PageServerLoad, Actions } from './$types';
import { requireAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export const load: PageServerLoad = async (event) => {
  // Require admin role to access this page
  await requireAdmin(event);
  
  return {};
};

export const actions = {
  createUser: async (event) => {
    await requireAdmin(event);
    
    const data = await event.request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const name = data.get('name') as string;
    const role = data.get('role') as 'user' | 'admin';
    
    // Validation
    if (!email || !password) {
      return fail(400, { 
        error: 'Email and password are required',
        email,
        name,
        role
      });
    }
    
    if (password.length < 6) {
      return fail(400, { 
        error: 'Password must be at least 6 characters long',
        email,
        name,
        role
      });
    }
    
    if (!role || !['user', 'admin'].includes(role)) {
      return fail(400, { 
        error: 'Invalid role specified',
        email,
        name
      });
    }
    
    try {
      // Check if user already exists
      const existingUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
      });
      
      if (existingUser) {
        return fail(400, { 
          error: 'A user with this email already exists',
          email,
          name,
          role
        });
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create the user
      await db.insert(users).values({
        id: randomUUID(),
        email,
        name: name || null,
        hashedPassword,
        role,
        emailVerified: new Date(), // Auto-verify admin-created users
      });
      
      // Redirect to users list with success message
      throw redirect(303, '/admin/users?created=success');
      
    } catch (error) {
      if (error instanceof Response) {
        throw error; // Re-throw redirects
      }
      console.error('User creation error:', error);
      return fail(500, { 
        error: 'Failed to create user',
        email,
        name,
        role
      });
    }
  }
} satisfies Actions;
