import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.auth();
  
  // If no session exists, redirect to login
  if (!session?.user) {
    throw redirect(303, '/login');
  }

  // Return session data for use in dashboard pages
  return {
    session
  };
};
