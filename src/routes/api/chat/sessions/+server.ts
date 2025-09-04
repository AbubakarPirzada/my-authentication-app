// src/routes/api/chat/sessions/+server.ts

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { 
  getUserChatSessions, 
  createChatSession, 
  deleteChatSession,
  getUserChatStats 
} from '$lib/server/db/chat';

// GET - Get user's chat sessions
export const GET: RequestHandler = async ({ locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const chatSessions = await getUserChatSessions(session.user.id);
    return json({ sessions: chatSessions });
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    return json({ error: 'Failed to fetch chat sessions' }, { status: 500 });
  }
}

// POST - Create a new chat session
export const POST: RequestHandler = async ({ locals, request }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title } = await request.json();
    const newSession = await createChatSession(session.user.id, title);
    
    return json({ session: newSession });
  } catch (error) {
    console.error('Error creating chat session:', error);
    return json({ error: 'Failed to create chat session' }, { status: 500 });
  }
}

// DELETE - Delete a chat session
export const DELETE: RequestHandler = async ({ locals, request }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId } = await request.json();
    if (!sessionId) {
      return json({ error: 'Session ID is required' }, { status: 400 });
    }

    await deleteChatSession(sessionId, session.user.id);
    return json({ success: true });
  } catch (error) {
    console.error('Error deleting chat session:', error);
    return json({ error: 'Failed to delete chat session' }, { status: 500 });
  }
}
