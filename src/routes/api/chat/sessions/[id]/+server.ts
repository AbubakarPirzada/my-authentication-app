// src/routes/api/chat/sessions/[id]/+server.ts

import { json } from '@sveltejs/kit';
// No need to import auth - we'll use locals.auth()
import { 
  getChatSession, 
  getChatMessages, 
  convertToAIMessages,
  updateChatSession 
} from '$lib/server/db/chat';
import type { RequestHandler } from './$types';

// GET - Get specific chat session and its messages
export const GET: RequestHandler = async ({ params, locals }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Get session details
    const chatSession = await getChatSession(id, session.user.id);
    if (!chatSession) {
      return json({ error: 'Session not found' }, { status: 404 });
    }

    // Get messages for this session
    const dbMessages = await getChatMessages(id);
    const messages = convertToAIMessages(dbMessages);

    return json({ 
      session: chatSession, 
      messages 
    });
  } catch (error) {
    console.error('Error fetching chat session:', error);
    return json({ error: 'Failed to fetch chat session' }, { status: 500 });
  }
};

// PUT - Update chat session (e.g., rename)
export const PUT: RequestHandler = async ({ params, locals, request }) => {
  try {
    const session = await locals.auth();
    if (!session?.user?.id) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return json({ error: 'Session ID is required' }, { status: 400 });
    }

    const { title } = await request.json();
    if (!title) {
      return json({ error: 'Title is required' }, { status: 400 });
    }

    // Verify session belongs to user
    const chatSession = await getChatSession(id, session.user.id);
    if (!chatSession) {
      return json({ error: 'Session not found' }, { status: 404 });
    }

    // Update session
    await updateChatSession(id, { title });
    
    return json({ success: true });
  } catch (error) {
    console.error('Error updating chat session:', error);
    return json({ error: 'Failed to update chat session' }, { status: 500 });
  }
};
