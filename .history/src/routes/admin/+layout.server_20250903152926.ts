import type { LayoutServerLoad } from './$types';
import { requireAdmin } from '$lib/server/auth';

export const load: LayoutServerLoad = async (event) => {
  // Require admin role to access any admin routes
  const session = await requireAdmin(event);
  
  return {
    session
  };
};
