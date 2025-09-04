// src/routes/api/chat/stats/+server.ts

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUserChatStats } from '$lib/server/db/chat';

// GET - Get user's chat statistics
export const GET: RequestHandler = async ({ locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getUserChatStats(session.user.id);
    return json({ stats });
  } catch (error) {
    console.error('Error fetching chat stats:', error);
    return json({ error: 'Failed to fetch chat statistics' }, { status: 500 });
  }
}
