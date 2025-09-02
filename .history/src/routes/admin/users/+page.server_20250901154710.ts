import type { PageServerLoad } from './$types';
import { requireAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
  // Require admin role to access this page
  requireAdmin(event);
  
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
