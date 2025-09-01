// src/routes/+layout.server.ts

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  // This is the corrected line. It safely gets the user's session.
  const session = await event.locals.getSession();
  
  return {
    session
  };
};