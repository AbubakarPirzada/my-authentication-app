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
  default: async (event) => {
    try {
      await requireAdmin(event);
    } catch (error) {
      console.error('Admin access required:', error);
      throw error;
    }
    
    console.log('Create user action triggered');
    
    const data = await event.request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const name = data.get('name') as string;
    const role = data.get('role') as 'user' | 'admin';
    
    console.log('Form data received:', { email, name, role, passwordLength: password?.length });
    
    // Validation
    if (!email || !password) {
      console.log('Validation failed: missing email or password');
      return fail(400, { 
        error: 'Email and password are required',
        email,
        name,
        role
      });
    }
    
    if (password.length < 6) {
      console.log('Validation failed: password too short');
      return fail(400, { 
        error: 'Password must be at least 6 characters long',
        email,
        name,
        role
      });
    }
    
    if (!role || !['user', 'admin'].includes(role)) {
      console.log('Validation failed: invalid role');
      return fail(400, { 
        error: 'Invalid role specified',
        email,
        name
      });
    }
    
    try {
      console.log('Checking for existing user...');
      // Check if user already exists
      const existingUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
      });
      
      if (existingUser) {
        console.log('User already exists with email:', email);
        return fail(400, { 
          error: 'A user with this email already exists',
          email,
          name,
          role
        });
      }
      
      console.log('Hashing password...');
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      console.log('Inserting user into database...');
      // Create the user
      const newUser = await db.insert(users).values({
        id: randomUUID(),
        email,
        name: name || null,
        hashedPassword,
        role,
        emailVerified: new Date(), // Auto-verify admin-created users
        createdAt: new Date(), // Set creation time
      }).returning();
      
      console.log('User created successfully:', newUser[0]?.id);
      
      // Redirect to users list with success message
      throw redirect(303, '/admin/users?created=success');
      
    } catch (error) {
      if (error instanceof Response) {
        console.log('Redirecting to users page');
        throw error; // Re-throw redirects
      }
      console.error('User creation database error:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      return fail(500, { 
        error: 'Failed to create user. Please check the server logs for details.',
        email,
        name,
        role
      });
    }
  }
} satisfies Actions;
